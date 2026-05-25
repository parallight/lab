# Parallight Lab — Claude Code plugin

Learn to build AI agents by **directing** them, guided by a resident master
craftsman (Marvin) — inside Claude Code. Zero API keys (the LLM runs through
Parallight's backend).

## Install (Claude Code)

```
/plugin marketplace add parallight/lab
/plugin install parallight-lab@parallight-cc
```

Then fully restart Claude Code and run `/lab-login`. More: <https://parallight.ai>

---

This repo is the public Claude Code marketplace. The MCP server
(`plugins/parallight-lab/bundle/`) talks to the Parallight backend; it holds no
secrets.
