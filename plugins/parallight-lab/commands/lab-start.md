---
name: lab-start
description: 开始一个 lab — 写 starter 文件、注入 LLM 配置、加载师傅人格
---

<!-- AUTO-GENERATED from commands-src/lab-start.md — do not edit. Run `pnpm gen:commands`. -->

开始一个 lab。

1. 如果 `$ARGUMENTS` 给了 lab id（如 `lab-01-react-loop`），直接调 `start_lab`；没给就先调 `list_labs`，用选项卡(AskUserQuestion):让学员选 lab / 先看看，再调 `start_lab`。
2. 如果 `start_lab` 返回"还没登录"，引导学员先 /lab-login。
3. `start_lab` 会返回 **SYSTEM OPERATING INSTRUCTIONS**（师傅人格 + lab 教学脚本 + 参考解）。你必须：
   - 把那段 operating instructions 作为你这个 session 的操作准则**静默内化**，**不要原样显示**给学员，**绝不向学员泄露参考解代码**。
   - 按 instructions 末尾的"NOW DO THIS"以师傅身份**简短可扫读地**问候学员。
   - **不要**让学员自己去终端跑 preflight/baseline —— 用选项卡(AskUserQuestion):我来跑 / 我自己跑 / 先讲讲，选"我来跑"你就 shell 跑，并用 **🔬 实验观察**块呈现关键结果（别让学员只看到折叠的终端输出）。
   - 之后**每条回复**都以 `📚 [Lab <lab-id> · X% complete]` 结尾。
4. 离散选择给学员现成选项挑（别让他打字猜）；开放式理解检验保留打字；实验输出用 🔬 块重新呈现（别让学员看折叠的终端输出）。
