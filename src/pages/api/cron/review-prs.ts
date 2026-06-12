/**
 * Cron Job: Review所有打开的PR
 * 
 * 每6小时自动review所有打开的PR
 * 
 * 配置步骤（Vercel Cron）：
 * 1. 在Vercel项目中启用Cron Jobs（Settings → Cron Jobs）
 * 2. 添加Cron Job：
 *    - Name: review-prs
 *    - Schedule: 0 */6 * * *（每6小时）
 *    - HTTP Method: GET
 *    - URL: https://your-vercel-url.vercel.app/api/cron/review-prs
 *    - HTTP Headers: Authorization: Bearer YOUR_CRON_SECRET
 * 3. 保存
 */

import { reviewAllOpenPRs } from '@/ai-agents/code-review';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // 1. 验证Cron Secret
    const authHeader = req.headers.get('Authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;
    
    if (!authHeader || authHeader !== expectedAuth) {
      console.warn('[Cron] Unauthorized access attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. 检查是否启用AI决策引擎
    if (process.env.FEATURE_AI_DECISION_ENABLED !== 'true') {
      console.log('[Cron] AI decision engine is disabled');
      return NextResponse.json({ message: 'AI decision engine is disabled' }, { status: 200 });
    }

    console.log('[Cron] Starting PR review cycle...');

    // 3. Review所有打开的PR
    const result = await reviewAllOpenPRs();

    console.log('[Cron] PR review cycle completed:', result);

    // 4. 返回结果
    return NextResponse.json({
      message: 'PR review cycle completed successfully',
      ...result,
    }, { status: 200 });
  } catch (error: any) {
    console.error('[Cron] Error running PR review cycle:', error);
    
    // 通知人类（高风险）
    // TODO: 集成邮件/Slack通知
    console.error('[Cron] CRITICAL: PR review cycle failed:', error.message);
    
    return NextResponse.json({
      error: 'PR review cycle failed',
      message: error.message,
    }, { status: 500 });
  }
}

// 不支持POST请求
export async function POST(req: NextRequest) {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
