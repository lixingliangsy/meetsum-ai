# MeetSum AI - 智能会议摘要助手

AI驱动的会议摘要工具，自动转录和生成结构化会议纪要。

> **🆕 New**: 基于YC Tom Blomfield演讲，我们正在重构为**AI原生架构** - 让AI成为公司的操作系统，而不是简单的工具。详见 [`08_优化方案/AI_NATIVE_ARCHITECTURE_OPTIMIZATION.md`](./08_优化方案/AI_NATIVE_ARCHITECTURE_OPTIMIZATION.md)

## 功能特性

- 音频文件上传与转录
- AI智能摘要生成
- 多模板支持（要点/叙事）
- 用户认证与管理
- 响应式设计

### 🆕 AI原生架构特性 (v2.0 - 开发中)

基于"如何用AI打造递归的、昼夜进化的超级公司"理念，新增：

- **5层AI进化飞轮**: 数据采集 → 策略决策 → 工具执行 → 质量管控 → 学习进化
- **全量数据记录**: user_feedback / ai_decisions / communications / user_actions
- **AI决策引擎**: 自动回复、定价调整、功能优先级决策
- **社交媒体监控**: 自动追踪Twitter/Reddit提及
- **邮件系统集成**: SendGrid Inbound Parse Webhook
- **AI学习机制**: 从反馈中学习，优化决策策略

**核心哲学**: "Burn tokens, not headcount" - 用Token替代人力，让AI成为公司的核心运营系统。

---

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端 | Next.js 16 + React 19 + TypeScript |
| 样式 | Tailwind CSS + shadcn/ui |
| 后端 | Supabase (PostgreSQL + Auth + Storage + Realtime) |
| AI | OpenAI + DeepSeek + 智谱 + OpenRouter + 豆包 + 硅基流动 |
| 邮件 | SendGrid (Inbound Parse Webhook) |
| 社交媒体 | Twitter API v2 + Reddit API |
| 监控 | Sentry + Google Analytics |
| 支付 | Stripe (可选) |
| 部署 | Vercel (Edge Functions) |

### 🔧 AI原生架构技术栈 (v2.0 - 开发中)

| 层级 | 技术 |
|------|------|
| 数据层 | Supabase (5个新表: user_feedback, ai_decisions, communications, user_actions, ai_learning_logs) |
| 策略层 | LangChain / AutoGen (AI Agent框架) |
| 工具层 | SendGrid API, Twitter API, Reddit API, Stripe API |
| 学习层 | Pinecone / Supabase Vector (记忆存储) |
| 质量管控 | Sentry (错误监控), 人工审批流程 |

---

## 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量

```bash
cp .env.local.example .env.local
```

编辑 `.env.local` 填入你的API密钥：

```env
# Supabase (必填)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI API密钥 (至少选一个)
OPENAI_API_KEY=sk-your-openai-key           # Whisper转录用
OPENROUTER_API_KEY=sk-or-v1-...             # 免费模型
DEEPSEEK_API_KEY=sk-...                    # 推荐
ZHIPU_API_KEY=...                          # 免费额度

# 默认AI提供商
DEFAULT_AI_PROVIDER=deepseek

# App URL
NEXT_PUBLIC_APP_URL=https://your-project.vercel.app

# SendGrid (邮件系统 - 可选)
SENDGRID_API_KEY=SG.xxx...                # SendGrid API Key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# Twitter (社交媒体监控 - 可选)
TWITTER_BEARER_TOKEN=AAAAAAAAxxx...

# Reddit (社交媒体监控 - 可选)
REDDIT_CLIENT_ID=xxx...
REDDIT_CLIENT_SECRET=xxx...
```

### 3. 配置Supabase

1. 创建Supabase项目：https://supabase.com/dashboard
2. 执行 `supabase/migrations/20260524_ai_native_architecture.sql` 创建新表
3. 复制项目URL和密钥到 `.env.local`

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

---

## AI模型支持

### 支持的提供商

| 提供商 | 免费额度 | 推荐模型 | 特点 |
|--------|----------|----------|------|
| **DeepSeek** | 有 | deepseek-chat | 性价比最高 |
| **智谱AI** | 有 | glm-4-flash | 国内稳定 |
| **豆包** | 有 | doubao-lite-32k | 国内快速 |
| **OpenRouter** | 有 | qwen3-next-80b | 国外免费模型多 |
| **OpenAI** | 付费 | gpt-4-turbo | Whisper转录 |
| **Ollama** | 本地 | llama3/qwen2.5 | 完全免费本地 |

### 切换模型

在 `src/lib/ai-providers.ts` 中修改：

```typescript
// 默认使用DeepSeek
const { content } = await chatCompletion(messages, {
  provider: 'deepseek',  // 切换提供商
  model: 'deepseek-chat', // 切换模型
})
```

---

## 部署到Vercel

### 方式1: GitHub自动部署（推荐）

1. **推送代码到GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/meetsum-ai.git
   git push -u origin main
   ```

2. **在Vercel导入**
   - 访问 https://vercel.com/new
   - 选择GitHub仓库
   - 添加环境变量（见下方）

3. **添加环境变量到Vercel**

   | 变量名 | 值 |
   |--------|-----|
   | NEXT_PUBLIC_SUPABASE_URL | 你的Supabase URL |
   | NEXT_PUBLIC_SUPABASE_ANON_KEY | 你的Supabase Anon Key |
   | SUPABASE_SERVICE_ROLE_KEY | 你的Service Role Key |
   | OPENAI_API_KEY | 你的OpenAI API Key |
   | DEESEEK_API_KEY | 你的DeepSeek API Key |
   | DEFAULT_AI_PROVIDER | deepseek |
   | NEXT_PUBLIC_APP_URL | https://your-project.vercel.app |
   | SENDGRID_API_KEY | 你的SendGrid API Key | (可选)
   | TWITTER_BEARER_TOKEN | 你的Twitter API Token | (可选)
   | REDDIT_CLIENT_ID | 你的Reddit Client ID | (可选)
   | SENTRY_DSN | 你的Sentry DSN | (可选)
   | GOOGLE_ANALYTICS_ID | 你的Google Analytics ID | (可选)
   |

4. **点击 "Deploy"**

---

### 方式2: Vercel CLI（需要登录）

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录
vercel login

# 部署
vercel --prod
```

---

## 🆕 AI原生架构 (v2.0 - 开发中)

基于YC Tom Blomfield的演讲 **"如何用AI打造递归的、昼夜进化的超级公司"**，我们正在重构MeetSum AI为**AI原生架构**。

### 核心理念

1. **AI不是工具，而是公司操作系统**
2. **构建"递归自我进化的AI飞轮"**
3. **"烧Token而不是招人"** (Burn tokens, not headcount)
4. **人类只做AI无法替代的工作**

### 5层AI进化飞轮

```
5. 学习机制（灵魂）
   ↑ (反馈循环)
4. 质量控制网关
   ↓ (执行)
3. 工具层
   ↓ (决策)
2. 策略层
   ↓ (采集)
1. 传感器/数据层
```

### 数据采集层 (Week 1 - 已完成✅)

**新增Supabase表**:
- `user_feedback` - 用户反馈（邮件、Twitter、Reddit、应用内）
- `ai_decisions` - AI决策记录（输入、输出、置信度、结果）
- `communications` - 沟通记录（邮件、Twitter、Reddit、应用内）
- `user_actions` - 用户行为日志（上传、总结、下载、分享、升级）
- `ai_learning_logs` - AI学习记录（从反馈中学习的过程）

**新增API Routes**:
- `/api/email/webhook` - SendGrid Inbound Parse Webhook（接收邮件）
- `/api/social-monitor` - 社交媒体监控（Twitter/Reddit）

**配置环境变量**:
```bash
# SendGrid (邮件系统)
SENDGRID_API_KEY=SG.xxx...
SENDGRID_FROM_EMAIL=noreply@yourdomain.com

# Twitter API
TWITTER_BEARER_TOKEN=AAAAAAAAxxx...

# Reddit API
REDDIT_CLIENT_ID=xxx...
REDDIT_CLIENT_SECRET=xxx...
```

### 策略层 (Week 2 - 进行中⏳)

**定义AI权限边界**:
- 哪些决策可以全自动（置信度 > 0.95）
- 哪些需要人工审批（置信度 0.8-0.95）
- 哪些必须由人类做（置信度 < 0.8）

**实现AI决策引擎**:
- 自动回复客户邮件（简单问题）
- 调整定价策略（基于竞品监控）
- 优先级排序（bug修复 vs 新功能）

### 工具层 (Week 2 - 进行中⏳)

**开发AI工具集**:
- `send_email(to, subject, content)` - 发送邮件
- `post_tweet(text, image?)` - 发推文
- `reply_to_reddit(post_id, comment)` - 回复Reddit
- `create_github_issue(title, body)` - 创建GitHub Issue
- `upgrade_user(user_id, plan)` - 升级用户套餐

### 学习机制 (Week 3 - 待完成⏳)

**实现AI学习循环**:
1. AI做决策 → 记录到 `ai_decisions` 表
2. 用户反馈 → 记录到 `user_feedback` 表
3. 对比决策 vs 反馈 → 记录到 `ai_learning_logs` 表
4. 调整Prompt / 策略 → 优化下一次决策

### 质量控制 (Week 4 - 待完成⏳)

**人工审批流程**:
- 低置信度决策 → 发送Slack/邮件通知 → 人工审批
- 高风险操作（退款、封号）→ 必须人工审批
- A/B测试 → 对比AI决策 vs 人工决策

---

## 📊 成本优化：烧Token不招人

### 传统一人公司

| 角色 | 成本/月 |
|------|----------|
| 你（全职） | $0 (创始人) |
| 虚拟助手 (客服) | $500 |
| 自由职业者 (内容) | $1000 |
| 自由职业者 (营销) | $800 |
| **总计** | **$2300/月** |

**时间成本**: 45小时/周（你）

---

### AI原生一人公司

| 项目 | 成本/月 |
|------|----------|
| OpenAI API (GPT-4) | $300 |
| DeepSeek API | $150 |
| Claude API | $200 |
| Twitter/Reddit API | $100 |
| Vercel / Supabase | $50 |
| **总计** | **$800/月** |

**节省**: $1500/月 (65%)

**时间成本**: 15小时/周（你）

**节省**: 30小时/周 (67%)

---

## 📚 详细文档

| 文档 | 位置 | 说明 |
|------|------|------|
| **AI原生架构优化方案** | `08_优化方案/AI_NATIVE_ARCHITECTURE_OPTIMIZATION.md` | 27KB详细设计方案 |
| **快速行动指南** | `08_优化方案/ACTION_PLAN.md` | 可立即执行的步骤 |
| **Week 1实施指南** | `08_优化方案/WEEK1_IMPLEMENTATION_GUIDE.md` | 数据采集层搭建 |
| **Vercel快速部署** | `09_部署配置/VERCEL_QUICK_DEPLOY.md` | 5分钟部署指南 |
| **部署后检查清单** | `09_部署配置/DEPLOYMENT_CHECKLIST.md` | 部署后验证步骤 |
| **社区分享模板** | `04_社区分享材料/MEETSUM_COMMUNITY_POSTS.md` | Product Hunt/Reddit/知乎等 |

---

## 🚨 常见问题

### Q1: Vercel部署失败

**可能原因**:
- 环境变量缺失
- Supabase连接失败
- 构建超时

**解决方案**:
1. 检查Vercel日志（Project → Deployments → 查看日志）
2. 确认所有环境变量已正确配置
3. 确认Supabase项目已创建且可访问
4. 尝试增加构建超时时间（Settings → Build & Development Settings）

---

### Q2: Supabase迁移脚本执行失败

**可能原因**:
- SQL语法错误
- 表已存在

**解决方案**:
```sql
-- 检查表是否已存在
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public';

-- 如果存在，先删除（⚠️ 会丢失数据！）
DROP TABLE IF EXISTS user_feedback CASCADE;
DROP TABLE IF EXISTS ai_decisions CASCADE;
-- ... 删除其他表

-- 然后重新执行迁移脚本
```

---

### Q3: SendGrid Webhook没有触发

**可能原因**:
- Webhook URL配置错误
- Inbound Parse Host配置错误
- 邮件没有发送到正确的接收邮箱

**解决方案**:
1. 检查SendGrid Inbound Parse配置（Settings → Inbound Parse）
2. 检查Webhook URL是否正确（`https://your-vercel-url.vercel.app/api/email/webhook`）
3. 检查Host是否匹配你的域名
4. 查看SendGrid Activity Feed（查看邮件是否被接收）
5. 查看Vercel日志（查看Webhook是否被触发）

---

### Q4: Twitter API调用失败

**可能原因**:
- API Key错误
- API权限不足
- 超出速率限制

**解决方案**:
1. 检查 `.env.local` 中的 `TWITTER_BEARER_TOKEN` 是否正确
2. 检查Twitter Developer Portal中的App权限
3. 检查是否超出速率限制（Twitter API v2: 15 requests / 15 min）
4. 使用 `curl` 测试API调用（查看详细错误信息）

---

### Q5: Reddit API调用返回403 Forbidden

**可能原因**:
- User-Agent格式不正确
- IP被Reddit封禁

**解决方案**:
1. 检查 `.env.local` 中的 `REDDIT_USER_AGENT` 格式是否正确（必须包含用户名）
3. 等待一段时间后重试

---

## 📝 每日检查清单

### ✅ Day 1-2 (Supabase Schema 升级)
- [ ] 执行Supabase迁移脚本
- [ ] 验证5个表 + 2个视图创建成功
- [ ] 验证RLS已启用
- [ ] (可选) 测试用户注册流程

### ✅ Day 3 (邮件系统集成)
- [ ] 注册SendGrid账号
- [ ] 验证发送域名/邮箱
- [ ] 获取SendGrid API Key
- [ ] 配置Inbound Parse Webhook
- [ ] 测试邮件接收

### ✅ Day 4 (社交媒体监控)
- [ ] (可选) 申请Twitter Developer Account
- [ ] 配置Twitter API Credentials
- [ ] 配置Reddit API Credentials
- [ ] 测试 `/api/social-monitor` API

### ✅ Day 5 (测试与调试)
- [ ] 端到端测试所有功能
- [ ] 查看数据库中的记录
- [ ] 查看分析报告（视图）
- [ ] 修复发现的问题

---

## 📞 支持

- **Issues**: https://github.com/lixingliangsy/meetsum-ai/issues
- **Discussions**: https://github.com/lixingliangsy/meetsum-ai/discussions
- **Email**: your-email@example.com

---

## 📄 许可证

MIT License - 详见 `LICENSE` 文件

---

*最后更新: 2026-05-24*  
*作者: NovAI (基于YC Tom Blomfield演讲整理)*  
*适用版本: MeetSum AI v2.0 (AI原生架构)*
