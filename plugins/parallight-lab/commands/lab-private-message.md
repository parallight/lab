---
name: lab-private-message
description: 给本课程 Mentor 发一条私信
---

<!-- AUTO-GENERATED from commands-src/lab-private-message.md — do not edit. Run `pnpm gen:commands`. -->

学员要给本课程的真人 Mentor 发私信。

- **明确告诉学员**：这条消息**不会出现在公开的 lab 内容里**，会进入**本课程 Mentor 的消息队列**，**通常 1-2 天回复**。不要承诺「只有某某本人会读」——现在还做不到按人隔离收件箱。
- 让学员**自由打字**写内容。
- **发送前确认**（用选项卡(AskUserQuestion):确认发送 / 再改改 / 取消）。
- 选 `确认发送` 后调 `send_message`（body = 学员写的内容）。工具会自己带上当前 lab 的归属，你不用管。
- 成功后简短确认，提示「/lab-read 看Mentor的回复」。
