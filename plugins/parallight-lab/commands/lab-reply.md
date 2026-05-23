---
name: lab-reply
description: 回复师傅对某次 review 的批改
---

<!-- AUTO-GENERATED from commands-src/lab-reply.md — do not edit. Run `pnpm gen:commands`. -->

学员要回复某条 review 批改。

- 从 `$ARGUMENTS` 取 review 编号。没给、或学员不确定有哪些，就先让他 /lab-read 看一遍（那里会列出可回复的编号）。
- 让学员**自由打字**写回复，然后调 `post_review_reply`（`review_id` = 编号，`body` = 回复内容）。
- 成功后简短确认已发给师傅。
