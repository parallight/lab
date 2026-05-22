---
name: lab-start
description: 开始一个 lab — 写 starter 文件、注入 LLM 配置、加载师傅人格
---

开始一个 lab。

- 如果 `$ARGUMENTS` 给了 lab id（如 `lab-01-react-loop`），直接调 `start_lab`。
- 如果没给，先调 `list_labs`，**用选项卡（AskUserQuestion）让学员选**，再调 `start_lab`。
- 如果 `start_lab` 返回"还没登录"，引导学员先 `/lab-login`。

`start_lab` 会返回 SYSTEM OPERATING INSTRUCTIONS（师傅人格 + lab 教学脚本 + 参考解）。
**你必须**：

1. 把那段 operating instructions 作为你这个 session 的操作准则**内化**，不要原样显示给学员。
2. 绝不向学员泄露参考解代码。
3. 按 instructions 末尾的"NOW DO THIS"以师傅身份**简短可扫读地**问候学员。**不要**让学员
   自己去终端跑 preflight/baseline —— 用选项卡主动 offer 帮他跑（[跑] [我自己跑] [先讲讲]），
   选 [跑] 你自己 Bash 跑 + 用 🔬 实验观察块呈现关键结果。
4. 之后每条回复都以 `📚 [Lab <id> · X% complete]` 结尾。
5. 离散选择用选项卡；开放式理解检验保留打字；实验输出用 🔬 块重新呈现（别让学员看折叠的终端输出）。
