# Data Model: Template Next.js Migration

**Branch**: `001-nextjs-migrate` | **Date**: 2025-11-16
**Related**: [Implementation Plan](./plan.md) | [Feature Spec](./spec.md)

## 概述

本文档定义了模板项目从 Vite + React Router 迁移到 Next.js + App Router 过程中的数据模型变化和接口契约。

## 核心数据模型

### 1. 应用配置模型

#### Next.js 配置模型

```typescript
interface NextJSConfig {
  output: 'export' // 静态导出模式
  images: {
    unoptimized: boolean // 禁用图片优化
  }
  assetPrefix?: string // 资源前缀（开发环境）
  trailingSlash: boolean // URL 尾部斜杠
  distDir: string // 构建输出目录
}

// 实际配置
const nextConfig: NextJSConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix:
    process.env.NODE_ENV === 'development'
      ? `http://${process.env.TAURI_DEV_HOST || 'localhost'}:3000`
      : undefined,
  trailingSlash: true,
}
```

#### Tauri 配置模型

```typescript
interface TauriConfig {
  build: {
    frontendDist: string // 前端构建输出目录
    devUrl: string // 开发服务器URL
    beforeDevCommand: string // 开发前置命令
    beforeBuildCommand: string // 构建前置命令
  }
}

// 迁移后配置
const tauriBuildConfig: TauriConfig['build'] = {
  frontendDist: '../out', // Next.js 默认输出目录
  devUrl: 'http://localhost:3000', // Next.js 开发服务器
  beforeDevCommand: 'next dev', // Next.js 开发命令
  beforeBuildCommand: 'next build', // Next.js 构建命令
}
```

### 2. 路由模型

#### 页面路由映射

```typescript
interface RouteMapping {
  // React Router → Next.js App Router
  [oldRoute: string]: {
    newRoute: string
    component: string
    type: 'page' | 'layout' | 'loading'
  }
}

const routeMappings: RouteMapping = {
  '/': {
    newRoute: '/',
    component: 'app/page.tsx',
    type: 'page',
  },
  '/dashboard': {
    newRoute: '/dashboard',
    component: 'app/dashboard/page.tsx',
    type: 'page',
  },
  '/users': {
    newRoute: '/users',
    component: 'app/users/page.tsx',
    type: 'page',
  },
  '/settings': {
    newRoute: '/settings',
    component: 'app/settings/page.tsx',
    type: 'page',
  },
}
```

#### 动态路由模型

```typescript
// 目前模板项目无动态路由，但为扩展性预定义
interface DynamicRoute {
  pattern: string // 路由模式
  component: string // 组件路径
  params: string[] // 参数名称
  generateStaticParams?: () => Promise<Array<Record<string, string>>>
}

// 未来扩展示例
const dynamicRoutes: DynamicRoute[] = [
  // {
  //   pattern: '/posts/[slug]',
  //   component: 'app/posts/[slug]/page.tsx',
  //   params: ['slug'],
  //   generateStaticParams: async () => {
  //     // 生成静态参数
  //   }
  // }
]
```

### 3. 组件模型

#### 客户端组件接口

```typescript
interface ClientComponent {
  'use client': true // 客户端组件标识
  dependencies?: string[] // 依赖的 Tauri APIs
  stateManagement?: 'local' | 'global' // 状态管理方式
}

// 需要标记为客户端组件的清单
const clientComponents: Record<string, ClientComponent> = {
  AppLayout: {
    'use client': true,
    dependencies: ['@tauri-apps/api/window'],
    stateManagement: 'local',
  },
  ThemeToggle: {
    'use client': true,
    dependencies: [],
    stateManagement: 'local',
  },
  LanguageToggle: {
    'use client': true,
    dependencies: [],
    stateManagement: 'local',
  },
}
```

#### 服务器组件接口

```typescript
interface ServerComponent {
  'use client'?: never // 服务器组件
  staticData?: () => Promise<any> // 静态数据获取
  revalidate?: number // ISR 重新验证时间
}

// 服务器组件清单
const serverComponents: Record<string, ServerComponent> = {
  HomePage: {
    staticData: async () => {
      // 获取首页静态数据
      return { message: 'Welcome to Tauri + Next.js App' }
    },
  },
  DashboardPage: {
    staticData: async () => {
      // 获取仪表板静态数据
      return {
        stats: { users: 1234, projects: 56, tasks: 89 },
      }
    },
  },
}
```

### 4. 国际化模型

#### i18n 配置模型

```typescript
interface I18nConfig {
  fallbackLng: string // 回退语言
  supportedLngs: string[] // 支持的语言列表
  ns: string[] // 命名空间
  defaultNS: string // 默认命名空间
  detection: {
    order: string[] // 检测顺序
    lookupLocalStorage: string // localStorage 键名
    caches: string[] // 缓存位置
  }
}

const i18nConfig: I18nConfig = {
  fallbackLng: 'zh-CN',
  supportedLngs: ['zh-CN', 'zh-TW', 'en-US', 'ja-JP'],
  ns: ['common', 'home', 'dashboard', 'users', 'settings', 'validation'],
  defaultNS: 'common',
  detection: {
    order: ['localStorage', 'navigator', 'fallback'],
    lookupLocalStorage: 'tauri-app-language',
    caches: ['localStorage'],
  },
}
```

#### 语言资源模型

```typescript
interface TranslationResource {
  [namespace: string]: {
    [key: string]: string | TranslationObject
  }
}

interface TranslationObject {
  [key: string]: string | TranslationObject
}

// 示例资源结构
const zhCNResources: TranslationResource = {
  common: {
    nav: {
      brand: 'Tauri 应用',
      home: '首页',
      dashboard: '仪表板',
      users: '用户管理',
      settings: '设置',
    },
  },
  home: {
    title: '欢迎使用 Tauri + Next.js',
    description: '这是一个现代化的桌面应用模板',
  },
}
```

### 5. 主题模型

#### 主题配置接口

```typescript
interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'auto'
  themes: {
    light: string // DaisyUI light 主题
    dark: string // DaisyUI dark 主题
    system: string // 系统主题
  }
  storage: {
    key: string // localStorage 键名
  }
}

const themeConfig: ThemeConfig = {
  defaultTheme: 'light',
  themes: {
    light: 'light',
    dark: 'dark',
    system: 'auto',
  },
  storage: {
    key: 'tauri-app-theme',
  },
}
```

### 6. 构建和部署模型

#### 构建流程模型

```typescript
interface BuildProcess {
  development: {
    command: string // 开发命令
    port: number // 开发端口
    envVars: Record<string, string> // 环境变量
  }
  production: {
    command: string // 构建命令
    outputDir: string // 输出目录
    assetsHandling: 'static' | 'optimized' // 资源处理方式
  }
}

const buildProcess: BuildProcess = {
  development: {
    command: 'next dev',
    port: 3000,
    envVars: {
      NODE_ENV: 'development',
      TAURI_DEV_HOST: process.env.TAURI_DEV_HOST || 'localhost',
    },
  },
  production: {
    command: 'next build',
    outputDir: 'out',
    assetsHandling: 'static',
  },
}
```

## 接口契约

### 1. 页面组件契约

#### 基础页面接口

```typescript
interface BasePageProps {
  // 所有页面组件的基础 Props
}

interface BasePageComponent {
  (props: BasePageProps): React.ReactElement
  metadata?: {
    title: string
    description?: string
  }
}

// 具体页面类型
type HomePage = BasePageComponent
type DashboardPage = BasePageComponent
type UsersPage = BasePageComponent
type SettingsPage = BasePageComponent
```

#### 页面元数据契约

```typescript
interface PageMetadata {
  title: string // 页面标题
  description?: string // 页面描述
  keywords?: string[] // SEO 关键词
  locale?: string // 页面语言
}

// 各页面的元数据定义
const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: '首页 - Tauri 应用',
    description: '基于 Tauri 2 + Next.js 的现代化桌面应用首页',
  },
  '/dashboard': {
    title: '仪表板 - Tauri 应用',
    description: '查看应用统计数据和概览信息',
  },
  '/users': {
    title: '用户管理 - Tauri 应用',
    description: '管理系统用户和权限',
  },
  '/settings': {
    title: '设置 - Tauri 应用',
    description: '配置应用偏好设置和选项',
  },
}
```

### 2. 组件通信契约

#### AppLayout 契约

```typescript
interface AppLayoutProps {
  children: React.ReactNode // 页面内容
}

interface AppLayoutContract {
  navigation: {
    items: NavigationItem[] // 导航项配置
    activeItem: string // 当前激活项
  }
  theme: {
    current: 'light' | 'dark' // 当前主题
    toggle: () => void // 切换主题
  }
  i18n: {
    current: string // 当前语言
    change: (lng: string) => void // 切换语言
  }
}

interface NavigationItem {
  key: string // 唯一标识
  label: string // 显示标签
  href: string // 链接地址
  icon?: string // 图标组件
}
```

#### 主题切换契约

```typescript
interface ThemeToggleContract {
  currentTheme: 'light' | 'dark' | 'auto'
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  toggleTheme: () => void
  systemTheme: 'light' | 'dark' // 系统主题
  isSystemSupported: boolean // 是否支持系统主题
}
```

### 3. 数据流契约

#### 国际化数据流

```typescript
interface I18nContract {
  // 初始化契约
  init: (config: I18nConfig) => Promise<void>

  // 语言切换契约
  changeLanguage: (lng: string) => Promise<void>

  // 翻译获取契约
  t: (key: string, options?: any) => string

  // 状态查询契约
  getLanguage: () => string
  getLoadedLanguages: () => string[]
}

// 实现要求
const i18nContract: I18nContract = {
  // 必须在客户端环境中初始化
  init: async config => {
    if (typeof window === 'undefined') {
      throw new Error('i18n must be initialized on client side')
    }
    // 初始化逻辑
  },

  // 语言切换必须持久化
  changeLanguage: async lng => {
    localStorage.setItem('tauri-app-language', lng)
    // 切换逻辑
  },

  // 翻译函数支持嵌套路径
  t: (key, options) => {
    // 支持如 'nav.brand' 的嵌套键名
    return key.split('.').reduce((obj, k) => obj?.[k], resources)
  },

  // 查询当前语言
  getLanguage: () => {
    return localStorage.getItem('tauri-app-language') || 'zh-CN'
  },

  getLoadedLanguages: () => {
    return Object.keys(resources)
  },
}
```

### 4. 错误处理契约

#### 错误边界契约

```typescript
interface ErrorBoundaryContract {
  // 错误捕获
  catch: (error: Error, errorInfo: ErrorInfo) => void

  // 错误恢复
  recover: () => void

  // 错误上报
  report: (error: Error, context?: any) => void

  // 用户友好提示
  getUserMessage: (error: Error) => string
}

// 错误分类
enum ErrorType {
  ROUTING_ERROR = 'ROUTING_ERROR',
  I18N_ERROR = 'I18N_ERROR',
  THEME_ERROR = 'THEME_ERROR',
  TAURI_API_ERROR = 'TAURI_API_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
}

interface ErrorContext {
  type: ErrorType
  component?: string
  route?: string
  userAgent?: string
  timestamp: number
}
```

### 5. 性能监控契约

#### 性能指标模型

```typescript
interface PerformanceMetrics {
  // 构建性能
  buildTime: number // 构建时间 (ms)
  bundleSize: number // 打包体积 (bytes)

  // 运行时性能
  firstContentfulPaint: number // 首次内容绘制 (ms)
  largestContentfulPaint: number // 最大内容绘制 (ms)
  cumulativeLayoutShift: number // 累积布局偏移

  // 交互性能
  firstInputDelay: number // 首次输入延迟 (ms)
  timeToInteractive: number // 可交互时间 (ms)
}

interface PerformanceThresholds {
  buildTime: number // < 120% of original
  bundleSize: number // < original size
  fcp: number // < 2000ms
  lcp: number // < 2500ms
  cls: number // < 0.1
  fid: number // < 100ms
  tti: number // < 3500ms
}

const performanceThresholds: PerformanceThresholds = {
  buildTime: 120000, // 2分钟
  bundleSize: 5242880, // 5MB
  fcp: 2000,
  lcp: 2500,
  cls: 0.1,
  fid: 100,
  tti: 3500,
}
```

## 数据验证规则

### 输入验证

- 路由参数必须符合 URL 安全字符规范
- 语言代码必须为支持的 ISO 639-1 格式
- 主题值必须在预定义的枚举范围内
- 配置文件必须符合 JSON Schema

### 状态一致性

- localStorage 中的设置必须与组件状态同步
- 国际化资源必须完整加载才能进行渲染
- 主题切换必须立即反映在所有相关组件中

### 兼容性要求

- 必须支持 Tauri 2.0+ 的所有平台
- 必须兼容 Next.js 16.0.3 的静态导出模式
- 必须保持与现有 API 接口的向后兼容性

## 版本控制和迁移

### 版本映射

```typescript
interface VersionMapping {
  from: string // 源版本
  to: string // 目标版本
  migrationSteps: string[] // 迁移步骤
  rollbackSteps?: string[] // 回滚步骤
}

const migrationVersions: VersionMapping[] = [
  {
    from: 'vite@7.0.4 + react-router@7.9.2',
    to: 'next@16.0.3',
    migrationSteps: [
      'dependency-update',
      'config-creation',
      'directory-restructure',
      'component-migration',
      'testing-validation',
    ],
  },
]
```

### 数据迁移契约

- 所有迁移必须保持数据完整性
- 迁移过程中必须提供进度反馈
- 迁移失败时必须能够安全回滚
- 迁移完成后必须进行完整性验证
