# Parallight Lab — Claude Code plugin

Learn to build AI agents by **directing** them. A resident master craftsman
(Marvin) guides you through hands-on labs right inside Claude Code: you command
the agent to build, you understand the design, and you verify the result.

**Zero setup keys** — the LLM runs through Parallight's backend, so you never
need your own Anthropic or OpenAI key.

## Install

In Claude Code:

```
/plugin marketplace add parallight/lab
/plugin install parallight-lab@parallight-cc
```

Then **fully restart Claude Code** (quit and relaunch — not `/reload-plugins`)
so the plugin's tools load.

## Use

```
/lab-login        # sign in with a 6-digit code sent to your email
/lab              # browse available labs
/lab-start lab-01 # begin — the master takes over from here
```

More: <https://parallight.ai>

---

This repo is the public plugin marketplace. The plugin's MCP server (`bundle/`)
talks to the Parallight backend; it holds no secrets.
