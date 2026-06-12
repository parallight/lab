---
name: lab-rollback
description: 回滚 lab 到之前某个同步前的状态
---

<!-- AUTO-GENERATED from commands-src/lab-rollback.md — do not edit. Run `pnpm gen:commands`. -->

学员想把本地当前 lab 目录回到某个之前的版本(通常是某次同步前自动打的备份标签,或某个提交)。

- 先调 `lab_rollback`(**不传 ref**)→ 它会列出可选的备份点(lab-backup 标签)+ 最近的提交。把这份清单清楚地展示给学员(说明大致是「什么时候、做了什么之前」的快照),让他挑一个要回到的版本。
- 学员选定后,再调 `lab_rollback`(`ref` = 他选中的那个标签或提交)完成回滚。
- 安抚一句:回滚**绝不丢东西**——回滚前会先把当前状态也存成一个标签,所以这步本身也是可撤销的,挑错了还能再回来。
- 如果返回「还没有可回滚的版本」→ 告诉学员同步过至少一次后才会有备份点(先 /lab-pull 或 /lab-push)。没有进行中的 lab 就提示先 /lab-start 或 /lab-resume。
