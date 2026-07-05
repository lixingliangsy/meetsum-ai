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
    unoptimized: true,
  },
  // Cloudflare Pages 配置
  // 使用 @cloudflare/next-on-pages 部署时不需要 output: 'export'
  // 该工具支持完整的 Next.js 功能集，包括 API 路由和 SSR
}

module.exports = nextConfig
