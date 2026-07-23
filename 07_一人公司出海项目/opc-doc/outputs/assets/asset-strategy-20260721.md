# 资产策略主文档 · 阶段 08 资产沉淀（Asset Compounding）

> 资产沉淀师：沉墨（opc-asset-strategist）｜日期：2026-07-21
> 项目：`opc-xhs-virtual-goods` → 已 pivot 至 **PurePen AI（净文 AI）** 中文语境降重降AI SaaS
> 视角：本文件**只做「资产优先级判断 + 沉淀规划」**（阶段 08 边界），**不替主理人直接生产资产内容**。具体文案/代码填充由主理人执行或另行授权。
> 配套落盘：`opc-doc/outputs/assets/asset-register-v2.md`（表格化资产登记表）
> 合规红线（贯穿一切资产）：**不绕检测、不代写、AI 参与内容必标注**（D-08 半自动 / D-09 不挂链 / D-11 不代写 / 标识办法）。

---

## 0. 本步目标与触发背景

### 0.1 为什么现在触发资产沉淀
建盘期 01–07 + 09 已全部完成，product-strategy 已对齐到 PurePen 单一焦点，工程代码（md-splitter 36 测试全绿、PurePen `src/lib` 实跑、Spec Kit 五步落地、agent.md 治理就绪）已就绪。当前**闭环「工程就绪但未上线未起量」**，执行期两个瓶颈是：

- **H4 起量（站外冷启动）**：内容/流量资产可现在就跑、不依赖凭证，是团队唯一可掌控且 7 月窗口不可逆的杠杆（09 复盘结论）。
- **H0 上线（三缺口闸门）**：Supabase 迁移 + 凭证配置 + Vercel 部署，是「可服务可收费」的物理前提。

**资产沉淀的复利逻辑**：把「重复出现、未来还会用」的成果（内容生产引擎、上线部署包、运营 SOP、产品差异化代码、治理规范）固化为模板 / CLI / SDK / SOP / 知识库 / 登记表，使**第 N 次使用的边际成本趋零**——这正是单人公司对抗「每次从零做起」的核心杠杆。

### 0.2 本文件回答 4 个问题
1. 哪些成果值得沉淀为复利资产？（§1 全景清单）
2. 各类资产的复利潜力如何？（§2 评估）
3. 当前先沉淀哪些？（§3 优先级矩阵）
4. 怎么沉淀、对双瓶颈有什么用？（§4 路线图 + §5 执行建议）

---

## 1. 资产全景清单（按 8 大类）

> 资产类别：战略文档 / 产品文档 / 工程代码 / 推广素材 / 自动化脚本 / 合规 SOP / 知识库 / 治理资产。
> 下表为「已识别可沉淀成果」全量，逐项登记见 `asset-register-v2.md`。

### 1.1 战略文档（Strategic）
| 编号 | 资产 | 真实路径 / 来源 | 说明 |
|---|---|---|---|
| S1 | OPC 战略全栈（01–07 / 09 + product-strategy） | `opc-doc/outputs/0*–9*` | 建盘期方法论文档集合，PurePen 视角已增量对齐；是唯一战略真相源 |
| S2 | 项目记忆 / session-summary | `00-orchestrator/session-summary.md` | 会话级摘要，含 D-15 pivot + 增量修订收口 |
| S3 | 资源盘点（PurePen 视角） | `01-resource/resource-inventory.md` | 8 大类资源 + 4 项待核实缺口 |

### 1.2 产品文档（Product）
| 编号 | 资产 | 真实路径 | 说明 |
|---|---|---|---|
| P1 | PRD + 开发任务拆分 | `product-strategy/prd-zh/PRD.md`、`DEV-TASKS.md` | PurePen 单产品功能定义基线 |
| P2 | MVP 方案（H0–H5 验证设计） | `06-mvp/mvp-plan.md` | 上线闸门 + 三项 P1 主验证 + pivot A/B/C |
| P3 | 转化闭环（四路触达） | `07-conversion/conversion-loop.md` | 落地页/affiliate/小红书种草/目录站 → 独立站承接 → 订阅 |
| P4 | 市场调研 + 路线图（pivot 依据） | `product-strategy/market-research-2026-07.md`、`new-product-roadmap.md` | D-15 首选方向② 的决策依据 |
| P5 | 价值主张 / 商模 / 假设 | `03-value/*`、`04-model/*` | UVP、Lean Canvas、H0–H5 风险假设 |

### 1.3 工程代码（Engineering）
| 编号 | 资产 | 真实路径 | 说明 |
|---|---|---|---|
| E1 | **md-splitter 内容分篇引擎** | `agent-orchestration/md-splitter/`（`promo_split.py`、`batch_promo_split.py`、`md_splitter.py`、`title_suggest.py`、`extract_wechat_ready.py` + `tests/`，**36 测试全绿**） | 把长文拆成小红书/公众号合规草稿骨架；令牌已参数化（无硬编码） |
| E2 | **案例库→小红书草稿生成器** | `04_开发脚本_工具/xiaohongshu_automation/generate_xhs_case_draft.py` + PurePen `src/app/api/marketing/xhs-draft/[caseId]/route.ts` + `src/app/studio/page.tsx` | 消费案例数据 + 对比条，批量产出可发布笔记草稿 |
| E3 | **文案中台** | `copy_templates.py` + `run_copy_pipeline.py` + `generate_landing.py` | 产品参数化配置 → 一键产出 5 篇草稿 + 落地页；新增产品仅填配置 |
| E4 | 封面/轮播/对比条生成器 | `generate_carousel.py`、`generate_title_covers.py`、`generate_templates.py`（`make_compare_bar()`） | 高频产出点击率核心变量（封面/对比条） |
| E5 | **PurePen 核心 lib（差异化代码）** | `12_Micro_SaaS出海/purepen-ai/src/lib/`：`risk.ts`(classifyRisk)、`similarity.ts`、`detect.ts`(软降级)、`semantic.ts`(SPS>0.7 保真+术语保护)、`llm.ts`、`case.ts`、`quota.ts`、`waffo.ts`、`supabase/*` | 产品不公平优势的代码化；**已实跑**，待接 dashboard（缺凭证） |
| E6 | Supabase 数据层 | `purepen-ai/supabase/schema.sql` | profiles/documents/rewrite_results/subscriptions + RLS + Auth |
| E7 | **上线闸门包** | `purepen-ai/PRELAUNCH-CHECKLIST.md`、`DEPLOY.md`、`降重降AI功能测试报告_2026-07-18.md` | 凭证采集表 + 部署三步 + 门禁；消除 H0 外部阻塞 |
| E8 | 合规闸门 `compliance_gate.py` | `04_开发脚本_工具/xiaohongshu_automation/compliance_gate.py` | 极限词/二维码/网盘/创作证明/资质闸门，已实测 |
| E9 | IMA 知识库适配器 `ima_kb.py` | `04_开发脚本_工具/xiaohongshu_automation/ima_kb.py` | RAG 中枢适配器（仅知识归集，不含发布）；待凭证接入 |
| E10 | Spec Kit 五步工作区 | `spec-kit-workspace/`（`constitution.md` + `spec-kit-one-person-company-workflow.md` + `.github/prompts/` + `specs/promo-split-config/`） | 规格驱动开发（SDD）范式，可复用于任何新功能 |
| E11 | **agent.md（项目治理权威）** | `agent.md`（项目根） | 全 coding agent 行为规范 + 五步流程 + 历史决策；思维版本控制 |

### 1.4 推广素材（Promo）
| 编号 | 资产 | 真实路径 | 说明 |
|---|---|---|---|
| M1 | 小红书选题库（15 篇 + 内容支柱） | `growth/xiaohongshu-launch-plan.md` §2/§4 | 冷启动期马上要用的选题日历 |
| M2 | 一字成文 / 数字工具铺 推广包 + 落地页 | `opc-doc/outputs/promo/*`（含 `yizipaper-landing-page.html`、`digital-tools-shop-promo-pack-20260720.md` 等） | affiliate 合规路径素材（D-09 渠道拆分） |
| M3 | 起号执行方案 | `growth/xiaohongshu-launch-plan.md`（全文） | 账号搭建→内容支柱→选题→合规→转化总流程 |

### 1.5 自动化脚本（Automation）
| 编号 | 资产 | 真实路径 | 说明 |
|---|---|---|---|
| A1 | 小红书自动化引擎 | `04_开发脚本_工具/xiaohongshu_automation/`（`note_publisher.py`、`qianfan_uploader.py`、`run_auto_tasks.py`、`login_manager.py` 等 ~20 .py） | P0 止血 6/6 已验证；**pivot 后降级为内容生产辅助**，不作为主交付链（D-08 半自动，禁无人值守发布） |

### 1.6 合规 SOP（Compliance SOP）
| 编号 | 资产 | 真实路径 | 说明 |
|---|---|---|---|
| C1 | 小红书周度复盘 SOP | `assets/xiaohongshu-review-sop.md` | 单人运营：指标阈值 + 决策规则 + 自检清单 + 联动资产表 |
| C2 | 合规护栏清单（6 红线 + 自检） | `growth/xiaohongshu-launch-plan.md` §5 + `C1` §6 | 发布前逐项勾选，违反即不发 |
| C3 | 合规词表 / 引流话术库（待固化） | 尚未成表，散见于各资产 | 建议沉淀为可机检词表 + A/B 话术库（见 §4） |

### 1.7 知识库（Knowledge Base）
| 编号 | 资产 | 真实路径 | 说明 |
|---|---|---|---|
| K1 | IMA 知识库（RAG 中枢） | 待建（适配器 `E9` 已就绪） | 归集 SOP/产品数据/历史爆款，RAG 检索；缺凭证未真连 |
| K2 | 案例库（case_library） | PurePen `src/lib/case.ts` + `harvestCase()` + 公开案例页 | 改写前后对照 = 小红书内容母料 + 官网 social proof |

### 1.8 治理资产（Governance）
| 编号 | 资产 | 真实路径 | 说明 |
|---|---|---|---|
| G1 | 资产登记表机制（含本 v2） | `assets/asset-register.md` → `asset-register-v2.md` | 让每次运营反哺资产表，是复利飞轮的「记账层」 |
| G2 | 决策日志 / state | `opc-doc/state/decisions.json`、`current-stage.json` | D-01~D-19 固化决策，可追溯 |

---

## 2. 复利潜力评估

> 维度：**复用频率**（高/中/低）、**跨场景适用性**（高/中/低）、**边际成本**（趋零/低/中）、**复利评级**（S=战略级 / A=高 / B=中 / C=储备）。
> 评级逻辑：边际成本趋零 + 复用频率高 + 跨场景广 = S/A。

| 资产 | 复用频率 | 跨场景适用性 | 边际成本 | 复利评级 | 一句话理由 |
|---|---|---|---|---|---|
| **E1 md-splitter** | 高（每次发文） | 高（XHS/公众号/多品牌） | 趋零 | **S** | 内容生产主引擎，已 TDD 验证，参数化后跨品牌复用 |
| **E2 案例库草稿生成器** | 高（起号期） | 中（纯文 AI） | 趋零 | **S** | 把信任核心案例自动转可发布素材，复用频度最高 |
| **E3 文案中台** | 高 | 高（任意产品加配置即用） | 趋零 | **S** | 产品矩阵文案中台，新增产品零代码 |
| **E5 PurePen 核心 lib** | 高（每次改写） | 中（本产品） | 趋零 | **S** | 不公平优势代码化（保真/术语/软降级），上线即差异化 |
| **E7 上线闸门包** | 中（每次上线/迁移） | 高（任何 SaaS） | 低 | **A** | 把「填凭证」变 15 分钟动作，消除 H0 阻塞 |
| **C1 周度复盘 SOP** | 高（每周） | 高（任何账号） | 低 | **A** | 运营→资产反哺的飞轮开关，不依赖凭证 |
| **C2 合规护栏** | 高（每次发帖） | 高 | 趋零 | **A** | 红线零容忍，违规=清零蓄水，必须固化 |
| **M1 选题库** | 高（冷启动） | 中 | 低 | **A** | 起量直接杠杆，可迭代扩系列 |
| **E4 封面/对比条生成器** | 高 | 中 | 趋零 | **A** | 点击率核心变量，高频产出 |
| **E11 agent.md** | 高（每次开发） | 高（全项目） | 低 | **A** | 思维版本控制，防代码与意图脱钩 |
| **E10 Spec Kit 工作区** | 中（新功能时） | 高 | 低 | **A** | SDD 范式，单人可持续迭代的基础设施 |
| **S1 OPC 战略全栈** | 中（复盘/对齐时） | 高 | 低 | **A** | 唯一战略真相源，须注册防漂移 |
| **E6 Supabase schema** | 中（新环境） | 高 | 低 | **B** | 新项目直接粘贴建表，技术资产复用 |
| **E8 compliance_gate.py** | 中（上架前） | 中 | 低 | **B** | 上架合规闸门，pivot 后作内容合规预检 |
| **K2 案例库** | 高（内容/官网） | 高 | 低 | **B** | social proof 母料，跨小红书+官网复用 |
| **E9 ima_kb.py** | 低（待凭证） | 中 | 低 | **B** | 知识中枢适配器，接凭证后成 RAG 中台 |
| **K1 IMA 知识库** | 低（待建） | 高 | 低 | **B** | 长期知识复利，当前缺凭证未真连 |
| **M2 推广包/落地页** | 中 | 中 | 低 | **B** | affiliate 合规路径素材，可迭代 |
| **M3 起号方案** | 中 | 中 | 低 | **B** | 新号照做 checklist |
| **P1–P5 产品文档** | 低（对齐时） | 中 | 低 | **B** | 需求/设计依据，防重复论证 |
| **A1 自动化引擎** | 中 | 低（pivot 后降级） | 中 | **C** | 已降级为内容辅助，维护为主 |
| **C3 合规词表/话术库** | 高（规划中） | 高 | 低 | **B**（待建） | 建议尽快固化，接进生成前审查 |
| **S2/S3 记忆/资源** | 低 | 高 | 低 | **C** | 背景参考，非执行杠杆 |
| **G1 资产登记表** | 高（持续） | 高 | 低 | **A** | 复利飞轮的记账层本身 |

---

## 3. 优先级矩阵（P0 / P1 / P2）

> **P0 = 立即沉淀，对起量(H4)/上线(H0) 有直接杠杆且尚未充分系统化**；
> **P1 = 近期沉淀，支撑或需凭证/补完**；**P2 = 观察/降级储备**。

### P0（立即沉淀 · 执行期双瓶颈直接杠杆）
| 资产 | 服务瓶颈 | 沉淀形态 | 当前状态 |
|---|---|---|---|
| E1 md-splitter 内容分篇引擎 | H4 起量 | **Python 包（pip install -e）+ CLI + 测试** | 已 36 测试全绿，参数化完成 |
| E2 案例库→小红书草稿生成器 | H4 起量 | **生成器脚本 + 使用 SOP** | 已实跑（sample-001） |
| E3 文案中台 | H4 起量 | **配置驱动的文案/落地页流水线** | 已实跑（两产品） |
| E4 封面/轮播/对比条生成器 | H4 起量 | **模板函数库 + 示例库** | 已实跑 |
| M1 选题库 | H4 起量 | **选题库模板（可迭代）** | 已可用 |
| E7 上线闸门包 | H0 上线 | **部署 SOP + 凭证采集表（固化）** | PRELAUNCH-CHECKLIST 已落 |
| E5 PurePen 核心 lib | H0 上线即差异化 | **内部 SDK 模块 + 接口文档** | 已实跑，待接 dashboard |
| C1 周度复盘 SOP | 运营闭环 | **SOP 文档 + 复盘模板** | 已落 |
| C2 合规护栏清单 | 合规红线 | **自检清单（机检+人检）** | 已落 |
| E11 agent.md | 治理 | **项目级权威规范（持续维护）** | v1.1 已落 |
| G1 资产登记表 v2 | 记账层 | **本文件 + 持续回填机制** | 本次落盘 |

### P1（近期沉淀）
| 资产 | 服务瓶颈 | 沉淀形态 | 当前状态 |
|---|---|---|---|
| E6 Supabase schema | H0 | 可粘贴 SQL + 迁移说明 | 已具，待执行 |
| E8 compliance_gate.py | 合规预检 | 上架/内容合规闸门模块 | 已实测 |
| E9 ima_kb.py | 知识中枢 | RAG 适配器（待凭证） | 已写，未真连 |
| K2 案例库 | H4 内容母料 | 案例沉淀规范 + 脱敏授权 | 机制在，需运营填充 |
| M2 推广包/落地页 | H4 | affiliate 素材库 | 已落，可迭代 |
| M3 起号方案 | H4 | 新号 checklist | 已落 |
| P1–P5 产品文档 | 对齐 | 单一产品文档基线 | 已落 |
| S1 OPC 战略全栈 | 真相源 | 战略资产索引 | 已落，需注册 |
| C3 合规词表/话术库 | 合规+转化 | 词表 + A/B 话术库 | **待建**（建议 P1 内启动） |
| K1 IMA 知识库 | 长期复利 | RAG 知识库（待凭证） | 待建 |

### P2（观察 / 降级储备）
| 资产 | 说明 |
|---|---|
| A1 自动化引擎（xiaohongshu_automation） | pivot 后降级为内容生产辅助；维持 D-08 半自动，不启无人值守发布 |
| S2/S3 记忆/资源审计 | 背景参考，非执行杠杆 |
| 历史 XHS 虚拟商品素材（xhs-ai-weekly / xhs-student framework 等） | 已降级，仅作 GTM 内容素材/affiliate 验需，作储备 |

---

## 4. 沉淀路线图（形态映射）

> 把每项资产落到具体「沉淀形态」：模板 / SDK·CLI / 自动化 / SOP / 知识库 / 登记表。

### 4.1 做成模板（Template）
- **选题库模板**（M1）：`选题 ID / 标题 / 封面类型 / 内容支柱 / 状态(测试/系列/归档)`。
- **草稿骨架模板**（E1/E2）：小红书「标题≤20字 + 正文 + 钩子 + 福利码(明文)」、公众号「标题 + 正文 + 明文链接」。
- **落地页模板**（E3）：hero / 价值三栏 / 表单 / 合规声明，按产品动态生成。
- **合规自检清单模板**（C2）：每次发帖前勾选（已落 `xiaohongshu-review-sop.md` §6）。
- **复盘模板**（C1 §8）：周复盘复制一份填空。

### 4.2 封装成 SDK / CLI
- **md-splitter → Python 包**：`pyproject.toml` 已具备，建议 `pip install -e .` 固定为可复用 CLI；令牌参数化已完成（无硬编码）。
- **PurePen `src/lib` → 内部 SDK**：`classifyRisk` / `semantic`(SPS) / `detect`(软降级) 作为「语义保真降AI 能力层」，对外暴露稳定接口（示例签名见下）。
- **文案中台 → 配置驱动**：`copy_templates.PRODUCTS` 加一份配置即支持新产品，零代码。

示例（仅示意接口形态，非实现）：
```typescript
// 示例：PurePen 核心 lib 对外接口（已实跑，待接 dashboard）
classifyRisk(score: number | null, level: AcademicLevel): RiskResult   // 红线分级，缺值返回 unknown 不臆造
semanticFidelity(before: string, after: string): number                 // embedding 余弦 >0.7 高保真
detectAiRate(text: string): number | null                              // 软降级：未配引擎返回 null
```

### 4.3 自动化（Automation）
- **内容生产流水线**：`run_copy_pipeline.py` → `generate_xhs_case_draft.py` → 产出草稿 + 封面，半自动（人工目检后发）。
- **合规预检门**：`compliance_gate.py` 在生成/上架前自动拦截极限词/二维码/缺证明。
- **周度复盘自动取数**：Supabase SQL（见 `xiaohongshu-review-sop.md` §3C）拉取注册/付费/文档使用，自动填复盘模板。
- **⛔ 不自动化**：发布动作维持人工目检 + 扫码重登（D-08 半自动，违者封号）。

### 4.4 进 SOP / 知识库
- **SOP**：周度复盘 SOP、上线部署 SOP（PRELAUNCH-CHECKLIST）、新功能 SDD 五步（Spec Kit）。
- **知识库**：IMA 知识库（RAG 中枢，待凭证）→ 归集 SOP/产品数据/历史爆款；案例库（case_library）→ social proof 母料。
- **词表/话术库**（建议新建）：把踩过的违禁词、限流词、可用替代表沉淀为 `compliance_words.md`，接进生成前审查；引流话术按笔记类型给 A/B 变体。

### 4.5 进资产登记表（持续维护）
- 本 `asset-register-v2.md` 为记账层；**每次运营/开发产出可复用成果，当天回填**，不积压（呼应 `xiaohongshu-review-sop.md` §7）。
- 登记表本身随运营迭代**追加不覆盖**，带日期版本（v1 = 原 `asset-register.md`，v2 = 本次）。

---

## 5. 对执行期双瓶颈（起量 H4 / 上线 H0）的具体建议

### 5.1 起量瓶颈（H4 站外冷启动）— 现在就能跑，不依赖凭证
| 动作 | 复用资产 | 说明 |
|---|---|---|
| ① 发第一批对比笔记 | E1 + E2 + E4 + M1 | 用 `generate_xhs_case_draft.py --sample` 产出 3–5 篇「降重前后 AI 率对比」草稿（资产 8 已验证），按选题库排期，人工目检后发（D-08） |
| ② 建预热队列 | M1 + C1 | 用周度复盘 SOP 监测 CTR/涨粉，表现好扩系列回写选题库 |
| ③ 目录站素材准备 | P3 路径 D + E3 | 备齐 Product Hunt / HN / Indie Hackers / SaaSHub 提交素材，GTM 阶段启用（07 路径 D） |
| ④ 多品牌复用 | E3 + E1 | 数字工具铺重启时，用 `--coupon/--site/--comment` 传入自有令牌，同一中台服务多产品 |

> 关键：H4 是 09 复盘判定的「唯一可掌控且 7 月窗口不可逆」瓶颈。**内容生产引擎（E1/E2/E3/E4）已是 S 级复利资产，立即投入起量即是在积累受众与信任**——产品上线即有转化基数。

### 5.2 上线瓶颈（H0 三缺口闸门）— 把一次性动作变成 SOP
| 动作 | 复用资产 | 说明 |
|---|---|---|
| ① 凭证采集 | E7 PRELAUNCH-CHECKLIST | 列清每个 REPLACE_ME 获取位置，用户 15 分钟填齐 |
| ② 数据库迁移 | E6 schema.sql | 用户填 `SUPABASE_DB_URL` 后 `npm run db:apply` 一键建表 |
| ③ 部署门禁 | E7 DEPLOY.md + deploy.sh | `REPLACE_ME` 未清则门禁拦截，防止假部署 |
| ④ 合规闸门固化 | E8 compliance_gate + C2 | 上线前自动拦截违规，零容忍 |
| ⑤ 差异化即上线 | E5 核心 lib | 保真/术语/软降级已实跑，上线即差异化，不必重新开发 |

> 关键：H0 是「用户持有的外部阻塞」，资产沉淀把它转成**可重复的 15 分钟动作 + 部署 SOP**，凭证一到立刻真部署，从「阻塞」变「待触发」。

---

## 6. 关键风险与下一步

### 6.1 关键风险
| 风险 | 影响 | 缓解（已有资产） |
|---|---|---|
| 内容产期仍依赖人工目检，断更风险 | 断更 >7 天权重 -30%（C1 纪律） | 周度复盘 SOP + 选题库提前备稿；维持 D-08 半自动 |
| 虚构 AI 率（合规造假） | 封号 + 信任破产 | C2 自检 + E8 闸门 + 软降级原则（缺值标「未度量」不臆造） |
| 凭证长期不填，H0 卡死 | 零收入 | E7 PRELAUNCH-CHECKLIST 降低动作门槛 |
| 资产表只建不填，飞轮空转 | 复利失效 | G1 机制：当天回填，周复盘联动 |
| IMA/案例库待凭证/待运营填充 | 知识复利未启动 | 先跑不依赖凭证的 E1/E2 起量 |

### 6.2 下一步（建议主理人确认后执行）
1. **确认 P0 清单**（§3）：本文件给出 P0 11 项，主理人可增减/组合。
2. **立即启动 H4 起量**：用 E1+E2 发第一批对比笔记（不依赖凭证）。
3. **固化 C3 合规词表/话术库**（P1 内建议先做）：接进生成前审查，提升合规与转化。
4. **回填 asset-register-v2.md**：每次产出当天登记，周复盘联动。
5. **H0 凭证采集**：用 E7 清单 15 分钟填齐，触发真部署。
6. **（可选）状态文件更新**：按 OPC stage-08 落盘规范，本应同步写 `current-stage.json`（stage=08-asset-ops, status=completed, next_stage=execution）与 `decisions.json`（追加 D-20 资产沉淀优先级决策）。**因当前项目已处 execution-ready 状态、主理人未要求改 state，本次未改动；若需我追加请确认。**

---

## 附：与现有 asset-register.md 的关系
- 原 `asset-register.md`（v1，沉墨 2026-07-18）登记 9 项资产（侧重小红书起号 + 产品技术），已良好。
- 本 v2 **在其基础上补全**：纳入工程代码全量（E1–E11）、产品文档（P1–P5）、治理资产（E10/E11/G1/G2）、知识库（K1/K2），并补「类别 / 来源路径 / 复用场景 / 沉淀形态 / 维护责任人」列，形成可持续维护的表格化登记表。
- 旧 9 项编号（资产 1–9）在本 v2 中以「来源阶段」标注保留，不覆盖历史。
