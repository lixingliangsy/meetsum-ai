# H0 上线基建知识包 · h0-launch-infra（PurePen AI · 执行期）

> 定位：H0 闸门触发前的「上线基建知识中枢」——补齐现有 PRELAUNCH-CHECKLIST（#15）之外的**实操经验层**（支付/数据安全/账户基建）。
> 来源：ima 库①/② 提炼《Creem 被封了！》《出海网站实战：Stripe 支付接入，从 0 到收款全流程》等。
> 层级：战术/资产层（不写前端代码、不写正文文案；填凭证与部署动作指向 #15，由人工执行）。
> 合规：D-08/D-09/D-11（本包偏后端/增长，用户可见内容仍守 D-11 仅方法/工具分享，非代写）。

## ① 支付选型（多通道覆盖，去单点依赖）

| 通道 | 角色 | 要点（来自 ima 提炼） | 适用 |
|---|---|---|---|
| **Stripe** | 主收单 | 全球卡组织覆盖；订阅原生（Checkout + Billing）；支持微信/支付宝（利好国内不便海外卡用户）；生产用受限密钥 | 主收款 |
| **Creem / MoR** | 税务合规层 | Merchant of Record 模式，替你处理 VAT/销售税合规；但**平台可冻结、审查无谈判权**（见③） | 不想自建税务主体时的 MoR 补充 |
| **PayPal** | 备选通道 | 海外用户熟悉；独立接入覆盖 Stripe 未达人群 | 备选 |
| **微信/支付宝** | 国内补充 | 经 Stripe 接入，降低国内用户支付摩擦 | 国内用户补充 |

选型建议：**Stripe 为主收单**；若暂不想处理欧洲 VAT，可用 Creem/MoR 作税务合规层（但须接受「平台依赖风险」，见③）；PayPal 作备选覆盖；微信/支付宝走 Stripe 覆盖国内。

## ② Stripe 接入要点（来自《出海网站实战：Stripe 支付接入》）

- **流程**：用户点支付 → 后端建 Checkout Session → 跳 Stripe 支付页 → 付款 → Stripe 发 Webhook 通知 → 服务器验签更新订单。
- **密钥**：`pk_` 公钥可公开 / `sk_` 私钥绝密；`test_`（测试）与 `live_`（生产）两套隔离；测试卡 `4242 4242 4242 4242`。
- **Webhook**：本地用 `stripe listen` 转发 localhost（每次重启生成新 secret，调试期保持终端开）；生产填 `https://域名/api/payment/webhook`，取 Signing secret 存环境变量。
- **受限密钥（最佳实践）**：生产用受限密钥（Checkout Sessions 写 / Customers·Payment Intents 读 / Prices·Products 读），即使泄露损失可控。
- **金额单位**：传「分」（39 美元传 `3900`）；手续费约 `3% + $0.3/笔`。
- **订阅**：Checkout + Billing 原生支持，契合 PurePen 订阅制。
- **坑**：Webhook 验签 secret 本地/生产搞混；测试/生产密钥混用；金额单位错（少 100 倍）。

## ③ 合规与数据安全红线（来自《Creem 被封了！》复盘）

1. **Supabase RLS 必须全开（定时炸弹）**：Supabase 默认**不开 RLS**，PostgREST 暴露公开 REST API → 数据库被挂暗网（泄露邮箱/名字/OAuth ID/客户ID/订阅状态/积分/交易/推荐码）。"它给了你枪，子弹要自己上"——**每张表须手动开 RLS + 正确策略**。对应 #14 `schema.sql` 须含 RLS 段（D-17 已定 Supabase MVP）；若缺失，上线前必须补。
2. **支付平台无谈判权**：卡组织（Visa/MC）介入后平台必切割自保；Stripe/PayPal/Creem/LemonSqueezy 同理，你只是风险节点。任何合规审查你无法抗辩。
3. **第三方可替换原则**：Supabase 可封 / Creem 可冻 / Vercel 可停 / Google OAuth 可限。"核心能力＝任何平台炸了**48 小时内恢复运转**；确保每个第三方**一周内可替换**。"
4. **数据泄露应急**：发现泄露 → 立即开 RLS + 轮换密钥 + 通知用户；案例 6 小时补 RLS + 万字回复。架构级降险可考虑 Cloudflare D1（无公开 API）等替代公开 REST 暴露的方案。

## ④ 公司/账户基建（仅要点 + 索引，不展开步骤）

- **美国公司注册**（LLC/Corp）：影响 Stripe 主体与税务；要点见 ima「从海外公司注册到 Stripe 收款跑通全流程」「网站出海每日分享办理美国公司的方式」。
- **港卡 / 美国银行卡**：Mercury / Wise / ZA Bank 要点；见 ima「出海必备一天搞定5张港卡」「全球收款 Creem 提现」。
- **Google 登录**：OAuth 接入 2 种方式（见 ima「出海建站必备 Google 登录 2 种接入」），但须记③的平台依赖风险。
- **注**：上述涉及法律/税务，建议咨询专业；本知识包**不展开操作细节**，仅列要点与索引，避免与现有资产重复。

## ⑤ 与现有 D-17 Supabase MVP / PRELAUNCH-CHECKLIST 的衔接（避免重复）

- **D-17 Supabase MVP**：已定 Supabase 为数据层（#13 核心 lib / #14 schema）。本包③强调「RLS 全开」是上线**硬前置**，与 #14 `schema.sql` 的 RLS 段一致——若 schema 缺 RLS 策略，须先补再上线。
- **PRELAUNCH-CHECKLIST（#15）**：已是 H0 物理前提（凭证采集 + 部署三步 + 门禁）。本包是**实操经验层**补充，**不重复**其 checklist 项，仅在「支付/凭证」步骤上叠加认知红线（RLS、受限密钥、平台依赖、应急）。
- **指向**：填凭证动作回 #15；schema 回 #14；核心 lib 回 #13；合规闸门回 #16 `compliance_gate.py`。

## ⑥ H0 触发后的人工动作清单（填凭证 + Vercel 部署，指向 #15）

- **触发条件**：`h4_tracker.py` 连续 3 天达阈值 → 出「🚦 H0 上线闸门触发建议」（人工确认，自动化不代操作）。
- **动作序列**（详见 #15 PRELAUNCH-CHECKLIST）：
  1. 填 Supabase / LLM / Waffo 凭证（#15 凭证表）
  2. Vercel 部署（#15 DEPLOY.md）
  3. 门禁校验：RLS 全开（③-1）+ 合规闸门（#16）+ 支付受限密钥（②）+ Webhook secret 本地/生产分离（②）
  4. 上线
- **上线前最后确认**：RLS 全开 ✅ / 支付用受限密钥 ✅ / Webhook secret 不与本地混淆 ✅ / 第三方可替换预案在手 ✅。
