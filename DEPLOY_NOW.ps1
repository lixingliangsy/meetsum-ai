# ========================================
# MeetSum AI - Vercel 快速部署脚本
# ========================================

# 1. 登录 Vercel
# 在浏览器中打开登录页面
Start-Process "https://vercel.com/login"

Write-Host "`n[Step 1] 已在浏览器打开 Vercel 登录页面"
Write-Host "请使用 GitHub 账号登录"

# 2. 登录后，返回终端继续
Read-Host "`n登录完成后，按回车继续..."

# 3. 设置环境变量
$env:NEXT_PUBLIC_SUPABASE_URL = "https://ztebchkdzlbqbdtssjao.supabase.co"
$env:NEXT_PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0ZWJjaGtkemxicWJkdHNzamFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYyNjQ3NjMsImV4cCI6MjA5MTg0MDc2M30.iVgrmlRC5h2GsIKXrqDIBGjV774MasGfFdaNGet7MTY"
$env:SUPABASE_SERVICE_ROLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0ZWJjaGtkemxicWJkdHNzamFvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjI2NDc2MywiZXhwIjoyMDkxODQwNzYzfQ.twwRghlk7lpbWXyWRAeEBL4raYLIPfOhNQmaeR4S"
$env:OPENAI_API_KEY = "sk-your-openai-api-key"
$env:OPENROUTER_API_KEY = "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"
$env:DEEPSEEK_API_KEY = "sk-0f68cb8ec61a4eac90ef792f70a6e4f0"
$env:ZHIPU_API_KEY = "e605b3e3f62744d49d2536fa5ce0bfcc.IpAbjWQaE9ZBwOGf"
$env:DOUBAO_API_KEY = "01f19f51-230d-4466-8b31-a0bc010bc94c"
$env:JINA_API_KEY = "sk-pmatjxbphiuldahrpibzqrxokpvawtdssgvratkfogshkyvj"
$env:DEFAULT_AI_PROVIDER = "deepseek"

# 4. 部署到 Vercel
Write-Host "`n[Step 2] 开始部署到 Vercel..."
vercel --prod

Write-Host "`n========================================"
Write-Host "部署完成！"
Write-Host "========================================"
Write-Host "`n下一步："
Write-Host "1. 访问 https://meetsum-ai.vercel.app"
Write-Host "2. 在 Supabase 配置认证重定向URL"
Write-Host "3. 测试注册/登录功能"
