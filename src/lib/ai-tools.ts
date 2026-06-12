/**
 * AI工具集
 * 
 * 基于YC Tom Blomfield的演讲：让AI可以调用所有必要的工具
 * 这是AI原生架构的"工具层"核心文件
 * 
 * 原则：
 * 1. 每个工具都是确定性能力（AI可以安全调用）
 * 2. 所有工具调用都记录日志（用于学习和调试）
 * 3. 敏感操作需要人类审批（参考ai-policy.ts）
 */

import { supabase } from './supabase';
import { logAIDecision } from './ai-policy';

// ========= 邮件工具 =========
export const EmailTools = {
  /**
   * 发送邮件
   * @param to - 收件人邮箱
   * @param subject - 邮件主题
   * @param body - 邮件内容（纯文本或HTML）
   * @param options - 可选参数（from, replyTo, attachments）
   */
  async sendEmail(
    to: string,
    subject: string,
    body: string,
    options?: {
      from?: string;
      replyTo?: string;
      attachments?: Array<{ filename: string; content: string; encoding?: string }>;
    }
  ): Promise<{ success: boolean; messageId?: string; error?: string }> {
    try {
      const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: to }] }],
          from: { email: options?.from || 'noreply@meetsum.ai' },
          subject: subject,
          content: [{ type: 'text/plain', value: body }],
          ...(options?.replyTo && { reply_to: { email: options.replyTo } }),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('SendGrid error:', errorText);
        return { success: false, error: errorText };
      }

      const messageId = response.headers.get('x-message-id') || undefined;

      // 记录到communications表
      await supabase.from('communications').insert({
        channel: 'email',
        direction: 'outbound',
        content: body,
        recipient: to,
        message_id: messageId,
        ai_handled: true,
        created_at: new Date(),
      });

      return { success: true, messageId };
    } catch (error: any) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  },

  /**
   * 接收邮件（SendGrid Inbound Parse Webhook）
   * 这个函数在 /api/email/webhook 中调用
   */
  async receiveEmail(webhookBody: any): Promise<{ success: boolean; feedbackId?: number }> {
    try {
      const { from, subject, text, html } = webhookBody;

      // 情感分析
      const sentiment = await analyzeSentiment(text || html);

      // 入库user_feedback表
      const { data, error } = await supabase
        .from('user_feedback')
        .insert({
          source: 'email',
          sender_email: from,
          subject: subject,
          content: text || html,
          sentiment: sentiment,
          created_at: new Date(),
        })
        .select()
        .single();

      if (error) {
        console.error('Error saving feedback:', error);
        return { success: false };
      }

      return { success: true, feedbackId: data.id };
    } catch (error: any) {
      console.error('Error receiving email:', error);
      return { success: false };
    }
  },
};

// ========= 数据库工具 =========
export const DatabaseTools = {
  /**
   * 查询用户
   */
  async queryUsers(query: string, filters?: any): Promise<any[]> {
    let queryBuilder = supabase.from('users').select(query);

    // 应用过滤器
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        queryBuilder = queryBuilder.eq(key, value);
      });
    }

    const { data, error } = await queryBuilder;

    if (error) {
      console.error('Database query error:', error);
      return [];
    }

    return data || [];
  },

  /**
   * 更新用户
   */
  async updateUser(userId: string, updates: any): Promise<boolean> {
    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', userId);

    if (error) {
      console.error('Database update error:', error);
      return false;
    }

    return true;
  },

  /**
   * 记录用户行为
   */
  async logUserAction(userId: string, action: string, metadata?: any): Promise<void> {
    await supabase.from('user_actions').insert({
      user_id: userId,
      action: action,
      metadata: metadata,
      created_at: new Date(),
    });
  },
};

// ========= 部署工具 =========
export const DeploymentTools = {
  /**
   * 触发布署（Vercel API）
   */
  async redeploy(reason?: string): Promise<{ success: boolean; deploymentId?: string }> {
    try {
      const response = await fetch('https://api.vercel.com/v13/deployments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'meetsum-ai',
          gitSource: {
            type: 'github',
            repoId: process.env.GITHUB_REPO_ID,
            ref: 'main',
          },
          target: 'production',
          meta: reason ? { reason } : undefined,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Vercel deployment error:', errorText);
        return { success: false };
      }

      const data = await response.json();

      // 记录到ai_decisions表
      await logAIDecision({
        decisionType: 'deployment',
        input: `Redeploy triggered: ${reason || 'Manual trigger'}`,
        output: `Deployment ID: ${data.id}`,
        autoExecuted: true,
      });

      return { success: true, deploymentId: data.id };
    } catch (error: any) {
      console.error('Error triggering deployment:', error);
      return { success: false };
    }
  },
};

// ========= 社交媒体工具 =========
export const SocialMediaTools = {
  /**
   * 发推文
   */
  async postTweet(text: string, options?: { replyTo?: string; mediaIds?: string[] }): Promise<{ success: boolean; tweetId?: string }> {
    try {
      const response = await fetch('https://api.twitter.com/2/tweets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          ...(options?.replyTo && { reply: { in_reply_to_tweet_id: options.replyTo } }),
          ...(options?.mediaIds && { media: { media_ids: options.mediaIds } }),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Twitter API error:', errorText);
        return { success: false };
      }

      const data = await response.json();

      // 记录到communications表
      await supabase.from('communications').insert({
        channel: 'twitter',
        direction: 'outbound',
        content: text,
        tweet_id: data.data.id,
        ai_handled: true,
        created_at: new Date(),
      });

      return { success: true, tweetId: data.data.id };
    } catch (error: any) {
      console.error('Error posting tweet:', error);
      return { success: false };
    }
  },

  /**
   * 回复Reddit评论
   */
  async replyToReddit(postId: string, comment: string): Promise<{ success: boolean; commentId?: string }> {
    try {
      const response = await fetch(`https://oauth.reddit.com/api/comment`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.REDDIT_ACCESS_TOKEN}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          api_type: 'json',
          thing_id: postId,
          text: comment,
        }).toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Reddit API error:', errorText);
        return { success: false };
      }

      const data = await response.json();

      // 记录到communications表
      await supabase.from('communications').insert({
        channel: 'reddit',
        direction: 'outbound',
        content: comment,
        post_id: postId,
        ai_handled: true,
        created_at: new Date(),
      });

      return { success: true, commentId: data.json.data.things[0].data.id };
    } catch (error: any) {
      console.error('Error replying to Reddit:', error);
      return { success: false };
    }
  },
};

// ========= 分析工具 =========
export const AnalyticsTools = {
  /**
   * 获取用户满意度统计
   */
  async getUserSatisfactionStats(): Promise<any> {
    const { data, error } = await supabase
      .from('user_satisfaction_summary')
      .select('*')
      .single();

    if (error) {
      console.error('Error fetching satisfaction stats:', error);
      return null;
    }

    return data;
  },

  /**
   * 获取AI决策效果分析
   */
  async getAIDecisionEffectiveness(): Promise<any[]> {
    const { data, error } = await supabase
      .from('ai_decision_effectiveness')
      .select('*')
      .order('total_decisions', { ascending: false });

    if (error) {
      console.error('Error fetching AI decision effectiveness:', error);
      return [];
    }

    return data || [];
  },
};

// ========= 辅助函数 =========
async function analyzeSentiment(text: string): Promise<string> {
  // 简化版：基于关键词的情感分析
  const positiveKeywords = ['good', 'great', 'excellent', 'love', 'helpful', 'thanks', 'thank you'];
  const negativeKeywords = ['bad', 'poor', 'terrible', 'hate', 'useless', 'refund', 'cancel'];

  const lowerText = text.toLowerCase();
  const positiveCount = positiveKeywords.filter(keyword => lowerText.includes(keyword)).length;
  const negativeCount = negativeKeywords.filter(keyword => lowerText.includes(keyword)).length;

  if (positiveCount > negativeCount) return 'positive';
  if (negativeCount > positiveCount) return 'negative';
  return 'neutral';
}

// 使用示例：
/*
import { EmailTools, DatabaseTools, SocialMediaTools } from '@/lib/ai-tools';

// 示例1：客服AI Agent自动回复客户邮件
export async function handleCustomerEmail(email: any) {
  // 1. 接收邮件
  const { feedbackId } = await EmailTools.receiveEmail(email);

  // 2. 获取用户数据
  const user = await DatabaseTools.queryUsers('*', { email: email.from });

  // 3. AI生成回复
  const reply = await generateReply(email.text, user);

  // 4. 发送回复
  await EmailTools.sendEmail(email.from, `Re: ${email.subject}`, reply);

  console.log(`Customer email handled: feedbackId=${feedbackId}`);
}

// 示例2：营销AI Agent自动发推文
export async function postMarketingTweet() {
  const tweetText = await generateMarketingContent();
  const { tweetId } = await SocialMediaTools.postTweet(tweetText);
  console.log(`Marketing tweet posted: ${tweetId}`);
}

// 示例3：监控Agent自动部署
export async function monitorAndDeploy() {
  // 检查是否需要部署
  const needsDeployment = await checkIfDeploymentNeeded();

  if (needsDeployment) {
    const { deploymentId } = await DeploymentTools.redeploy('Automated deployment by monitoring agent');
    console.log(`Deployment triggered: ${deploymentId}`);
  }
}
*/
