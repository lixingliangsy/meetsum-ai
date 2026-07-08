# 产品支付就绪度地图（2026-07-08）

> 审计脚本：`audit_payment_readiness.py`（输出 `payment_readiness_audit.json`）
> 结论先行：22 个已部署产品中，**目前没有任何一个能真正收款**——
> 现有 checkout 路由均为「桩代码」（只回跳 `/success`，未调 Waffo API），
> webhook 模板依赖不存在的 `lib/email`、`lib/db`。要让产品真正"出售"，需补齐三件事：
> ① 真实 Waffo 下单代码（本仓库已提供 drop-in 模板，见下）
> ② 你的 Waffo 商户凭证（`payment_config/secrets.env`）
> ③ 每个产品的定价 / price_id（业务决策）

## 一、支付能力分级（按代码接入度）

### A 级 · 有 checkout + webhook（骨架最完整，4 个）
| 产品 | 说明 | 距"真收款"还差 |
|------|------|----------------|
| ai-fitness-planner | checkout+webhook 齐全，但为桩 | 替换 checkout 为真实 API + 填密钥 + price_id |
| articlesumm-pro | 同上 | 同上 |
| fitness-challenge-tracker | 同上 | 同上 |
| fitness-gamification-platform | 同上 | 同上 |

### B 级 · 有 checkout 无 webhook（5 个）
| 产品 | 说明 | 距"真收款"还差 |
|------|------|----------------|
| chartmind-ai | 仅 checkout（桩） | 加 webhook + 真实 API + 密钥 + price_id |
| fitness-community-platform | 仅 checkout（桩） | 同上 |
| meeting-mind-mvp | 仅 checkout（桩） | 同上 |
| resumeforge | 仅 checkout（桩） | 同上 |
| scifigure-pro | 仅 checkout（桩） | 同上 |

### C 级 · 无 checkout（暂不能收款，13 个）
| 产品 | 说明 |
|------|------|
| ai-changelog | 免费工具，无支付入口 |
| ai-fitness-plan-generator | 免费工具，无支付入口 |
| async-standup-tool | 免费工具，无支付入口 |
| calorie-tracker | 免费工具，无支付入口 |
| fitalliance-pro | 免费工具，无支付入口 |
| freelancer-portal | 免费工具，无支付入口 |
| meeting-cost-calc | **原定付费**（checklist 有记录）但代码未接 checkout |
| promptgen-pro | 免费工具，无支付入口 |
| running-training-plan | **原定付费**但代码未接 checkout |
| screenshot-annotator | **原定付费**但代码未接 checkout |
| screenshot-to-demo | 免费工具，无支付入口 |
| snippetvault | 免费工具，无支付入口 |
| social-proof-widget | **原定付费**但代码未接 checkout |

## 二、升级路径（自动化已就绪）

### 对 C 级想做付费的产品（meeting-cost-calc / running-training-plan / screenshot-annotator / social-proof-widget 等）
```bash
PROD=12_Micro_SaaS出海/<产品名>
cp payment_config/dropin/checkout.ts "$PROD/pages/api/checkout.ts"
mkdir -p "$PROD/pages/api/webhooks"
cp payment_config/dropin/waffo.ts    "$PROD/pages/api/webhooks/waffo.ts"
# 然后 redeploy：vercel --prod --yes
```

### 对全部付费产品，一键配密钥
```bash
cp payment_config/secrets.env.example payment_config/secrets.env
# 编辑 secrets.env 填入 Waffo 凭证
python payment_config/setup_payment_env.py
```

## 三、用户必须提供的三项（无法自动完成）
1. **Waffo 商户凭证**：Merchant ID / Private Key / Public Key / Webhook Secret
2. **Waffo API 真实下单端点**：`checkout.ts` 中 `/checkout/sessions` 为通用占位，需对照 Waffo 文档确认真实路径与字段
3. **每个付费产品的 price_id / 定价**：在 Waffo Dashboard 创建产品后获得，写入各产品的 `WAFFO_PRICE_ID` 环境变量

> 提供以上信息后，本仓库可继续自动化：把 drop-in 模板批量植入 + 跑 `setup_payment_env.py` + 重新部署。
