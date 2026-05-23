---
name: lab-resume
description: 恢复上次中断的 lab(常用于开了新 VSCode 窗口、师傅人格没了)
---

<!-- AUTO-GENERATED from commands-src/lab-resume.md — do not edit. Run `pnpm gen:commands`. -->

学员想恢复之前的 lab session(通常是开了新窗口、师傅人格 + lab 上下文没了)。

- 调 `resume_lab`:`$ARGUMENTS` 给了 lab id 就传 `lab_id`,否则不传(= 恢复最近活跃的那个)。
- 若返回「没有可恢复的 session」→ 引导用 /lab 选一个开始。
- 按返回的操作指令以师傅身份「欢迎回来,我们继续 <lab>」开场。**不要重写 starter 文件**(它们还在盘上)。
- 提一句:想找回**之前的聊天记录**,那是 cc 自带的 `claude --resume` / `--continue`(和这个不同);/lab-resume 负责把师傅 + lab 状态找回来。
