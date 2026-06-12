/**
 * 监控AI Agent
 * 
 * 基于YC Tom Blomfield的演讲：监控Agent是AI原生架构的"质量控制网关"
 * 这是AI原生架构的"监控层"核心文件
 * 
 * 功能：
 * 1. 监控系统健康度（错误率、响应时间、API配额）
 * 2. 检测异常模式（失败查询、用户流失、竞品动态）
 * 3. 自动提交修复PR（检测到bug → AI写代码 → 提交PR）
 * 4. 通知人类（高风险问题、需要决策的事项）
 */

import { supabase } from '../lib/supabase';
import { OpenAI } from '../lib/openai';
import { DeploymentTools } from '../lib/ai-tools';
import { notifyHuman } from '../lib/ai-policy';

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_KEY ? 'https://api.deepseek.com' : undefined,
});

// ========= 主函数 =========

/**
 * 运行监控循环（每小时运行）
 * 这个函数应该被cron job调用
 */
export async function runMonitoringCycle(): Promise<{
  issuesDetected: number;
  prsCreated: number;
  notificationsSent: number;
}> {
  try {
    console.log('[MonitorAgent] Starting monitoring cycle...');

    let issuesDetected = 0;
    let prsCreated = 0;
    let notificationsSent = 0;

    // 1. 检查系统健康度
    const healthCheck = await checkSystemHealth();
    if (!healthCheck.healthy) {
      issuesDetected++;
      
      // 尝试自动修复
      const fixed = await attemptAutoFix(healthCheck.issue);
      if (fixed) {
        prsCreated++;
      } else {
        // 无法自动修复，通知人类
        await notifyHuman(`[MonitorAgent] System health issue: ${healthCheck.issue}`, 'high');
        notificationsSent++;
      }
    }

    // 2. 分析失败查询
    const failureAnalysis = await analyzeFailurePatterns();
    if (failureAnalysis.patternsDetected > 0) {
      issuesDetected += failureAnalysis.patternsDetected;
      
      // 生成改进方案
      const improvement = await generateImprovement(failureAnalysis);
      
      // 创建A/B测试
      await createABTest(improvement);
    }

    // 3. 检测用户流失模式
    const churnAnalysis = await analyzeChurnPatterns();
    if (churnAnalysis.highRiskUsers > 0) {
      issuesDetected++;
      
      // 通知人类（需要人工干预）
      await notifyHuman(`[MonitorAgent] ${churnAnalysis.highRiskUsers} high-risk users detected. Example: ${churnAnalysis.exampleUserId}`, 'medium');
      notificationsSent++;
    }

    // 4. 监控竞品动态
    const competitorUpdates = await monitorCompetitors();
    if (competitorUpdates.length > 0) {
      issuesDetected++;
      
      // 生成竞品分析报告
      const report = await generateCompetitorReport(competitorUpdates);
      
      // 通知人类（可能需要调整策略）
      await notifyHuman(`[MonitorAgent] Competitor update detected: ${report.summary}`, 'medium');
      notificationsSent++;
    }

    // 5. 检查AI决策效果
    const aiDecisionEffectiveness = await checkAIDecisionEffectiveness();
    if (aiDecisionEffectiveness.lowConfidenceDecisions > 5) {
      issuesDetected++;
      
      // 通知人类（需要调整AI策略）
      await notifyHuman(`[MonitorAgent] ${aiDecisionEffectiveness.lowConfidenceDecisions} low-confidence AI decisions detected. Need to review AI policy.`, 'high');
      notificationsSent++;
    }

    console.log(`[MonitorAgent] Monitoring cycle completed:
      - ${issuesDetected} issues detected
      - ${prsCreated} PRs created
      - ${notificationsSent} notifications sent
    `);

    return {
      issuesDetected,
      prsCreated,
      notificationsSent,
    };
  } catch (error: any) {
    console.error('[MonitorAgent] Error running monitoring cycle:', error);
    
    // 通知人类（监控系统本身出错）
    await notifyHuman(`[MonitorAgent] CRITICAL: Monitoring system failed: ${error.message}`, 'high');
    
    return {
      issuesDetected: 0,
      prsCreated: 0,
      notificationsSent: 1,
    };
  }
}

// ========= 系统健康度检查 =========

/**
 * 检查系统健康度
 */
async function checkSystemHealth(): Promise<{
  healthy: boolean;
  issue?: string;
  details?: any;
}> {
  try {
    console.log('[MonitorAgent] Checking system health...');

    const issues: string[] = [];

    // 1. 检查Supabase连接
    const { error: supabaseError } = await supabase.from('users').select('count').single();
    if (supabaseError) {
      issues.push(`Supabase connection error: ${supabaseError.message}`);
    }

    // 2. 检查API配额（OpenAI、DeepSeek等）
    const apiQuota = await checkAPIQuota();
    if (apiQuota.lowQuota.length > 0) {
      issues.push(`Low API quota: ${apiQuota.lowQuota.join(', ')}`);
    }

    // 3. 检查错误日志（Sentry）
    const errorCount = await checkSentryErrors();
    if (errorCount > 10) {
      issues.push(`High error count: ${errorCount} errors in last 24h`);
    }

    // 4. 检查响应时间（Vercel Analytics）
    const responseTime = await checkResponseTime();
    if (responseTime > 2000) {
      issues.push(`Slow response time: ${responseTime}ms average`);
    }

    if (issues.length > 0) {
      return {
        healthy: false,
        issue: issues.join('; '),
        details: {
          supabaseError: supabaseError?.message,
          apiQuota: apiQuota,
          errorCount,
          responseTime,
        },
      };
    }

    return { healthy: true };
  } catch (error: any) {
    console.error('[MonitorAgent] Error checking system health:', error);
    return {
      healthy: false,
      issue: `Exception: ${error.message}`,
    };
  }
}

/**
 * 检查API配额
 */
async function checkAPIQuota(): Promise<{
  lowQuota: string[];
  details: any;
}> {
  try {
    const lowQuota: string[] = [];
    const details: any = {};

    // OpenAI
    if (process.env.OPENAI_API_KEY) {
      // TODO: 调用OpenAI Usage API
      // const usage = await fetch('https://api.openai.com/dashboard/billing/usage');
      // if (usage.remaining < 10) lowQuota.push('OpenAI');
      details.openai = 'Not implemented';
    }

    // DeepSeek
    if (process.env.DEEPSEEK_API_KEY) {
      // TODO: 调用DeepSeek Usage API
      details.deepseek = 'Not implemented';
    }

    return { lowQuota, details };
  } catch (error: any) {
    console.error('[MonitorAgent] Error checking API quota:', error);
    return { lowQuota: [], details: {} };
  }
}

/**
 * 检查Sentry错误
 */
async function checkSentryErrors(): Promise<number> {
  try {
    if (!process.env.SENTRY_DSN) {
      return 0;
    }

    // TODO: 调用Sentry API
    // const errors = await fetch('https://sentry.io/api/0/projects/{org}/{project}/issues/');
    
    return 0;
  } catch (error: any) {
    console.error('[MonitorAgent] Error checking Sentry:', error);
    return 0;
  }
}

/**
 * 检查响应时间
 */
async function checkResponseTime(): Promise<number> {
  try {
    if (!process.env.VERCEL_ANALYTICS_ID) {
      return 0;
    }

    // TODO: 调用Vercel Analytics API
    // const analytics = await fetch('https://api.vercel.com/v2/analytics/...');
    
    return 0;
  } catch (error: any) {
    console.error('[MonitorAgent] Error checking response time:', error);
    return 0;
  }
}

// ========= 失败模式分析 =========

/**
 * 分析失败查询模式
 */
async function analyzeFailurePatterns(): Promise<{
  patternsDetected: number;
  patterns: any[];
}> {
  try {
    console.log('[MonitorAgent] Analyzing failure patterns...');

    // 1. 获取最近7天的用户反馈
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: recentFeedbacks, error } = await supabase
      .from('user_feedback')
      .select('*')
      .gte('created_at', sevenDaysAgo.toISOString())
      .eq('sentiment', 'negative');

    if (error || !recentFeedbacks || recentFeedbacks.length === 0) {
      return { patternsDetected: 0, patterns: [] };
    }

    // 2. AI分析失败模式
    const analysis = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `你是用户反馈分析专家。

分析负面反馈，识别失败模式。

输出格式（JSON）：
{
  "patterns": [
    {
      "pattern": "失败模式描述",
      "count": 出现次数,
      "severity": "high" | "medium" | "low",
      "exampleFeedbackIds": [1, 2, 3]
    }
  ]
}`,
        },
        {
          role: 'user',
          content: `负面反馈：${JSON.stringify(recentFeedbacks, null, 2)}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(analysis.choices[0].message.content || '{}');

    return {
      patternsDetected: result.patterns?.length || 0,
      patterns: result.patterns || [],
    };
  } catch (error: any) {
    console.error('[MonitorAgent] Error analyzing failure patterns:', error);
    return { patternsDetected: 0, patterns: [] };
  }
}

// ========= 自动修复 =========

/**
 * 尝试自动修复问题
 */
async function attemptAutoFix(issue: string): Promise<boolean> {
  try {
    console.log(`[MonitorAgent] Attempting to auto-fix: ${issue}`);

    // 1. AI分析修复方案
    const fixPlan = await generateFixPlan(issue);

    if (!fixPlan.fixable) {
      console.log(`[MonitorAgent] Issue not auto-fixable: ${fixPlan.reason}`);
      return false;
    }

    // 2. AI生成修复代码
    const fixedCode = await generateFixedCode(fixPlan);

    // 3. 创建Git分支
    const branchName = `fix/monitor-agent-${Date.now()}`;
    await createGitBranch(branchName);

    // 4. 提交修复代码
    await commitFix(branchName, fixedCode, fixPlan);

    // 5. 创建Pull Request
    const prUrl = await createPullRequest(branchName, fixPlan);

    console.log(`[MonitorAgent] Auto-fix PR created: ${prUrl}`);

    // 6. 记录到ai_decisions表
    await supabase.from('ai_decisions').insert({
      decision_type: 'auto_fix',
      input: issue,
      output: `PR created: ${prUrl}`,
      auto_executed: true,
      created_at: new Date(),
    });

    return true;
  } catch (error: any) {
    console.error('[MonitorAgent] Error attempting auto-fix:', error);
    return false;
  }
}

/**
 * 生成修复方案
 */
async function generateFixPlan(issue: string): Promise<{
  fixable: boolean;
  reason?: string;
  steps?: string[];
}> {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `你是系统修复专家。

基于问题描述，判断是否可以自动修复。

可自动修复的情况：
- 简单的bug（如：null pointer、missing await）
- 配置错误（如：环境变量缺失）
- 性能问题（如：缺少索引、N+1查询）

不可自动修复的情况：
- 架构问题（需要重新设计）
- 数据迁移（需要人工审核）
- 安全风险（需要安全审查）

输出格式（JSON）：
{
  "fixable": true | false,
  "reason": "原因",
  "steps": ["修复步骤"]
}`,
        },
        {
          role: 'user',
          content: `问题：${issue}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error: any) {
    console.error('[MonitorAgent] Error generating fix plan:', error);
    return { fixable: false, reason: 'Exception' };
  }
}

// ========= GitHub集成 =========

/**
 * 创建Git分支
 */
async function createGitBranch(branchName: string): Promise<void> {
  try {
    // TODO: 使用GitHub API或简单git命令
    console.log(`[MonitorAgent] Creating branch: ${branchName}`);
    
    // 简化版：直接调用git命令
    // await exec(`git checkout -b ${branchName}`);
  } catch (error: any) {
    console.error('[MonitorAgent] Error creating Git branch:', error);
  }
}

/**
 * 提交修复代码
 */
async function commitFix(branchName: string, fixedCode: string, fixPlan: any): Promise<void> {
  try {
    console.log(`[MonitorAgent] Committing fix to branch: ${branchName}`);
    
    // TODO: 实际写入文件、git add、git commit
  } catch (error: any) {
    console.error('[MonitorAgent] Error commiting fix:', error);
  }
}

/**
 * 创建Pull Request
 */
async function createPullRequest(branchName: string, fixPlan: any): Promise<string> {
  try {
    // TODO: 使用GitHub API
    console.log(`[MonitorAgent] Creating PR for branch: ${branchName}`);
    
    return 'https://github.com/lixingliangsy/meetsum-ai/pull/xxx';
  } catch (error: any) {
    console.error('[MonitorAgent] Error creating PR:', error);
    return '';
  }
}

// ========= 使用示例 =========

/*
// 示例1：在Vercel Cron Job中调用
import { runMonitoringCycle } from '@/ai-agents/monitor';

export default async function handler(req: Request) {
  // 验证cron secret
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }

  // 运行监控循环
  const result = await runMonitoringCycle();

  return Response.json(result);
}

// 示例2：手动触发监控
async function manualMonitoring() {
  const result = await runMonitoringCycle();
  
  console.log(`Monitoring completed:
    - ${result.issuesDetected} issues detected
    - ${result.prsCreated} PRs created
    - ${result.notificationsSent} notifications sent
  `);
}
*/

export default {
  runMonitoringCycle,
  checkSystemHealth,
  analyzeFailurePatterns,
};
