---
name: lab-analysis
description: 生成并打开本次 lab 的会话分析报告(把 agent 在做什么拆给你看)
---

<!-- AUTO-GENERATED from commands-src/lab-analysis.md — do not edit. Run `pnpm gen:commands`. -->

调用 `open_lab_analysis` 工具(可选传 lab_id;不传则用当前/最近的 lab)。它会生成一份本地 HTML 报告并尝试在浏览器打开,然后把 `file://` 路径 + 头条数字返回给你 —— **原样转述给学员,不要二次总结或改写里面的数字**,告诉他报告已在浏览器打开(没弹出就点那个链接)。

如果工具回复提示「需要先同意」,就向学员说明:报告会用到他的 lab 会话数据(也供 Mentor 教学支持,原文最多留 30 天),问一句 用选项卡(AskUserQuestion):可以 / 先不要。学员选「可以」→ 调用 `grant_analysis_consent` 工具,然后再调一次 `open_lab_analysis`。

如果没有进行中的 lab,引导学员用 /lab 选一个开始。
