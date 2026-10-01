# Parallight Lab — Claude Code plugin

## 0.1.27-phase1：Enterprise AI / project-1-2 项目助教

现在可以查询公开业务资料、接口契约和本人最近三次评测摘要。查询不会启动评测或额外调用平台模型；答案解释使用当前 coding agent 的模型配额。不提供教师答案或隐藏测试。

已有用户先更新插件，然后完全重启会话：

```bash
claude plugin marketplace update parallight-cc
claude plugin update parallight-lab@parallight-cc
```

1. 安装 Node.js 22+。
2. 登录 Agentist，在「我的学习 → 实验管理 → 权限中心」下载个人 Enterprise-AI.json，保存在仓库外。不要把内容发给 AI 或提交 Git。
3. 从设置了配置路径的终端启动 Claude Code；已经运行的应用不会自动继承新变量。

macOS / Linux：

```bash
export HYPER_LAB_CONFIG="/绝对路径/Enterprise-AI.json"
claude
```

Windows PowerShell：

```powershell
$env:HYPER_LAB_CONFIG = "C:\Users\YourName\Enterprise-AI.json"
claude
```

桌面版请在 MCP 启动环境中设置同名变量（只填文件路径，不填密钥），保存后重启应用。

在项目目录中提问：

```text
/lab-assistant 这是 enterprise-ai / retail_plus 项目。user_id 和 customer_id 有什么区别？请引用当前接口契约。
/lab-assistant 这是 project-1-2。请解释我最近一次评测的未通过项；没有公开证据时不要猜隐藏测试的期望 JSON。
```

若自动识别失败，请让 agent 调用 lab_assistant，并明确传入 project=enterprise-ai（加 domain=retail_plus 或 airline_plus），或 project=project-1-2。可传入本人的 job_id 定位一轮评测。

401：重新生成权限配置；403：核对课程权限；404：核对本人评测编号与项目；503：服务暂不可用，稍后重试。资料版本不一定与历史评测版本相同，请以返回来源和版本为准。旧格式只有 url 的配置需重新下载。

本版本由源码 ba4d0c78017c99b7882ec197952fd2095e5e441e 组装，插件发行版本为 0.1.27-phase1；核心协议版本仍为 0.1.26-phase1。学生包默认使用正式服务，不包含教师凭证或本机 preview 启动器。

Learn to build AI agents by **directing** them, guided by a resident master
craftsman (Marvin) — inside Claude Code. Zero API keys (the LLM runs through
Parallight's backend).

## Install (Claude Code)

```
/plugin marketplace add parallight/lab
/plugin install parallight-lab@parallight-cc
```

Then fully restart Claude Code and run `/lab-login`. More: <https://parallight.ai>

---

This repo is the public Claude Code marketplace. The MCP server
(`plugins/parallight-lab/bundle/`) talks to the Parallight backend; it holds no
secrets.
