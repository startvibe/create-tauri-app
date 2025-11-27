/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静态导出支持 Tauri
  images: {
    unoptimized: true, // SSG 模式兼容性
  },
  assetPrefix:
    process.env.NODE_ENV === 'development'
      ? `http://${process.env.TAURI_DEV_HOST || 'localhost'}:3000`
      : undefined,
  trailingSlash: true, // 确保路由一致性
  distDir: 'out', // 使用标准输出目录,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
}

export default nextConfig
