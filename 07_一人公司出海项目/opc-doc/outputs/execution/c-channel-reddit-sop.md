# C 渠道 · Reddit/海外社区零凭证起量 SOP（PurePen AI）

> 定位：H4 零凭证起量的 **C 渠道**（与 B 小红书、A 公众号并列），直接对口留学生 / 英文论文 / 海外学术群体，语种互补。
> 哲学同构：不烧广告凭证、不买量，靠**内容利他 + 社区信任**冷启动。
> 合规红线：**D-08 发帖人工 / D-09 小红书不挂链（本渠道不受限但须守组规）/ D-11 全程标注 tool/method share, not代写**。
> 来源：ima 知识库「AI编程出海独立开发资源库」《出海没流量？低门槛冷启动跑通闭环的社区平台》等已验证打法（2026-07-23 提炼）。

## 0. 心智模型：问题思维 > 产品思维
- 错误路径：有想法 → 做产品 → 找用户。
- 正确路径：**场景 → 痛点 → 解 → 产品**。用户买的是"解决问题的结果"，不是工具本身。
- Build in Community ＞ Build in Public：在目标社区与真实用户对话、被共创，而非公开暴露想法招来抄袭。

## 1. 目标子社区（按草稿场景映射）
| 子社区 | 对口草稿 |
|---|---|
| r/AcademicWriting、r/GradSchool、r/PhD、r/AskAcademia | 001 文献综述 / 002 摘要 / 005 硕士综述 / 006 核心方法 / 007 开题背景 |
| r/EssayWriting、r/HomeworkHelp、r/EnglishLearning | 004 本科绪论 / 009 工作报告 / 011 课程结论 |
| r/StatementOfPurpose、r/Chinese、r/IntltoUSA | 010 留学 PS |
| r/copywriting、r/marketing | 003 产品文案（转 SEO 文章素材） |

## 2. 新号养成（组规第一，防封）
1. **先涨 Karma**：新号在泛流量大社区（r/CasualConversation、r/AskReddit、r/explainlikeimfive）真诚互动，快速积累 K 值（账号信用），再进学术垂直 sub。
2. **研读组规**：进每个 sub 先读 sidebar/规则，确认是否允许自荐/链接；硬广贴会被删或封号。
3. **判断社区活跃度**：Subscribers 大、Viewers/Online 实时有人、Hot 帖时间线集中在近一周 = 值得深耕。

## 3. 两种合规打法
### A. 自问自答型（挖需求 + 软承接）
- 标题公式：【人群】+【痛点】+【寻求工具解决方案】
  - 例：`International grad student, my literature review keeps getting flagged 40%+ AI by Turnitin — any tool that actually helps?`
- 以**真实用户身份**在评论区答：「最近找到个不错的工具 XX 解决了我的问题」，附使用前后 AI 率对比，**不硬广**。
- Reddit 权重高 → 谷歌常返回 Reddit 结果 = 变相 SEO。

### B. 真诚利他型（主页引流）
- 昵称改成 `PurePen · AI-rate check & semantic rewrite`。
- 主页 Bio 留产品介绍 + 方法笔记。
- 去目标帖子下**回答问题**（不挂链），吸引用户主动看你主页。

## 4. SEO 文章飞轮
- 把高赞提问改写成主站 SEO 文章（例：`How to lower AI detection rate in your essay without losing meaning`）。
- 文内自然提及免费测 AI 率工具，引流主站 / 公众号等待列表。
- 前提：账号基础好、发帖符合组规；每篇都带软广链接风险高，宜节制。

## 5. MVP 邮箱验证闭环（零凭证）
1. 社区挖痛点（看 Hot 帖 + 评论区负面情绪）。
2. 发「I built XX to solve XX」主题贴，展示 Demo（ai-rate-checker 思路 / 对比条图）。
3. 帖内埋**落地邮箱注册页**收集种子用户邮箱（= H4 的 leads，零凭证）。
4. 规律 Build in Community / 邮件同步产品动态，避免闭门造车。

## 6. 承接与 H0 闸门联动
- C 渠道 leads/inquiries → 公众号等待列表 / 主站（不抢跑成交，D-11）。
- `h4-daily.csv` 增 `reddit` 行：`exposure`(帖浏览/upvote)、`clicks`(主页访问)、`inquiries`(评论/DM)、`leads`(邮箱注册)。
- 连续 3 天达阈值 → `h4_tracker.py` 出 H0 闸门触发建议（与 xhs/wechat 分列，去单点依赖）。
- 触发后：填 Supabase/LLM/Waffo 凭证 + Vercel 部署（人工确认，自动化不代操作）。

## 7. 自检清单（发帖前勾）
- [ ] 帖子是"解决问题"而非"推产品"？
- [ ] 是否遵守目标 sub 组规（链接/自荐是否允许）？
- [ ] 是否标注 tool/method share, not代写（D-11）？
- [ ] 是否硬广刷屏？（否）
- [ ] 账号 Karma 是否足够、不在新号期强推？（是/否）

---

*本 SOP 为战术执行层，不替用户写帖文；所有承接均落在 D-08/D-09/D-11 合规口径内。*
