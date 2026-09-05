---
name: lab-read
description: 查看 Mentor 的批改和私信回复
---

<!-- AUTO-GENERATED from commands-src/lab-read.md — do not edit. Run `pnpm gen:commands`. -->

调 `get_inbox`，**`mark_seen` 传 true**（这会把这些标记为已读）。

- 把每条以Mentor口吻清楚呈现：是哪个 lab 的批改 / 哪条私信的回复，Mentor 说了什么。
- 对 review 批改，提示学员可以用 /lab-reply `<编号>` 回复Mentor（编号用 get_inbox 返回的 id）。
- 如果没有未读，告诉学员目前没有来自Mentor的新回复。
