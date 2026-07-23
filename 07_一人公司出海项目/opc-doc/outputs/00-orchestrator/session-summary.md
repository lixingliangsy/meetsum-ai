# OPC 会话摘要 · opc-xhs-virtual-goods

> 主理人：易牧 ｜ 模式：引导（术语按需解释）｜ 用户画像：资深 AI Agent 框架/AgentCPM 开发者
> 最近更新：2026-07-17

## 项目定位
小红书虚拟商品一人公司。已开发两套 Python 工程：`xiaohongshu_automation`（自动化引擎）+ `xiaohongshu_shop`（产品/运营资料）。目标：在 2026 小红书虚拟商品新规约束下，把这套资产跑成合规、可自动化的个人店业务。

## 阶段进度（OPC 方法论 9 阶段）
| 阶段 | 状态 | 产出物 |
|---|---|---|
| 00 工程诊断（前置） | ✅ 完成 | `opc-doc/outputs/00-diagnosis/diagnosis-report.md` |
| 01 资源盘点 | ✅ 完成 | `opc-doc/outputs/01-resource/resource-inventory.md` |
| 02 利基定位 | ✅ 完成 | `opc-doc/outputs/02-niche/niche-statement.md`（主利基：职场新人 简历+汇报PPT 组合，六维27/30）；补充 `product-market-research.md`（4款合规品+蓝海扩展+96天桥接）、`content-nurturing-strategy.md`（养号→带货策略+热门品类挖掘+发布节奏） |
| 03 价值主张 | ✅ 完成 | `opc-doc/outputs/03-value/value-proposition.md`（VP + 价值流延展：C类站内佣金/B1蓝海/一字成文） |
| 04 商业模式 | ✅ 完成 | `opc-doc/outputs/04-model/lean-canvas.md` + risky-assumptions.md(H0–H5) + pricing-notes.md + assumptions.json |
| 06 MVP | ✅ 完成 | `opc-doc/outputs/06-mvp/mvp-plan.md`（养号验 H1 涨粉 + H2 私域，H3/H4 留 07） |
| 07 转化闭环 | ✅ 完成 | `opc-doc/outputs/07-conversion/conversion-loop.md`（三路：A 主店铺待 H0 / B 站内商品卡含图书 / C affiliate 站外） |

## 工程并行线（用户原指令步骤 2-5）
- 步骤2 改进方案 ✅ 完成 → `opc-doc/outputs/01-improvement/improvement-plan.md`
- 步骤3 自动化全流程设计 ✅ 完成 → `opc-doc/outputs/eng-automation/automation-design.md`（四段重排+自动化度矩阵+合规模块+ArgusBot编排+三阶段验收）
- 步骤4 端到端工作流（融合前10 GitHub 仓库 + AI编程出海工作流） 🔄 已启动规划（03–07 完成后，D-10 排期触发）
- 步骤5 ArgusBot 执行包 ⏳ 待步骤4 完成后启动

## 关键决策（详见 `opc-doc/state/decisions.json`）
- D-01 店铺主体 = 个人店，开店 96 天（<180天门槛，当前未满足）→ 早期内容养号+私域先行、成交后置
- D-02 合规可上架类目：PPT / 简历 / 其他模板（含 Excel 看板）
- D-03 高风险 4 商品 → 私域钩子，不作店铺商品
- D-04 打法：低价钩子→私域→升单；内容养号至 1000 粉后成交
- D-05 整改优先级 P0→P1→P2
- D-06 自动发货依赖 网盘回填 + 创作证明 + 类目归桶
- D-07 候选利基（职场新人 简历+汇报PPT 组合）已确认（用户选A且要求基于此搜产品，视为无异议）
- D-08 自动化风险姿态 = A：纯人工养号+上架，自动化仅半自动辅助，不无人值守批量发布
- D-09 一字成文 affiliate 合规路径（渠道拆分）：小红书仅种草不挂链，?tuid 转化放站外（落地页/公众号）；福利码 LYG646 仅纯文字
- D-11 一字成文用途边界：不接单代做 PPT/简历，定位「生产引擎 + affiliate 双用」
- D-12 阶段04 商业模式核心：低价钩子(简历1元)→私域→升单(汇报PPT 9.9–39.9 / Excel 19.9–59) + affiliate 过渡；H0–H5 待验
- D-13 选品矩阵 B1 蓝海虚拟（AI头像/壁纸）：保留作后期试水、非核心主利基

## 待澄清 / 执行期事项
- 个人店资质：96天<180天门槛【当前未满足】；30笔记/1000粉/无违规 待用户自核（按最严假设推进养号路径）
- 建盘期已完成（03–07）。进入执行阶段：按 07 转化闭环实际做养号→承接→成交；运营卡住触发 08(复明)、想系统化触发 09(沉墨)。
- 工程线步骤4/5（端到端融合10仓库 / ArgusBot包）按 D-10 排期，已在 03–07 完成后启动规划。

---

## 2026-07-19 更新：PurePen AI pivot + 增量修订续推

> 主理人：易牧 ｜ 模式：引导（术语按需解释）｜ 最近更新：2026-07-19

### 关键转折
- D-15 决策：首选方向② AI 降重/降AI SaaS（订阅制）= **PurePen AI（净文 AI）**。原 XHS 虚拟商品利基因小红书自营门槛封死（180天/1000粉/月流水6000 + 教育类严审）不可行，SaaS 是唯一不受限方向。
- D-17 工程：M0.2 Supabase 接通（schema/profiles/documents/rewrite_results/subscriptions + RLS + Auth + 2026 密钥兼容）。
- 用户指令：2026-07-19「按 OPC 模式跑一遍进行优化和完善」→ 初选重跑 01–07，用户纠正「在原来的基础上优化完善，不要重写」→ 撤销重跑，改在 XHS 基线 + PurePen pivot 上做**增量优化**（不起 agent 从零重写）。

### 增量修订进度（PurePen 视角）
| 阶段 | XHS 基线 | PurePen 增量修订 | 状态 |
|---|---|---|---|
| 01 资源盘点 | ✅ | PurePen 视角增量版已落盘（顾盘；4 项待核实缺口转创始人补齐） | ✅ 已落盘 |
| 02 利基定位 | ✅ | 学术/专业写作者降重降AI SaaS，语义保真+术语保护+合规去AI味，六维25/30 | ✅ 已落盘 |
| 03 价值主张 | ✅ | PurePen 视角增量版已落盘（言之；Jobs/Pains/Gains + 差异化定位，含 H1-H3 待验） | ✅ 已落盘 |
| 04 商业模式 | ✅ | PurePen 视角增量版已落盘（墨方；含 H0-H5 + 定价框架；首轮 Write 未落地已纠正重做并读回验证） | ✅ 已落盘 |
| 06 MVP | ✅ | PurePen 视角增量版已落盘（验真；H0 上线三缺口 P0 + H1/H4/H5 主验证，经读回验证） | ✅ 已落盘 |
| 07 转化闭环 | ✅ | PurePen 视角增量版已落盘（闭环；四路触达→统一承接→统一成交，对齐 06 H0-H5，经读回验证） | ✅ 已落盘 |
| 09 经营复盘 | — | PurePen 视角对齐版已落盘（复明；review-20260719.md，瓶颈=H4 流量预热、对齐 06/07，经读回验证） | ✅ 已落盘 |
| product-strategy | — | 增量对齐版已落盘（PM 综合 agent；product-strategy-aligned-20260719.md，重定位①③④→affiliate/养号侧、PurePen 单一焦点，对齐 OPC 01–07/09，经读回验证） | ✅ 已落盘 |

### 本轮联网调研（校准用，2026-07）
- 市场规模/竞品：方向②（AI降重/降AI SaaS）可行；2026 降AI率工具超 100 家。
- 检测器脆弱性：6 检测器一致性仅约 63%；非母语写作者误判率高达 61.3%；改写后检测准确率骤降 → 诚实定位、软降级。
- 国际改写定价：QuillBot ~$8.33/月、Wordtune ~$13.99/月，中文降AI 适配弱、贵、与中文检测生态脱节。
- 语义保真 SPS（embedding 余弦>0.7 高保真）为 2026 新指标，与 PurePen P2 阈值对齐。

### last30days 评估（等价本地能力）
- 无预置 last30days skill，改用工作空间记忆日志（7/6–7/19）+ 任务看板（122 条）做近30天评估。
- 进度线：OPC 建盘 03–07（XHS）→ D-15 pivot PurePen → M0.1–M1.2 工程 → P2 语义保真/术语保护工程化（tsc EXIT=0）→ 资产沉淀 6–9 → 小红书起号。
- 完成度：工程就绪，闭环「未上线未起量」。瓶颈 = 流量层未启动 + 凭证/部署三缺口。下周期重点 = 补齐凭证/部署、站外起量。

### 本轮收口（2026-07-19 晚 · PurePen 增量修订全队列完成）
- **全部 01/02/03/04/06/07/09 + product-strategy 均经读回验证为 PurePen 视角、未碰 state 文件**（纪律：04 曾"声称完成"未落地，已纠正重做；后续 06/07/09/ps 均主理人亲读回核实）。
- **状态落地**：`current-stage.json` → `current_stage=execution-ready`、`stage_status=completed`、全部入 `completed_stages`；`engagement` 仍为 `opc-xhs-virtual-goods`（D-18：不改为 opc-purepen-ai）；`revision.purepen_revision_in_progress=[]`。
- **4 项待核实缺口**（01 资源：时间/资金/人脉/内容影响力）仍为待创始人补齐项——影响 04 定价与 07 获客节奏，不影响 02 利基与 H0–H5 结构。
- **下一步（执行期）**：按 07 转化闭环 + 09 Quick Win A/B 实际去做——A=上线前跑站外内容/流量资产（小红书种草不挂链+目录站，不依赖凭证）；B=填齐 Supabase/LLM/Waffo 凭证→deploy 真上线消除 H0。触发条件回到 OPC：运营卡住→复明(09)、产出重复想系统化→沉墨(08)。

---

## 2026-07-21 更新：阶段 08 资产沉淀完成（沉墨）

> 主理人：易牧 ｜ 模式：引导（术语按需解释）｜ 最近更新：2026-07-21

### 阶段 08 资产沉淀（Asset Compounding）已落盘
- **触发**：项目已产出 30+ 文档/代码资产，符合 SOP「产出重复、想系统化 → 触发资产沉淀（沉墨）」。
- **产出**：
  - `opc-doc/outputs/assets/asset-strategy-20260721.md`（资产策略主文档，8 节：全景/复利评估/优先级矩阵/路线图/双瓶颈建议/风险）
  - `opc-doc/outputs/assets/asset-register-v2.md`（资产登记表 v2：**29 项** = P0×11 / P1×14 / P2×4，在 v1 九项基础上补全工程代码/产品文档/治理/知识库）
- **核心结论**：
  - S 级复利资产已实跑：md-splitter（36 测试绿·令牌参数化）、案例库→草稿生成器（sample-001）、文案中台（两产品）、PurePen 核心 lib（detect/semantic/risk）。
  - 双瓶颈杠杆不对称：H4 起量资产「已实跑不依赖凭证、现在就能跑」= 7 月唯一可控不可逆窗口，优先蓄转化基数；H0 上线卡用户凭证但已 SOP 化（15 分钟可触发）。
  - 合规三层护栏固化：SOP 自检 + compliance_gate + 软降级不臆造。
- **P0 立即沉淀（11 项）**：H4 侧 E1/E2/E3/E4/M1/C1/C2/G1；H0 侧 E7/E5；治理 E11。
- **决策 D-20**：资产沉淀优先级已确认落盘。next：执行期双瓶颈 H4 起量（现在跑）/ H0 上线（待凭证）。

### 当前完整状态
- 建盘期 01/02/03/04/06/07 + 阶段 08 资产沉淀 + 09 经营复盘 **全部完成**（product-strategy 已对齐 PurePen 单一焦点）。
- 进入执行期：按 07 转化闭环 + 09 Quick Win 实际去做；H4 起量（不依赖凭证）优先，H0 上线待填凭证+部署。
- 仍阻塞（需用户给料）：classifyRisk 接 PurePen dashboard（缺 Supabase/LLM 凭证）；微信读书笔记佣金路径 D（缺商品名+佣金比例）。

---

## 2026-07-21 二次更新：H4 起量第一批对比笔记草稿（E2 真正建成）

> 主理人：易牧 ｜ 模式：引导 ｜ 最近更新：2026-07-21（执行期 H4 起量推进）

### 关键纠正（主理人亲查）
- 核实发现：沉墨报告称 E2「案例库→小红书草稿生成器 已实跑 sample-001」**实际未落盘**——项目内无对应文件，仅 PurePen `case.ts` 定义了 Supabase 表结构（案例库空、且需凭证才能写）。按"主理人亲读回核实"纪律，未照不实描述推进，而是把 E2 **真正建出来**。

### E2 真正建成（Spec Kit 五步 + TDD，零凭证依赖）
- 位置：`agent-orchestration/case-lib/`
  - `local_ai_rate.py`：镜像 PurePen `detect.ts` localHeuristic（无 key 时本地 AI 率估算，0-1）
  - `risk.py`：镜像 `risk.ts` classifyRisk（红线 20/15/10/30，1.5× 为中）
  - `case_to_xhs.py`：案例 JSON→小红书「降重前后 AI 率对比」草稿，复用 promo_split 合规骨架（D-09 不挂链）
  - `cases/sample-001/002/003.json`：真实语义保真改写前后对照
  - `tests/test_case_lib.py`：**11 passed**
- spec/plan/tasks：`spec-kit-workspace/specs/case-to-xhs/`

### H4 起量第一批草稿（已落盘）
- 产出 `opc-doc/outputs/promo/h4-drafts/sample-001/002/003.md`（3 篇）
- 本地 AI 率方向正确：改写前 42–47% → 改写后 0%（标注"本地估算，上线接朱雀/度小满后为准"）
- D-09 扫描通过（无 http 链接）；D-11 声明"非代写代做"
- 性质：草稿骨架，需人工润色后发布（D-08 半自动，发布不自动化）

### 资产登记表 v2 更正
- 第 10 行 E2：路径由不存在的 `xiaohongshu_automation/...` 更正为 `agent-orchestration/case-lib/case_to_xhs.py`，状态由“已实跑（sample-001）”更正为“已建实跑（sample-001/002/003）”。

---

## 2026-07-21 三次更新：OPC 工作流与 skills 增量优化（基于两篇公众号文章）

> 主理人：易牧 ｜ 最近更新：2026-07-21

### 输入文章
- A《一个人、6个Agent、月入五万：搭建一人AI公司架构》（空空，2026-05-27）：壁垒=编排非AI；6-Agent 闭环；五周验证；五坑（平台政策/同质化=数据飞轮/内容质量/法律风险/预期管理）；Analyst→记忆飞轮。
- B《一人公司OPC如何用公众号＋智能体，验证AI产品第一步？》（陈宇明，2026-07-13）：微信指数六步轻量验证（查词→对比→判断→注册公众号→智能体最小体验→打通+看转化）；理念"先承接需求非创造概念"。

### 增量优化（不推翻重建，4 处 skill 各加精准小节，无新增平行 skill）
- **opc-mvp-designer**：新增「轻量需求验证协议（微信生态六步法）」——来源 B+A；补具体轻量验证手段与"先验证再开发"节奏。
- **opc-dashboard-review**：新增「数据飞轮写回（复盘→记忆/案例库）」——来源 A；复盘结论持续写回 assumptions.json/记忆/案例库，形成越用越聪明飞轮。
- **opc-asset-ops**：新增「护城河资产优先级原则 + 合规对外话术定位」——来源 A 坑2/坑1/坑5；优先沉淀带记忆属性资产；对外话术红线"AI 辅助创作+自动化运营，绝不说零人工"。
- **opc-niche-positioning**：新增「命名与入口承接原则（可选战术）」——来源 B 第四步；命名用用户真实搜索词，先承接需求。

### 衔接去重
- 4 项分属 02/06/08/09 不重叠阶段，沿用现有边界/越界检测，无冲突。
- 飞轮闭环：09 写回 ↔ 08 护城河资产互为因果；写回记忆被 02/06/08 自动读取。
- 合规对外话术与 D-08/D-09/D-11 同向。

### 落地文件
- 方案文档：`opc-doc/outputs/00-orchestrator/workflow-optimization-20260721.md`
- 4 个 skill 文件（用户级插件目录 `.../opc-team/skills/` 下对应 SKILL.md）已加小节，grep 校验 ALL_4_OK。

---

## 2026-07-21 五次更新：执行期验证闭环（agent.md 镜像 + 六步法验 PurePen + 飞轮写回实测）

> 主理人：易牧 ｜ 团队 `opc-exec-verify` ｜ 最近更新：2026-07-21

### 任务①（已完成）：优化同步进 agent.md 项目级镜像
- 在 `agent.md` 第三章新增 **§3.10 OPC 验证与运营增强（项目级镜像）**，含 3.10.1 微信生态六步法 / 3.10.2 数据飞轮写回 / 3.10.3 护城河资产+话术 / 3.10.4 命名承接，逐条标注来源（文章 A/B）。
- `agent.md` 升 **v1.1 → v1.2**（350 行）；§4.1 关键决策追加本次记录。grep 校验 §3.10 四小节 + v1.2 均落盘。

### 任务②（已完成）：opc-mvp-designer 用微信生态六步法验 PurePen 需求
- 调度 `opc-mvp-designer`（验真）实跑 PurePen 在微信生态的需求验证（零凭证，公开信号近似微信指数）。
- 产出：`opc-doc/outputs/06-mvp/wechat-demand-validation-purepen-20260721.md`（172 行，需求强度=强，含六步法逐步记录 + 承接搜索词 + 零凭证最小体验方案 A/B/C + 转化漏斗阈值）。主理人已亲读回核实，真实非占位。

### 任务③（已完成）：opc-dashboard-reviewer 实测飞轮写回
- ②回传后调度 `opc-dashboard-reviewer`（复明），以②验证数据为输入，实测「数据飞轮写回」（写回 assumptions.json / 记忆 / 案例库），验证优化②的真实闭环。
- 产出：`opc-doc/outputs/09-dashboard-review/review-20260721.md`（94 行，含复盘瓶颈结论 + 飞轮写回明细）。
- **飞轮写回三载体全部实测成功（主理人已亲读回核实）**：① `assumptions.json` H4 新增 confidence 字段 + 顶层 evidence_log；② `.workbuddy/memory/2026-07-21.md` 追加验证结论节（68–80 行）；③ `asset-register-v2.md` 追加 E12（#30 行）+ 计数 29→30 项。证明今天加的「数据飞轮写回」机制真实可运行。

### 落盘（主理人汇总，2026-07-21）
- `current-stage.json`：新增 `wechat_demand_verify` 块（status=completed, decision_ref=D-21, 含三载体写回清单 + H4 执行重点）；note/next 更新为"执行 H4 零凭证方案、H0 受闸门控制"。
- `decisions.json`：追加 **D-21**（微信六步法实证 + 飞轮写回实测 + H4 执行重点）。
- `agent.md`：升 v1.2，§3.10 镜像 4 项优化（任务①）。
- 团队 `opc-exec-verify` 已解散。

---

## 2026-07-21 六次更新：H4 起量执行追踪表模板

> 主理人：易牧 ｜ 执行期运营脚手架 ｜ 最近更新：2026-07-21

### 交付（执行期追踪工具，非新 OPC 阶段）
- `opc-doc/outputs/execution/H4-tracking-template.md`：极简日报表（宽表，人工填 6 列）+ 阈值对照与状态表（长表：日期/关键指标/阈值/实际值/状态）+ 四层自动执行机制（L1 数据录入 / L2 自动计算 / L3 预警推送 / L4 触发需人工确认）+ 校准说明 + 来源标注（②漏斗阈值 / ③闸门逻辑）。
- `h4_tracker.py`：stdlib 脚本，读 `h4-daily.csv` → 聚合/算留资率/滚动7日均/比对阈值/连续达标计数/异常预警/生成 H0 触发建议，输出 `h4-status.md` + `h4-alerts.md`。
- `h4-daily.example.csv` + `h4-daily.csv`（7 天演示数据）。
- **实跑验证**：7 日均曝光52/咨询20/留资率1.61% 全达标、连续4天达标→生成 H0 闸门触发建议，逻辑真实可用。

### 合规与边界
- 仅度量与预警，不发布、不烧凭证（D-08/D-09/D-11）；发布/上线动作需人工。
- 诚实声明：小红书/公众号无开放 API，命令行无法无人值守直连抓取；真实「自动拉取」= 读导出文件或认证服务号 API。
- 已 OFFER 帮建每日 automation 跑脚本实现零干预，待用户确认（阈值需校准 + 演示数据需清）。

---

## 2026-07-22 会话 · 执行期推进（A 渠道 + H4 每日自动化）

> 主理人易牧执行。前序：H4 草稿扩量（3→11 篇）已完成并验证。

### 交付 1 · A 渠道（公众号钩子 + 智能体最小体验）— ② 方案 A 落地
- **设计文档**：`opc-doc/outputs/execution/a-channel-wechat-hook.md`
  - 命名：订阅号主名 `论文降AI率`（备选 `降AI率`）；菜单 免费测AI率→语义保真改写→术语不丢的降重。
  - 零凭证钩子原理：本地 heuristic 镜像 `local_ai_rate.py`（句长突发+用字多样性），纯前端零依赖零凭证。
  - 智能体最小体验动线：粘贴段落→AI率初诊+高危段标红→引导预约等待列表（不接单，D-11）。
  - 合规护栏：D-08 发布属人工 / D-09 不挂链仅限小红书口径（公众号内可菜单/关键词引导）/ D-11 非代写。
  - 引流留资：channel=`wechat` 接入同一 `h4-daily.csv` 追踪表。
- **钩子 HTML（可部署）**：`opc-doc/outputs/promo/a-channel/ai-rate-checker.html`
  - 自包含静态页，纯前端；忠实移植 `local_ai_rate.py` 到 JS（Node 验证：AI模板→28% / 人写→0% / 过短→样本不足）。
  - 整体 AI 率% + 风险等级 + 逐句高危段标红；底部固定「本地启发式估算，非代写代做」声明。
  - 可作公众号菜单目标，亦可同构作方案 C 静态落地页钩子。

### 交付 2 · H4 每日自动化（零干预）
- 建 WorkBuddy automation `automation-1784683501454`，每日 08:00 跑 `h4_tracker.py`（托管 python + `env -u PYTHONPATH`）。
- 脚本烟测通过（exit 0，CSV 空时优雅报「无数据」）。
- 范围：计算/预警/H0触发判定全自动；唯一人工步骤=每日填 `h4-daily.csv`；不自动烧凭证/发布（D-08）。
- 注：当前 `h4-daily.csv` 仅表头（已清演示数据），待人工录入真实日数据后发挥效用。

### 状态落盘
- `current-stage.json` 新增 `a_channel`(built) + `h4_automation`(active) 块。
- 下一步（仍执行期）：人工注册订阅号+配置菜单+托管钩子HTML；每日填 H4 表；B 渠道小红书不挂链已就绪可并行起量；达标触发 H0 闸门（人工确认）。

---

## 2026-07-22（续）· 执行期推进 · 手补 004–011 承接词

- 动作：将 h4-drafts 的 sample-004~011 八篇骨架草稿补齐**标题（嵌入 ② 承接词「降AI率」+ 前后 AI 率对比）**与**钩子/痛点段（桥接产品价值：语义保真降重红线降幅）**，头部标注改为「承接词已对齐②「降AI率」」。对齐 sample-001 的润色口径。
- 验证：D-09 无 http（grep 扫描通过）；无残留「人工补」占位；草稿总数 11 篇（001–003 此前已手补）；8 篇全部 前>后 方向正确。
- 合规：D-11 非代写代做声明保留；发布仍属人工（D-08 半自动不自动化发布），草稿已达可发布质量，待 B 渠道小红书账号 / A 渠道订阅号承接。
- 落盘：current-stage.json 新增 `h4_draft_polish`(polished) 块。
- 下一步（仍执行期）：① 人工注册订阅号「论文降AI率」+ 托管钩子 HTML 挂菜单；② B 渠道小红书账号起量（11 篇已就绪）；③ 每日填 h4-daily.csv → 连续 3 天达标触发 H0 闸门。

## 2026-07-22（续二）· 执行期推进：钩子部署 + 发布日历
- **A 渠道钩子部署**：`ai-rate-checker.html`（零凭证免费测AI率，纯前端）经 CloudStudio 部署获 HTTPS：`https://fbfb4e17ac1940f68a1e6afce5ee3d09.app.codebuddy.work`（已 WebFetch 验证页面真实可服务）。可直接挂公众号菜单『免费测AI率』。
- **H4 发布日历**：`opc-doc/outputs/promo/h4-publish-calendar.md` — 11 篇(sample-001~011)两周排期 + 每篇 D-09/D-11 自检 + 公众号(A)复用说明 + H0 闸门联动；主渠道 B 小红书不挂链(xhs)，次渠道 A 公众号钩子(wechat 复用 hook_url)。
- 落盘：current-stage.json 的 `a_channel` 块补 `hook_deployed/hook_url`；新增 `h4_publish_calendar`(built) 块。
- 剩余=纯人工(D-08)：按日历逐篇发小红书 / 注册订阅号挂 hook_url / 每日填 h4-daily.csv；本自动化不代发代烧凭证。

## 2026-07-22（续三）· 执行期自动推进：发布清单 + 合规预检 + A 渠道稳托管
- **草稿发布清单 CSV**：写 `opc-doc/outputs/promo/export_drafts_csv.py`，解析 11 篇 sample-*.md 提取 id/标题/正文/钩子/整篇全文，生成 `h4-drafts-export.csv`（utf-8-sig，Excel 中文直开）。用途=降低人工复制到小红书后台成本；草稿改动后重跑脚本即刷新。
- **发布前合规预检**：写 `opc-doc/outputs/promo/check_drafts_compliance.py`，逐篇扫 D-09 不挂链(无http/www/域名) / D-11 非代写声明 / 标题≤20字 / 钩子非空。初检 sample-001/002/003 标题 23-25 字超长，已对齐为 ≤20 字同款格式（降AI率47→0%·文献综述保真改写 等），复检 **11/11 全绿**，exit=0 才进人工发布。
- **A 渠道稳托管包**：复制 `ai-rate-checker.html` 为 `opc-doc/outputs/promo/a-channel/gh-pages/index.html` + 写 `README.md`（push+开 Pages 部署指引）。原因=CloudStudio 沙箱 URL 临时可能过期，公众号菜单需永久 HTTPS；GitHub Pages 免费永久自带 HTTPS，契合 H0 上线链路。部署为人工动作（建仓 push → Settings/Pages）。
- 落盘：current-stage.json 新增 `h4_draft_csv_export` / `h4_compliance_preflight` / `a_channel_ghpages` 三块；本段全部为无需凭证的自动产出。
- 剩余纯人工(D-08)：按 CSV 复制发布小红书 / 注册订阅号并改挂 GitHub Pages 永久 URL / 每日填 h4-daily.csv → 连续 3 天达标触发 H0 闸门。

## 2026-07-22（续四）· 执行期飞轮回填 + 追踪健康校验（用户"继续推进所有可推进任务"）
- **资产登记表 v2 回填**（D-20 飞轮纪律：当天回填、追加不覆盖）：将 H4 执行期 4 项新交付物登记为可复用资产 → `#31 H4草稿CSV导出器(P0)` / `#32 合规预检器(P0)` / `#33 钩子GH Pages包(P1)` / `#34 每日追踪自动化(P0)`。总数 `v2 共 34 项（P0×14 / P1×16 / P2×4）`；P0 速查补 #31/#32/#34（均服务 H4 起量）；依赖图补「草稿→合规校验→发布→每日回填→H0 闸门」闭环说明。
- **H4 追踪器健康校验**：重跑 `h4_tracker.py` exit=0（h4-daily.csv 仅表头=预期无数据）；automation 命令的 python 路径与脚本均存在、命令有效；每日 08:00 自动化（automation-1784683501454）链路完好。
- 落盘：current-stage.json 新增 `asset_backfill_h4` 块；本段全部为无需凭证的自动产出（飞轮记账 + 健康校验）。
- H0 上线文档已由资产 #15 `PRELAUNCH-CHECKLIST.md` 覆盖（不在 opc-doc 内），本段不重复新建。
- 剩余纯人工(D-08)：按 CSV 发布小红书 / 注册订阅号改挂 GH Pages / 每日填 h4-daily.csv → 连续 3 天达标触发 H0 闸门（触发后按 PRELAUNCH-CHECKLIST 填凭证+Vercel 部署，不自动烧凭证）。

## 2026-07-23 · ima 知识库驱动 H4 战术升级（opc-ima-upgrade 专队）
- 触发：用户要求查看 ima 知识库订阅文档以优化升级。ima-mcp 已连接，列出订阅库；聚焦「AI编程出海独立开发资源库(7354338238295398)」「AI出海精选知识库(7389943097721763)」。
- 检索+抓取 3 篇高价值文档全文：《普通人靠AI编程+小红书从0到1变现》《出海没流量？低门槛冷启动跑通闭环的社区平台》《AI编程做的网站单月营收5w》等，提炼战术。
- 建专队 `opc-ima-upgrade`，派资产沉淀师沉墨(opc-asset-strategist)做专业合成（主理人易牧编排+落盘）。
- 交付落盘：
  - `opc-doc/outputs/execution/h4-tactics-upgrade.md`（#36）：① 小红书B渠道精细化(对比条封面+痛点标题+类目合规) ② 新增C渠道Reddit零凭证方案 ③ 蓝链过渡合规化(D-09边界) ④ 11篇草稿×三渠道映射 ⑤ H0闸门联动。
  - `opc-doc/outputs/execution/c-channel-reddit-sop.md`（#37）：Reddit 自问自答+利他打法+Karma养成+SEO文章+MVP邮箱闭环 SOP；h4-daily.csv 将增 reddit 行。
  - 资产登记表 v2 回填 #35(ima来源/P2) #36(战术补遗/P1) #37(Reddit SOP/P1) → **v2 共 37 项（P0×14 / P1×18 / P2×5）**。
- current-stage.json 新增 `ima_kb_synthesis` / `h4_tactics_upgrade` / `c_channel_reddit` 三块。
- 本次为执行期战术升级，不依赖凭证；合规 D-08/D-09/D-11 全程守住。

## 2026-07-23（续）· ima 知识库 v2 深度融合（opc-ima-kb-integrate 专队）
- 触发：用户要求「基于已有的 IMA 知识库，继续根据订阅的知识库相关文档进行优化和升级；新内容与现有知识库有机融合、避免重复或冲突」。
- 范围：系统盘点全部 4 个 ima 订阅库（128+篇主库 + 精选库 + 2 个低相关 Agent 库），共 416 unique docs / 231 relevant candidates。3 篇最高价值文档全文作事实底座（《Creem 被封了！》《程序化SEO完全指南》《Stripe 支付接入》）。
- 建专队 `opc-ima-kb-integrate`，派资产沉淀师沉墨(opc-asset-strategist)做专业合成（主理人易牧编排+落盘）。去重铁律：先查重再合成。
- 交付落盘（严格去重、缺口补齐、体系完整）：
  - `opc-doc/outputs/knowledge/kb-integration-hub.md`（#38 知识中枢索引·P1）：4 库侦察结论 + IMA→PurePen 映射表 + 现有体系全景图 + 缺口补全清单 + 交叉引用索引 + 避免重复原则 + 低相关索引注记。
  - `opc-doc/outputs/execution/h0-launch-infra.md`（#39 H0 上线基建·P0）：支付选型(Stripe主/Creem MoR/PayPal/微信支付宝) + Stripe 接入要点 + 合规数据安全红线(RLS全开/平台无谈判权/可替换原则/应急) + 公司账户基建索引 + 衔接 D-17/PRELAUNCH-CHECKLIST + H0 后人工动作清单。
  - `opc-doc/outputs/execution/seo-organic-growth.md`（#40 SEO 有机增长·P1）：pSEO+Google红线+三层框架 + 外链/KGR索引 + PurePen 搜索模式举例 + 与Reddit/小红书协同 + H0 后时序。
  - #41 ima Agent/智能体库低相关索引注记（并入 hub §6，不单列文件）。
- 资产登记表 v2 回填 #38(P1)/#39(P0)/#40(P1)/#41(P2) → **v2 共 41 项（P0×15 / P1×20 / P2×6）**；P0 速查补 #39；依赖图补 38–41。
- current-stage.json 新增 `ima_kb_v2_integrate` 块；note/next 更新（H0 基建/SEO 知识已就绪）。
- 去重边界：H4 三渠道战术(#36/#37/#33)已覆盖→交叉引用不重做；需求/产品化(#2/#7/#30)已覆盖→交叉引用；Agent 技术库(730/729) 90%+ 低相关→仅索引；仅补「上线基建」「自有搜索流量」两块真正缺口。
- 本轮为执行期知识库完善，不依赖凭证；合规 D-08/D-09/D-11 全程守住。专队 `opc-ima-kb-integrate` 待关闭。
