# Quickstart Guide: Template Next.js Migration

**Branch**: `001-nextjs-migrate` | **Date**: 2025-11-16
**Related**: [Implementation Plan](./plan.md) | [Data Model](./data-model.md)

## 概述

本快速入门指南提供从 Vite + React Router 迁移到 Next.js + App Router 的分步说明，确保迁移过程的顺利和成功。

## 前置条件

### 环境要求

- Node.js v22.19.0 LTS 或更高版本
- pnpm v10.15.1 或更高版本
- Rust 1.89.0 或更高版本（用于 Tauri 编译）
- Git 版本控制

### 备份检查清单

- [ ] 完整备份当前 `template/` 目录
- [ ] 标记当前的 Git 提交状态
- [ ] 记录当前项目的构建时间基准
- [ ] 确认所有功能正常运行
- [ ] 创建迁移分支

## 快速迁移步骤

### 阶段 1: 依赖更新 (15-20 分钟)

#### 1.1 卸载 React Router 依赖

```bash
# 在 template 目录下执行
pnpm remove @react-router/fs-routes @react-router/node @react-router/dev react-router react-router-dom
rm -f react-router.config.ts routes.ts
```

#### 1.2 安装 Next.js 依赖

```bash
# 安装 Next.js 16.0.3
pnpm add next@16.0.3

# 安装相关类型定义
pnpm add -D @types/node
```

#### 1.3 更新 package.json 脚本

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "preview": "next build && next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  }
}
```

### 阶段 2: 配置文件创建 (10-15 分钟)

#### 2.1 创建 Next.js 配置文件

```javascript
// next.config.js
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
  distDir: 'out', // 使用标准输出目录
}

export default nextConfig
```

#### 2.2 更新 TypeScript 配置

```json
// tsconfig.json 更新
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

#### 2.3 更新 Tauri 配置

```json
// src-tauri/tauri.conf.json 更新
{
  "build": {
    "frontendDist": "../out",
    "devUrl": "http://localhost:3000",
    "beforeDevCommand": "next dev",
    "beforeBuildCommand": "next build"
  }
}
```

### 阶段 3: 目录结构迁移 (15-20 分钟)

#### 3.1 创建 App Router 目录

```bash
# 创建新的目录结构
mkdir -p src/app/{dashboard,users,settings}
mkdir -p src/app/components
mkdir -p src/app/i18n

# 移动现有组件
mv src/components/* src/app/components/
```

#### 3.2 目录结构映射

```text
迁移前                          迁移后
src/                           src/
├── root.tsx                 → app/
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 首页
├── routes.ts                 → [删除]
├── routes/                   → app/
│   ├── _index.tsx           → page.tsx
│   ├── dashboard.tsx        → dashboard/page.tsx
│   ├── users.tsx            → users/page.tsx
│   └── settings.tsx         → settings/page.tsx
└── components/               → app/components/
    ├── app-layout.tsx       → app-components/
    ├── theme-toggle.tsx     → app-components/
    └── language-toggle.tsx  → app-components/
```

### 阶段 4: 核心文件迁移 (30-45 分钟)

#### 4.1 创建根布局 (app/layout.tsx)

```typescript
'use client'
import type { Metadata } from 'next'
import { AppLayout } from './components/app-layout'
import './i18n/client' // 客户端初始化 i18n

export const metadata: Metadata = {
  title: 'Tauri App',
  description: '基于 Tauri 2 + Next.js 的桌面应用',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-base-200">
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}
```

#### 4.2 迁移首页 (app/page.tsx)

```typescript
'use client'

import { useTranslation } from 'react-i18next'

export default function HomePage() {
  const { t } = useTranslation('home')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="mt-2 text-base-content/70">{t('description')}</p>
      </div>

      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h3 className="card-title">开始使用</h3>
          <p>探索 Tauri 2 + Next.js 的强大功能组合。</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">了解更多</button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### 4.3 迁移仪表板页面 (app/dashboard/page.tsx)

```typescript
'use client'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AppLayout } from '../components/app-layout'

export default function Dashboard() {
  const { t } = useTranslation('dashboard')
  const [stats] = useState({
    users: 1234,
    projects: 56,
    tasks: 89,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <p className="mt-2 text-base-content/70">{t('description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-primary">{t('stats.users')}</h2>
            <div className="text-3xl font-bold">{stats.users.toLocaleString()}</div>
            <div className="text-sm text-base-content/70">{t('stats.totalUsers')}</div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-secondary">{t('stats.projects')}</h2>
            <div className="text-3xl font-bold">{stats.projects}</div>
            <div className="text-sm text-base-content/70">{t('stats.activeProjects')}</div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-accent">{t('stats.tasks')}</h2>
            <div className="text-3xl font-bold">{stats.tasks}</div>
            <div className="text-sm text-base-content/70">{t('stats.pendingTasks')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

#### 4.4 迁移导航组件 (app/components/app-layout.tsx)

```typescript
'use client'
import { ReactNode } from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { ThemeToggle } from './theme-toggle'
import { LanguageToggle } from './language-toggle'

interface AppLayoutProps {
  children: ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation('common')

  return (
    <div className="min-h-screen bg-base-200">
      <nav className="navbar bg-base-100 shadow">
        <div className="container mx-auto">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl">
              {t('nav.brand')}
            </Link>
          </div>
          <div className="flex-none gap-2">
            <Link href="/" className="btn btn-ghost">
              {t('nav.home')}
            </Link>
            <Link href="/dashboard" className="btn btn-ghost">
              {t('nav.dashboard')}
            </Link>
            <Link href="/users" className="btn btn-ghost">
              {t('nav.users')}
            </Link>
            <Link href="/settings" className="btn btn-ghost">
              {t('nav.settings')}
            </Link>
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4">{children}</main>
    </div>
  )
}
```

### 阶段 5: 国际化适配 (15-20 分钟)

#### 5.1 创建客户端 i18n 初始化

```typescript
// src/app/i18n/client.ts
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { resources } from './resources'

// 仅在客户端环境中初始化
if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'zh-CN',
      debug: process.env.NODE_ENV === 'development',
      detection: {
        order: ['localStorage', 'navigator', 'fallback'],
        lookupLocalStorage: 'tauri-app-language',
        caches: ['localStorage'],
      },
      ns: ['common', 'home', 'dashboard', 'users', 'settings'],
      defaultNS: 'common',
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
    })
}

export default i18n
```

#### 5.2 移动 i18n 资源

```bash
# 移动现有 i18n 资源
mv src/i18n/* src/app/i18n/
```

### 阶段 6: 测试和验证 (20-30 分钟)

#### 6.1 开发环境测试

```bash
# 启动开发服务器
pnpm tauri dev

# 测试要点：
# - [ ] 应用正常启动
# - [ ] 所有路由可以正常访问
# - [ ] 导航功能正常
# - [ ] 主题切换正常
# - [ ] 语言切换正常
# - [ ] 热重载功能正常
```

#### 6.2 构建测试

```bash
# 测试静态构建
pnpm build

# 验证输出文件
ls -la out/

# 测试桌面应用构建
pnpm tauri build
```

#### 6.3 功能验证检查清单

```markdown
## 页面功能验证

- [ ] 首页正常显示和导航
- [ ] 仪表板数据正确显示
- [ ] 用户管理页面正常
- [ ] 设置页面功能完整

## 交互功能验证

- [ ] 主题切换（亮色/暗色模式）
- [ ] 语言切换（中文/英文/日文）
- [ ] 导航链接正常工作
- [ ] 响应式布局正确

## 性能验证

- [ ] 构建时间 < 原版本 120%
- [ ] 热重载响应时间 < 1 秒
- [ ] 应用启动时间正常
- [ ] 内存使用合理

## Tauri 集成验证

- [ ] 桌面应用正常启动
- [ ] 窗口控制功能正常
- [ ] 文件系统访问正常
- [ ] 系统 API 调用正常
```

## 常见问题和解决方案

### 问题 1: 构建时图片优化错误

```
Error: Image Optimization using the default loader is not compatible with export.
```

**解决方案**: 确保 `next.config.js` 中设置 `images.unoptimized: true`

### 问题 2: i18n 未在服务器上初始化

```
Error: i18next resources not loaded
```

**解决方案**: 将 i18n 初始化移到客户端，在 `app/layout.tsx` 中动态导入

### 问题 3: Tauri API 在开发环境中不可用

```
Error: __TAURI__ is not defined
```

**解决方案**: 添加环境检查和 Tauri API 的安全包装器

### 问题 4: 路由导航不工作

```
Error: Link component not working properly
```

**解决方案**: 确保 Next.js Link 组件正确配置，检查 `trailingSlash` 设置

## 回滚程序

如果迁移失败，按以下步骤回滚：

```bash
# 1. 切换到备份分支
git checkout backup-before-migration

# 2. 恢复原始文件
git checkout HEAD~1 -- template/

# 3. 恢复原始依赖
git checkout HEAD~1 -- template/package.json template/pnpm-lock.yaml

# 4. 重新安装依赖
pnpm install

# 5. 验证原始功能
pnpm tauri dev
```

## 性能优化建议

### 构建优化

- 启用 Next.js 的增量构建
- 配置适当的缓存策略
- 优化图片和静态资源

### 运行时优化

- 使用动态导入减少初始包大小
- 实现代码分割和懒加载
- 优化组件渲染性能

### 开发体验优化

- 配置适当的 ESLint 规则
- 设置 Prettier 自动格式化
- 启用 TypeScript 严格模式

## 后续维护

### 版本更新

- 定期更新 Next.js 版本
- 关注 Tauri 版本兼容性
- 更新依赖包到最新稳定版本

### 监控和测试

- 定期运行自动化测试
- 监控构建性能指标
- 收集用户反馈和错误报告

### 文档维护

- 更新项目文档
- 维护迁移指南
- 记录最佳实践

---

## 完成确认

成功完成迁移后，请确认以下项目：

- [ ] 所有页面正常显示和功能
- [ ] 导航系统工作正常
- [ ] 国际化功能完整
- [ ] 主题切换功能正常
- [ ] 构建和部署流程正常
- [ ] Tauri 桌面应用集成正常
- [ ] 性能指标符合要求
- [ ] 代码质量检查通过

恭喜！您已成功将模板项目迁移到 Next.js + App Router 架构。
