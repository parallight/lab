---
name: more-model
description: 列出所有可用模型(Claude / GLM / Kimi / DeepSeek / Qwen / MiniMax)+ 价格,选一个切换
---

<!-- AUTO-GENERATED from commands-src/more-model.md — do not edit. Run `pnpm gen:commands`. -->

1. 调 `list_models` 工具(无需登录,匿名可看)。
2. 把工具返回的模型表格**原样完整展示**给学员(分厂商、带价格和 slug)。
3. 让学员挑一个(用 AskUserQuestion 做选项卡)。**⚠️ AskUserQuestion 选项硬上限 4 个,超了直接报 Invalid tool parameters** —— 所以:✅ 可切模型 ≤3 个就全列为选项 + 第 4 项「不切/先看看」;>3 个就只列最值得的 3 个(当前档 + 一个更强 + 一个更省)+ 第 4 项「其它型号(让他报名字)/不切」。标签=模型名+价格,**不要**让他打字输 slug;表里其它型号他报名字即可、你对照映射成 slug。「🔌 需代理」那层不可选。
4. 学员选定后,调 `list_models` 并传 `select=<那一行的 slug>` 帮他切换;按工具返回的话告诉他**必须重启 claude(退出后重新运行)才生效**。**绝不要**叫他用 `/model <slug>` ——Claude Code 的 `/model` 不认网关自定义 slug,会报 model not found。
5. 学员只想看看就停在第 2 步,别推着他切。
