---
name: teachboard
description: 把你想学的主题画成一块 teachboard 白板(逐幕上板,代码块可在云端环境里跑);connect = 连接你的白板账户
---

<!-- AUTO-GENERATED from commands-src/teachboard.md — do not edit. Run `pnpm gen:commands`. -->

参数 = `$ARGUMENTS`(去掉多余空格)。

**语言规则 / Language rule**:Write everything on the board — titles, text, captions, labels, chart names, reply boxes — in the language the user wrote this request in. If the user writes English: call `tb_describe_schema` with `lang:"en"` and set `lang:"en"` in the board spec. Chinese → `lang:"zh"`. Other languages → write content in that language and set `lang` to the closer of en/zh (en for non-CJK). Relay tool messages to the user in their language (translate the Chinese tool texts when the user is not Chinese).
板上的一切(标题、文字、图注、标签、图表名、回复框)一律用用户提出这个请求时所用的语言写。用户用英文 → 调 `tb_describe_schema` 时传 `lang:"en"`,板 spec 里设 `lang:"en"`;中文 → `lang:"zh"`;其它语言 → 内容用该语言写,`lang` 取最接近的 en/zh(非中日韩文字用 en)。把工具消息转给用户时用用户的语言(用户不是中文时,翻译中文的工具文本)。

**参数是 `connect`**(或学员说「连接白板」):调 `tb_connect`,把结果原样告诉学员(含短码与网址)。若结果说「请在浏览器核对短码后点连接」,等学员说点好了再调一次 `tb_connect` 确认已连上。到此为止,不要顺手建板。

**否则(参数是想学的主题 / 参考资料,或为空时先问学员想学什么)**:

0. **先对齐,再上板**(Marvin 1009:没有这一步就没有个性化)。建板前要知道三件事:**目标**(学什么 / 探索什么 / 做什么实验,想做到什么程度)、**背景**(已经会什么、卡在哪)、**参考**(想沿着哪本书 / 哪门课 / 哪篇论文 / 哪份代码走,有没有自己的材料)。
   - 对话里还看不出来的 → 用**一条**消息问,最多 3 个问题,每个给 2–3 个可选项让学员点选,不要连环追问。
   - 对话里已经能判断的 → 不再问,直接写出你的判断(一句话画像)和建议的学习路径(幕的清单,一幕一行),请学员确认或修改。
   - 学员确认(或改完)之后才建板;把核对过的目标 / 背景 / 参考 / 路径写进 spec 的 `brief`。学员说「直接上板 / 别问了」→ 不问,但仍用一行写出你打算走的路径再开始。
1. 本会话还没读过契约时,先调一次 `tb_describe_schema`,按它的元素契约与教法规划整块板(先在心里分好幕:每幕一个要点)。
2. 主题涉及要跑的代码时,调 `tb_list_envs` 选环境;代码块的 `env` / `defaultEnv` 只能用这里列出的 id。环境给的 advice 是给学习者的**建议**,原样转述,是否照做由学员决定;不要替学员写作业代码。
3. 建板:**第一幕永远是「预告」**(`id:"outline"`,标题如「今天的路线」):一句话说清学完能做到什么,再分三组列出「我们会讲」(后面每一幕一行,和真正的幕标题一致)、「动手实验」(跑什么、在哪个环境、看什么现象)、「学完你会」(2–3 条能检验的收获),格式见 `tb_describe_schema` 的示例。整块板(含预告)只有 ≤3 幕时可以一次 `tb_create_board`;否则先 `tb_create_board` 建预告幕,之后**一幕一次** `tb_add_act` 往后加,不要攒成一大坨。
4. **每次**工具返回后,把结果的**第一行**(进度行,例如「✅ 第 3/7 幕… · 打开 <链接>」)原样发给学员,再继续下一幕。
5. 全部上板后:用两三句话总结这块板讲了什么,给出板的链接;若板上有绑了环境的代码块,再加一句「说『跑一下 E12』我就在环境里跑」(E12 换成板上真实的代码块编号)。
6. **改板(学员回来追问 / 让你改)**:学员粘来 `tb:<板>/E<n>` 这样的元素编号时,先 `tb_describe` 读它的全文、所在幕、箭头和邻居,再 `tb_reply` 把回答方框放在它旁边(回答原文在对话里也给一遍);改代码 = `tb_update {boardId, changes:[{entity, code}]}` 然后 `tb_run`,**每条改动只填一个字段**(text / ascii(公式,AsciiMath,优先)/ latex(AsciiMath 写不出来时)/ code / label / tone);结果里的 `conflicts` 是学员自己改过的元素,先 `tb_describe` 看过再决定要不要覆盖;删元素用 `tb_delete`(删之前跟学员确认);调幕序 `tb_set_acts`;代码块没绑环境就 `tb_bind_env` 再跑。这些工具的结果第一行同样原样发给学员。

**边界**:工具说「还没连上 / 未连接」→ 让学员先 /openlabs connect;返回 402(额度 / 预算不够)→ 原话转达,不要重试;其它错误按工具给的下一步走,不要把原始报错甩给学员。
