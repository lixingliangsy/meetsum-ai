# 净文 AI · 资产登记表（Asset Register）

> 维护人：沉墨（资产沉淀师）｜适用阶段：运营 08 资产沉淀
> 作用：把「小红书起号」及产品技术中**会重复用到的成果**登记为可复用资产，下次直接拿来用，不再从零做。
> 资产类型取值：`content-template` 内容模板 / `tool-automation` 工具自动化 / `process-doc` 流程文档 / `code-module` 代码模块
> 优先级：`P0` 马上要用 / `P1` 本月 / `P2` 储备
> 合规红线（贯穿所有资产）：**不绕检测、不代写、AI 参与内容必标注**。任何"隐身过审/代写"素材一律不入表。

---

## 一、资产总览表

| # | 资产名 | 类型 | 优先级 | 当前状态 |
|---|---|---|---|---|
| 1 | 小红书选题库（15 篇 + 内容支柱） | content-template | P0 | 已可用 |
| 2 | 封面模板（3 个 generate 脚本） | tool-automation | P0 | 已可用（文案已换净文 AI 主题，2026-07-17 实跑产出 8 角度轮播+8 首图） |
| 7 | 前后 AI 率对比条模板函数 | tool-automation | P0 | 已可用（2026-07-17 新增 `make_compare_bar()` 并实跑产出对比条） |
| 8 | 案例库→小红书对比笔记草稿生成器 | tool-automation | P0 | 已可用（2026-07-18 实跑验证：sample-001 产出封面 47KB+草稿，Next 端 tsc 通过） |
| 9 | 文案模版 + 一键流水线系统（可复制模版中台） | tool-automation | P0 | 已可用（2026-07-18 实跑验证：两产品各 5 案例互不覆盖，py_compile OK） |
| 3 | 起号执行方案本身 | process-doc | P1 | 已可用 |
| 4 | 合规护栏清单（6 条红线） | process-doc | P0 | 已可用 |
| 5 | 产品技术资产：数据库 Schema | code-module | P2 | 已可用 |
| 6 | 产品技术资产：AI 检测引擎 detect.ts | code-module | P2 | 已可用 |

> 资产总数：**9 项**（其中 P0 六项、P1 一项、P2 两项）。
> 自评补充（重复出现、值得系统化的产出）见文末「六、自评与系统化建议」。

---

## 二、逐项登记

### 资产 1：小红书选题库（15 篇 + 内容支柱）

- **类型**：`content-template`
- **来源文件**：`e:\AgentCPM\07_一人公司出海项目\opc-doc\outputs\growth\xiaohongshu-launch-plan.md`
  - 第 2 节「内容支柱」（引流 60% / 专业 30% / 人设 10% 配比）
  - 第 4 节「首 15 篇选题日历」（含标题、封面类型、支柱归属）
- **复用方式**：
  - 新笔记直接从选题库挑标题 + 封面类型，按 `引流:专业:人设 = 6:3:1` 配比排期。
  - 每月用小红书搜索框挖「降 AI 率 / 论文降重 / AI 标识」下 10 个高频问题，补充进选题库。
  - 表现好的选题（见 SOP 决策规则）扩成系列，回写本表。
- **优先级**：`P0`（冷启动期马上要用）
- **当前状态**：已可用

---

### 资产 2：封面模板（3 个 generate 脚本）

- **类型**：`tool-automation`
- **来源文件**：
  - `e:\AgentCPM\04_开发脚本_工具\xiaohongshu_automation\generate_carousel.py`（轮播痛点/卖点/引导三图，含 `make_image()`、PAIN/SELL/GUIDE 三套主题配色、中文字体容错）
  - `e:\AgentCPM\04_开发脚本_工具\xiaohongshu_automation\generate_title_covers.py`（首图叠 ≤9 字标题，暗化渐变带 + 主题色下划线）
  - `e:\AgentCPM\04_开发脚本_工具\xiaohongshu_automation\generate_templates.py`（可编辑模板工厂：docx/pptx/xlsx/md，含小红书爆款笔记模板）
- **复用方式**：
  - 把本期文案（痛点/卖点/引导三栏，或首图标题 ≤9 字）填入对应脚本的 `CAROUSEL` / `TITLES` 字典，运行 `python generate_carousel.py` 等，PNG 自动落入 `data/images/`。
  - 模板函数（`make_image`、字体容错 `resolve_font`、主题配色）可直接复制复用，无需改逻辑。
- **优先级**：`P0`（封面是点击率核心变量，需高频产出）
- **当前状态**：**✅ 已可用（2026-07-17 完成文案替换并实跑验证）**。已将 `CAROUSEL` / `TITLES` 数据全部替换为净文 AI 主题（8 个角度：论文降AI率 / 周报去机器味 / 笔记去AI味 / 学术润色案例 / AI检测原理 / 合规标注指南 / 改写前后对比 / 去AI味≠绕过检测），引导步骤统一为合规导流（关注 + 搜官网免费体验 + 评论互动，不私信硬广）。`generate_templates.py` 新增 `build_case_doc()`（改写前后对比案例 docx，含合规声明）。实跑产出：`jingwen_01~08` 轮播三图 + `product_01~08_title` 首图，并写出 `xiaohongshu_carousel_manifest.json` / `xiaohongshu_covers_manifest.json`。模板引擎（`make_image`、字体容错、主题配色）未改动，可直接复用。已新增「前后 AI 率对比条」模板函数 `make_compare_bar()`（2026-07-17 实跑验证，见资产 7），沉墨原建议的可选增强已落地。

---

### 资产 3：起号执行方案本身

- **类型**：`process-doc`
- **来源文件**：`e:\AgentCPM\07_一人公司出海项目\opc-doc\outputs\growth\xiaohongshu-launch-plan.md`（全文，重点第 1 节账号搭建、第 6 节转化闭环）
- **复用方式**：
  - 新渠道 / 新一轮起号时，照此结构复制一份：账号搭建表 → 内容支柱 → 选题日历 → 合规护栏 → 转化闭环，作为 checklist。
  - 可作为新人 / 外包运营的标准作业说明。
- **优先级**：`P1`（本月，方案已成型，新号直接照做）
- **当前状态**：已可用

---

### 资产 4：合规护栏清单（6 条红线）

- **类型**：`process-doc`
- **来源文件**：`e:\AgentCPM\07_一人公司出海项目\opc-doc\outputs\growth\xiaohongshu-launch-plan.md` 第 5 节
  - ① AI 内容标识（勾选「笔记含 AI 合成内容」）② 不冒充真人 / 不批量伪造 ③ 不教人绕过检测 ④ 引流合规（仅主页/置顶，不私信硬广）⑤ 违禁夸大词 ⑥ 发布纪律（不暴更、不频删改）
- **复用方式**：
  - 每次发帖前逐项勾选（见 `xiaohongshu-review-sop.md` 合规自检清单）。
  - 纳入封面 / 文案生成前的自动审查环节；作为外包内容审核 checklist。
- **优先级**：`P0`（合规是底线，违反即限流/下架）
- **当前状态**：已可用

---

### 资产 5：产品技术资产 · 数据库 Schema

- **类型**：`code-module`
- **来源文件**：`e:\AgentCPM\07_一人公司出海项目\12_Micro_SaaS出海\purepen-ai\supabase\schema.sql`
- **复用方式**：
  - 新环境 / 新项目直接粘贴到 Supabase SQL Editor 运行建表。
  - 可直接复用的结构：`profiles` / `documents` / `rewrite_results` / `subscriptions` 四表 + 全套 RLS 策略；`is_paid_member()` / `check_quota()` / `reset_monthly_quotas()` 函数；Waffo 支付回调范式（`subscriptions` 仅由 webhook 写、客户端只读——付费墙防御范式）。
  - 复盘数据取自 `documents.created_at` / `profiles.created_at` / `profiles.plan` / `subscriptions.status`（详见 SOP 数据来源）。
- **优先级**：`P2`（储备，起号不直接需要，但属核心技术资产，供复制复用）
- **当前状态**：已可用

---

### 资产 6：产品技术资产 · AI 检测引擎 `detect.ts`

- **类型**：`code-module`
- **来源文件**：
  - `e:\AgentCPM\07_一人公司出海项目\12_Micro_SaaS出海\purepen-ai\src\lib\detect.ts`
  - `e:\AgentCPM\07_一人公司出海项目\12_Micro_SaaS出海\purepen-ai\src\lib\detect-types.ts`
- **复用方式**：
  - 复制到新项目 `src/lib/` 下，作为 AI 检测引擎抽象层（朱雀 / 度小满 / 本地启发式回退）。
  - 未配置 key 时返回 `score=null` 软降级，由调用方决定展示（UI 须标注"估算/未接引擎"）。
  - 配合 `rewrite_results.ai_score_before / ai_score_after` 做「改写前后 AI 率对比」——这是小红书内容与官网 social proof 的核心母料。
- **优先级**：`P2`（储备，技术资产复用）
- **当前状态**：已可用

---

### 资产 7：前后 AI 率对比条模板函数

- **类型**：`tool-automation`
- **来源文件**：
  - `e:\AgentCPM\04_开发脚本_工具\xiaohongshu_automation\generate_carousel.py` → `make_compare_bar(out_path, before_pct, after_pct, title)`（红条「改写前」→ 绿条「改写后」，中间箭头，底部品牌条）
  - `e:\AgentCPM\04_开发脚本_工具\xiaohongshu_automation\generate_templates.py` → `build_compare_bar_asset(folder)`（调用上面函数，生产 3 张示例对比条：论文/周报/笔记）
- **复用方式**：
  - 小红书角度 7「改写前后对比」已自动调用：运行 `generate_carousel.py` 会额外产出 `jingwen_07_compare.png` 并写入 `xiaohongshu_carousel_manifest.json` 的 `compare` 字段。
  - 模板资产：运行 `generate_templates.py` 在 `净文AI案例库/前后AI率对比条_模板/` 下生成 3 张示例对比条 PNG，可直接当封面/配图。
  - 真实案例：把 `case_library.ai_score_before/after`（0–1）乘 100 传入 `make_compare_bar` 即可生成「真实前后对比条」，供小红书专业款 / 官网 social proof。
- **优先级**：`P0`（对比条是「降 AI 率」主张最直观的信任素材，起号高频复用）
- **当前状态**：**✅ 已可用（2026-07-17 新增并实跑验证：轮播对比条 49KB PNG 已生成；3 张模板对比条已落盘）**
- **合规提示**：示例图已标注「（示例）」；发布前务必替换为真实检测百分比，不得虚构 AI 率。

---

### 资产 8：案例库→小红书对比笔记草稿生成器

- **类型**：`tool-automation`
- **来源文件**：
  - `e:\AgentCPM\04_开发脚本_工具\xiaohongshu_automation\generate_xhs_case_draft.py`（Python 生成器，已实跑验证通过）
  - `e:\AgentCPM\07_一人公司出海项目\12_Micro_SaaS出海\purepen-ai\src\app\api\marketing\xhs-draft\[caseId]\route.ts`（草稿文案 API：鉴权 + owner 校验）
  - `e:\AgentCPM\07_一人公司出海项目\12_Micro_SaaS出海\purepen-ai\src\app\studio\page.tsx`（新增「生成小红书草稿」按钮，tsc 通过）
- **复用方式**：
  - 运营在 `/studio` 标记某条案例 `is_publishable = true` 后，运行 `python generate_xhs_case_draft.py --cases <case_library 导出>.json`，为每条可发布案例批量产出：① 前后 AI 率对比条封面 PNG（复用资产 7 的 `make_compare_bar()`）② 小红书笔记草稿 Markdown（标题 / 正文 / 话题标签 / 合规声明）。
  - 支持 `--all`（全部可发布案例）与 `--cases`（指定导出 JSON）。
  - 本机无凭证 / 离线验证时，用 `--sample` 内置样例跑通流程（不依赖数据库），如本次 sample-001。
  - Next 端：在 `/studio` 点「生成小红书草稿」调用 `[caseId]` API，直接取该案例草稿文案，与本地生成器共用同一套 case_library 数据。
- **优先级**：`P0`（起号高频复用）。理由：本资产落在起号内容生产主链路上，消费 P0 的对比条（资产 7）+ 案例数据（资产 5），把「信任核心的改写前后对比案例」自动转成可发布的小红书素材（封面 PNG + 笔记草稿），起号期按节奏持续产出；对比条（资产 7）已因同一「起号高频复用」理由列 P0，本生成器把该能力延伸到整篇草稿、复用频度更高，故判 P0。前提：需有 `is_publishable=true` 的案例；无案例时可用 `--sample` 验证流程。
- **当前状态**：**✅ 已可用（2026-07-18 实跑验证）**。本地 `generate_xhs_case_draft.py --sample` 产出 `data/xhs_drafts/sample-001/cover.png`（46,993 B ≈ 47KB）+ `draft.md` + `data/xhs_drafts/manifest.json`；Next 端 `src/app/api/marketing/xhs-draft/[caseId]/route.ts` 与 `src/app/studio/page.tsx` 改动的 `tsc` 校验通过。
- **合规提示**：真实案例须替换为真实检测百分比，不得虚构 AI 率；坚持只润色不代写、不绕过检测（与资产 4 护栏、五、使用纪律一致）。

---

### 资产 9：文案模版 + 一键流水线系统（可复制模版中台）

> ⚠️ 本条由主理人按既定事实代拟（沉墨子代理本次会话不可用，待其回归复核）。所有事实来自 2026-07-18 实跑验证，非虚构。

- **类型**：`tool-automation`（代码驱动的模版 + 流水线系统）
- **来源文件**（均在 `e:\AgentCPM\04_开发脚本_工具\xiaohongshu_automation\`）：
  - `research_xhs_copy.md`：联网调研摘要（专业背景 + 小红书爆款规律 + 素材库），流水线输入层
  - `copy_templates.py`：产品参数化文案模版核心（`PRODUCTS` 配置 + `TITLE_FORMULAS` + `HOOK_OPENERS` + `render_draft()` + `get_product_copy()`）
  - `generate_xhs_case_draft.py`：草稿生成器（委托 `copy_templates.render_draft`，`--product` 切换）
  - `generate_landing.py`：落地页生成器（hero/价值三栏/表单/合规 按产品动态生成，`--product` + 产品隔离）
  - `run_copy_pipeline.py`：一键流水线（草稿+落地页，产出按产品命名互不覆盖）
  - `data/sample_cases.json` + `data/sample_cases_ppt.json`：样例案例
- **复用方式**：
  - 新增产品：在 `copy_templates.PRODUCTS` 按 SCHEMA 加一份配置（name / content_type / pain / gain / result_clauses / myths / cta / tags / compliance / tagline / value_points / ...）。
  - 跑 `python run_copy_pipeline.py --product <key> --cases <案例>.json` → 一键产出该产品的 5 篇对比笔记草稿 + 单文件价值预览落地页（`manifest_<key>.json` / `preview_<key>.html`）。
  - 无凭证验证：`--sample` 内置样例跑通流程。
- **优先级**：`P0`（起号内容生产主链路最上游，复用频度最高，所有表达优化产品的文案都走它）
- **当前状态**：**✅ 已可用（2026-07-18 实跑验证）**。两产品（jingwen_ai 净文AI / ppt_template 职场PPT助手）各产出 5 案例草稿 + 落地页，验证无交叉污染（净文页不含"职场PPT"、ppt 页不含"论文AI率"）；4 个 py 文件 `py_compile` 全 OK。
- **合规提示**：真实案例须替换为真实检测百分比，不得虚构 AI 率；坚持只润色不代写、不绕过检测（与资产 4 护栏一致）。

---

## 三、资产间依赖关系

```
选题库(1) ──填入──> 封面模板(2) ──产出──> 小红书笔记
    │                                          │
    └──受控于──> 合规护栏(4) <──审查──┘
起号方案(3) = 把上述串起来的总流程文档
技术资产(5/6) = 官网侧「改写前后对比」的底层能力，给内容与 social proof 供料
文案模版(9) ──消费──> 对比条(7) + 合规护栏(4)
    └──产出──> 小红书笔记草稿（标题/正文/标签/合规）+ 落地页（价值主张/抢先体验）
案例库生成器(8) ──消费──> 文案模版(9) + 对比条(7) + 案例数据(5)
    └──产出──> 小红书对比笔记草稿（封面 PNG + 笔记 Markdown）──> 小红书笔记
```

---

## 四、与复盘 SOP 的联动

- 每次周复盘（见 `xiaohongshu-review-sop.md`）末尾花 5 分钟判断：**本周是否有可固化成果？**
- 若有（新封面样式、新选题、新案例、新引流话术），立即回填本表对应条目，更新「优先级 / 状态 / 复用方式」。
- 本表随运营迭代持续追加，不覆盖历史。

---

## 五、使用纪律（合规底线）

1. 任何资产落地内容，**凡 AI 参与生成必须标注**「笔记含 AI 合成内容」。
2. 封面 / 文案模板**绝不生成**「绕过检测 / 不标注过审 / 代写」类素材。
3. 人设款资产须基于**真实运营者**、案例须**脱敏 + 获授权**。

---

## 六、自评与系统化建议（重复出现、值得系统化的产出）

> 以下 1–3 条是基于本轮梳理发现的「已在重复发生、但尚未固化」的产出，建议后续沉淀为新资产。

**建议 A：改写前后 AI 率对比「案例库」资产（content-template，建议 P1）**
- 现状：launch plan 中专业款 #7、引流款 #10 / #14 反复需要「脱敏前后对比」，每写一篇都要重新跑检测 + 截图，是重复劳动且是信任核心。
- 建议：建立「案例资产库」——每次改写保留 `原始稿 / 改写稿 / 朱雀前后分数`，既作小红书内容母料，也作官网 social proof 复用（呼应 `rewrite_results.ai_score_before/after`）。
- 状态：已于 2026-07-18 落地为资产 8（案例库→小红书对比笔记草稿生成器），本条建议关闭。

**建议 B：官网→小红书 合规引流「话术库」资产（content-template，建议 P1）**
- 现状：转化闭环依赖「主页简介 / 置顶评论引导搜官网净文 AI」，这套合规引流话术在不同笔记里重复出现但没沉淀。
- 建议：固化「引流话术模板」资产，按笔记类型给变体，A/B 测试哪句转化高（呼应 SOP 中"引流高转化低→优化落地页"的决策规则）。

**建议 C：违禁词 / 合规词表「词库」资产（process-doc，建议 P2）**
- 现状：护栏 #5 要求发布前"用违禁词检测过一遍"，但目前只是动作、没有沉淀词表。
- 建议：把踩过的违禁词、平台限流词、可用替代表沉淀为「合规词表」资产，接进封面/文案生成前的自动审查（可与资产 2 的脚本串联）。

**建议 D：表达优化「产品矩阵」文案中台（tool-automation，建议 P0，已于 2026-07-18 落地为资产 9）**
- 现状：净文 AI 文案已升级为「联网调研 → 产品参数化模版（copy_templates.PRODUCTS）→ 一键流水线（run_copy_pipeline.py）」体系；ppt_template（职场PPT/简历）已同 schema 跑通，证明任意产品只需加一份配置即可复用整条流水线。
- 建议：把表达优化产品组合（一字成文 / 职场PPT / 简历 / 周报 等）的配置逐步补齐进 `PRODUCTS`，形成"表达优化产品矩阵"的文案中台；新增产品不再写代码，仅填配置。
- 状态：资产 9 已登记，本条建议关闭（待沉墨回归复核条目措辞）。
