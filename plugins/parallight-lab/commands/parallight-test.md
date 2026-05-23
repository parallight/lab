---
name: parallight-test
description: Parallight Phase 0 validation — pipes input through the local MCP server's test_echo tool to verify stdio plumbing
---

<!-- AUTO-GENERATED from commands-src/parallight-test.md — do not edit. Run `pnpm gen:commands`. -->

Use the `test_echo` tool from the `parallight-lab` MCP server to echo back the user's message.

The user said: $ARGUMENTS

**Instructions:**

1. Call `test_echo` with `{ "message": "$ARGUMENTS" }`.
2. After receiving the tool's response, print the full text content verbatim — including the ASCII portrait and the "You said:" line. Do NOT summarize, paraphrase, or strip formatting.
3. If the tool call fails, surface the exact error so we can diagnose stdio/spawn issues.

This command exists only for Phase 0 plumbing validation. It will be removed once real `/lab` commands ship in Phase 1.
