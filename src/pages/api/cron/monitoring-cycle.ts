/**
 * Cron Job: 监控循环
 * 
 * 每小时自动运行监控循环
 * 
 * 配置步骤（Vercel Cron）：
 * 1. 在Vercel项目中启用Cron Jobs（Settings → Cron Jobs）
 * 2. 添加Cron Job：
 *    - Name: monitoring-cycle
 *    - Schedule: 0 * * * *（每小时）
 *    - HTTP Method: GET
 *    - URL: https://your-vercel-url.vercel.app/api/cron/monitoring-cycle
 *    - HTTP Headers: Authorization: Bearer YOUR_CRON_SECRET
 * 3. 保存
 */

import { runMonitoringCycle } from '@/ai-agents/monitor';
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

    console.log('[Cron] Starting monitoring cycle...');

    // 2. 运行监控循环
    const result = await runMonitoringCycle();

    console.log('[Cron] Monitoring cycle completed:', result);

    // 3. 返回结果
    return NextResponse.json({
      message: 'Monitoring cycle completed successfully',
      ...result,
    }, { status: 200 });
  } catch (error: any) {
    console.error('[Cron] Error running monitoring cycle:', error);
    
    // 通知人类（高风险）
    // TODO: 集成邮件/Slack通知
    console.error('[Cron] CRITICAL: Monitoring cycle failed:', error.message);
    
    return NextResponse.json({
      error: 'Monitoring cycle failed',
      message: error.message,
    }, { status: 500 });
  }
}

// 不支持POST请求
export async function POST(req: NextRequest) {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
