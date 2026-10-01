# Parallight Lab - Claude Code plugin

## 0.1.29-phase1：新增 agentist 助教入口

在聊天框输入 `/agentist 你的问题` 即可使用 Agentist 助教。原 `/lab-assistant` 保留；两个命令复用同一个工具、登录态与权限校验，不需要 JSON 配置。

Enterprise AI / project-1-2 助教自动复用插件的 lab-login 登录态。无需下载 Enterprise-AI.json，无需设置 HYPER_LAB_CONFIG。服务端根据登录凭证核验账号、课程权限和本人评测记录归属；客户端不会自行决定权限。

## 已安装用户：在系统终端更新

```bash
claude plugin marketplace update parallight-cc
claude plugin update parallight-lab@parallight-cc
```

完全退出并重新启动应用或 CLI 会话。确认插件发行版本为 0.1.29-phase1。运行环境需 Node.js 22+。macOS / Linux / Windows PowerShell 的更新命令相同。

## 首次安装

```text
/plugin marketplace add parallight/lab
/plugin install parallight-lab@parallight-cc
```

以上首次安装命令在 Claude Code 聊天框输入。安装后重启。

## 登录与提问

已经通过插件登录的同学无需重复登录。未登录或收到 401 时，在聊天框输入：

```text
/lab-login
```

这是课程插件登录，不是仅登录 Claude/OpenAI 账号，也不是仅在浏览器登录 Agentist。按插件提示完成验证；不要把本地凭证文件内容发给 AI。

在项目目录里提问：

```text
/agentist 这是 project-1-2 项目。请解释 Case 06 的权限检查依据，并引用公开资料。
/agentist 这是 enterprise-ai / retail_plus 项目。user_id 和 customer_id 有什么区别？请引用当前契约。
```

若未自动识别，请让 agent 调用 lab_assistant，明确 project=project-1-2，或 project=enterprise-ai 加 domain=retail_plus / airline_plus。可带本人 job_id 查询一轮评测。

401：重新执行插件 lab-login；403：检查课程资格；404：检查本人评测编号与项目；503：稍后重试。不能通过另配 token 或 JSON 绕过权限。

## 边界与兼容

- 返回公开资料来源、内容版本和本人最近三次评测摘要，不提供隐藏用例、教师答案或其他人的记录。
- 不自动提交评测、不唤醒评测主机。解释答案使用当前 coding agent 的模型配额，平台不额外调用模型。
- MCP 助教忽略 HYPER_LAB_CONFIG / HYPER_LAB_TOKEN / HYPER_LAB_TOKEN_FILE / HYPER_LAB_URL，避免旧评测配置影响登录身份或请求目标。
- **npm run evaluate 是独立入口，其配置方式未改变。不要删除仍用于独立评测的 JSON 或环境变量。**
- 资料版本不一定等于历史评测版本；没有证据时应明确说明，不能猜隐藏预期 JSON。

本发行版基于源提交 9fafca9；插件发行版本 0.1.29-phase1，内部核心协议版本保持 0.1.26-phase1。无需为此重新部署网站。
