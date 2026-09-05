---
name: lab-check
description: 在本机跑当前 lab 某个 task 的自检命令并上报看板(评测型 task 请用 /lab-evaluate)
---

<!-- AUTO-GENERATED from commands-src/lab-check.md — do not edit. Run `pnpm gen:commands`. -->

调用 `lab_check` 工具,参数 `task` = `$ARGUMENTS`(去掉多余空格;学员说「第一个 task」就换成 t1)。

**呈现**:工具返回里有命令原文、通过/未过、输出尾部、「失败看哪里」和一段 `[NOW DO THIS]`——照它做。未过时把输出念给学员、指出该看哪里,**不要替学员改文件**。结尾提醒 /lab-status。

**边界**:工具说「评测型 task」→ 告诉学员用 /lab-evaluate;说「还没登录」→ /lab-login;说「没有进行中的 lab」→ /lab;说「只支持 POSIX shell」→ 原话转达(WSL)。
