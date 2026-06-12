/**
 * SendGrid Inbound Parse Webhook处理器
 * 
 * 接收客户邮件 → 情感分析 → 自动回复 → 入库
 * 
 * 配置步骤：
 * 1. 在SendGrid中配置Inbound Parse (Settings → Inbound Parse)
 * 2. 设置接收邮箱（如 feedback@yourdomain.com）
 * 3. 设置Webhook URL: https://your-vercel-url.vercel.app/api/email/webhook
 * 4. 测试：发一封邮件到接收邮箱 → 检查是否触发此API
 */

import { handleInboundEmail } from '@/ai-agents/customer-service';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 1. 验证Webhook签名（可选，但推荐）
    const signature = req.headers.get('x-twilio-email-webhook-signature');
    
    if (process.env.SENDGRID_WEBHOOK_SECRET && signature) {
      // TODO: 验证签名
      // const isValid = verifySignature(signature, await req.text(), process.env.SENDGRID_WEBHOOK_SECRET);
      // if (!isValid) {
      //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      // }
    }

    // 2. 解析SendGrid Inbound Parse数据
    const webhookBody = await req.json();

    console.log('[Email Webhook] Received email:', {
      from: webhookBody.from,
      subject: webhookBody.subject,
      to: webhookBody.to,
    });

    // 3. 处理邮件
    const { success } = await handleInboundEmail(webhookBody);

    if (success) {
      return NextResponse.json({ message: 'Email processed successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Failed to process email' }, { status: 500 });
    }
  } catch (error: any) {
    console.error('[Email Webhook] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 不支持GET请求
export async function GET(req: NextRequest) {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
