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

# 3. 设置环境变量（脚本内不保存任何密钥，统一从已有环境变量读取）
# 可选变量：OPENAI_API_KEY（默认 provider 为 deepseek，未使用时可忽略）
$requiredEnvVars = @(
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
    'SUPABASE_SERVICE_ROLE_KEY',
    'OPENROUTER_API_KEY',
    'DEEPSEEK_API_KEY',
    'ZHIPU_API_KEY',
    'DOUBAO_API_KEY',
    'JINA_API_KEY'
)

$missingEnvVars = @()
foreach ($name in $requiredEnvVars) {
    if ([string]::IsNullOrWhiteSpace([Environment]::GetEnvironmentVariable($name, 'Process'))) {
        $value = [Environment]::GetEnvironmentVariable($name, 'User')
        if ([string]::IsNullOrWhiteSpace($value)) {
            $value = [Environment]::GetEnvironmentVariable($name, 'Machine')
        }
        if ([string]::IsNullOrWhiteSpace($value)) {
            $missingEnvVars += $name
        }
        else {
            Set-Item -Path "env:$name" -Value $value
        }
    }
}

if ($missingEnvVars.Count -gt 0) {
    Write-Host "`n[ERROR] 缺少必需的环境变量，部署已中止：" -ForegroundColor Red
    foreach ($name in $missingEnvVars) { Write-Host "  - $name" -ForegroundColor Red }
    Write-Host "`n请先设置上述变量（任选一种方式）：" -ForegroundColor Yellow
    Write-Host "  1) 用项目加载器注入：tools\env\with-env.ps1（凭据目录 E:\AgentCPM\_credentials\07_一人公司出海项目\）"
    Write-Host "  2) 在当前会话临时设置，例如：`$env:SUPABASE_SERVICE_ROLE_KEY = '从 Supabase Dashboard 复制的新值'"
    Write-Host "  3) Supabase：Dashboard -> Project Settings -> API（Project URL / anon public / service_role）"
    Write-Host "  4) 模型服务：OpenRouter / DeepSeek / 智谱开放平台 / 火山方舟 / Jina 各自控制台"
    exit 1
}

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
