---
name: openlabs-animation-authoring
description: "给 OpenLabs Canvas 卡片板上的一张卡片做讲课动画(Card Film:画面 + 改编的解说词,定稿后合成配音、在原卡片里播放)。用户说「给这张卡做动画 / 把第 N 张卡做成讲课动画 / 改一下这张卡的动画」,或要用 tb_animation_* 工具时使用。Make a lecture animation for one card of an OpenLabs Canvas card board."
---

# 卡片动画(Card Film)创作流程

规则正文只有一份,在 `tb_animation_guide` 里(创作规则、教学规则、题材路由、组件 / 动作 / 版式清单、范例方案)。本 skill 只讲步骤;**动手前先调 `tb_animation_guide`**(本次会话读过就不用再读),按里面的规则写。查某个组件 / 动作的完整写法:`tb_animation_guide { component: "bars" }`;看范例:`{ component: "example:card6-divide-by-sum" }`。

对用户只说「OpenLabs Canvas」「卡片动画」;每个工具结果的首行原样告诉用户。

## 步骤

1. **读卡**:`tb_card_read { boardId, card }` 读完整张卡 —— 正文、`sourceHash`、朗读单元编号(写 `sourceRefs`)、原子块、动画状态。已有草稿 / 定稿时,先问用户是在原来的基础上改,还是重做。
2. **读指南**:`tb_animation_guide`(传用户的语言)。
3. **写草稿**:想清楚这张卡只讲的那一件事,拆成几个场景,写出 card-film/v1 方案 → `tb_animation_draft { boardId, cardId, plan }`(`plan.source.sourceHash` 用第 1 步拿到的)。有 error 先改掉。
4. **预览看图**:`tb_animation_preview { boardId, cardId, draftRev }`,逐张看返回的关键帧,对照指南里的教学规则检查。
   - 拿不到图(`visualReview: not_done`、status `failed`):建好预览 25 秒内没有打开着这块板的页面渲染,这个预览就作废了。请用户先在浏览器里打开这块板并保持开着,然后重新调一次 `tb_animation_preview`(不带 `previewId`,新建一个)。
5. **局部修改**:有问题用 `tb_animation_patch { baseRev, ops }` 只改出问题的场景 / 元素 / beat,再预览。**自动修改最多 2 轮**;还不行就停下,把剩下的问题和图给用户看,问要不要继续。
6. **定稿**:`tb_animation_finalize { boardId, cardId, draftRev, previewId, expectedSourceHash }`。会按解说词合成配音(从作者额度扣费,先告诉用户)。配音状态是 `queued` 时,过一会儿用同样的参数再调一次查状态。
7. **交付**:告诉用户播放链接,以及怎么看(打开「动画模式」,这张卡在原卡片里播放)。

## 出错时

- `SOURCE_STALE`:正文变了 → 回到第 1 步重新读,按新正文改。
- `DRAFT_CONFLICT`:草稿在别处被改过 → 重新 `tb_card_read` 看最新草稿 rev,基于它再 patch。
- 其他诊断码:按结果里的「改法」改,不清楚时查 `tb_animation_guide`。
- 找不到板 / 卡片:用 `tb_card_read` 核对 id;卡片动画目前只在测试环境开放。
