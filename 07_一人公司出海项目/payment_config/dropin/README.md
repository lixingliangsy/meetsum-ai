# 支付接入「一键植入」模板（drop-in）

> 用途：把真实可用的 Waffo 支付骨架，塞进任意尚未接支付的 Micro SaaS 产品。
> 当前仓库里只有 4 个产品有 checkout+webhook（且为桩代码），其余 18 个无支付能力。
> 用本模板可让任意产品在「填好密钥 + 配好 price_id」后具备收款能力。

## 包含文件
- `checkout.ts`  → 放到 `<产品>/pages/api/checkout.ts`
- `waffo.ts`     → 放到 `<产品>/pages/api/webhooks/waffo.ts`

两者**零外部依赖**，丢进任何 Next.js 产品都不破坏构建。

## 安装步骤（每个产品约 1 分钟）
```bash
PROD=12_Micro_SaaS出海/<产品名>
cp dropin/checkout.ts  "$PROD/pages/api/checkout.ts"
mkdir -p "$PROD/pages/api/webhooks"
cp dropin/waffo.ts     "$PROD/pages/api/webhooks/waffo.ts"
```
然后在产品前端任意「升级/订阅」按钮处 `POST /api/checkout`（body: `{priceId, email, planId}`）。

## 之后还需两步（需你提供）
1. **填密钥**：在 `payment_config/secrets.env` 填入 Waffo 凭证，运行
   `python payment_config/setup_payment_env.py` 一键写入所有产品环境变量。
2. **补 Waffo 下单端点**：`checkout.ts` 里的 `WAFFO_API_BASE_URL/checkout/sessions`
   是通用占位，**请对照你的 Waffo 商户文档**确认真实端点与字段名（不同支付商差异大）。

## 说明
- 未配置密钥时自动 TEST_MODE，跳转 `/success?test=true`，不会崩溃，便于先上线页面。
- `waffo.ts` 只做签名校验 + 结构化日志；真要落库/发邮件，在 `payment.success` 分支补 db 调用。
- 现有产品的桩 checkout（如 ai-fitness-planner）建议直接替换为本 `checkout.ts` 以获得统一行为。
