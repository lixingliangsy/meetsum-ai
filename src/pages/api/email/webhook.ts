import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// 初始化Supabase客户端
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * SendGrid Inbound Parse Webhook
 * 接收SendGrid转发过来的邮件，解析并存入数据库
 * 
 * 配置步骤：
 * 1. 在SendGrid中配置Inbound Parse (Settings → Inbound Parse)
 * 2. 设置接收邮箱（如 feedback@yourdomain.com）
 * 3. 设置Webhook URL: https://your-vercel-url.vercel.app/api/email/webhook
 * 4. 测试：发一封邮件到接收邮箱 → 检查是否触发此Webhook
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 1. 解析SendGrid Inbound Parse数据
    const {
      from, // 发件人邮箱
      subject, // 邮件主题
      text, // 邮件纯文本正文
      html, // 邮件HTML正文
      to, // 收件人邮箱
      headers, // 邮件头
      attachments, // 附件
    } = req.body;

    console.log('📧 Received email from:', from);
    console.log('📧 Subject:', subject);

    // 2. 查找用户（根据邮箱）
    const { data: userData, error: userError } = await supabase
      .from('auth.users')
      .select('id')
      .eq('email', from)
      .single();

    let userId = null;
    if (!userError && userData) {
      userId = userData.id;
    }

    // 3. 情感分析（简单版本 - 可以后续用AI增强）
    const sentiment = analyzeSentiment(text);
    const category = categorizeEmail(subject, text);

    // 4. 存入user_feedback表
    const { data: feedbackData, error: feedbackError } = await supabase
      .from('user_feedback')
      .insert([
        {
          user_id: userId,
          source: 'email',
          content: text || html || '',
          sentiment: sentiment,
          category: category,
          processed: false,
        },
      ])
      .select()
      .single();

    if (feedbackError) {
      console.error('❌ Error inserting feedback:', feedbackError);
      return res.status(500).json({ error: 'Failed to save feedback' });
    }

    // 5. 记录到communications表
    const { error: commError } = await supabase
      .from('communications')
      .insert([
        {
          user_id: userId,
          channel: 'email',
          direction: 'inbound',
          content: text || html || '',
          ai_handled: false,
          sentiment_score: sentiment === 'positive' ? 1.0 : sentiment === 'negative' ? -1.0 : 0.0,
          intent: category,
        },
      ]);

    if (commError) {
      console.error('❌ Error inserting communication:', commError);
    }

    // 6. 自动回复（可选 - 根据AI原生架构）// TODO: 后续集成AI自动回复
    // if (shouldAutoReply(subject, text)) {
    //   await sendAutoReply(from, subject, sentiment);
    // }

    console.log('✅ Email processed and saved to database');

    return res.status(200).json({
      success: true,
      message: 'Email received and processed',
      feedback_id: feedbackData.id,
    });
  } catch (error) {
    console.error('❌ Error processing email webhook:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * 简单情感分析（基于关键词）
 * TODO: 后续用AI模型（GPT-4/DeepSeek）替换
 */
function analyzeSentiment(text: string): 'positive' | 'neutral' | 'negative' {
  const positiveKeywords = ['great', 'excellent', 'love', 'awesome', 'helpful', 'thanks', 'thank you', 'good', 'amazing', 'perfect'];
  const negativeKeywords = ['bad', 'terrible', 'hate', 'awful', 'useless', 'broken', 'error', 'issue', 'problem', 'disappointed'];

  const lowerText = text.toLowerCase();
  
  let positiveScore = 0;
  let negativeScore = 0;

  positiveKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) positiveScore++;
  });

  negativeKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) negativeScore++;
  });

  if (positiveScore > negativeScore) return 'positive';
  if (negativeScore > positiveScore) return 'negative';
  return 'neutral';
}

/**
 * 简单邮件分类
 * TODO: 后续用AI模型（GPT-4/DeepSeek）替换
 */
function categorizeEmail(subject: string, text: string): string {
  const lowerText = (subject + ' ' + text).toLowerCase();
  
  if (lowerText.includes('bug') || lowerText.includes('error') || lowerText.includes('issue')) {
    return 'bug';
  }
  if (lowerText.includes('feature') || lowerText.includes('suggestion') || lowerText.includes('idea')) {
    return 'feature_request';
  }
  if (lowerText.includes('complain') || lowerText.includes('disappointed') || lowerText.includes('terrible')) {
    return 'complaint';
  }
  if (lowerText.includes('thanks') || lowerText.includes('thank you') || lowerText.includes('great') || lowerText.includes('love')) {
    return 'praise';
  }
  
  return 'other';
}

/**
 * 是否应该自动回复
 * TODO: 后续用AI决策引擎替换
 */
function shouldAutoReply(subject: string, text: string): boolean {
  // 简单规则：如果是简单问题或感谢信，可以自动回复
  const lowerText = (subject + ' ' + text).toLowerCase();
  
  if (lowerText.includes('how to') || lowerText.includes('how do i') || lowerText.includes('help')) {
    return true;
  }
  
  if (analyzeSentiment(text) === 'positive') {
    return true; // 自动感谢
  }
  
  return false;
}

/**
 * 发送自动回复（TODO: 后续实现）
 */
async function sendAutoReply(to: string, subject: string, sentiment: string) {
  // TODO: 集成SendGrid API发送自动回复
  console.log('📧 Should send auto-reply to:', to, '(not implemented yet)');
}
