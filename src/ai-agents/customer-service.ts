/**
 * 客服AI Agent
 * 
 * 基于YC Tom Blomfield的演讲：第一个AI Agent应该是客服Agent
 * 这是AI原生架构的"执行层"核心Agent
 * 
 * 功能：
 * 1. 自动回复简单客户邮件（正面情感 + 非退款问题）
 * 2. 分类客户问题（技术支持、账单问题、功能请求）
 * 3. 转人工处理（负面情感 + 高风险问题）
 * 4. 学习最佳实践（从你的回复中学习）
 */

import { supabase } from '../lib/supabase';
import { OpenAI } from '../lib/openai';
import { EmailTools } from '../lib/ai-tools';
import { canAutoExecute, requiresHumanApproval, logAIDecision, notifyHuman } from '../lib/ai-policy';

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_API_KEY ? 'https://api.deepseek.com' : undefined,
});

// ========= 主函数 =========

/**
 * 处理客户邮件
 * @param email - 邮件数据（from, subject, text, html）
 */
export async function handleCustomerEmail(email: {
  from: string;
  subject: string;
  text?: string;
  html?: string;
}): Promise<{ handled: boolean; reply?: string }> {
  try {
    console.log(`[CustomerServiceAgent] Processing email from ${email.from}`);

    // 1. 解析邮件内容
    const emailContent = email.text || email.html || '';
    const subject = email.subject || '';

    // 2. 分析邮件（情感、主题、紧急程度）
    const analysis = await analyzeEmail(emailContent, subject);

    console.log(`[CustomerServiceAgent] Analysis:`, analysis);

    // 3. 检查是否可以自动回复
    const context = {
      sentiment: analysis.sentiment,
      topic: analysis.topic,
      urgency: analysis.urgency,
      confidence: analysis.confidence,
    };

    if (canAutoExecute('replyToCustomer', context)) {
      // 4a. AI自动生成回复
      const reply = await generateReply(emailContent, subject, analysis);

      // 5a. 发送回复
      const { success } = await EmailTools.sendEmail(email.from, `Re: ${subject}`, reply);

      if (success) {
        // 6a. 记录到communications表
        await supabase.from('communications').insert({
          user_id: await getUserIdByEmail(email.from),
          channel: 'email',
          direction: 'outbound',
          content: reply,
          ai_handled: true,
          created_at: new Date(),
        });

        // 7a. 记录AI决策
        await logAIDecision({
          decisionType: 'auto_reply',
          input: JSON.stringify({ from: email.from, subject, content: emailContent }),
          output: reply,
          confidence: analysis.confidence,
          autoExecuted: true,
        });

        console.log(`[CustomerServiceAgent] Auto-replied to ${email.from}`);

        return { handled: true, reply };
      } else {
        console.error(`[CustomerServiceAgent] Failed to send email to ${email.from}`);
        await notifyHuman(`Failed to send auto-reply to ${email.from}`, 'high');
        return { handled: false };
      }
    } else {
      // 4b. 转人工处理
      console.log(`[CustomerServiceAgent] Forwarding to human: ${email.from}`);

      await notifyHuman(`需要人工回复的邮件：\nFrom: ${email.from}\nSubject: ${subject}\nContent: ${emailContent.substring(0, 200)}...`, 'medium');

      // 记录到communications表
      await supabase.from('communications').insert({
        user_id: await getUserIdByEmail(email.from),
        channel: 'email',
        direction: 'inbound',
        content: emailContent,
        ai_handled: false,
        created_at: new Date(),
      });

      return { handled: false };
    }
  } catch (error: any) {
    console.error('[CustomerServiceAgent] Error:', error);
    await notifyHuman(`客服Agent出错：${error.message}`, 'high');
    return { handled: false };
  }
}

// ========= 辅助函数 =========

/**
 * 分析邮件（情感、主题、紧急程度）
 */
async function analyzeEmail(content: string, subject: string): Promise<{
  sentiment: string;
  topic: string;
  urgency: string;
  confidence: number;
  summary: string;
}> {
  try {
    const response = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `你是一个邮件分析专家。

分析客户邮件，提取关键信息。

输出格式（JSON）：
{
  "sentiment": "positive" | "neutral" | "negative",
  "topic": "support" | "billing" | "feature_request" | "bug_report" | "refund" | "other",
  "urgency": "low" | "medium" | "high",
  "confidence": 0.0-1.0,  // AI对分析结果的置信度
  "summary": "邮件摘要（50字以内）"
}`,
        },
        {
          role: 'user',
          content: `邮件主题：${subject}\n\n邮件内容：${content}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');

    return {
      sentiment: result.sentiment || 'neutral',
      topic: result.topic || 'other',
      urgency: result.urgency || 'low',
      confidence: result.confidence || 0.5,
      summary: result.summary || '',
    };
  } catch (error: any) {
    console.error('[CustomerServiceAgent] Error analyzing email:', error);
    return {
      sentiment: 'neutral',
      topic: 'other',
      urgency: 'low',
      confidence: 0.5,
      summary: '',
    };
  }
}

/**
 * 生成回复
 */
async function generateReply(content: string, subject: string, analysis: any): Promise<string> {
  try {
    // 1. 获取相关文档（FAQ、帮助文档）
    const relevantDocs = await searchRelevantDocs(content);

    // 2. AI生成回复
    const response = await openai.chat.completions.create({
      model: process.env.DEEPSEEK_API_KEY ? 'deepseek-chat' : 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `你是一个专业的客服代表。

基于客户邮件和相关文档，生成友好、专业的回复。

规则：
- 保持友好、同理心
- 直接回答客户问题
- 如果无法回答，提供替代方案或升级到人工
- 回复长度：100-200字
- 使用客户的名字（如果有）

回复模板：
"Hi [Name],

感谢你的邮件。[回答客户问题]

[相关说明或下一步]

Best,
MeetSum AI Support Team"`,
        },
        {
          role: 'user',
          content: `客户邮件：\n主题：${subject}\n内容：${content}\n\n分析：${JSON.stringify(analysis)}\n\n相关文档：${JSON.stringify(relevantDocs)}`,
        },
      ],
    });

    return response.choices[0].message.content || 'Thank you for your email. We will get back to you soon.';
  } catch (error: any) {
    console.error('[CustomerServiceAgent] Error generating reply:', error);
    return 'Thank you for your email. Our team will review and respond shortly.';
  }
}

/**
 * 搜索相关文档
 */
async function searchRelevantDocs(content: string): Promise<string[]> {
  try {
    // 简化版：返回常见FAQ
    // TODO: 集成向量数据库（Pinecone/Supabase Vector）
    const faqs = [
      'How to upload audio files?',
      'Supported audio formats',
      'Pricing plans',
      'Refund policy',
      'Supported languages',
    ];

    // 简单关键词匹配
    const relevant = faqs.filter(faq => {
      const keywords = faq.toLowerCase().split(' ');
      const contentLower = content.toLowerCase();
      return keywords.some(keyword => contentLower.includes(keyword));
    });

    return relevant;
  } catch (error: any) {
    console.error('[CustomerServiceAgent] Error searching docs:', error);
    return [];
  }
}

/**
 * 根据邮箱获取用户ID
 */
async function getUserIdByEmail(email: string): Promise<string | null> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (error || !data) {
      return null;
    }

    return data.id;
  } catch (error: any) {
    console.error('[CustomerServiceAgent] Error getting user ID:', error);
    return null;
  }
}

// ========= Webhook处理器 =========

/**
 * SendGrid Inbound Parse Webhook处理器
 * 这个函数在 /api/email/webhook 中调用
 */
export async function handleInboundEmail(webhookBody: any): Promise<{ success: boolean }> {
  try {
    // 1. 解析SendGrid Inbound Parse数据
    const { from, subject, text, html, to } = webhookBody;

    console.log(`[Webhook] Received email from ${from}, subject: ${subject}`);

    // 2. 检查是否是回复邮件（避免循环）
    if (subject?.startsWith('Re:') && html?.includes('meetsum.ai')) {
      console.log(`[Webhook] Skipping auto-reply (already replied)`);
      return { success: true };
    }

    // 3. 处理邮件
    const { handled } = await handleCustomerEmail({ from, subject, text, html });

    // 4. 记录到user_feedback表（用于学习）
    const sentiment = handled ? 'positive' : 'neutral';

    await supabase.from('user_feedback').insert({
      source: 'email',
      sender_email: from,
      subject: subject,
      content: text || html,
      sentiment: sentiment,
      created_at: new Date(),
    });

    return { success: true };
  } catch (error: any) {
    console.error('[Webhook] Error handling inbound email:', error);
    return { success: false };
  }
}

// ========= 批量处理 =========

/**
 * 批量处理未回复的邮件（定时任务）
 */
export async function processUnrepliedEmails(): Promise<{ processed: number; autoReplied: number }> {
  try {
    console.log('[CustomerServiceAgent] Processing unreplied emails...');

    // 1. 获取所有未回复的邮件（从communications表中查询）
    const { data: unreplied, error } = await supabase
      .from('communications')
      .select('*')
      .eq('direction', 'inbound')
      .is('replied_at', null)
      .limit(20);

    if (error || !unreplied) {
      console.error('[CustomerServiceAgent] Error fetching unreplied emails:', error);
      return { processed: 0, autoReplied: 0 };
    }

    let processed = 0;
    let autoReplied = 0;

    // 2. 逐个处理
    for (const email of unreplied) {
      const { handled } = await handleCustomerEmail({
        from: email.sender_email || email.from,
        subject: email.subject,
        text: email.content,
      });

      if (handled) {
        autoReplied++;

        // 更新replied_at
        await supabase
          .from('communications')
          .update({ replied_at: new Date() })
          .eq('id', email.id);
      }

      processed++;
    }

    console.log(`[CustomerServiceAgent] Processed ${processed} emails, auto-replied ${autoReplied}`);

    return { processed, autoReplied };
  } catch (error: any) {
    console.error('[CustomerServiceAgent] Error processing unreplied emails:', error);
    return { processed: 0, autoReplied: 0 };
  }
}

// ========= 使用示例 =========

/*
// 示例1：在SendGrid Webhook中调用
// 文件位置: meetsum-ai/src/pages/api/email/webhook.ts

import { handleInboundEmail } from '@/ai-agents/customer-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const webhookBody = req.body;

    // 处理邮件
    const { success } = await handleInboundEmail(webhookBody);

    if (success) {
      return res.status(200).json({ message: 'Email processed' });
    } else {
      return res.status(500).json({ error: 'Failed to process email' });
    }
  } catch (error: any) {
    console.error('Webhook error:', error);
    return res.status(500).json({ error: error.message });
  }
}

// 示例2：定时批量处理未回复邮件
// 在Vercel Cron Job中调用

import { processUnrepliedEmails } from '@/ai-agents/customer-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 验证cron secret
  if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { processed, autoReplied } = await processUnrepliedEmails();

  return res.status(200).json({ processed, autoReplied });
}

// 示例3：手动测试客服Agent

async function testCustomerServiceAgent() {
  const testEmail = {
    from: 'customer@example.com',
    subject: 'Question about MeetSum AI',
    text: 'Hi, I just uploaded an audio file but the transcription is not working. Can you help?',
  };

  const { handled, reply } = await handleCustomerEmail(testEmail);

  console.log(`Handled: ${handled}`);
  console.log(`Reply: ${reply}`);
}
*/
