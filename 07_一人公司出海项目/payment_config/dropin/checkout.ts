// ============================================================
// 通用 Waffo 支付 Checkout 路由（可植入任意产品）
// 放置路径：<产品>/pages/api/checkout.ts
// ------------------------------------------------------------
// 特性：
//  - 未配置密钥时自动进入 TEST_MODE，跳转 /success?test=true，不崩溃
//  - 配置密钥后调用 Waffo 创建收银台会话（需补充 WAFFO 真实下单端点）
//  - 仅依赖 process.env，不引入任何 lib，可直接丢进任何 Next.js 产品
// ============================================================
import type { NextApiRequest, NextApiResponse } from 'next';

const TEST_MODE =
  !process.env.WAFFO_MERCHANT_ID || !process.env.WAFFO_PRIVATE_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { priceId, email, planId } = req.body || {};
    const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    if (TEST_MODE) {
      console.log('[checkout] TEST_MODE：未配置 Waffo 密钥，走测试回跳');
      return res.status(200).json({
        sessionUrl: `${base}/success?test=true&plan=${planId || priceId || ''}`,
      });
    }

    // === 生产模式：调用 Waffo 创建收银台会话 ===
    // 注意：下方端点/字段需对照你的 Waffo 商户文档微调。
    // 常见形态（请以 Waffo 官方 API 文档为准）：
    const waffoRes = await fetch(
      `${process.env.WAFFO_API_BASE_URL}/checkout/sessions`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WAFFO_PRIVATE_KEY}`,
          'X-Merchant-Id': process.env.WAFFO_MERCHANT_ID || '',
        },
        body: JSON.stringify({
          price_id: priceId || process.env.WAFFO_PRICE_ID,
          customer_email: email,
          metadata: { plan_id: planId },
          success_url: `${base}/success?session={session_id}`,
          cancel_url: `${base}/pricing`,
        }),
      }
    );

    if (!waffoRes.ok) {
      const errText = await waffoRes.text();
      console.error('[checkout] Waffo 下单失败:', errText);
      return res.status(502).json({ error: 'payment_gateway_error' });
    }

    const data = await waffoRes.json();
    return res.status(200).json({ sessionUrl: data.checkout_url || data.url });
  } catch (error) {
    console.error('[checkout] 异常:', error);
    return res.status(500).json({ error: 'internal_error' });
  }
}

export const config = {
  api: { bodyParser: true },
};
