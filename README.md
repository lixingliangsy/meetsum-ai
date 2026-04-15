# MeetSum AI - 智能会议摘要助手

AI驱动的会议摘要工具，自动转录和生成结构化会议纪要。

## 功能特性

- 音频文件上传与转录
- AI智能摘要生成
- 多模板支持（要点/叙事）
- 用户认证与管理
- 响应式设计

## 技术栈

| 类别 | 技术 |
|------|------|
| 前端 | Next.js 16 + React 19 + TypeScript |
| 样式 | Tailwind CSS + shadcn/ui |
| 后端 | Supabase (PostgreSQL + Auth + Storage) |
| AI | OpenAI + DeepSeek + 智谱 + OpenRouter + 豆包 + 硅基流动 |
| 支付 | Stripe (可选) |
| 部署 | Vercel |

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
DOUBAO_API_KEY=...                         # 豆包
JINA_API_KEY=...                           # 硅基流动

# 默认AI提供商
DEFAULT_AI_PROVIDER=deepseek
```

### 3. 配置Supabase

1. 创建Supabase项目：https://supabase.com/dashboard
2. 执行 `supabase/schema.sql` 创建数据表
3. 复制项目URL和密钥到 `.env.local`

### 4. 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

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
   | OPENAI_API_KEY | 你的OpenAI Key |
   | OPENROUTER_API_KEY | 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 |
   | DEEPSEEK_API_KEY | sk-0f68cb8ec61a4eac90ef792f70a6e4f0 |
   | ZHIPU_API_KEY | e605b3e3f62744d49d2536fa5ce0bfcc.IpAbjWQaE9ZBwOGf |
   | DOUBAO_API_KEY | 01f19f51-230d-4466-8b31-a0bc010bc94c |
   | JINA_API_KEY | sk-pmatjxbphiuldahrpibzqrxokpvawtdssgvratkfogshkyvj |
   | DEFAULT_AI_PROVIDER | deepseek |

4. **点击Deploy**

### 方式2: Vercel CLI

```bash
# 安装Vercel CLI
npm i -g vercel@38.0.0

# 登录
vercel login

# 部署
cd meetsum-ai
vercel --prod
```

## 项目结构

```
meetsum-ai/
├── src/
│   ├── app/
│   │   ├── api/                  # API路由
│   │   │   ├── transcribe/       # Whisper转录
│   │   │   └── summarize/        # 摘要生成
│   │   ├── auth/                 # 认证页面
│   │   ├── dashboard/            # 用户仪表板
│   │   └── page.tsx              # Landing Page
│   ├── components/
│   │   ├── ui/                   # shadcn/ui组件
│   │   ├── landing/              # Landing页组件
│   │   └── dashboard/            # Dashboard组件
│   └── lib/
│       ├── ai-providers.ts       # AI多提供商支持
│       ├── supabase.ts           # Supabase客户端
│       └── stripe.ts             # Stripe集成
├── supabase/
│   └── schema.sql                # 数据库Schema
└── vercel.json                   # Vercel配置
```

## 获取API密钥

### DeepSeek（推荐）
- 注册：https://platform.deepseek.com/
- API控制台：https://platform.deepseek.com/api_keys

### 智谱AI
- 注册：https://open.bigmodel.cn/
- 控制台：https://open.bigmodel.cn/usercenter/apikeys

### 豆包/火山引擎
- 注册：https://console.volcengine.com/
- API密钥：控制台 → 密钥管理

### 硅基流动
- 注册：https://siliconflow.cn/
- API密钥：个人中心 → API密钥

### OpenRouter
- 注册：https://openrouter.ai/
- API密钥：https://openrouter.ai/keys

### Ollama（本地）
- 安装：https://ollama.ai/
- 下载模型：`ollama pull llama3`

## 开发指南

### 添加新的AI提供商

在 `src/lib/ai-providers.ts` 中添加：

```typescript
// 添加提供商配置
export const AI_MODELS = {
  // ... 现有配置
  newprovider: {
    'model-name': 'Display Name',
  },
}

// 添加API调用逻辑
switch (provider) {
  case 'newprovider':
    headers['Authorization'] = `Bearer ${process.env.NEWPROVIDER_API_KEY}`
    url = 'https://api.newprovider.com/v1/chat/completions'
    break
}
```

### 修改转录语言

在 `src/app/api/transcribe/route.ts` 中修改：

```typescript
formData.append('language', 'zh') // 中文
formData.append('language', 'en') // 英文
```

## License

MIT
