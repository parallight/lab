---
name: more-model
description: 列出所有可用模型(Claude / GLM / Kimi / DeepSeek / Qwen / MiniMax)+ 价格,选一个切换
---

<!-- AUTO-GENERATED from commands-src/more-model.md — do not edit. Run `pnpm gen:commands`. -->

1. 调 `list_models` 工具(无需登录,匿名可看)。
2. 把工具返回的模型表格**原样完整展示**给学员(分厂商、带价格和 slug)。
3. 用选项卡(AskUserQuestion):各个 ✅ 可切模型(标签=模型名+价格) / 不切/先看看让学员选,**不要**让他打字输 slug;「🔌 需代理」那层的不可选。
4. 学员选定后,调 `list_models` 并传 `select=<那一行的 slug>` 帮他切换;按工具返回的话告诉他「下次对话即用 / 或现在运行 /model <slug> 立刻切」。
5. 学员只想看看就停在第 2 步,别推着他切。
