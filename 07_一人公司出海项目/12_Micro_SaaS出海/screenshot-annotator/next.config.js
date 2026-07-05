/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // 必需：Cloudflare Pages 静态导出需要禁用图片优化
  },
  // Cloudflare Pages 配置
  // 注释掉 output: 'export' 以启用 API 路由
  // output: 'export',
  // distDir: 'out',
}

module.exports = nextConfig
