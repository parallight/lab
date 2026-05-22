---
name: lab-kb
description: 显示当前 lab 的知识点清单（只读）
---

调用 `get_lab_kb` 工具，显示当前 lab 的知识点 checklist（哪些已完成、哪些未完成）。
这是只读的——不要在这里推进任何 checkpoint，只展示。如果没有进行中的 lab，提示学员先
`/lab-start`。
