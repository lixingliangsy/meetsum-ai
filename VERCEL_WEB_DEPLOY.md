# MeetSum AI - Vercel网页部署指南

## 概述

由于网络限制无法通过GitHub推送代码，本指南提供直接在Vercel网页部署的方法。

## 部署步骤

### 步骤1：访问Vercel

访问 https://vercel.com/new

### 步骤2：选择部署方式

点击 **"Deploy from GitHub"** 或拖拽文件夹到页面

如果选择GitHub，需要授权GitHub账号（可能遇到网络问题）

### 步骤3：手动上传部署（推荐）

如果GitHub授权失败，使用以下方法：

1. 访问 https://vercel.com/new
2. 选择 **Import Project**
3. 选择 **Deploy from a Git Repository**
4. 点击 **Third-Party Git Repository**
5. 选择 **Local Directory** 选项
6. 拖拽 `E:\AgentCPM\07_一人公司出海项目\meetsum-ai` 文件夹到页面

### 步骤4：配置环境变量

在Vercel项目设置中添加以下环境变量：

| 变量名 | 值 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://ztebchkdzlbqbdtssjao.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0ZWJjaGtkemxicWJkdHNzamFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjQ3NjMsImV4cCI6MjA5MTg0MDc2M30.iVgrmlRC5h2GsIKXrqDIBGjV774MasGfFdaNGet7MTY` |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0ZWJjaGtkemxicWJkdHNzamFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjI2NDc2MywiZXhwIjoyMDkxODQwNzYzfQ.twwRghlk7lpbWXyWRAeEBL4raYLIPfOhNQmaeR4S` |
| `DEFAULT_AI_PROVIDER` | `deepseek` |
| `DEEPSEEK_API_KEY` | `sk-0f68cb8ec61a4eac90ef792f70a6e4f0` |

### 步骤5：部署

点击 **Deploy** 按钮，等待约2-3分钟完成部署。

### 步骤6：配置Supabase认证

部署成功后：

1. 访问 https://supabase.com/dashboard/project/ztebchkdzlbqbdtssjao/auth/url-configuration
2. 在 **Site URL** 填入：`https://你的项目名.vercel.app`
3. 在 **Redirect URLs** 添加：
   - `https://你的项目名.vercel.app/**`
   - `https://你的项目名.vercel.app/api/auth/callback`
4. 点击 **Save**

### 步骤7：测试

访问 `https://你的项目名.vercel.app` 测试网站功能。

---

## 当前状态

- GitHub仓库：https://github.com/lixingliangsy/meetsum-ai
- Supabase项目：ztebchkdzlbqbdtssjao
- 代码已提交待推送
- 需要网络恢复后推送到GitHub以启用CI/CD自动部署

## 临时解决方案

如果Vercel网页也无法访问GitHub，可以：

1. 将 `meetsum-ai` 文件夹压缩
2. 通过其他方式（如网盘）传输到有网络的机器
3. 在那台机器上推送到GitHub
4. 回到Vercel导入仓库
