# 净文 AI · 资产登记表 v2（Asset Register v2）

> 维护人：沉墨（资产沉淀师）｜版本：v2（在 `asset-register.md` v1 基础上补全）｜日期：2026-07-21
> 作用：把项目中**会重复用到的成果**登记为可复用复利资产，下次直接拿来用，不再从零做。
> 列定义：
> - **类别**：战略文档 / 产品文档 / 工程代码 / 推广素材 / 自动化脚本 / 合规 SOP / 知识库 / 治理资产
> - **来源阶段/路径**：产出位置（outputs 阶段 或 代码目录）
> - **复用场景**：什么时候拿来用
> - **优先级**：P0 立即 / P1 近期 / P2 储备
> - **沉淀形态**：模板 / SDK·CLI / 自动化 / SOP / 知识库 / 登记表
> - **维护责任人**：创始人（一人公司，统一为 lixingliang）
> - **状态**：已可用 / 已实跑 / 待建 / 待凭证 / 降级
> 合规红线（贯穿所有资产）：**不绕检测、不代写、AI 参与内容必标注**（D-08/D-09/D-11/标识办法）。
> 维护纪律：**每次运营/开发产出可复用成果，当天回填本表，不积压**（呼应 `xiaohongshu-review-sop.md` §7）。本表追加不覆盖历史。

---

## 一、资产总览表（按类别）

| # | 资产名 | 类别 | 来源阶段/路径 | 复用场景 | 优先级 | 沉淀形态 | 维护责任人 | 状态 |
|---|---|---|---|---|---|---|---|---|
| 1 | OPC 战略全栈（01–07/09 + product-strategy） | 战略文档 | `opc-doc/outputs/0*–9*`、`product-strategy/*` | 复盘/对齐/新方向论证，防重复论证 | P1 | 战略资产索引 | 创始人 | 已可用 |
| 2 | 项目记忆 session-summary | 战略文档 | `00-orchestrator/session-summary.md` | 新会话快速对齐项目全貌 | P2 | 文档 | 创始人 | 已可用 |
| 3 | 资源盘点（PurePen 视角） | 战略文档 | `01-resource/resource-inventory.md` | 资源底数清点；4 项待核实缺口提示 | P2 | 文档 | 创始人 | 已可用 |
| 4 | PRD + 开发任务拆分 | 产品文档 | `product-strategy/prd-zh/PRD.md`、`DEV-TASKS.md` | 功能定义基线；新功能对齐 | P1 | 产品文档基线 | 创始人 | 已可用 |
| 5 | MVP 方案（H0–H5 验证设计） | 产品文档 | `06-mvp/mvp-plan.md` | 上线前后验证设计；pivot 决策依据 | P1 | 产品文档 | 创始人 | 已可用 |
| 6 | 转化闭环（四路触达） | 产品文档 | `07-conversion/conversion-loop.md` | 站外获客结构；GTM 执行对齐 | P1 | 产品文档 | 创始人 | 已可用 |
| 7 | 市场调研 + 路线图（pivot 依据） | 产品文档 | `product-strategy/market-research-2026-07.md`、`new-product-roadmap.md` | D-15 首选方向② 决策溯源 | P1 | 产品文档 | 创始人 | 已可用 |
| 8 | 价值主张 / 商模 / 假设 | 产品文档 | `03-value/*`、`04-model/*` | UVP/Lean Canvas/H0–H5 假设溯源 | P1 | 产品文档 | 创始人 | 已可用 |
| 9 | **md-splitter 内容分篇引擎** | 工程代码 | `agent-orchestration/md-splitter/`（promo_split/batch_promo_split/md_splitter/title_suggest/extract_wechat_ready + tests，36 测试） | 长文→小红书/公众号合规草稿骨架；跨品牌复用 | P0 | Python 包 + CLI | 创始人 | 已实跑（36 测试全绿） |
| 10 | **案例库→小红书草稿生成器** | 工程代码 | `agent-orchestration/case-lib/case_to_xhs.py`（本地 AI 率检测镜像 detect.ts + 风险分级镜像 risk.ts，11 pytest 绿）| 案例 JSON→小红书对比笔记草稿（D-09 不挂链）| P0 | 生成器 + SOP | 创始人 | 已建实跑（sample-001/002/003 落盘 h4-drafts）|
| 11 | **文案中台** | 工程代码 | `copy_templates.py` + `run_copy_pipeline.py` + `generate_landing.py` | 产品参数化配置→5 篇草稿 + 落地页；新增产品零代码 | P0 | 配置驱动流水线 | 创始人 | 已实跑（两产品） |
| 12 | 封面/轮播/对比条生成器 | 工程代码 | `generate_carousel.py`/`generate_title_covers.py`/`generate_templates.py`（`make_compare_bar()`） | 高频产出封面/对比条（点击率核心变量） | P0 | 模板函数库 + 示例 | 创始人 | 已可用 |
| 13 | **PurePen 核心 lib（差异化代码）** | 工程代码 | `12_Micro_SaaS出海/purepen-ai/src/lib/`：`risk.ts`(classifyRisk)、`similarity.ts`、`detect.ts`(软降级)、`semantic.ts`(SPS>0.7+术语保护)、`llm.ts`/`case.ts`/`quota.ts`/`waffo.ts` | 改写/检测/保真/术语保护/支付；上线即差异化 | P0 | 内部 SDK + 接口文档 | 创始人 | 已实跑，待接 dashboard |
| 14 | Supabase 数据层 | 工程代码 | `purepen-ai/supabase/schema.sql` | 新环境一键建表（profiles/documents/rewrite_results/subscriptions+RLS） | P1 | 可粘贴 SQL + 迁移说明 | 创始人 | 已具，待执行 |
| 15 | **上线闸门包** | 工程代码 | `purepen-ai/PRELAUNCH-CHECKLIST.md`、`DEPLOY.md`、`降重降AI功能测试报告_2026-07-18.md` | 凭证采集 + 部署三步 + 门禁；消除 H0 阻塞 | P0 | 部署 SOP + 凭证表 | 创始人 | 已落（PRELAUNCH-CHECKLIST） |
| 16 | 合规闸门 compliance_gate.py | 工程代码 | `04_开发脚本_工具/xiaohongshu_automation/compliance_gate.py` | 上架/内容前极限词/二维码/证明/资质拦截 | P1 | 合规闸门模块 | 创始人 | 已实测 |
| 17 | IMA 知识库适配器 ima_kb.py | 工程代码 | `04_开发脚本_工具/xiaohongshu_automation/ima_kb.py` | RAG 中枢适配器（仅知识归集，不含发布） | P1 | RAG 适配器（待凭证） | 创始人 | 已写，未真连 |
| 18 | Spec Kit 五步工作区 | 工程代码 | `spec-kit-workspace/`（constitution + workflow + .github/prompts + specs/promo-split-config） | 新功能 SDD 五步（spec/plan/tasks/implement） | P1 | 开发范式 + 命令 | 创始人 | 已落（promo-split-config 样例） |
| 19 | **agent.md（项目治理权威）** | 治理资产 | `agent.md`（项目根） | 全 coding agent 规范 + 五步流程 + 历史决策 | P0 | 项目级权威规范 | 创始人 | 已落（v1.1） |
| 20 | 小红书选题库（15 篇 + 支柱） | 推广素材 | `growth/xiaohongshu-launch-plan.md` §2/§4 | 冷启动选题日历；表现好扩系列 | P0 | 选题库模板（可迭代） | 创始人 | 已可用 |
| 21 | 一字成文/数字工具铺 推广包 + 落地页 | 推广素材 | `opc-doc/outputs/promo/*`（含 `yizipaper-landing-page.html`、`digital-tools-shop-promo-pack-20260720.md`） | affiliate 合规路径素材（D-09 渠道拆分） | P1 | affiliate 素材库 | 创始人 | 已落，可迭代 |
| 22 | 起号执行方案 | 推广素材 | `growth/xiaohongshu-launch-plan.md`（全文） | 新号照做：搭建→支柱→选题→合规→转化 | P1 | 新号 checklist | 创始人 | 已可用 |
| 23 | 小红书自动化引擎 | 自动化脚本 | `04_开发脚本_工具/xiaohongshu_automation/`（note_publisher/qianfan_uploader/run_auto_tasks/login_manager 等 ~20 .py） | P0 止血 6/6 已验证；pivot 后降级为内容生产辅助 | P2 | 半自动辅助（D-08） | 创始人 | 已验证，降级 |
| 24 | **小红书周度复盘 SOP** | 合规 SOP | `assets/xiaohongshu-review-sop.md` | 单人运营：指标阈值 + 决策规则 + 自检 + 联动资产表 | P0 | SOP + 复盘模板 | 创始人 | 已落 |
| 25 | **合规护栏清单（6 红线 + 自检）** | 合规 SOP | `growth/xiaohongshu-launch-plan.md` §5 + `xiaohongshu-review-sop.md` §6 | 每次发帖前勾选，违反即不发 | P0 | 自检清单（机检+人检） | 创始人 | 已落 |
| 26 | 合规词表 / 引流话术库（建议新建） | 合规 SOP | 尚未成表（散见各资产） | 生成前自动审查违禁词；A/B 引流话术 | P1 | 词表 + 话术库（待建） | 创始人 | 待建 |
| 27 | IMA 知识库（RAG 中枢） | 知识库 | 待建（适配器 `17` 已就绪） | 归集 SOP/产品数据/历史爆款，RAG 检索 | P1 | 知识库（待凭证） | 创始人 | 待建 |
| 28 | 案例库（case_library） | 知识库 | PurePen `src/lib/case.ts` + `harvestCase()` + 公开案例页 | 改写前后对照 = 小红书母料 + 官网 social proof | P1 | 案例沉淀规范 + 脱敏授权 | 创始人 | 机制在，待运营填充 |
| 29 | **资产登记表机制（含本 v2）** | 治理资产 | `assets/asset-register.md` → `asset-register-v2.md` | 让每次运营反哺资产表（复利飞轮记账层） | P0 | 登记表 + 持续回填 | 创始人 | 本次落盘 |
| 30 | **E12 微信生态六步法验证包** | 工程代码/模板 | `opc-doc/outputs/06-mvp/wechat-demand-validation-purepen-20260721.md` | 新方向/新赛道微信生态需求验证时直接复用六步法+搜索词库+零凭证方案A/B/C+转化漏斗阈值 | P1 | Markdown 模板+流程 | 创始人 | 已建（本次验证产出） |
| 31 | **H4 草稿发布清单 CSV 导出器** | 自动化脚本 | `opc-doc/outputs/promo/export_drafts_csv.py` + `h4-drafts-export.csv` | 11 篇小红书草稿→发布清单(标题/正文/钩子/全文)，降低人工复制后台成本 | P0 | 生成器 + CSV | 创始人 | 已实跑（11 篇导出） |
| 32 | **H4 发布前合规预检器** | 合规 SOP/自动化 | `opc-doc/outputs/promo/check_drafts_compliance.py` | 发帖前扫 D-09 不挂链/D-11 非代写/标题≤20/钩子非空，全绿才进人工发布 | P0 | 合规闸门脚本 | 创始人 | 已实跑（11/11 绿） |
| 33 | **A 渠道钩子 GitHub Pages 自托管包** | 推广素材/工程 | `opc-doc/outputs/promo/a-channel/gh-pages/`(index.html+README) | 公众号菜单挂永久 HTTPS（替代 CloudStudio 临时 URL），契合 H0 上线链路 | P1 | 部署包 + 指引 | 创始人 | 已打包（部署人工） |
| 34 | **H4 每日起量追踪器 + 自动化** | 自动化脚本 | `opc-doc/outputs/execution/h4_tracker.py` + automation-1784683501454(每日08:00) | 读 h4-daily.csv 算漏斗/预警/H0 闸门触发建议；不发布不烧凭证 | P0 | 追踪器 + 定时任务 | 创始人 | 已实跑（每日自动化在跑） |
| 35 | **ima 知识库最佳实践来源** | 知识库 | ima 订阅库「AI编程出海独立开发资源库」(7354338238295398) /「AI出海精选知识库」(7389943097721763) 中《普通人靠AI编程+小红书从0到1变现》《出海没流量？低门槛冷启动跑通闭环的社区平台》《AI编程做的网站单月营收5w》《出海冷启动：为什么要发 Product Hunt》等 | 下次做渠道战术升级或冷启动方案时，回查 ima 库已验证打法作为外部最佳实践依据 | P2 | 知识库（外部参考源） | 创始人 | 已可用（2026-07-23 接入） |
| 36 | **H4 起量战术升级补遗** | 推广素材 | `opc-doc/outputs/execution/h4-tactics-upgrade.md` | H4 起量遇渠道精细化、新增 C 渠道或蓝链过渡疑问时，回查本补遗作统一战术口径 | P1 | 战术文档 | 创始人 | 已建（2026-07-23） |
| 37 | **Reddit/海外社区零凭证起量模板（C 渠道 SOP）** | 合规 SOP | `opc-doc/outputs/execution/c-channel-reddit-sop.md` | 启动 Reddit/海外社区零凭证起量时，照本 SOP 执行自问自答+利他打法+Karma养成+MVP邮箱验证闭环 | P1 | SOP | 创始人 | 已建（2026-07-23） |
| 38 | 知识中枢索引（kb-integration-hub） | 知识库 | `opc-doc/outputs/knowledge/kb-integration-hub.md` | 下次融合 ima/外部知识时先查本 hub 去重边界，避免重复合成现有资产 | P1 | 知识库索引 | 创始人 | 待建（本次合成） |
| 39 | H0 上线基建知识包（h0-launch-infra） | 知识库/工程参考 | `opc-doc/outputs/execution/h0-launch-infra.md` | H0 闸门触发前回查支付选型/Stripe接入/RLS红线/应急，作为 #15 实操经验层 | P0 | 知识包 | 创始人 | 待建（本次合成） |
| 40 | SEO 有机增长知识包（seo-organic-growth） | 知识库/增长 | `opc-doc/outputs/execution/seo-organic-growth.md` | H0 上线后启动自有搜索流量引擎时，回查 pSEO 方法/Google红线/搜索模式 | P1 | 知识包 | 创始人 | 待建（本次合成） |
| 41 | ima Agent/智能体库低相关索引注记 | 知识库（索引） | 并入 kb-integration-hub.md §6（不单列文件） | 确认 PurePen（写作SaaS非Agent）与 Agent 技术库无融合必要，仅备查不展开 | P2 | 索引注记 | 创始人 | 待建（本次合成） |

> 资产总数：**v2 共 41 项**（P0 共 15 项、P1 共 20 项、P2 共 6 项）。
> 本次 H4 执行期回填 +4（#31/#32/#33/#34，2026-07-22），均不依赖凭证、现已可用。
> 2026-07-23 ima 知识库驱动再回填 +3（#35/#36/#37）：把订阅库已验证打法提炼为 H4 战术升级补遗 + C 渠道 Reddit SOP + 外部最佳实践来源资产。
> 2026-07-23 ima 知识库 v2 融合再回填 +4（#38/#39/#40/#41）：4 库系统盘点（416 docs）后，把真正缺口（知识中枢索引 / H0 上线基建 / SEO 有机增长）补成新资产，Agent 库仅索引不融，严格去重不重复。
> 与原 v1（9 项）关系：v1 资产 1–9（选题库/封面/对比条/草稿生成器/文案中台/起号方案/合规护栏/数据库 schema/检测引擎）在 v2 中以「来源阶段」标注保留，编号对应 v1 资产 1→#20、2→#12、4→#25、5→#14、6→#13、7→#12、8→#10、9→#11；v1 资产 3（起号方案）→#22。本 v2 在其基础上补全工程代码全量、产品文档、治理与知识库。

---

## 二、P0 资产速查（立即沉淀 · 执行期双瓶颈直接杠杆）

| # | 资产 | 服务瓶颈 | 沉淀形态 | 当前状态 |
|---|---|---|---|---|
| 9 | md-splitter 内容分篇引擎 | H4 起量 | Python 包 + CLI | 36 测试全绿，参数化完成 |
| 10 | 案例库→小红书草稿生成器 | H4 起量 | 生成器 + SOP | 已实跑（sample-001） |
| 11 | 文案中台 | H4 起量 | 配置驱动流水线 | 已实跑（两产品） |
| 12 | 封面/轮播/对比条生成器 | H4 起量 | 模板函数库 | 已可用 |
| 13 | PurePen 核心 lib | H0 上线即差异化 | 内部 SDK + 接口文档 | 已实跑，待接 dashboard |
| 15 | 上线闸门包 | H0 上线 | 部署 SOP + 凭证表 | PRELAUNCH-CHECKLIST 已落 |
| 19 | agent.md | 治理 | 项目级权威规范 | v1.1 已落 |
| 20 | 选题库 | H4 起量 | 选题库模板 | 已可用 |
| 24 | 周度复盘 SOP | 运营闭环 | SOP + 复盘模板 | 已落 |
| 25 | 合规护栏清单 | 合规红线 | 自检清单 | 已落 |
| 29 | 资产登记表 v2 | 记账层 | 登记表 + 回填 | 本次落盘 |
| 31 | H4 草稿发布清单 CSV 导出器 | H4 起量 | 生成器 + CSV | 已实跑（11 篇导出） |
| 32 | H4 发布前合规预检器 | H4 起量 | 合规闸门脚本 | 已实跑（11/11 绿） |
| 34 | H4 每日起量追踪器 + 自动化 | H4 起量 | 追踪器 + 定时任务 | 每日自动化在跑 |
| 39 | H0 上线基建知识包 | H0 上线 | 知识包（支付/RLS/应急） | 本次合成（待 H0 触发前回查） |

---

## 三、资产间依赖关系（复利链路）

```
选题库(20) ──填入──> 封面生成器(12) ──产出──> 小红书笔记
    │                                       ↑
    └──受控于──> 合规护栏(25) <──审查──┘
起号方案(22) = 把上述串起来的总流程 checklist
文案中台(11) ──消费──> 对比条(12) + 合规护栏(25)
    └──产出──> 小红书草稿(标题/正文/标签) + 落地页
案例库生成器(10) ──消费──> 文案中台(11) + 对比条(12) + 案例库(28)
    └──产出──> 小红书对比笔记草稿 ──> 小红书笔记（人工目检后发，D-08）
md-splitter(9) ──是 文案中台(11)/案例库生成器(10) 的底层分篇引擎
PurePen 核心 lib(13) = 官网侧「改写前后对比」底层能力，给内容与 social proof 供料
上线闸门包(15) + schema(14) + compliance_gate(16) = 上线(H0) 物理前提 + 合规闸门
周度复盘 SOP(24) + 资产登记表(29) = 运营→资产反哺飞轮（不依赖凭证，现在就跑）
agent.md(19) + Spec Kit(18) = 所有工程开发的治理底层
H4 执行期新增：草稿导出器(31) + 合规预检器(32) + 追踪器自动化(34) 串成「草稿→合规校验→发布→每日回填→H0 闸门」闭环（均不依赖凭证、现在就跑）；钩子自托管包(33) 服务 A 渠道与 H0 上线后的真实后端承接
ima 知识库来源(35) ──提炼──> H4 战术升级补遗(36) + Reddit 起量 SOP(37)；36/37 增补 H4 三渠道结构（B 小红书精细化 + A 公众号蓝链过渡 + 新增 C Reddit 零凭证），并把 C 渠道 feeds 接入 H4 追踪器(34) 的 h4-daily.csv(新增 reddit 行) 与 H0 闸门
kb-integration-hub(38) = 知识融合查重中枢（新外部知识先过本 hub）；h0-launch-infra(39) 叠加 上线闸门包(15)+schema(14)+compliance_gate(16) = H0 上线实操经验层（支付/RLS/应急）；seo-organic-growth(40) = H0 后第四增长引擎（自有搜索），与 Reddit SOP(37) 互补；#41 并入 hub 仅索引 Agent 库
```

---

## 四、使用纪律（合规底线）

1. 任何资产落地内容，**凡 AI 参与生成必须标注**「笔记含 AI 合成内容」。
2. 封面/文案模板**绝不生成**「绕过检测 / 不标注过审 / 代写」类素材。
3. 人设款资产须基于**真实运营者**、案例须**脱敏 + 获授权**。
4. 发布动作维持**人工目检 + 扫码重登**，禁用无人值守/AI 托管式自动发布（D-08，违者封号）。
5. 外部依赖（检测引擎/Embedding/LLM）缺失时**软降级**——返回「未度量」不臆造。

---

## 五、与复盘 SOP 的联动

- 每次周复盘（`xiaohongshu-review-sop.md`）末尾花 5 分钟判断：**本周是否有可固化成果？**
- 若有（新封面样式、新选题、新案例、新引流话术、新功能 Spec），立即回填本表对应条目，更新「优先级 / 状态 / 复用场景」。
- 本表随运营迭代持续追加（带日期版本 v1→v2→…），**不覆盖历史**。
