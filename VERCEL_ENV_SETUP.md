# Vercel 环境变量配置

## 登录 Vercel

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "Import Project"

## 导入项目

1. 选择 "Import Git Repository"
2. 选择仓库：`lixingliangsy/meetsum-ai`
3. Framework Preset: Next.js（自动检测）

## 添加环境变量

在 Project Settings → Environment Variables 中添加以下变量：

| 变量名 | 值 | 环境 |
|--------|-----|------|
| NEXT_PUBLIC_SUPABASE_URL | `https://ztebchkdzlbqbdtssjao.supabase.co` | Production, Preview, Development |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0ZWJjaGtkemxicWJkdHNzamFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjQ3NjMsImV4cCI6MjA5MTg0MDc2M30.iVgrmlRC5h2GsIKXrqDIBGjV774MasGfFdaNGet7MTY` | All |
| SUPABASE_SERVICE_ROLE_KEY | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0ZWJjaGtkemxicWJkdHNzamFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjI2NDc2MywiZXhwIjoyMDkxODQwNzYzfQ.twwRghlk7lpbWXyWRAeEBL4raYLIPfOhNQmaeR4S` | Production |
| OPENAI_API_KEY | `sk-your-openai-api-key` | Production |
| OPENROUTER_API_KEY | `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` | All |
| DEEPSEEK_API_KEY | `sk-0f68cb8ec61a4eac90ef792f70a6e4f0` | All |
| ZHIPU_API_KEY | `e605b3e3f62744d49d2536fa5ce0bfcc.IpAbjWQaE9ZBwOGf` | All |
| DOUBAO_API_KEY | `01f19f51-230d-4466-8b31-a0bc010bc94c` | All |
| JINA_API_KEY | `sk-pmatjxbphiuldahrpibzqrxokpvawtdssgvratkfogshkyvj` | All |
| DEFAULT_AI_PROVIDER | `deepseek` | All |
| NEXT_PUBLIC_APP_URL | `https://meetsum-ai.vercel.app` | All |

## 部署

1. 点击 "Deploy"
2. 等待构建完成（约2-3分钟）
3. 获得部署URL：https://meetsum-ai.vercel.app

## 部署后配置

### Supabase 认证重定向

1. 进入 Supabase Dashboard → Authentication → URL Configuration
2. Site URL: `https://meetsum-ai.vercel.app`
3. Redirect URLs:
   - `https://meetsum-ai.vercel.app/**`
   - `https://meetsum-ai.vercel.app/api/auth/callback`

### 自定义域名（可选）

1. Vercel → Project → Settings → Domains
2. 添加你的域名
3. 配置 DNS 记录

## 验证部署

访问 https://meetsum-ai.vercel.app 检查：
- [ ] Landing Page 显示正常
- [ ] 注册/登录功能正常
- [ ] 音频上传功能正常

## 常见问题

### 部署失败
检查环境变量是否正确配置，特别是 Supabase 密钥。

### 认证不工作
确认 Supabase Redirect URLs 已正确配置。

### API 请求失败
检查 Supabase URL 和 ANON_KEY 是否正确。
