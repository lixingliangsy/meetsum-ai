# ========================================
# MeetSum AI - Vercel 部署指南
# ========================================

## 快速部署

### 方式1: GitHub部署（推荐）

1. **上传代码到GitHub**
   ```bash
   cd "E:\AgentCPM\07_一人公司出海项目\meetsum-ai"
   git init
   git add .
   git commit -m "MeetSum AI MVP"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/meetsum-ai.git
   git push -u origin main
   ```

2. **连接Vercel**
   - 访问 https://vercel.com/new
   - 点击 "Import Git Repository"
   - 选择刚上传的仓库
   - Framework: Next.js (自动检测)
   - Environment Variables: 添加以下变量
     - NEXT_PUBLIC_SUPABASE_URL
     - NEXT_PUBLIC_SUPABASE_ANON_KEY
     - SUPABASE_SERVICE_ROLE_KEY
     - OPENAI_API_KEY
     - NEXT_PUBLIC_APP_URL (设为 https://your-project.vercel.app)
     - 其他 Stripe 变量（可选）
   - 点击 Deploy

3. **配置域名（可选）**
   - Vercel → 项目 → Settings → Domains
   - 添加自定义域名

### 方式2: Vercel CLI部署

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
cd "E:\AgentCPM\07_一人公司出海项目\meetsum-ai"
vercel --prod

# 设置环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add SUPABASE_SERVICE_ROLE_KEY
vercel env add OPENAI_API_KEY
```

## 部署后配置

### 1. 更新Supabase认证设置

在Supabase Dashboard中更新:

1. **Authentication → URL Configuration**
   - Site URL: https://your-project.vercel.app
   - Redirect URLs:
     - https://your-project.vercel.app/auth/callback
     - https://your-project.vercel.app/api/auth/callback

2. **Authentication → Providers → Email**
   - 确认已启用

### 2. 更新Stripe Webhook（如果启用支付）

```bash
# 安装Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 或配置生产webhook
stripe listen --forward-to your-project.vercel.app/api/stripe/webhook
```

### 3. 测试生产环境

1. 访问 https://your-project.vercel.app
2. 测试注册/登录
3. 测试音频上传和摘要生成
4. 检查浏览器控制台无错误

## 环境变量参考

| 变量名 | 说明 | 必填 |
|--------|------|------|
| NEXT_PUBLIC_SUPABASE_URL | Supabase项目URL | 是 |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | Supabase匿名密钥 | 是 |
| SUPABASE_SERVICE_ROLE_KEY | Supabase服务密钥 | 是 |
| OPENAI_API_KEY | OpenAI API密钥 | 是 |
| NEXT_PUBLIC_APP_URL | 应用URL | 是 |
| STRIPE_SECRET_KEY | Stripe密钥 | 否 |
| NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY | Stripe公钥 | 否 |
| STRIPE_WEBHOOK_SECRET | Stripe Webhook密钥 | 否 |
| STRIPE_PRO_PRICE_ID | Pro套餐价格ID | 否 |
| STRIPE_TEAM_PRICE_ID | Team套餐价格ID | 否 |

## 常见问题

### Q: 部署后页面空白
A: 检查环境变量是否正确配置，特别是 NEXT_PUBLIC_ 开头的变量

### Q: API请求失败
A: 检查 Supabase URL 和 ANON_KEY 是否正确

### Q: 认证不工作
A: 确认 Supabase Redirect URLs 已正确配置

### Q: Stripe 支付失败
A: 确认 Stripe 密钥和 Webhook 配置正确

---

*最后更新: 2026-04-15*
