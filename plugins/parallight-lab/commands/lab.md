---
name: lab
description: Parallight Lab 主入口 — 显示可用 lab 列表 + 当前进度 + 未读通知
---

调用 `list_labs` 工具显示学员可用的 lab。

- 如果工具返回"还没登录"，引导学员用 `/lab-login` 登录，不要继续。
- 如果有进行中的 lab，先显示当前进度。
- 列出可用 lab 后，**用选项卡（AskUserQuestion）让学员选要开始/继续哪个 lab**，
  不要让他打字输 lab id。学员选定后调 `start_lab`。
- 学员只是想看看就别强推，让他选"先看看"之类的选项。
