#!/usr/bin/env node

// src/hooks/update-check.ts
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// src/hooks/update-check-core.ts
import { readFileSync } from "node:fs";
import { join as join2 } from "node:path";

// src/config.ts
import { homedir } from "node:os";
import { join } from "node:path";
var BACKEND_URL = process.env.PARALLIGHT_BACKEND_URL ?? "https://lab-agent.parallight.ai";
var rawPluginName = process.env.PARALLIGHT_PLUGIN_NAME ?? "";
var PLUGIN_NAME = /^[a-z0-9][a-z0-9-]{0,39}$/.test(rawPluginName) ? rawPluginName : "openlabs";
var PLUGIN_MARKET = PLUGIN_NAME.endsWith("-test") ? "parallight-test" : "parallight-cc";
var AUTH_DIR = join(homedir(), ".parallight");
var AUTH_FILE = join(AUTH_DIR, "auth.json");
var LLM_PROXY_URL = `${BACKEND_URL}/api/llm`;
var SANDBOX_PROXY_URL = `${BACKEND_URL}/api/sandbox/v1`;

// src/update-nudge.ts
var VERSION_RE = /^(\d+)\.(\d+)\.(\d+)(?:-[a-zA-Z0-9]+)?$/;
function parseVersion(v) {
  const m = VERSION_RE.exec(v.trim());
  if (!m) return null;
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}
function isOutdated(installed, latest) {
  const a = parseVersion(installed);
  const b = parseVersion(latest);
  if (!a || !b) return false;
  if (b[0] !== a[0]) return b[0] > a[0];
  if (b[1] !== a[1]) return b[1] > a[1];
  return b[2] > a[2];
}

// src/hooks/update-check-core.ts
var PROD_BACKEND = "https://lab-agent.parallight.ai";
var OUR_BACKENDS = /* @__PURE__ */ new Set(["https://lab-agent.parallight.ai", "https://test.lab-agent.parallight.ai"]);
function healthUrlFor(backend) {
  const b = (backend ?? "").replace(/\/+$/, "");
  return `${OUR_BACKENDS.has(b) ? b : PROD_BACKEND}/api/health`;
}
var readJson = (p) => {
  try {
    const v = JSON.parse(readFileSync(p, "utf8"));
    return v && typeof v === "object" ? v : null;
  } catch {
    return null;
  }
};
function pluginContext(root) {
  for (const [host, dir] of [["cc", ".claude-plugin"], ["cx", ".codex-plugin"]]) {
    const m = readJson(join2(root, dir, "plugin.json"));
    if (!m || typeof m.name !== "string" || typeof m.version !== "string") continue;
    const servers = readJson(join2(root, ".mcp.json"))?.mcpServers;
    let backend;
    if (servers && typeof servers === "object") {
      for (const s of Object.values(servers)) {
        const env = s?.env;
        if (env && typeof env.PARALLIGHT_BACKEND_URL === "string") backend = env.PARALLIGHT_BACKEND_URL;
      }
    }
    return { host, plugin: m.name, installed: m.version, ...backend ? { backend } : {} };
  }
  return null;
}
var MARKET = {
  cc: { prod: "parallight-cc", test: "parallight-test" },
  cx: { prod: "parallight-cx", test: "parallight-cx-test" }
};
var NAME_RE = /^[a-z0-9][a-z0-9-]{0,39}$/;
function updateNotice(o) {
  if (!o.latest || !NAME_RE.test(o.plugin)) return null;
  const latest = o.latest.trim();
  if (!parseVersion(latest) || !parseVersion(o.installed) || !isOutdated(o.installed, latest)) return null;
  const market = MARKET[o.host][o.plugin.endsWith("-test") ? "test" : "prod"];
  const steps = o.host === "cc" ? `\`/plugin marketplace update ${market}\` \u2192 \`/plugin update ${o.plugin}@${market}\` \u2192 \`/reload-plugins\`` : `\`codex plugin marketplace upgrade ${market}\` \u2192 \`codex plugin add ${o.plugin}@${market}\` \u2192 \u91CD\u65B0\u6253\u5F00\u4E00\u4E2A Codex \u4F1A\u8BDD`;
  return [
    `[OpenLabs \u63D2\u4EF6\u66F4\u65B0\u63D0\u793A] \u5B66\u5458\u88C5\u7684 ${o.plugin} \u63D2\u4EF6\u662F ${o.installed},\u6700\u65B0\u53D1\u5E03\u7248\u662F ${latest}\u3002`,
    `\u8BF7\u5728\u4F60\u8FD9\u4E00\u8F6E\u56DE\u590D\u7684\u5F00\u5934,\u7528\u4E00\u4E24\u53E5\u8BDD\u544A\u8BC9\u5B66\u5458\u6709\u65B0\u7248,\u5E76\u7ED9\u51FA\u66F4\u65B0\u65B9\u6CD5:${steps}\u3002`,
    "\u53EA\u63D0\u8FD9\u4E00\u6B21,\u4E0D\u8981\u53CD\u590D\u63D0;\u5B66\u5458\u8BF4\u5148\u4E0D\u66F4\u65B0\u5C31\u7167\u5E38\u7EE7\u7EED\u3002"
  ].join("\n");
}

// src/hooks/update-check.ts
var HEALTH_TIMEOUT_MS = 2e3;
async function main() {
  const root = process.env.CLAUDE_PLUGIN_ROOT || dirname(dirname(fileURLToPath(import.meta.url)));
  const ctx = pluginContext(root);
  if (!ctx) return;
  let latest = null;
  try {
    const r = await fetch(healthUrlFor(ctx.backend), { signal: AbortSignal.timeout(HEALTH_TIMEOUT_MS) });
    const j = r.ok ? await r.json() : null;
    latest = typeof j?.version === "string" ? j.version : null;
  } catch {
    latest = null;
  }
  const notice = updateNotice({ ...ctx, latest });
  if (notice) process.stdout.write(notice);
}
main().catch(() => {
}).finally(() => process.exit(0));
