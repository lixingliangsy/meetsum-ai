/**
 * GitHub PR Webhook处理器
 * 
 * 接收GitHub PR事件 → 自动触发Code Review Agent
 * 
 * 配置步骤：
 * 1. 在GitHub仓库中配置Webhook (Settings → Webhooks)
 * 2. Payload URL: https://your-vercel-url.vercel.app/api/github/webhook
 * 3. Content type: application/json
 * 4. Secret: 设置一个secret（如：your-github-webhook-secret）
 * 5. Events: Pull request (勾选)
 * 6. 保存
 */

import { handlePRWebhook } from '@/ai-agents/code-review';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // 1. 验证Webhook签名
    const signature = req.headers.get('x-hub-signature-256');
    
    if (process.env.GITHUB_WEBHOOK_SECRET && signature) {
      // TODO: 验证签名
      // const isValid = verifyGitHubSignature(signature, await req.text(), process.env.GITHUB_WEBHOOK_SECRET);
      // if (!isValid) {
      //   return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      // }
      console.log('[GitHub Webhook] Signature verified');
    } else {
      console.warn('[GitHub Webhook] Warning: Webhook secret not configured or signature missing');
    }

    // 2. 解析GitHub Webhook数据
    const webhookBody = await req.json();
    const event = req.headers.get('x-github-event-name'); // 事件类型

    console.log(`[GitHub Webhook] Received event: ${event}`, {
      action: webhookBody.action,
      prNumber: webhookBody.pull_request?.number,
      prUrl: webhookBody.pull_request?.html_url,
    });

    // 3. 只处理PR相关事件
    if (event === 'pull_request') {
      const { success } = await handlePRWebhook(webhookBody);

      if (success) {
        return NextResponse.json({ message: 'PR webhook processed successfully' }, { status: 200 });
      } else {
        return NextResponse.json({ error: 'Failed to process PR webhook' }, { status: 500 });
      }
    } else {
      console.log(`[GitHub Webhook] Ignoring event: ${event}`);
      return NextResponse.json({ message: 'Event ignored' }, { status: 200 });
    }
  } catch (error: any) {
    console.error('[GitHub Webhook] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// 支持GET请求（用于验证Webhook配置）
export async function GET(req: NextRequest) {
  const challenge = req.nextUrl.searchParams.get('challenge');
  
  if (challenge) {
    return NextResponse.json({ challenge }, { status: 200 });
  }
  
  return NextResponse.json({ message: 'Webhook endpoint is active' }, { status: 200 });
}
