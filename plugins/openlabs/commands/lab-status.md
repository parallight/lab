---
name: lab-status
description: 看当前 lab 的进度(v2 lab 出 task 状态表)
---

<!-- AUTO-GENERATED from commands-src/lab-status.md — do not edit. Run `pnpm gen:commands`. -->

调用 `get_lab_status` 工具。v2 lab 会返回一张 task 状态表 + `[NOW DO THIS]`,照做:原样呈现状态表、指出下一个该做的 task,以 `📚 [Lab <id> · X% complete]` 结尾。v1 lab 返回的是一条 SYSTEM 指示,按指示用Mentor口吻总结进度。

如果没有进行中的 lab,引导学员用 /lab 选一个开始。
