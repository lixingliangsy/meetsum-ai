/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 图片优化在 Cloudflare Pages 上可能需要禁用
  images: {
    unoptimized: true,
  },
  
  // 为 Cloudflare Pages 启用静态导出（如果使用静态模式）
  // output: 'export', // 取消注释以使用静态导出（但 API 路由将不可用）
  
  // 确保在 Cloudflare Pages 上正确构建
  distDir: '.next',
}

module.exports = nextConfig
