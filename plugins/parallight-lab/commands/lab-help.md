---
name: lab-help
description: 列出所有 lab 命令
---

<!-- AUTO-GENERATED from commands-src/lab-help.md — do not edit. Run `pnpm gen:commands`. -->

向学员展示下面这份 Parallight Lab 命令清单(原样、简洁):

- /lab-help — 列出所有 lab 命令
- /lab — Parallight Lab 主入口 — 显示可用 lab 列表 + 当前进度 + 未读通知
- /lab-login — 登录 Parallight Lab（邮箱 + 6 位验证码 OTP）
- /lab-start — 开始一个 lab — 写 starter 文件、注入 LLM 配置、加载Mentor人格
- /lab-resume — 恢复上次中断的 lab(常用于开了新 VSCode 窗口、Mentor人格没了)
- /lab-status — Mentor总结当前 lab 的进度
- /lab-analysis — 生成并打开本次 lab 的会话分析报告(把 agent 在做什么拆给你看)
- /lab-compare — 打开本次 lab 的 Compare 面板(同一个任务,横向对比不同模型 / prompt 的跑法)
- /super-loop — 提交一个超长自主任务(目标/指标/时间/资源),云端沙箱长跑
- /more-model — 列出所有可用模型(Claude / GLM / Kimi / DeepSeek / Qwen / MiniMax)+ 价格,选一个切换
- /lab-kb — 显示当前 lab 的知识点清单（只读）
- /lab-review — 提交一次 lab review 给真人 Marvin 批改
- /lab-read — 查看真人 Marvin 的批改和私信回复
- /lab-private-message — 给真人 Marvin 发一条私信（只有他本人会读）
- /lab-pull — 从云端在线 lab 同步到本地(cloud → local)
- /lab-push — 把本地改动同步到云端在线 lab(local → cloud)
- /lab-rollback — 回滚 lab 到之前某个同步前的状态
- /lab-reply — 回复Mentor对某次 review 的批改
- /lab-logout — 退出 Parallight Lab 登录，清除本地凭证
- /lab-exit — 退出当前 lab，清除注入的Mentor人格
- /hotspot — 尝鲜台热点 — 列出可动手试的 AI 热点卡,选一张在本机跑

学员问某条具体怎么用,就简短解释那一条。
