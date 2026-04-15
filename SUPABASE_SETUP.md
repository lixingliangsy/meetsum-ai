# ========================================
# MeetSum AI - Supabase 快速设置指南
# ========================================

## 步骤1: 创建Supabase项目

1. 访问 https://supabase.com/dashboard
2. 点击 "New Project"
3. 填写项目信息:
   - Name: MeetSum AI
   - Database Password: (生成强密码并保存!)
   - Region: 选择离你最近的区域
4. 等待项目创建完成（约2分钟）

## 步骤2: 获取API密钥

1. 进入项目 → Settings → API
2. 复制以下密钥到 .env.local:

   **URL (NEXT_PUBLIC_SUPABASE_URL)**:
   ```
   https://xxxxx.supabase.co
   ```

   **anon/public (NEXT_PUBLIC_SUPABASE_ANON_KEY)**:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

   **service_role (SUPABASE_SERVICE_ROLE_KEY)**:
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## 步骤3: 执行数据库Schema

1. 进入项目 → SQL Editor
2. 点击 "New Query"
3. 复制 supabase/schema.sql 的全部内容
4. 粘贴到编辑器中
5. 点击 "Run" 执行

## 步骤4: 启用Storage

1. 进入项目 → Storage
2. 点击 "Create a new bucket"
3. 填写:
   - Name: audio
   - Public: false (不勾选)
4. 创建完成

## 步骤5: 配置认证设置

1. 进入项目 → Authentication → URL Configuration
2. Site URL: http://localhost:3000
3. Redirect URLs: http://localhost:3000/auth/callback
4. 保存

## 步骤6: 启用Email登录（可选）

1. 进入项目 → Authentication → Providers
2. 启用 Email，提供:
   - Confirm email: true
   - Secure email changes: true

## 步骤7: 完成后测试

```bash
# 进入项目目录
cd "E:\AgentCPM\07_一人公司出海项目\meetsum-ai"

# 复制环境变量
copy .env.local.example .env.local

# 编辑 .env.local，填入你的密钥
notepad .env.local

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

## 常见问题

### Q: Supabase Storage报错 "bucket not found"
A: 确保在Storage中创建了名为 "audio" 的bucket，且RLS策略已配置

### Q: 认证回调失败
A: 检查 Authentication → URL Configuration 中的 Redirect URLs

### Q: API连接失败
A: 检查 .env.local 中的 SUPABASE_URL 和 ANON_KEY 是否正确

---

*最后更新: 2026-04-15*
