# 核实：另一台电脑如何实现「全自动上架」

> 触发：用户要求查 GitHub 上 ima 知识库相关文档，核实另一台电脑全自动上架的实现方式。
> 日期：2026-07-17
> 结论先行：**另一台电脑的"全自动上架"= IMA 知识库(RAG 中枢) + 内容工厂/小红书运营技能 + ArgusBot 无人值守循环**，跑在 WSL/Linux 环境。但**该模式与本项目已记录的 D-08（半自动姿态，禁无人值守批量发布）直接冲突，且违反小红书 2026-04-27 治理主张（AI 托管账号直接封禁）**。本项目只能采纳其"合规子集"。

---

## 一、本地事实（双机架构已确认）

来自 `01-resource/resource-inventory.md`：

| 事实 | 出处 | 含义 |
|---|---|---|
| GitHub 私有仓库 `ima-knowledge-base`「双机共用同账号，知识沉淀中枢」 | resource-inventory.md:86,97 | 这就是"另一台电脑"共享的知识中枢 |
| ArgusBot（`codex_autoloop`）「可无人值守执行」 | resource-inventory.md:87 | 另一台电脑的"全自动"引擎 |
| `mcp.json` 18 条路径全为 `/mnt/e/...`(WSL 风格)+ `python3` | p1-plan.md:19 | 另一台电脑是 **WSL/Linux**，能跑当前 Windows 跑不起来的脚本 |
| `build_ima_bundle.py`(4527B) 把运营文档/产品数据/工作记忆/技能/模板归集到 `IMA上传汇总/` | diagnosis-report.md:48,68 | 本机已有"知识归集→IMA"的本地雏形 |
| `run_auto_tasks.py` T1–T7：清理目录→回填模板→笔记配图→ARK 上架包→发布排期→资产对账 | run_auto_tasks.py | 上架/发布自动化的本地骨架已在 |

**关键推断**：另一台电脑 = 同一 GitHub 账号下的 WSL 机，跑同一套 `xiaohongshu_automation` 脚本 + ArgusBot 无人值守循环，并把知识沉淀进 `ima-knowledge-base` ↔ IMA 知识库。

---

## 二、GitHub 上 ima 知识库自动化的真实拼图

| 项目 | 作用 | 与本项目的关联 |
|---|---|---|
| `hdsz25/tencent_ima_mcp` | Python MCP Server，IMA 知识库全功能 CRUD + 搜索 + 网页提取 + 文件上传；cookie 认证（浏览器 devtools 取 `x-ima-cookie`） | 让智能体**程序化操作 IMA** 的底层能力 |
| `alexqueque/tencent-ima-copilot-mcp` | IMA `ask` RAG 问答 MCP | RAG 检索层 |
| `imastuido/ima-knowledge-ai` + `ima-all-ai` | IMA 知识库 RAG 技能；**IMA XSH Pro** = 小红书种草转化运营技能（`image_post`/`short_video`/`both`/风险审查/**小红书发布**） | "全自动上架"的执行层 |
| `EdwardWason/web-to-FIM` | 任意网页/小红书链接→Markdown，三处存放（Obsidian/飞书/**IMA 知识库**） | 知识采集入库 |
| `content-swarm`(ClawHub) | 五步闭环：选题→**IMA RAG 检索**→内容创作→封面→**多平台分发(@xiaohongshu-upload)**；KPI ≥5条/天 | "全自动"内容矩阵范式 |
| `cn-sec.com` 教程 | IMA + AI 自动采集 GitHub 知识库全流程（WorkBuddy/OpenClaw/Hermes + IMA 官方 Skill） | 知识中枢搭建 SOP |
| 腾讯云文档 `ima WorkBuddy 工作流` | 知识沉淀→AI 执行；个人全局自动化支持 Cron/事件触发 | 固化自动化的官方路径 |

---

## 三、另一台电脑「全自动上架」的完整链路（还原）

```
[知识中枢] ima-knowledge-base(GitHub) ──同步──> IMA 知识库(云端 RAG)
        ▲                                        │
        │ web-to-FIM / 采集技能                    │ RAG 检索(SOP/产品数据/历史爆款)
        │ (小红书链接/网页→Markdown)               ▼
                                              [内容工厂] XSH Pro / content-factory
                                                生成笔记 + 封面 + AI痕迹检测(anti-ai-slop)
                                                        │
                                                        ▼
                                              [风险门禁] 平台合规审查(风险审查/合规闸门)
                                                        │ 通过
                                                        ▼
                                              [分发] @xiaohongshu-upload / XSH Pro image_post
                                                        │
                                                        ▼
                                              [小红书] 自动发布（无人值守）
                                                        ▲
                                              ArgusBot(codex_autoloop) 循环驱动以上全部
```

**环境**：WSL/Linux（`/mnt/e/...` 路径 + `python3`），脚本与 ArgusBot 在此真跑。

---

## 四、⚠️ 合规性判定（必须如实告知）

| 维度 | 另一台电脑做法 | 本项目约束 | 冲突？ |
|---|---|---|---|
| 发布姿态 | **无人值守批量发布** | **D-08 半自动：禁无人值守批量发布** | ❌ 直接冲突 |
| 平台治理 | AI 托管账号自动发 | 小红书 2026-04-27：**AI 托管账号直接封禁** | ❌ 违规封号风险 |
| 知识归集/RAG | IMA 知识库沉淀 | 无限制，且正是我们缺的能力 | ✅ 可采纳 |
| 风险门禁 | 发布前合规审查 | 我们已建 `compliance_gate.py` | ✅ 可采纳 |

**结论**：另一台电脑的"全自动"= 把 D-08 明令禁止的"无人值守批量发布"做满了。这在我们项目里**不能复制**——会触发封号且违背已记录决策。

**可采纳的合规子集**（已落盘为 `ima_kb.py` 适配器 + 设计更新）：
1. ✅ **IMA 知识库作为跨机知识中枢**（归集 SOP/产品数据/历史爆款，RAG 检索）——完全合规、且补上我们"知识沉淀"短板
2. ✅ **AI 痕迹检测 + 合规闸门**（生成草稿时跑，我们已有 `compliance_gate.py`）
3. ⛔ **发布动作保留人工目检 + 扫码重登**（D-08 半自动）——不接 `@xiaohongshu-upload` 无人值守循环

---

## 五、建议的合规改造架构（替代"全自动"）

```
IMA 知识库(RAG 中枢)
   └─> 草稿生成(读 RAG + 产品数据) → anti-ai-slop + compliance_gate 风险门禁
        └─> 产出「待人工确认」草稿包 + 发布排期(schedule.json)
             └─> [人工目检 + 扫码重登] → note_publisher 单条发布   ← 半自动边界在此
```

这既复用另一台电脑的"知识驱动"优势，又守住 D-08 与平台治理红线。

---

## 六、待办

- [ ] 用户提供 IMA 凭证（OpenAPI Client ID/Key 或 cookie）后，可真连 `ima_kb.py` 做知识归集/RAG 验证
- [ ] 将 `build_ima_bundle.py` 的本地归集升级为 IMA OpenAPI 上传（已写 `ima_kb.py` 适配层）
- [ ] 草稿生成接 IMA RAG（需先建知识库并入库）
- [ ] 发布维持人工目检（D-08），不接无人值守循环
