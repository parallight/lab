---
name: lab-push
description: 把本地改动同步到云端在线 lab(local → cloud)
---

<!-- AUTO-GENERATED from commands-src/lab-push.md — do not edit. Run `pnpm gen:commands`. -->

学员想把本地当前 lab 目录的改动推到云端在线 lab(沙箱 `~/parallight`)。

- 调 `lab_push`(无参数)。它会**自动先提交未保存的改动、再先拉取合并云端**(合并只在本地发生),最后把云端缺的提交推上去。
- 如果在「先拉取合并」这一步**撞上冲突**,工作区会留下冲突标记 → 按学员意愿把冲突文件改好、提交,然后**重跑** /lab-push。
- 成功后一句话汇报,例如「已推送,云端已更新」。
- 失败时把返回的友好提示原样转达,常见几类:没有要推送的东西(本地没有云端缺的提交)/ 云端又动了,请重跑 /lab-push / 还没开过云端 lab(先去网页开一次在线 lab)/ 同步是付费功能。没有进行中的 lab 就提示先 /lab-start 或 /lab-resume。
