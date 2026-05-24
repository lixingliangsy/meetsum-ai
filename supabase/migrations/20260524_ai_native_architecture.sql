-- ============================================
-- MeetSum AI - AI原生架构数据层
-- 创建时间: 2026-05-24
-- 基于: YC Tom Blomfield 演讲优化方案
-- ============================================

-- 1. 用户反馈表（采集用户声音）
CREATE TABLE IF NOT EXISTS user_feedback (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  source VARCHAR(50) NOT NULL, -- 'email', 'twitter', 'reddit', 'app_review'
  content TEXT NOT NULL,
  sentiment VARCHAR(20), -- 'positive', 'neutral', 'negative'
  category VARCHAR(50), -- 'bug', 'feature_request', 'complaint', 'praise'
  processed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_user_feedback_user_id ON user_feedback(user_id);
CREATE INDEX idx_user_feedback_source ON user_feedback(source);
CREATE INDEX idx_user_feedback_sentiment ON user_feedback(sentiment);
CREATE INDEX idx_user_feedback_created_at ON user_feedback(created_at);

-- RLS (Row Level Security)
ALTER TABLE user_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own feedback" ON user_feedback
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can do all" ON user_feedback
  FOR ALL USING (auth.role() = 'service_role');

-- 2. AI决策记录表（让AI学会决策）
CREATE TABLE IF NOT EXISTS ai_decisions (
  id SERIAL PRIMARY KEY,
  decision_type VARCHAR(50) NOT NULL, -- 'auto_reply', 'pricing_change', 'feature_add', 'priority_adjust'
  input TEXT, -- AI收到的输入
  output TEXT, -- AI产生的输出
  reasoning TEXT, -- AI的决策理由
  human_approval BOOLEAN DEFAULT FALSE,
  human_feedback TEXT,
  outcome VARCHAR(20), -- 'success', 'failed', 'pending'
  confidence_score FLOAT DEFAULT 0.0, -- AI的置信度
  model_used VARCHAR(50), -- 使用的AI模型
  tokens_used INTEGER, -- 使用的token数
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_ai_decisions_type ON ai_decisions(decision_type);
CREATE INDEX idx_ai_decisions_outcome ON ai_decisions(outcome);
CREATE INDEX idx_ai_decisions_created_at ON ai_decisions(created_at);

-- RLS
ALTER TABLE ai_decisions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can do all" ON ai_decisions
  FOR ALL USING (auth.role() = 'service_role');

-- 3. 通信记录表（全量记录沟通过程）
CREATE TABLE IF NOT EXISTS communications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  channel VARCHAR(50) NOT NULL, -- 'email', 'twitter', 'in_app', 'wechat'
  direction VARCHAR(10) NOT NULL, -- 'inbound', 'outbound'
  content TEXT NOT NULL,
  ai_handled BOOLEAN DEFAULT FALSE,
  ai_response TEXT,
  human_intervened BOOLEAN DEFAULT FALSE,
  human_response TEXT,
  sentiment_score FLOAT, -- 情感得分 (-1 到 1)
  intent VARCHAR(50), -- 'question', 'complaint', 'praise', 'feature_request'
  created_at TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_communications_user_id ON communications(user_id);
CREATE INDEX idx_communications_channel ON communications(channel);
CREATE INDEX idx_communications_direction ON communications(direction);
CREATE INDEX idx_communications_created_at ON communications(created_at);

-- RLS
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own communications" ON communications
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can do all" ON communications
  FOR ALL USING (auth.role() = 'service_role');

-- 4. 用户行为日志表（追踪用户在产品内的行为）
CREATE TABLE IF NOT EXISTS user_actions (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  action_type VARCHAR(50) NOT NULL, -- 'upload', 'summarize', 'download', 'share', 'upgrade'
  action_data JSONB, -- 附加数据
  session_id VARCHAR(100),
  duration INTEGER, -- 行为持续时间（秒）
  success BOOLEAN DEFAULT TRUE,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_user_actions_user_id ON user_actions(user_id);
CREATE INDEX idx_user_actions_action_type ON user_actions(action_type);
CREATE INDEX idx_user_actions_created_at ON user_actions(created_at);

-- RLS
ALTER TABLE user_actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own actions" ON user_actions
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role can do all" ON user_actions
  FOR ALL USING (auth.role() = 'service_role');

-- 5. AI学习记录表（记录AI从反馈中学习的过程）
CREATE TABLE IF NOT EXISTS ai_learning_logs (
  id SERIAL PRIMARY KEY,
  decision_id INTEGER REFERENCES ai_decisions(id),
  feedback_id INTEGER REFERENCES user_feedback(id),
  learning_type VARCHAR(50) NOT NULL, -- 'prompt_optimization', 'strategy_adjustment', 'preference_update'
  before_state JSONB, -- 学习前的状态
  after_state JSONB, -- 学习后的状态
  improvement_metric VARCHAR(50), -- 'accuracy', 'satisfaction', 'efficiency'
  improvement_value FLOAT, -- 改进值
  created_at TIMESTAMP DEFAULT NOW()
);

-- 索引
CREATE INDEX idx_ai_learning_logs_decision_id ON ai_learning_logs(decision_id);
CREATE INDEX idx_ai_learning_logs_feedback_id ON ai_learning_logs(feedback_id);
CREATE INDEX idx_ai_learning_logs_created_at ON ai_learning_logs(created_at);

-- RLS
ALTER TABLE ai_learning_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role can do all" ON ai_learning_logs
  FOR ALL USING (auth.role() = 'service_role');

-- ============================================
-- 创建视图：用户满意度聚合
-- ============================================
CREATE OR REPLACE VIEW user_satisfaction_summary AS
SELECT 
  user_id,
  COUNT(*) as total_feedback,
  SUM(CASE WHEN sentiment = 'positive' THEN 1 ELSE 0 END) as positive_count,
  SUM(CASE WHEN sentiment = 'negative' THEN 1 ELSE 0 END) as negative_count,
  AVG(CASE 
    WHEN sentiment = 'positive' THEN 1.0
    WHEN sentiment = 'neutral' THEN 0.0
    WHEN sentiment = 'negative' THEN -1.0
  END) as avg_sentiment_score,
  MAX(created_at) as last_feedback_at
FROM user_feedback
GROUP BY user_id;

-- ============================================
-- 创建视图：AI决策效果分析
-- ============================================
CREATE OR REPLACE VIEW ai_decision_effectiveness AS
SELECT 
  decision_type,
  COUNT(*) as total_decisions,
  SUM(CASE WHEN outcome = 'success' THEN 1 ELSE 0 END) as success_count,
  AVG(confidence_score) as avg_confidence,
  AVG(tokens_used) as avg_tokens,
  MAX(created_at) as last_decision_at
FROM ai_decisions
GROUP BY decision_type;

-- ============================================
-- 插入初始数据：定义AI决策类型
-- ============================================
INSERT INTO ai_decisions (decision_type, input, output, reasoning, human_approval, outcome, model_used)
VALUES 
  ('system_init', 'Initialize AI native architecture', 'Architecture initialized', 'Setting up 5-layer AI evolution flywheel', TRUE, 'success', 'system')
ON CONFLICT DO NOTHING;

-- ============================================
-- 函数：更新updated_at字段
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 创建触发器
CREATE TRIGGER update_user_feedback_updated_at BEFORE UPDATE ON user_feedback
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ai_decisions_updated_at BEFORE UPDATE ON ai_decisions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 完成提示
-- ============================================
-- 执行以下命令在Supabase中运行此脚本：
-- 1. 登录 https://supabase.com/dashboard
-- 2. 选择你的项目
-- 3. 进入 SQL Editor
-- 4. 复制并粘贴此文件内容
-- 5. 点击 "Run"
-- 
-- 验证：
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
-- ============================================
