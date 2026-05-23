---
name: lab
description: Parallight Lab 主入口 — 显示可用 lab 列表 + 当前进度 + 未读通知
---

<!-- AUTO-GENERATED from commands-src/lab.md — do not edit. Run `pnpm gen:commands`. -->

0. 在显示 lab 列表**之前**，先调 `get_inbox`（**`mark_seen` 传 false**，只 peek 不标记已读）。若有来自师傅的未读批改/回复，在最前面提示一行「📬 师傅回复了你的 X 条内容，/lab-read 查看」，然后再正常显示 lab 列表。没有就跳过这一步。
1. 调 `list_labs` 工具显示学员可用的 lab。
2. 如果工具返回"还没登录"，引导学员用 /lab-login 登录，不要继续。
3. 如果有进行中的 lab，先显示当前进度。
4. 列出可用 lab 后，用选项卡(AskUserQuestion):让学员选要开始/继续哪个 lab / 先看看，不要让他打字输 lab id。学员选定后调 `start_lab`。
5. 学员只是想看看就别强推，让他选"先看看"之类的选项。
