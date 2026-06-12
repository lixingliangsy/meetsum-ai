/**
 * AI学习机制
 * 
 * 基于YC Tom Blomfield的演讲：让系统"从错误中学习"，实现自我进化
 * 这是AI原生架构的"学习机制（灵魂）"核心文件
 * 
 * 原则：
 * 1. 每次AI决策后 → 自动收集反馈
 * 2. 对比决策 vs 反馈 → 识别失败模式
 * 3. 自动生成改进方案 → 创建A/B测试
 * 4. 记录学习过程 → 更新AI知识库
 */

import { supabase } from './supabase';
import { OpenAI } from 'openai';

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_KEY ? 'https://api.deepseek.com' : undefined,
});

// ========= 1. 失败分析 =========

/**
 * 分析用户取消订阅的原因
 * @param userId - 用户ID
 * @param action - 用户动作（如 "cancel_subscription", "downgrade"）
 */
export async function analyzeFailure(userId: string, action: string): Promise<{
  failureReason: string;
  improvementSuggestion: string;
}> {
  try {
    // 1. 获取用户数据
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error || !user) {
      console.error('User not found:', error);
      return { failureReason: 'Unknown', improvementSuggestion: 'N/A' };
    }

    // 2. AI分析失败原因
    const analysis = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `你是一个用户行为分析专家。
          
分析用户取消订阅的原因，给出改进建议。

考虑因素：
- 价格（是否太贵？）
- 功能（是否满足需求？）
- 竞品（是否转向竞品？）
- 使用体验（是否有bug？）
- 支持（是否得不到帮助？）

输出格式（JSON）：
{
  "failureReason": "具体原因",
  "improvementSuggestion": "改进建议",
  "priority": "high" | "medium" | "low",
  "actionItems": ["具体的改进步骤"]
}`,
        },
        {
          role: 'user',
          content: `用户数据：${JSON.stringify(user, null, 2)}\n\n取消原因：${action}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(analysis.choices[0].message.content || '{}');

    const failureReason = result.failureReason || 'Unknown';
    const improvementSuggestion = result.improvementSuggestion || 'N/A';

    // 3. 记录到ai_learning_logs表
    await supabase.from('ai_learning_logs').insert({
      event_type: 'failure_analysis',
      input: JSON.stringify({ userId, action }),
      output: JSON.stringify(result),
      created_at: new Date(),
    });

    // 4. 生成改进方案
    const improvement = await generateImprovement(failureReason, user);

    // 5. 自动创建A/B测试
    await createABTest(improvement);

    return { failureReason, improvementSuggestion };
  } catch (error: any) {
    console.error('Error analyzing failure:', error);
    return { failureReason: 'Analysis failed', improvementSuggestion: 'N/A' };
  }
}

// ========= 2. 改进方案生成 =========

/**
 * 基于失败原因，生成改进方案
 */
async function generateImprovement(failureReason: string, userData: any): Promise<{
  action: string;
  description: string;
  expectedImpact: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `你是一个产品改进专家。

基于失败原因，生成一个具体的改进方案。

可以是：
- 价格调整（降价、优惠券、年付折扣）
- 功能优化（新功能、UI改进、性能优化）
- 营销策略（重新定位、新文案、推荐计划）
- 客户支持（更快响应、更详细文档、视频教程）

输出格式（JSON）：
{
  "action": "改进动作",
  "description": "详细描述",
  "expectedImpact": "预期影响（如：转化率提升15%）",
  "implementationEffort": "low" | "medium" | "high",
  "priority": "high" | "medium" | "low"
}`,
        },
        {
          role: 'user',
          content: `失败原因：${failureReason}\n\n用户数据：${JSON.stringify(userData, null, 2)}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    return JSON.parse(response.choices[0].message.content || '{}');
  } catch (error: any) {
    console.error('Error generating improvement:', error);
    return {
      action: 'Unknown',
      description: 'Failed to generate improvement',
      expectedImpact: 'Unknown',
    };
  }
}

// ========= 3. A/B测试创建 =========

/**
 * 创建A/B测试
 * 简化版：直接记录到ai_decisions表，人工后续实施
 */
async function createABTest(improvement: any): Promise<void> {
  try {
    const { error } = await supabase
      .from('ai_decisions')
      .insert({
        decision_type: 'improvement',
        input: JSON.stringify(improvement),
        output: 'A/B test created',
        outcome: 'pending',
        created_at: new Date(),
      });

    if (error) {
      console.error('Error creating A/B test:', error);
    }

    console.log(`A/B test created for improvement: ${improvement.action}`);
  } catch (error: any) {
    console.error('Exception creating A/B test:', error);
  }
}

// ========= 4. 用户反馈分析 =========

/**
 * 分析用户反馈（邮件、Twitter、Reddit）
 */
export async function analyzeFeedback(feedbackId: number): Promise<{
  sentiment: string;
  topics: string[];
  actionItems: string[];
}> {
  try {
    // 1. 获取反馈数据
    const { data: feedback, error } = await supabase
      .from('user_feedback')
      .select('*')
      .eq('id', feedbackId)
      .single();

    if (error || !feedback) {
      console.error('Feedback not found:', error);
      return { sentiment: 'neutral', topics: [], actionItems: [] };
    }

    // 2. AI分析反馈
    const analysis = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `你是一个用户反馈分析专家。

分析用户反馈，提取关键信息。

输出格式（JSON）：
{
  "sentiment": "positive" | "neutral" | "negative",
  "topics": ["功能请求", "bug报告", "价格抱怨", ...],
  "actionItems": ["具体的行动项"],
  "priority": "high" | "medium" | "low"
}`,
        },
        {
          role: 'user',
          content: `反馈内容：${feedback.content}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(analysis.choices[0].message.content || '{}');

    // 3. 更新反馈记录
    await supabase
      .from('user_feedback')
      .update({
        sentiment: result.sentiment,
        topics: result.topics,
        analyzed_at: new Date(),
      })
      .eq('id', feedbackId);

    // 4. 如果是负面反馈，触发失败分析
    if (result.sentiment === 'negative') {
      console.log(`Negative feedback detected: feedbackId=${feedbackId}`);
      // TODO: 自动触发改进流程
    }

    return {
      sentiment: result.sentiment,
      topics: result.topics || [],
      actionItems: result.actionItems || [],
    };
  } catch (error: any) {
    console.error('Error analyzing feedback:', error);
    return { sentiment: 'neutral', topics: [], actionItems: [] };
  }
}

// ========= 5. AI决策效果评估 =========

/**
 * 评估AI决策的效果
 */
export async function evaluateAIDecision(decisionId: number): Promise<{
  effective: boolean;
  score: number;
  feedback: string;
}> {
  try {
    // 1. 获取决策数据
    const { data: decision, error } = await supabase
      .from('ai_decisions')
      .select('*')
      .eq('id', decisionId)
      .single();

    if (error || !decision) {
      console.error('Decision not found:', error);
      return { effective: false, score: 0, feedback: 'Decision not found' };
    }

    // 2. 获取相关用户反馈
    const { data: feedbacks } = await supabase
      .from('user_feedback')
      .select('*')
      .gte('created_at', decision.created_at)
      .limit(10);

    // 3. AI评估决策效果
    const evaluation = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `你是一个AI决策评估专家。

评估AI决策的效果，给出改进建议。

输出格式（JSON）：
{
  "effective": true | false,
  "score": 0.0-1.0,
  "feedback": "评估反馈",
  "improvementSuggestion": "改进建议"
}`,
        },
        {
          role: 'user',
          content: `决策：${JSON.stringify(decision, null, 2)}\n\n相关反馈：${JSON.stringify(feedbacks, null, 2)}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(evaluation.choices[0].message.content || '{}');

    // 4. 更新决策记录
    await supabase
      .from('ai_decisions')
      .update({
        outcome: result.effective ? 'success' : 'failed',
        effectiveness_score: result.score,
        evaluated_at: new Date(),
      })
      .eq('id', decisionId);

    // 5. 记录到学习日志
    await supabase.from('ai_learning_logs').insert({
      event_type: 'decision_evaluation',
      input: JSON.stringify({ decisionId, decision }),
      output: JSON.stringify(result),
      created_at: new Date(),
    });

    return {
      effective: result.effective || false,
      score: result.score || 0,
      feedback: result.feedback || '',
    };
  } catch (error: any) {
    console.error('Error evaluating AI decision:', error);
    return { effective: false, score: 0, feedback: 'Evaluation failed' };
  }
}

// ========= 6. 自动学习循环 =========

/**
 * 自动学习循环（每天运行）
 * 这个函数应该被cron job调用
 */
export async function runLearningCycle(): Promise<{
  analyzedCount: number;
  improvementsGenerated: number;
  abTestsCreated: number;
}> {
  try {
    console.log('Starting AI learning cycle...');

    let analyzedCount = 0;
    let improvementsGenerated = 0;
    let abTestsCreated = 0;

    // 1. 获取所有未分析的反馈
    const { data: unanalyzedFeedbacks } = await supabase
      .from('user_feedback')
      .select('id')
      .is('analyzed_at', null)
      .limit(50);

    // 2. 分析反馈
    for (const feedback of unanalyzedFeedbacks || []) {
      await analyzeFeedback(feedback.id);
      analyzedCount++;
    }

    // 3. 获取所有未评估的AI决策
    const { data: unevaluatedDecisions } = await supabase
      .from('ai_decisions')
      .select('id')
      .is('outcome', null)
      .limit(50);

    // 4. 评估决策
    for (const decision of unevaluatedDecisions || []) {
      await evaluateAIDecision(decision.id);
      improvementsGenerated++;
    }

    // 5. 生成学习报告
    const report = await generateLearningReport();

    console.log(`Learning cycle completed:
      - ${analyzedCount} feedbacks analyzed
      - ${improvementsGenerated} decisions evaluated
      - ${abTestsCreated} A/B tests created
    `);

    return {
      analyzedCount,
      improvementsGenerated,
      abTestsCreated,
    };
  } catch (error: any) {
    console.error('Error running learning cycle:', error);
    return {
      analyzedCount: 0,
      improvementsGenerated: 0,
      abTestsCreated: 0,
    };
  }
}

/**
 * 生成学习报告
 */
async function generateLearningReport(): Promise<string> {
  try {
    // 1. 获取最近30天的数据
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: recentLearnings } = await supabase
      .from('ai_learning_logs')
      .select('*')
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false });

    const { data: recentFeedbacks } = await supabase
      .from('user_feedback')
      .select('sentiment')
      .gte('created_at', thirtyDaysAgo.toISOString());

    // 2. AI生成报告
    const report = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `你是一个AI学习报告生成专家。

基于最近30天的学习数据，生成一份学习报告。

包括：
- 主要失败模式
- 改进方案效果
- 用户满意度趋势
- 下一步建议

输出格式：Markdown`,
        },
        {
          role: 'user',
          content: `学习日志：${JSON.stringify(recentLearnings, null, 2)}\n\n用户反馈：${JSON.stringify(recentFeedbacks, null, 2)}`,
        },
      ],
    });

    const reportText = report.choices[0].message.content || '';

    // 3. 保存报告到数据库或文件
    // TODO: 保存到 `ai_learning_reports` 表

    console.log('Learning report generated:', reportText.substring(0, 100) + '...');

    return reportText;
  } catch (error: any) {
    console.error('Error generating learning report:', error);
    return 'Failed to generate report';
  }
}

// ========= 使用示例 =========

/*
// 示例1：用户取消订阅后，自动分析失败原因
import { analyzeFailure } from '@/lib/ai-learning';

export async function handleSubscriptionCancel(userId: string) {
  // 1. 执行取消逻辑
  await supabase.from('subscriptions').update({ status: 'cancelled' }).eq('user_id', userId);
  
  // 2. 自动分析失败原因
  const { failureReason, improvementSuggestion } = await analyzeFailure(userId, 'cancel_subscription');
  
  console.log(`User ${userId} cancelled: ${failureReason}`);
  console.log(`Improvement suggestion: ${improvementSuggestion}`);
  
  // 3. AI自动生成改进方案 → 创建A/B测试
  // （在analyzeFailure函数内部自动完成）
}

// 示例2：每天自动运行学习循环
// 在cron job中调用（如Vercel Cron）
import { runLearningCycle } from '@/lib/ai-learning';

export async function handler(request: Request) {
  // 验证cron secret
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', { status: 401 });
  }
  
  // 运行学习循环
  const result = await runLearningCycle();
  
  return Response.json(result);
}

// 示例3：手动评估AI决策
import { evaluateAIDecision } from '@/lib/ai-learning';

// 在人工审核界面中调用
async function reviewAIDecision(decisionId: number) {
  const evaluation = await evaluateAIDecision(decisionId);
  
  console.log(`Decision ${decisionId}: effective=${evaluation.effective}, score=${evaluation.score}`);
  console.log(`Feedback: ${evaluation.feedback}`);
}
*/
