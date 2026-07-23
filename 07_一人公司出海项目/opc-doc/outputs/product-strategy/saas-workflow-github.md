# SaaS 产品工作流参照（来自 GitHub awesome 系列）

> 目的：把本地克隆的 GitHub 仓库（references/github-repos/）里的 SaaS 工作流最佳实践，
> 提炼并映射到「净文 AI / PurePen AI」的 M0–M7 开发节奏，指导后续任务落地。
> 这些仓库是「研究资料不是照搬代码」——取方向、取痛点、取分发渠道，而非逐行抄。

## 1. 来源仓库（已克隆，INDEX.md 索引）

| # | 仓库 | 价值 | 用于 |
|---|---|---|---|
| 05 | `Micro-SaaS-Examples/Best-Micro-SaaS-Tools` | 海量 Micro-SaaS 工具分类（AI/写作/教育/营销…） | 找同类竞品、找痛点、找功能参照 |
| 06 | `princepal9120/awesome-solo-founder-oss` | **Lean SaaS stack** 完整开源栈（auth/db/billing/analytics/email/deploy） | 定技术栈、选型 |
| 03 | `mezod/awesome-indie` | 独立开发者社区 / 资讯 / 案例 / 特定主题 | 获客心智、build-in-public |
| 09 | `DirectorySurf/awesome-launch-platforms` | Product Hunt / HN / Indie Hackers / BetaList 等发布平台 | GTM 上线渠道 |
| 10 | `mahseema/awesome-saas-directories` | Capterra / SaaSHub / TapRefer 等 SaaS 目录 | GTM 收录、affiliate |
| 01/02/04 | one-person-company / chinese-indie-dev / indiehackers | 一人公司案例与痛点 | 方向验证 |

## 2. Lean SaaS Stack（取 06，已落进 PurePen）

06 给出的「单人创始人精简栈」与本项目已采用的范式高度一致，确认如下：

| 环节 | 06 推荐 | PurePen 落地 | 状态 |
|---|---|---|---|
| 框架/后端 | Open SaaS (Wasp) / Supabase | **Next.js 14 + Supabase** | ✅ M0.1 |
| 认证 | Better Auth / Auth.js / Logto | Supabase Auth | ✅ M0.2 待执行 |
| 支付 | Polar / Lago | **Waffo Pancake**（替换 open-saas 内置 Stripe） | ✅ M0.1b |
| 分析 | PostHog / Umami / Plausible | 待接入（M7 埋点） | ⏳ |
| 邮件 | Listmonk / Dittofeed / useSend | 待接入（M7 生命周期邮件） | ⏳ |
| 部署 | Coolify / Vercel | **Vercel** | ✅ M0.3 |
| 支持 | Chatwoot | 待定 | ⏳ |

> 关键修正：原 `07-open-saas` 内置 Stripe，按 `Waffo接入代码操作卡.md` 已替换为 Waffo
> Pancake（原因：面向中国开发者收全球款、订阅+一次性、Webhook 自动通知、提现至大陆银行卡/支付宝）。

## 3. 工作流映射（GitHub 实践 → PurePen 里程碑）

| 阶段 | GitHub 启示 | PurePen 动作 |
|---|---|---|
| 找痛点 (M0 前) | 05/01/02 的 AI 写作/教育类目需求密集 | 锁定「降重/降AI」为 7 月毕业季刚需 |
| 做 MVP (M1–M5) | 06「Ship a SaaS MVP」用 Supabase+Open SaaS | 单文档上传→降重+检测+逐句改写，先 Web 后 API |
| 接支付 (M0.1b) | 06「Add payments」用 Polar/Lago → 本项目换 Waffo | client/checkout/webhook 三件套已落地 |
| 上线 (M0.3 + GTM) | 09/10 发布平台 + 目录 | Product Hunt / HN Show / Indie Hackers 首发；Capterra/SaaSHub 收录 |
| 迭代 (M7) | 03「MAKE and TRY stuff」+ PostHog 数据驱动 | 降重率/AI 通过率/留存看板，按数据调定价与功能 |
| 获客 (GTM) | 03 社区 + 小红书站外（路径 B affiliate/图书佣金） | 内容获客 → 站外 SaaS 转化（D-15） |

## 4. 发布 / 获客渠道清单（取 09/10，待 GTM 阶段启用）

- **首发平台**：Product Hunt、Hacker News (Show HN)、BetaList、Indie Hackers、Makerlog
- **AI 目录**：Futurepedia（09 已列）、Capterra、SaaSHub、Zapier Directory、B2B Stack
- **affiliate**：TapRefer（10 已列，最大 affiliate 目录）
- **社区**：Indie Hackers Products、Reddit /r/startups、Makerlog build-in-public
- **站外内容获客**：小红书（路径 B affiliate + 图书佣金，D-15 判定；不自营虚拟商品，避 180 天门槛）

## 5. 下一步可直接复用的 GitHub 资产

1. `06-awesome-solo-founder-oss` → 待接入 PostHog/Listmonk 时按清单选型。
2. `09/10` → M0.3 部署后立刻铺首发 + 目录收录，拿到第一批外部流量。
3. `05` → M7 功能迭代时对照「AI & Writing / Education」类目找差异化功能点。
4. `Waffo接入代码操作卡.md` + `payment_config/` → 支付联调与 Webhook 验签的权威依据。

## 6. 风险提示（与之前决策一致）

- 07-open-saas 仍未克隆成功（INDEX 标记重试中），但其 Stripe 模式已被 Waffo 取代，不影响。
- Webhook 验签的 canonicalRequest 顺序以 Waffo 官方页面为准，上线前务必核对（已在 `src/app/api/webhooks/waffo/route.ts` 注明）。
- 小红书侧仍维持 D-08 半自动：SaaS 本身不受虚拟商品新政影响，但获客内容须保留人类参与、禁 AI 托管发布。
