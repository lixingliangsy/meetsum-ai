/**
 * Cron Job: AI学习循环
 * 
 * 每天自动运行AI学习循环
 * 
 * 配置步骤（Vercel Cron）：
 * 1. 在Vercel项目中启用Cron Jobs（Settings → Cron Jobs）
 * 2. 添加Cron Job：
 *    - Name: ai-learning-cycle
 *    - Schedule: 0 2 * * *（每天凌晨2点）
 *    - HTTP Method: GET
 *    - URL: https://your-vercel-url.vercel.app/api/cron/learning-cycle
 *    - HTTP Headers: Authorization: Bearer YOUR_CRON_SECRET
 * 3. 保存
 */

import { runLearningCycle } from '@/ai-agents/learning';
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

    // 2. 检查是否启用AI学习
    if (process.env.FEATURE_AI_LEARNING_ENABLED !== 'true') {
      console.log('[Cron] AI learning is disabled');
      return NextResponse.json({ message: 'AI learning is disabled' }, { status: 200 });
    }

    console.log('[Cron] Starting AI learning cycle...');

    // 3. 运行学习循环
    const result = await runLearningCycle();

    console.log('[Cron] Learning cycle completed:', result);

    // 4. 返回结果
    return NextResponse.json({
      message: 'Learning cycle completed successfully',
      ...result,
    }, { status: 200 });
  } catch (error: any) {
    console.error('[Cron] Error running learning cycle:', error);
    
    // 通知人类（高风险）
    // TODO: 集成邮件/Slack通知
    console.error('[Cron] CRITICAL: Learning cycle failed:', error.message);
    
    return NextResponse.json({
      error: 'Learning cycle failed',
      message: error.message,
    }, { status: 500 });
  }
}

// 不支持POST请求
export async function POST(req: NextRequest) {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
