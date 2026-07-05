/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    unoptimized: true, // 必需：Cloudflare Pages 静态导出需要禁用图片优化
  },
  // Cloudflare Pages 静态导出配置
  output: 'export',
  distDir: 'out',
  // 如果应用使用 Next.js Image 组件，需要此配置
  // 静态导出模式下不支持 Image Optimization API
}

module.exports = nextConfig
