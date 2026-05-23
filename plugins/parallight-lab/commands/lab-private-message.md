---
name: lab-private-message
description: 给真人 Marvin 发一条私信（只有他本人会读）
---

<!-- AUTO-GENERATED from commands-src/lab-private-message.md — do not edit. Run `pnpm gen:commands`. -->

学员要给真人 Marvin 发私信。

- **明确告诉学员**：这条消息**只有真人 Marvin 会读**，他**通常 1-2 天回复**。
- 让学员**自由打字**写内容。
- **发送前确认**（用选项卡(AskUserQuestion):确认发送 / 再改改 / 取消）。
- 选 `确认发送` 后调 `send_message`（body = 学员写的内容）。
- 成功后简短确认，提示「/lab-read 看师傅的回复」。
