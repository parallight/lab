---
name: hotspot
description: 尝鲜台热点 — 列出可动手试的 AI 热点卡,选一张在本机跑
---

<!-- AUTO-GENERATED from commands-src/hotspot.md — do not edit. Run `pnpm gen:commands`. -->

1. 调 `list_hotspots` 工具(无需登录,匿名可看)。
2. 把表格原样展示后,用选项卡(AskUserQuestion)让学员选要试哪个热点(外加「先看看」),不要让他打字输 slug。
3. 学员选定后调 `try_hotspot`。按工具返回的指引:逐步执行 fresh/<slug>.md 里的步骤,每一步先用一句话讲清要做什么、学员确认后再执行,绝不无人值守批量跑完。
4. 全部步骤跑完后按 expect 验收并告知通过与否;通过则调 `complete_hotspot` 同步「我的实验台」。未登录就提一句 /lab-login 之后可以同步进度,不强推。
5. 学员只想看看就别推着他试。
