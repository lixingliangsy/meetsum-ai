/**
 * AI权限策略配置
 * 
 * 基于YC Tom Blomfield的演讲：定义AI能做什么、不能做什么
 * 这是AI原生架构的"策略层"核心文件
 * 
 * 原则：
 * 1. 低风险操作 → AI自动执行
 * 2. 中风险操作 → AI建议，人类决策
 * 3. 高风险操作 → 必须由人类执行
 */

// AI操作权限策略
export const AI_POLICY = {
  // ========== 低风险操作（AI自动执行） ==========
  autoExecute: {
    // 回复客户邮件（正面情感 + 非退款问题）
    replyToCustomer: {
      condition: 'sentiment === "positive" && topic !== "refund" && confidence > 0.95',
      maxResponseTime: '2 hours',
      requireLog: true, // 记录到ai_decisions表
    },
    
    // 更新文档（功能变更后）
    updateDocumentation: {
      condition: 'featureChanged === true',
      requireHumanReview: false,
      autoPublish: true,
    },
    
    // 发送感谢邮件（用户续费、升级）
    sendThankYouEmail: {
      condition: 'userAction === "upgrade" || userAction === "renew"',
      maxResponseTime: '1 hour',
      requireLog: true,
    },
    
    // 社交媒体监控（自动采集数据）
    monitorSocialMedia: {
      condition: 'always',
      frequency: 'every 6 hours',
      requireLog: false,
    },
    
    // 用户行为分析（自动生成报告）
    analyzeUserBehavior: {
      condition: 'always',
      frequency: 'daily',
      requireLog: true,
    },
  },
  
  // ========== 中风险操作（AI建议，人类决策） ==========
  suggestOnly: {
    // 添加新功能
    addNewFeature: {
      requireHumanApproval: true,
      notifySlack: true,
    },
    
    // 调整定价
    changePricing: {
      requireHumanApproval: true,
      notifySlack: true,
      requireMarketResearch: true, // AI自动做竞品调研
    },
    
    // 合作伙伴决策
    partnershipDecision: {
      requireHumanApproval: true,
      notifySlack: true,
    },
    
    // 营销文案生成（需要人类审核）
    generateMarketingContent: {
      requireHumanReview: true,
      maxRevisions: 3,
    },
  },
  
  // ========== 高风险操作（必须由人类执行） ==========
  humanOnly: {
    // 退款
    refund: {
      requireHumanApproval: true,
      notifySlack: true,
      maxRefundAmount: 100, // USD
    },
    
    // 删除账号
    deleteAccount: {
      requireHumanApproval: true,
      requireConfirmation: true,
      coolingPeriod: '7 days', // 7天冷静期
    },
    
    // 修改服务条款
    changeTermsOfService: {
      requireHumanApproval: true,
      requireLegalReview: true,
    },
    
    // 数据导出（GDPR请求）
    exportUserData: {
      requireHumanApproval: true,
      notifySlack: true,
    },
  },
};

// 检查AI是否可以自动执行某个操作
export function canAutoExecute(action: string, context: any): boolean {
  const policy = AI_POLICY.autoExecute[action];
  
  if (!policy) {
    console.warn(`Unknown action: ${action}`);
    return false;
  }
  
  // 简单的条件评估（可后续用AI替换）
  try {
    // 动态评估condition字符串
    const conditionFn = new Function('context', `return ${policy.condition}`);
    return conditionFn(context);
  } catch (error) {
    console.error(`Error evaluating condition for ${action}:`, error);
    return false;
  }
}

// 检查某个操作是否需要人类审批
export function requiresHumanApproval(action: string): boolean {
  // 检查是否在humanOnly列表中
  if (AI_POLICY.humanOnly[action]) {
    return true;
  }
  
  // 检查是否在suggestOnly列表中
  if (AI_POLICY.suggestOnly[action]) {
    return AI_POLICY.suggestOnly[action].requireHumanApproval === true;
  }
  
  // autoExecute列表中的操作，默认不需要审批
  return false;
}

// 记录AI决策到数据库
export async function logAIDecision(decision: {
  decisionType: string,
  input: string,
  output: string,
  confidence: number,
  autoExecuted: boolean,
}): Promise<void> {
  try {
    const { error } = await supabase
      .from('ai_decisions')
      .insert({
        decision_type: decision.decisionType,
        input: decision.input,
        output: decision.output,
        confidence: decision.confidence,
        auto_executed: decision.autoExecuted,
        created_at: new Date(),
      });
      
    if (error) {
      console.error('Error logging AI decision:', error);
    }
  } catch (error) {
    console.error('Exception logging AI decision:', error);
  }
}

// 通知人类（Slack/邮件）
export async function notifyHuman(message: string, priority: 'low' | 'medium' | 'high'): Promise<void> {
  try {
    // TODO: 集成Slack API
    console.log(`[${priority.toUpperCase()}] ${message}`);
      
    // 如果是高风险操作，同时发送邮件
    if (priority === 'high') {
      // TODO: 集成SendGrid发送邮件
      console.log(`Email notification sent: ${message}`);
    }
  } catch (error) {
    console.error('Error notifying human:', error);
  }
}

// 导入supabase客户端（避免循环依赖）
let supabase: any;

export function setSupabaseClient(client: any): void {
  supabase = client;
}

// 使用示例：
/*
import { canAutoExecute, requiresHumanApproval, logAIDecision, notifyHuman } from '@/lib/ai-policy';

// 示例1：客服AI Agent处理客户邮件
export async function handleCustomerEmail(email: any) {
  const context = {
    sentiment: await analyzeSentiment(email.text),
    topic: await extractTopic(email.text),
    confidence: 0.96,
  };
    
  // 检查是否可以自动回复
  if (canAutoExecute('replyToCustomer', context)) {
    // AI自动生成回复
    const reply = await generateReply(email, context);
      
    // 发送邮件
    await sendEmail(email.from, reply.subject, reply.body);
      
    // 记录AI决策
    await logAIDecision({
      decisionType: 'auto_reply',
      input: email.text,
      output: reply.body,
      confidence: context.confidence,
      autoExecuted: true,
    });
      
    // 记录到communications表
    await supabase.from('communications').insert({
      user_id: email.userId,
      channel: 'email',
      direction: 'outbound',
      content: reply.body,
      ai_handled: true,
      created_at: new Date(),
    });
  } else {
    // 转人工处理（通知你）
    await notifyHuman(`需要人工回复的邮件：\nFrom: ${email.from}\nSubject: ${email.subject}`, 'medium');
  }
}

// 示例2：定价调整决策
export async function considerPricingChange() {
  // 这个操作在suggestOnly列表中，需要人类审批
  if (requiresHumanApproval('changePricing')) {
    // AI自动做竞品调研
    const marketResearch = await conductMarketResearch();
      
    // 生成定价建议
    const suggestion = await generatePricingSuggestion(marketResearch);
      
    // 通知你审批
    await notifyHuman(`AI建议调整定价：\n${JSON.stringify(suggestion, null, 2)}`, 'high');
      
    // 记录到ai_decisions表（状态：pending_approval）
    await logAIDecision({
      decisionType: 'pricing_change',
      input: JSON.stringify(marketResearch),
      output: JSON.stringify(suggestion),
      confidence: 0.85,
      autoExecuted: false,
    });
  }
}
*/
