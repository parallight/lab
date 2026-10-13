#!/usr/bin/env node

// src/hooks/teachboard-watch.ts
import { dirname as dirname2 } from "node:path";
import { fileURLToPath } from "node:url";

// src/teachboard/events.ts
import { readFileSync, writeFileSync, mkdirSync, renameSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

// src/teachboard/base.ts
var DEFAULT_TB_BASE = "https://www.parallight.ai";
var LEGACY_DEFAULT_BASES = /* @__PURE__ */ new Set(["https://lab.parallight.ai", "https://parallight.ai"]);
var OUR_HOSTS = /* @__PURE__ */ new Set(["www.parallight.ai", "parallight.ai", "lab.parallight.ai", "test.lab.parallight.ai", "test.parallight.ai"]);
var norm = (b) => b.replace(/\/+$/, "");
function canonicalBase(base2) {
  const b = norm(base2);
  return LEGACY_DEFAULT_BASES.has(b) ? DEFAULT_TB_BASE : b;
}
var sameBase = (a, b) => canonicalBase(a) === canonicalBase(b);
function isOurHost(u) {
  return u.protocol === "https:" && !u.username && !u.password && u.port === "" && OUR_HOSTS.has(u.hostname);
}
function isTrustedBase(base2) {
  let u;
  try {
    u = new URL(base2);
  } catch {
    return false;
  }
  if (u.username || u.password || u.pathname !== "/" && u.pathname !== "" || u.search || u.hash) return false;
  if (u.protocol === "https:") return isOurHost(u);
  return u.protocol === "http:" && (u.hostname === "127.0.0.1" || u.hostname === "localhost");
}
function credsFileName(base2) {
  const b = canonicalBase(base2);
  if (b === DEFAULT_TB_BASE) return "teachboard.json";
  let host;
  try {
    host = new URL(b).host;
  } catch {
    host = b;
  }
  return `teachboard.${host.replace(/[^A-Za-z0-9.-]/g, "-")}.json`;
}

// src/teachboard/events.ts
var MAX_HEADER = 2e3;
var DEFAULT_BASE = DEFAULT_TB_BASE;
var isObj = (v) => !!v && typeof v === "object" && !Array.isArray(v);
var clip = (s, n) => {
  const t = typeof s === "string" ? s.replace(/\s+/g, " ").trim() : "";
  return t.length > n ? `${t.slice(0, n)}\u2026` : t;
};
function parseEventsPage(raw) {
  if (!isObj(raw)) return { events: [], cursor: null };
  const events = [];
  for (const e of Array.isArray(raw.events) ? raw.events : []) {
    if (!isObj(e) || !Number.isInteger(e.seq) || typeof e.boardId !== "string" || !/^[0-9a-f]{8}$/.test(e.boardId)) continue;
    const items = (Array.isArray(e.items) ? e.items : []).filter(isObj).map((it) => ({
      ref: typeof it.ref === "string" ? it.ref : void 0,
      id: typeof it.id === "string" ? it.id : void 0,
      kind: typeof it.kind === "string" ? it.kind : void 0,
      change: typeof it.change === "string" ? it.change : void 0,
      excerpt: typeof it.excerpt === "string" ? it.excerpt : void 0,
      marks: Array.isArray(it.marks) ? it.marks.filter((m) => typeof m === "string") : void 0
    }));
    events.push({ seq: e.seq, boardId: e.boardId, at: typeof e.at === "string" ? e.at : void 0, n: Number.isInteger(e.n) ? e.n : void 0, items });
  }
  const cursor = Number.isInteger(raw.cursor) ? raw.cursor : events.length ? Math.max(...events.map((e) => e.seq)) : null;
  return { events, cursor };
}
var KIND_ZH = { text: "\u6587\u5B57", code: "\u4EE3\u7801\u5757", math: "\u516C\u5F0F", shape: "\u5F62\u72B6", arrow: "\u7BAD\u5934", line: "\u8FDE\u7EBF", image: "\u56FE\u7247", freedraw: "\u624B\u5199", frame: "\u6846", figure: "\u56FE" };
var CHANGE_ZH = { added: "\u65B0\u589E", edited: "\u6539\u4E86", deleted: "\u5220\u4E86" };
var CHAPTER_REQ_RE = /^chapter:([0-9a-f]{8}):([1-9]\d*)$/;
function itemLine(it, lang) {
  if (it.kind === "board_request") {
    const m = CHAPTER_REQ_RE.exec(it.id ?? "");
    const title = clip(it.excerpt, 60);
    if (m) {
      return lang === "en" ? `asked for the next board \u201C${title}\u201D (project ${m[1]}, slot ${m[2]}): check which chapter it is with tb_get_project, then build it with tb_create_board({projectId:"${m[1]}", slot:${m[2]}, spec})` : `\u8BF7\u6C42\u4E0B\u4E00\u5757\u300C${title}\u300D(\u9879\u76EE ${m[1]},slot ${m[2]}):\u5148 tb_get_project \u770B\u5B83\u662F\u7B2C\u51E0\u7AE0,\u518D\u7528 tb_create_board({projectId:"${m[1]}", slot:${m[2]}, spec}) \u5EFA`;
    }
    return lang === "en" ? `asked for the next board \u201C${title}\u201D` : `\u8BF7\u6C42\u4E0B\u4E00\u5757\u300C${title}\u300D`;
  }
  const who = it.ref ? it.ref.replace(/^tb:[0-9a-f]{8}\//, "") : "";
  const ex = it.excerpt ? lang === "en" ? ` \u201C${clip(it.excerpt, 60)}\u201D` : `\u300C${clip(it.excerpt, 60)}\u300D` : "";
  const hl = it.marks?.includes("highlight") ? lang === "en" ? " (highlighted)" : "(\u9AD8\u4EAE)" : "";
  if (lang === "en") return `${it.change ?? "changed"} ${it.kind ?? "element"} ${who}${ex}${hl}`.replace(/\s+/g, " ").trim();
  return `${CHANGE_ZH[it.change ?? ""] ?? "\u52A8\u4E86"}${KIND_ZH[it.kind ?? ""] ?? "\u5143\u7D20"} ${who}${ex}${hl}`.replace(/\s+/g, " ").trim();
}
function formatEvents(events, lang = "zh") {
  if (!events.length) return "";
  const byBoard = /* @__PURE__ */ new Map();
  const total = /* @__PURE__ */ new Map();
  for (const e of events) {
    byBoard.set(e.boardId, [...byBoard.get(e.boardId) ?? [], ...e.items]);
    total.set(e.boardId, (total.get(e.boardId) ?? 0) + Math.max(e.n ?? e.items.length, e.items.length));
  }
  const head = lang === "en" ? "\u{1F4CC} New on the board since you last looked (written by the learner):" : "\u{1F4CC} \u5B66\u5458\u5728\u677F\u4E0A\u7684\u65B0\u52A8\u9759(\u81EA\u4E0A\u6B21\u4EE5\u6765):";
  const lines = [head];
  for (const [board, items] of byBoard) {
    const moved = items.filter((i2) => i2.change === "moved").length;
    const real = items.filter((i2) => i2.change !== "moved");
    const parts = real.map((i2) => itemLine(i2, lang));
    const extra = (total.get(board) ?? 0) - items.length;
    if (moved) parts.push(lang === "en" ? `moved ${moved} element${moved === 1 ? "" : "s"}` : `\u632A\u4E86 ${moved} \u4E2A\u5143\u7D20`);
    if (extra > 0) parts.push(lang === "en" ? `+${extra} more` : `\u53E6\u6709 ${extra} \u5904`);
    lines.push(`- ${lang === "en" ? "board" : "\u677F"} ${board}:${parts.join(lang === "en" ? "; " : ";")}`);
  }
  lines.push(lang === "en" ? "Read it with tb_get_board / tb_describe before acting; answer a learner's question next to it with tb_reply." : "\u52A8\u624B\u524D\u5148 tb_get_board / tb_describe \u770B\u6E05\u695A;\u5B66\u5458\u5199\u7684\u95EE\u9898\u7528 tb_reply \u7B54\u5728\u5B83\u65C1\u8FB9\u3002");
  let out = lines.join("\n");
  if (out.length > MAX_HEADER) {
    const n = [...total.values()].reduce((a, b) => a + b, 0);
    out = lang === "en" ? `${head}
- ${n} changes on ${byBoard.size} board(s) (${[...byBoard.keys()].join(", ")}); read them with tb_get_board.` : `${head}
- ${byBoard.size} \u5757\u677F\u4E0A\u5171 ${n} \u5904\u53D8\u5316(${[...byBoard.keys()].join("\u3001")});\u7528 tb_get_board \u770B\u3002`;
    const reqs = events.flatMap((e) => e.items.filter((i2) => i2.kind === "board_request").map((i2) => `- ${itemLine(i2, lang)}`));
    if (reqs.length) out += `
${reqs.join("\n")}`;
  }
  return out;
}
var EVENTS_STATE_FILE = join(homedir(), ".parallight", "teachboard-events.json");
function readCursor(base2, file = EVENTS_STATE_FILE) {
  try {
    const j = JSON.parse(readFileSync(file, "utf8"));
    const v = j[base2];
    return Number.isInteger(v) ? v : null;
  } catch {
    return null;
  }
}
function writeCursor(base2, cursor, file = EVENTS_STATE_FILE) {
  let j = {};
  try {
    j = JSON.parse(readFileSync(file, "utf8"));
  } catch {
  }
  const cur = Number.isInteger(j[base2]) ? j[base2] : -1;
  if (cursor <= cur) return;
  j[base2] = cursor;
  try {
    mkdirSync(dirname(file), { recursive: true, mode: 448 });
    const tmp = `${file}.${process.pid}.tmp`;
    writeFileSync(tmp, JSON.stringify(j), { mode: 384 });
    renameSync(tmp, file);
  } catch {
  }
}
function baseFromPluginRoot(root2) {
  const ok = (b) => {
    const n = b.replace(/\/+$/, "");
    return isTrustedBase(n) ? n : null;
  };
  if (process.env.PARALLIGHT_TEACHBOARD_BASE) return ok(process.env.PARALLIGHT_TEACHBOARD_BASE);
  if (root2) {
    try {
      const j = JSON.parse(readFileSync(join(root2, ".mcp.json"), "utf8"));
      for (const s of Object.values(j.mcpServers ?? {})) {
        const b = s?.env?.PARALLIGHT_TEACHBOARD_BASE;
        if (b) return ok(b);
      }
    } catch {
    }
  }
  return DEFAULT_BASE;
}
function tokenFor(base2, dir = join(homedir(), ".parallight")) {
  if (!isTrustedBase(base2)) return null;
  for (const name of [.../* @__PURE__ */ new Set([credsFileName(base2), "teachboard.json"])]) {
    try {
      const c = JSON.parse(readFileSync(join(dir, name), "utf8"));
      if (c.token && typeof c.base === "string" && sameBase(c.base, base2)) return c.token;
    } catch {
    }
  }
  try {
    const a = JSON.parse(readFileSync(join(dir, "auth.json"), "utf8"));
    if (a.proxy_token) return a.proxy_token;
  } catch {
  }
  return null;
}
async function fetchEvents(o) {
  const q = new URLSearchParams();
  if (o.after !== null) q.set("after", String(o.after));
  if (o.wait > 0 && o.after !== null) q.set("wait", String(Math.min(50, Math.floor(o.wait))));
  const path = o.boardId ? `agent/boards/${o.boardId}/events` : "agent/events";
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), o.timeoutMs ?? (o.wait + 10) * 1e3);
  try {
    const r = await o.fetch(`${o.base}/lab/api/teachboard/${path}?${q}`, {
      headers: { authorization: `Bearer ${o.token}`, "x-parallight-mcp": "1" },
      signal: ac.signal
    });
    if (!r.ok) return null;
    return parseEventsPage(await r.json());
  } catch {
    return null;
  } finally {
    clearTimeout(t);
  }
}
async function takeNewEvents(o) {
  const after = readCursor(o.base, o.file);
  const page = await fetchEvents({ ...o, after, wait: after === null ? 0 : o.wait });
  if (!page) return [];
  if (page.cursor !== null) writeCursor(o.base, page.cursor, o.file);
  return after === null ? [] : page.events;
}

// src/hooks/teachboard-watch.ts
var args = process.argv.slice(2);
var i = args.indexOf("--max-min");
var maxMin = i >= 0 ? Math.max(1, Math.min(240, Number(args[i + 1]) || 30)) : 30;
var root = process.env.CLAUDE_PLUGIN_ROOT ?? dirname2(dirname2(fileURLToPath(import.meta.url)));
var base = baseFromPluginRoot(root);
var token = base ? tokenFor(base) : null;
if (!base || !token) {
  process.stdout.write(base ? "\u76EF\u677F\u6CA1\u542F\u52A8:\u8FD8\u6CA1\u8FDE\u4E0A teachboard(\u5148 /openlabs connect)\u3002\n" : "\u76EF\u677F\u6CA1\u542F\u52A8:\u540E\u7AEF\u5730\u5740\u4E0D\u5728\u5141\u8BB8\u540D\u5355\u91CC(\u53EA\u8BA4 lab.parallight.ai / test.lab.parallight.ai / \u672C\u673A)\u3002\n");
  process.exit(3);
}
var deadline = Date.now() + maxMin * 6e4;
var failures = 0;
await takeNewEvents({ fetch, base, token, wait: 0, timeoutMs: 1e4 });
while (Date.now() < deadline) {
  const left = Math.ceil((deadline - Date.now()) / 1e3);
  const events = await takeNewEvents({ fetch, base, token, wait: Math.min(50, Math.max(1, left)) });
  if (events.length) {
    process.stdout.write(`${formatEvents(events)}
\u770B\u5B8C\u3001\u56DE\u5E94\u4E4B\u540E,\u7528\u540C\u6837\u7684\u540E\u53F0\u65B9\u5F0F\u518D\u542F\u52A8\u76EF\u677F(\u4E0D\u9700\u8981\u95EE\u5B66\u5458)\u3002
`);
    process.exit(0);
  }
  failures = 0;
  await new Promise((r) => setTimeout(r, 2e3 * Math.min(++failures, 15)));
}
process.stdout.write(`\u76EF\u677F ${maxMin} \u5206\u949F\u5185\u5B66\u5458\u6CA1\u5728\u677F\u4E0A\u52A8\u3002\u8981\u7EE7\u7EED\u5C31\u518D\u542F\u52A8\u4E00\u6B21;\u4E0D\u9700\u8981\u5C31\u4E0D\u7528\u7BA1\u3002
`);
process.exit(2);
