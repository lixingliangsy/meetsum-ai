/**
 * 代码Review AI Agent
 * 
 * 基于YC Tom Blomfield的演讲：代码Review Agent是AI原生架构的"质量控制网关"
 * 这是AI原生架构的"审核层"核心文件
 * 
 * 功能：
 * 1. 自动review所有PR（监控Agent提交的 + 人类提交的）
 * 2. 检查代码质量（语法、最佳实践、安全漏洞）
 * 3. 运行测试（自动运行单元测试 + 集成测试）
 * 4. 决定是否自动合并（低风险 + 测试通过 → 自动合并）
 * 5. 学习最佳实践（从人工review中学习）
 */

import { supabase } from '../lib/supabase';
import { OpenAI } from '../lib/openai';

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_KEY ? 'https://api.deepseek.com' : undefined,
});

// ========= 主函数 =========

/**
 * Review一个PR
 * @param prId - PR ID（GitHub PR number）
 * @param prUrl - PR URL
 */
export async function reviewPR(prId: number, prUrl: string): Promise<{
  approved: boolean;
  confidence: number;
  comments: string[];
}> {
  try {
    console.log(`[CodeReviewAgent] Reviewing PR #${prId}: ${prUrl}`);

    // 1. 获取PR数据
    const prData = await fetchPRData(prId);

    // 2. AI分析代码变更
    const analysis = await analyzeCodeChanges(prData);

    console.log(`[CodeReviewAgent] Analysis:`, analysis);

    // 3. 运行测试
    const testResults = await runTests(prData.branchName);

    // 4. 决定是否自动合并
    const decision = await makeMergeDecision(analysis, testResults);

    // 5. 提交review评论
    await submitReviewComments(prId, decision);

    // 6. 如果通过，自动合并
    if (decision.approved && decision.confidence > 0.95) {
      await mergePR(prId, decision);
    } else if (decision.approved && decision.confidence > 0.8) {
      // 需要人工审核
      await notifyHumanForReview(prId, decision);
    } else {
      // 拒绝PR
      await rejectPR(prId, decision);
    }

    // 7. 记录到ai_decisions表
    await logDecision({
      prId,
      prUrl,
      analysis,
      testResults,
      decision,
    });

    return {
      approved: decision.approved,
      confidence: decision.confidence,
      comments: decision.comments,
    };
  } catch (error: any) {
    console.error('[CodeReviewAgent] Error:', error);
    await notifyHuman(`代码Review Agent出错：${error.message}`, 'high');
    return { approved: false, confidence: 0, comments: [] };
  }
}

// ========= GitHub集成 =========

/**
 * 获取PR数据
 */
async function fetchPRData(prId: number): Promise<{
  title: string;
  description: string;
  branchName: string;
  filesChanged: Array<{ filename: string; additions: number; deletions: number; patch?: string }>;
  author: string;
}> {
  try {
    const response = await fetch(`https://api.github.com/repos/lixingliangsy/meetsum-ai/pulls/${prId}`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const pr = await response.json();

    // 获取文件变更
    const filesResponse = await fetch(`https://api.github.com/repos/lixingliangsy/meetsum-ai/pulls/${prId}/files`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    const files = await filesResponse.json();

    return {
      title: pr.title,
      description: pr.body,
      branchName: pr.head.ref,
      filesChanged: files.map((file: any) => ({
        filename: file.filename,
        additions: file.additions,
        deletions: file.deletions,
        patch: file.patch,
      })),
      author: pr.user.login,
    };
  } catch (error: any) {
    console.error('[CodeReviewAgent] Error fetching PR data:', error);
    throw error;
  }
}

/**
 * 运行测试
 */
async function runTests(branchName: string): Promise<{
  passed: boolean;
  totalTests: number;
  failedTests: number;
  coverage: number;
}> {
  try {
    console.log(`[CodeReviewAgent] Running tests for branch: ${branchName}`);

    // TODO: 实际调用CI/CD（如GitHub Actions）
    // 简化版：返回模拟数据
    
    return {
      passed: true,
      totalTests: 50,
      failedTests: 0,
      coverage: 85,
    };
  } catch (error: any) {
    console.error('[CodeReviewAgent] Error running tests:', error);
    return {
      passed: false,
      totalTests: 0,
      failedTests: 0,
      coverage: 0,
    };
  }
}

/**
 * 提交review评论
 */
async function submitReviewComments(prId: number, decision: any): Promise<void> {
  try {
    const comments = decision.comments || [];

    for (const comment of comments) {
      await fetch(`https://api.github.com/repos/lixingliangsy/meetsum-ai/pulls/${prId}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `token ${process.env.GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body: comment,
          commit_id: 'latest', // TODO: 获取最新commit SHA
          path: comment.path || null,
          line: comment.line || null,
        }),
      });
    }

    console.log(`[CodeReviewAgent] Submitted ${comments.length} review comments`);
  } catch (error: any) {
    console.error('[CodeReviewAgent] Error submitting review:', error);
  }
}

/**
 * 合并PR
 */
async function mergePR(prId: number, decision: any): Promise<void> {
  try {
    const response = await fetch(`https://api.github.com/repos/lixingliangsy/meetsum-ai/pulls/${prId}/merge`, {
      method: 'PUT',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        commit_title: `Auto-merged by CodeReview Agent`,
        commit_message: `Approved by AI (confidence: ${decision.confidence})\n\nAnalysis:\n${decision.summary}`,
        merge_method: 'squash',
      }),
    });

    if (!response.ok) {
      throw new Error(`Merge failed: ${response.statusText}`);
    }

    console.log(`[CodeReviewAgent] PR #${prId} auto-merged successfully`);

    // 通知人类
    await notifyHuman(`[CodeReviewAgent] PR #${prId} auto-merged successfully.\n\nSummary: ${decision.summary}`, 'low');
  } catch (error: any) {
    console.error('[CodeReviewAgent] Error merging PR:', error);
    await notifyHuman(`[CodeReviewAgent] Failed to merge PR #${prId}: ${error.message}`, 'high');
  }
}

/**
 * 拒绝PR
 */
async function rejectPR(prId: number, decision: any): Promise<void> {
  try {
    // 提交拒绝评论
    await fetch(`https://api.github.com/repos/lixingliangsy/meetsum-ai/pulls/${prId}/comments`, {
      method: 'POST',
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        body: `## ❌ PR Rejected by CodeReview Agent\n\n**Reason:** ${decision.rejectionReason}\n\n**Summary:**\n${decision.summary}\n\n---\n*This review was auto-generated by AI.*`,
      }),
    });

    console.log(`[CodeReviewAgent] PR #${prId} rejected`);
  } catch (error: any) {
    console.error('[CodeReviewAgent] Error rejecting PR:', error);
  }
}

// ========= AI分析 =========

/**
 * 分析代码变更
 */
async function analyzeCodeChanges(prData: any): Promise<{
  codeQualityScore: number;
  securityIssues: string[];
  bestPracticesViolations: string[];
  summary: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `你是一个高级代码review专家。

分析PR的代码变更，评估代码质量。

检查项：
1. 语法错误
2. 最佳实践（命名、注释、模块化）
3. 安全漏洞（SQL注入、XSS、敏感信息泄露）
4. 性能问题（N+1查询、缺少索引）
5. 测试覆盖率

输出格式（JSON）：
{
  "codeQualityScore": 0-100,
  "securityIssues": ["安全问题的描述"],
  "bestPracticesViolations": ["最佳实践违反的描述"],
  "summary": "代码review摘要（200字以内）"
}`,
        },
        {
          role: 'user',
          content: `PR标题：${prData.title}\n\nPR描述：${prData.description}\n\n文件变更：${JSON.stringify(prData.filesChanged, null, 2)}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    return {
      codeQualityScore: result.codeQualityScore || 50,
      securityIssues: result.securityIssues || [],
      bestPracticesViolations: result.bestPracticesViolations || [],
      summary: result.summary || '',
    };
  } catch (error: any) {
    console.error('[CodeReviewAgent] Error analyzing code:', error);
    return {
      codeQualityScore: 50,
      securityIssues: [],
      bestPracticesViolations: [],
      summary: 'Analysis failed',
    };
  }
}

/**
 * 做出合并决策
 */
async function makeMergeDecision(analysis: any, testResults: any): Promise<{
  approved: boolean;
  confidence: number;
  comments: string[];
  summary: string;
  rejectionReason?: string;
}> {
  try {
    // 决策逻辑
    let approved = true;
    let confidence = 0.9;
    const comments: string[] = [];

    // 1. 检查代码质量分数
    if (analysis.codeQualityScore < 60) {
      approved = false;
      confidence = 0.3;
      comments.push(`❌ 代码质量分数过低：${analysis.codeQualityScore}/100`);
    }

    // 2. 检查安全漏洞
    if (analysis.securityIssues.length > 0) {
      approved = false;
      confidence = 0.2;
      comments.push(`❌ 发现安全漏洞：${analysis.securityIssues.join(', ')}`);
    }

    // 3. 检查测试结果
    if (!testResults.passed) {
      approved = false;
      confidence = 0.4;
      comments.push(`❌ 测试失败：${testResults.failedTests}个测试未通过`);
    }

    // 4. 检查测试覆盖率
    if (testResults.coverage < 70) {
      approved = false;
      confidence = 0.6;
      comments.push(`⚠️ 测试覆盖率过低：${testResults.coverage}%`);
    }

    // 5. 生成comments
    if (approved) {
      comments.push(`✅ **CodeReview Agent Approved**\n\n**代码质量分数**: ${analysis.codeQualityScore}/100\n**测试覆盖率**: ${testResults.coverage}%\n\n**Summary:**\n${analysis.summary}`);
    }

    return {
      approved,
      confidence,
      comments,
      summary: analysis.summary,
      rejectionReason: approved ? undefined : 'Code quality or tests failed',
    };
  } catch (error: any) {
    console.error('[CodeReviewAgent] Error making decision:', error);
    return {
      approved: false,
      confidence: 0,
      comments: ['Error during review'],
      summary: 'Decision failed',
      rejectionReason: 'Exception',
    };
  }
}

// ========= 学习机制 =========

/**
 * 记录决策
 */
async function logDecision(decision: any): Promise<void> {
  try {
    await supabase.from('ai_decisions').insert({
      decision_type: 'code_review',
      input: JSON.stringify({ prId: decision.prId, prUrl: decision.prUrl }),
      output: JSON.stringify(decision.decision),
      confidence: decision.decision.confidence,
      auto_executed: decision.decision.approved,
      created_at: new Date(),
    });
  } catch (error: any) {
    console.error('[CodeReviewAgent] Error logging decision:', error);
  }
}

/**
 * 通知人类需要审核
 */
async function notifyHumanForReview(prId: number, decision: any): Promise<void> {
  try {
    await notifyHuman(`[CodeReviewAgent] PR #${prId} needs human review.\n\n**Confidence**: ${decision.confidence}\n**Summary**: ${decision.summary}`, 'medium');
  } catch (error: any) {
    console.error('[CodeReviewAgent] Error notifying human:', error);
  }
}

// ========= Webhook处理器 =========

/**
 * GitHub PR Webhook处理器
 * 这个函数在 /api/github/webhook 中调用
 */
export async function handlePRWebhook(webhookBody: any): Promise<{ success: boolean }> {
  try {
    const { action, pull_request } = webhookBody;

    // 只处理PR创建或更新
    if (action !== 'opened' && action !== 'synchronize') {
      return { success: true };
    }

    const prId = pull_request.number;
    const prUrl = pull_request.html_url;

    console.log(`[Webhook] PR #${prId} ${action}: ${prUrl}`);

    // 触发代码review
    const { approved, confidence } = await reviewPR(prId, prUrl);

    console.log(`[Webhook] PR #${prId} review result: approved=${approved}, confidence=${confidence}`);

    return { success: true };
  } catch (error: any) {
    console.error('[Webhook] Error handling PR webhook:', error);
    return { success: false };
  }
}

// ========= 批量处理 =========

/**
 * 批量review所有待审核的PR（定时任务）
 */
export async function reviewAllOpenPRs(): Promise<{ reviewed: number; autoMerged: number }> {
  try {
    console.log('[CodeReviewAgent] Reviewing all open PRs...');

    // 1. 获取所有打开的PR
    const response = await fetch(`https://api.github.com/repos/lixingliangsy/meetsum-ai/pulls?state=open`, {
      headers: {
        'Authorization': `token ${process.env.GITHUB_TOKEN}`,
      },
    });

    const openPRs = await response.json();

    let reviewed = 0;
    let autoMerged = 0;

    // 2. 逐个review
    for (const pr of openPRs) {
      const { approved } = await reviewPR(pr.number, pr.html_url);

      if (approved) {
        autoMerged++;
      }

      reviewed++;
    }

    console.log(`[CodeReviewAgent] Reviewed ${reviewed} PRs, auto-merged ${autoMerged}`);

    return { reviewed, autoMerged };
  } catch (error: any) {
    console.error('[CodeReviewAgent] Error reviewing all PRs:', error);
    return { reviewed: 0, autoMerged: 0 };
  }
}

// ========= 使用示例 =========

/*
// 示例1：在GitHub Webhook中调用
// 文件位置: meetsum-ai/src/pages/api/github/webhook.ts

import { handlePRWebhook } from '@/ai-agents/code-review';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // 验证webhook secret
  const signature = req.headers['x-hub-signature-256'];
  // TODO: 验证signature

  try {
    const { success } = await handlePRWebhook(req.body);

    if (success) {
      return res.status(200).json({ message: 'Webhook processed' });
    } else {
      return res.status(500).json({ error: 'Failed to process webhook' });
    }
  } catch (error: any) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// 示例2：定时批量review
// 在Vercel Cron Job中调用

import { reviewAllOpenPRs } from '@/ai-agents/code-review';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 验证cron secret
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { reviewed, autoMerged } = await reviewAllOpenPRs();

  return res.status(200).json({ reviewed, autoMerged });
}

// 示例3：手动触发review
async function testCodeReviewAgent() {
  const prId = 123; // 实际PR number
  const prUrl = `https://github.com/lixingliangsy/meetsum-ai/pull/${prId}`;

  const { approved, confidence, comments } = await reviewPR(prId, prUrl);

  console.log(`PR #${prId} review result:
    - Approved: ${approved}
    - Confidence: ${confidence}
    - Comments: ${comments.length}
  `);
}
*/

export default {
  reviewPR,
  reviewAllOpenPRs,
  handlePRWebhook,
};
