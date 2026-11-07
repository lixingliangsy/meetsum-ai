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

> 下表为占位符。真实值请从 Supabase Dashboard → Project Settings → API、各服务商控制台，或本地凭据目录 `E:\AgentCPM\_credentials\07_一人公司出海项目\` 获取，切勿写回仓库。

| 变量名 | 值 | 环境 |
|--------|-----|------|
| NEXT_PUBLIC_SUPABASE_URL | `https://<your-project-ref>.supabase.co` | Production, Preview, Development |
| NEXT_PUBLIC_SUPABASE_ANON_KEY | `your-anon-key` | All |
| SUPABASE_SERVICE_ROLE_KEY | `your-service-role-key` | Production |
| OPENAI_API_KEY | `sk-your-openai-api-key` | Production |
| OPENROUTER_API_KEY | `your-openrouter-api-key` | All |
| DEEPSEEK_API_KEY | `your-deepseek-api-key` | All |
| ZHIPU_API_KEY | `your-zhipu-api-key` | All |
| DOUBAO_API_KEY | `your-doubao-api-key` | All |
| JINA_API_KEY | `your-jina-api-key` | All |
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
