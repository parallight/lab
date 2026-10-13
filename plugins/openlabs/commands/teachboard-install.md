---
name: teachboard-install
description: 建「我的环境」:在白板的代码环境上加系统包(apt)和 Python 包(验证通过后绑到代码块或运行时传 recipe 才生效)
---

<!-- AUTO-GENERATED from commands-src/teachboard-install.md — do not edit. Run `pnpm gen:commands`. -->

**语言规则 / Language rule**:Write everything on the board — titles, text, captions, labels, chart names, reply boxes — in the language the user wrote this request in. If the user writes English: call `tb_describe_schema` with `lang:"en"` and set `lang:"en"` in the board spec. Chinese → `lang:"zh"`. Other languages → write content in that language and set `lang` to the closer of en/zh (en for non-CJK). Relay tool messages to the user in their language (translate the Chinese tool texts when the user is not Chinese).
板上的一切(标题、文字、图注、标签、图表名、回复框)一律用用户提出这个请求时所用的语言写。用户用英文 → 调 `tb_describe_schema` 时传 `lang:"en"`,板 spec 里设 `lang:"en"`;中文 → `lang:"zh"`;其它语言 → 内容用该语言写,`lang` 取最接近的 en/zh(非中日韩文字用 en)。把工具消息转给用户时用用户的语言(用户不是中文时,翻译中文的工具文本)。

参数 = `$ARGUMENTS`。拆成:要装的包(一个或多个 PyPI 包名,可带版本约束,如 `einops` `triton==3.1.0`)+ 可选的 `--env <环境id>`。没给任何包名 → 先问学员要装什么,不要猜。

**定环境**:
- 给了 `--env` → 就用它。
- 没给 → 从代码块推断:看学员点名的代码块(如「给 E12 装」),或板上的代码块(`tb_get_board` / `tb_list_boards` 找板),取它们绑定的环境;板上代码块用的环境只有一个就用它。
- 推断不出、或用到了不止一个环境 → 列出用到的环境(必要时配合 `tb_list_envs`),问学员选一个,选定后再继续。
- 学员没点名代码块 → 问清楚要绑到哪个块(或对板上每个用这个环境的代码块都绑一遍)。

**出方案**:调 `tb_env_customize`,`env` = 上面定下的环境,`apt` = 系统包、`add` = Python 包(至少一个);学员点名了某个代码块(如「给 E12 装」)就把 `entity` 设为 `tb:<板 id>/E12`。它**不会自己建**,只返回一条确认链接 —— 把方案(底座、包、预计十几秒到几分钟)和链接给学员,请学员打开链接核对后点「建这个环境」(验证会用学员的环境额度)。

**学员说点好了**:用 `tb_env_recipes` 查状态:
- 就绪 → 告诉学员环境可用。**只有绑到代码块、或运行时显式传 recipe 才会生效**:用 `tb_bind_recipe` 绑到学员要用的代码块(用户打开板后生效),现在要立刻跑就在 `tb_run` 传 recipe=<id>。学员想让这块板之后新建的代码块都用它 → `tb_bind_recipe boardId=<板 id> recipe=<id>`(设为板默认;已有的块不变)。学员也可以自己在「环境」面板的「我的 Customized」里点「设为本板默认」。
- 失败 → 把失败原因(verifyLog 末尾)讲给学员,改包名 / 版本后再出一条新链接(最多 3 轮)。
- 还在验证 → 说明还没好,稍后再查。

**边界**:系统包写进 `apt`(Debian 包名,不带版本);内核 / 显卡驱动 / CUDA / systemd / docker 这类装不了 —— 工具拒绝时把它给的说明**原样**告诉学员(要的话发邮件联系我们),不要换别的办法绕过去;「还没连上」→ 先 /openlabs connect;402 → 原话转达。
