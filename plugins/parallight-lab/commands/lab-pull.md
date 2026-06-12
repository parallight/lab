---
name: lab-pull
description: 从云端在线 lab 同步到本地(cloud → local)
---

<!-- AUTO-GENERATED from commands-src/lab-pull.md — do not edit. Run `pnpm gen:commands`. -->

学员想把云端在线 lab(沙箱 `~/parallight`)里的改动同步到本地当前 lab 目录。

- 先调 `lab_pull`(**不传 apply**)。
- 如果返回**干净结果**(已自动合并 / 已是最新)→ 一句话汇报即可,例如「拉取了 N 个云端提交,自动合并了 M 个文件」,不用展开。
- 如果返回 **needsConfirm**(带一份计划:内容冲突 和/或 云端删除)→ 不要直接照搬列表,**用人话**逐条讲给学员:
  - 内容冲突:云端在这个文件改了什么、你本地改了什么、为什么撞上了。
  - 云端删除:云端把哪个文件删了,而你本地可能还在用它——**删除一定要单独、明确地问学员确认**,绝不默认替他删。
  - 学员都确认要应用后,再调 `lab_pull`(`apply: true`)完成合并。
- apply 后若工作区里出现 `<<<<<<<` 冲突标记,按学员的意愿把这些文件改好,再提交(commit)。
- 收尾提一句:合并前已自动打了备份标签,反悔随时可以 /lab-rollback。
- 报错时把返回的友好提示原样转达(还没开过云端 lab / 同步是付费功能 / 另一个同步正在进行,稍等再试)。没有进行中的 lab 就提示先 /lab-start 或 /lab-resume。
