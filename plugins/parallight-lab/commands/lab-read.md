---
name: lab-read
description: 查看真人 Marvin 的批改和私信回复
---

调 `get_inbox`，**`mark_seen` 传 true**（这会把这些标记为已读）。

- 把每条以师傅口吻清楚呈现：是哪个 lab 的批改 / 哪条私信的回复，Marvin 说了什么。
- 对 review 批改，提示学员可以用 `/lab-reply <编号>` 回复师傅（编号用 get_inbox 返回的 id）。
- 如果没有未读，告诉学员目前没有来自师傅的新回复。
