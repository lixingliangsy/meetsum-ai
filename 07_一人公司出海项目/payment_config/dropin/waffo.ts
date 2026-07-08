// ============================================================
// 通用 Waffo Webhook 路由（自包含，可植入任意产品）
// 放置路径：<产品>/pages/api/webhooks/waffo.ts
// ------------------------------------------------------------
// 特性：
//  - 不依赖任何 lib（无 email/db 引入），丢进任意产品都不会破坏构建
//  - 关闭默认 bodyParser，手动读取 raw body 用于签名验证
//  - 验证签名 → 解析事件 → 仅打印结构化日志（订单落库由你后续接）
//  - 返回 200 告知 Waffo 已收到；异常返回 500 触发重试
// 接入数据库后，在 handle* 分支里补 db 操作即可。
// ============================================================
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await readRawBody(req);
  const signature = req.headers['x-waffo-signature'] as string | undefined;

  if (!verifySignature(rawBody, signature, process.env.WAFFO_WEBHOOK_SECRET)) {
    console.warn('[webhook] 签名验证失败');
    return res.status(401).json({ error: 'invalid_signature' });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return res.status(400).json({ error: 'invalid_payload' });
  }

  console.log('[webhook] 收到事件:', event?.event_type, 'order:', event?.data?.order_id);

  try {
    switch (event?.event_type) {
      case 'payment.success':
        // TODO: 在此激活用户订阅 / 写订单表
        console.log('[webhook] 支付成功 ->', JSON.stringify(event.data));
        break;
      case 'payment.failed':
        console.log('[webhook] 支付失败 ->', JSON.stringify(event.data));
        break;
      case 'subscription.renewed':
        console.log('[webhook] 订阅续费 ->', JSON.stringify(event.data));
        break;
      case 'subscription.cancelled':
        console.log('[webhook] 订阅取消 ->', JSON.stringify(event.data));
        break;
      case 'refund.success':
        console.log('[webhook] 退款成功 ->', JSON.stringify(event.data));
        break;
      default:
        console.log('[webhook] 未处理事件类型:', event?.event_type);
    }
    return res.status(200).json({ received: true });
  } catch (err) {
    console.error('[webhook] 处理异常:', err);
    return res.status(500).json({ error: 'internal_error' });
  }
}

// 手动读取请求流为字符串（bodyParser 已关闭）
function readRawBody(req: NextApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function verifySignature(rawBody: string, signature?: string, secret?: string): boolean {
  if (!signature || !secret || !rawBody) return false;
  const expected = crypto
    .createHmac('sha256', secret)
    .update(rawBody)
    .digest('hex');
  const received = signature.replace('sha256=', '');
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received));
  } catch {
    return false;
  }
}

// 关闭默认 bodyParser，手动读取 raw body 用于签名验证
export const config = {
  api: { bodyParser: false },
};
