#!/usr/bin/env node

// src/session-store.ts
import { mkdirSync, writeFileSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
var SESSIONS_DIR = join(homedir(), ".parallight", "sessions");
function loadAllSessions() {
  const out = [];
  try {
    for (const f of readdirSync(SESSIONS_DIR)) {
      if (!f.endsWith(".json")) continue;
      try {
        out.push(JSON.parse(readFileSync(join(SESSIONS_DIR, f), "utf8")));
      } catch {
      }
    }
  } catch {
  }
  return out;
}

// src/hooks/reinject-persona-core.ts
var DEFAULT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1e3;
function cwdRelated(hookCwd, sessionCwd) {
  if (!hookCwd || !sessionCwd) return false;
  const a = stripTrailingSlash(hookCwd);
  const b = stripTrailingSlash(sessionCwd);
  if (a === b) return true;
  return a.startsWith(b + "/") || b.startsWith(a + "/");
}
function stripTrailingSlash(p) {
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}
function selectSession(input) {
  const maxAgeMs = input.maxAgeMs ?? DEFAULT_MAX_AGE_MS;
  const nowMs = input.now.getTime();
  const candidates = input.sessions.filter((s) => {
    if (!s.systemPrompt || !s.systemPrompt.trim()) return false;
    if (!cwdRelated(input.cwd, s.cwd)) return false;
    const t = Date.parse(s.lastActiveAt);
    if (Number.isNaN(t)) return false;
    return nowMs - t <= maxAgeMs;
  });
  if (candidates.length === 0) return null;
  candidates.sort((a, b) => Date.parse(b.lastActiveAt) - Date.parse(a.lastActiveAt));
  return candidates[0] ?? null;
}
var REINJECT_HEADER = [
  "[SILENT SETUP \u2014 your Parallight lab Mentor operating instructions were restored",
  "after a context compaction or a new session. Re-adopt the persona below and",
  "continue the lab IN CHARACTER. Do NOT narrate this restore, do NOT greet again,",
  "do NOT mention 'persona' / 'compaction' / 'restored' / 'context'.",
  "\u4E0D\u8981\u91CD\u65B0\u6253\u62DB\u547C,\u4E5F\u4E0D\u8981\u8BF4\u660E\u8FD9\u6B21\u6062\u590D \u2014\u2014 \u76F4\u63A5\u4EE5 Mentor \u8EAB\u4EFD\u6309\u4E0B\u9762\u7684\u98CE\u683C\u7EE7\u7EED\u3002]",
  ""
].join("\n");
function buildReinjection(input) {
  const s = selectSession(input);
  if (!s || !s.systemPrompt) return null;
  return REINJECT_HEADER + s.systemPrompt;
}

// src/hooks/reinject-persona.ts
async function readStdin() {
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  return Buffer.concat(chunks).toString("utf8");
}
async function main() {
  let cwd = process.cwd();
  try {
    const raw = await readStdin();
    if (raw.trim()) {
      const payload = JSON.parse(raw);
      if (payload.cwd && typeof payload.cwd === "string") cwd = payload.cwd;
    }
  } catch {
  }
  let text = null;
  try {
    const sessions = loadAllSessions().map((s) => ({
      labId: s.labId,
      cwd: s.cwd,
      lastActiveAt: s.lastActiveAt,
      systemPrompt: s.systemPrompt
    }));
    text = buildReinjection({ sessions, cwd, now: /* @__PURE__ */ new Date() });
  } catch {
  }
  if (text) process.stdout.write(text);
}
main().catch(() => {
}).finally(() => process.exit(0));
//# sourceMappingURL=reinject-persona.js.map
