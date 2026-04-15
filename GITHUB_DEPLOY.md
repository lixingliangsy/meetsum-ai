# ========================================
# MeetSum AI - GitHub部署指南
# ========================================

## 方式1: 使用GitHub Actions自动部署（推荐）

### 1. 创建GitHub仓库

```bash
cd "E:\AgentCPM\07_一人公司出海项目\meetsum-ai"

# 初始化Git
git init
git add .
git commit -m "MeetSum AI MVP - Initial commit"

# 创建GitHub仓库（在 https://github.com/new 创建）
# 然后关联远程仓库
git remote add origin https://github.com/YOUR_USERNAME/meetsum-ai.git
git branch -M main
git push -u origin main
```

### 2. 在Vercel中导入项目

1. 访问 https://vercel.com/new
2. 点击 "Import Git Repository"
3. 选择 "meetsum-ai" 仓库
4. Framework: Next.js (自动检测)
5. 点击 "Environment Variables" 添加以下变量：

| 变量名 | 值 |
|--------|-----|
| NEXT_PUBLIC_SUPABASE_URL | 你的Supabase URL |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | 你的Supabase Anon Key |
| SUPABASE_SERVICE_ROLE_KEY | 你的Supabase Service Role Key |
| OPENAI_API_KEY | 你的OpenAI API Key |
| OPENROUTER_API_KEY | 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 |
| JINA_API_KEY | sk-pmatjxbphiuldahrpibzqrxokpvawtdssgvratkfogshkyvj |
| DEEPSEEK_API_KEY | sk-0f68cb8ec61a4eac90ef792f70a6e4f0 |
| DOUBAO_API_KEY | 01f19f51-230d-4466-8b31-a0bc010bc94c |
| ZHIPU_API_KEY | e605b3e3f62744d49d2536fa5ce0bfcc.IpAbjWQaE9ZBwOGf |
| DEFAULT_AI_PROVIDER | deepseek |
| NEXT_PUBLIC_APP_URL | https://meetsum-ai.vercel.app |

6. 点击 "Deploy"

### 3. 自动部署配置

每次推送到main分支，Vercel会自动构建和部署。

---

## 方式2: 手动Vercel CLI部署

```bash
# 登录Vercel
vercel login

# 部署预览
cd meetsum-ai
vercel

# 生产部署
vercel --prod

# 设置环境变量
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add OPENAI_API_KEY
# ... 其他变量
```

---

## 快速启动脚本

```bash
# Windows PowerShell
cd "E:\AgentCPM\07_一人公司出海项目\meetsum-ai"

# 1. 创建Git仓库
git init
git add .
git commit -m "Initial MVP commit"

# 2. 推送到GitHub
# (需要先在GitHub创建仓库)
git remote add origin https://github.com/YOUR_USERNAME/meetsum-ai.git
git push -u origin main

# 3. 在Vercel导入
# 访问: https://vercel.com/new
# 选择GitHub仓库: meetsum-ai
# 添加环境变量（见上方表格）
# 点击Deploy
```

---

## 部署后配置

### Supabase认证重定向

在Supabase Dashboard中：

1. **Authentication → URL Configuration**
   - Site URL: `https://meetsum-ai.vercel.app` (部署后替换)
   - Redirect URLs:
     ```
     https://meetsum-ai.vercel.app/auth/callback
     https://meetsum-ai.vercel.app/**
     ```

2. **更新.env.local中的NEXT_PUBLIC_APP_URL**
   - 改为生产URL

### 自定义域名（可选）

1. Vercel → 项目 → Settings → Domains
2. 添加你的域名 (如: meetsum.ai)
3. 按提示配置DNS

---

*最后更新: 2026-04-15*
