# API Contracts: Template Next.js Migration

**Branch**: `001-nextjs-migrate` | **Date**: 2025-11-16
**Related**: [Data Model](../data-model.md) | [Implementation Plan](../plan.md)

## 概述

定义迁移过程中涉及的内部 API 契约和外部接口规范，确保系统各组件间的正确交互。

## 内部 API 契约

### 1. 路由管理契约

#### 路由转换器接口

```typescript
interface RouteConverter {
  /**
   * 将 React Router 路由转换为 Next.js App Router 路由
   */
  convertRoute(oldRoute: string): RouteMapping

  /**
   * 批量转换路由配置
   */
  convertBatchRoutes(routes: string[]): RouteMapping[]

  /**
   * 验证路由映射的正确性
   */
  validateMapping(mapping: RouteMapping): ValidationResult
}

interface RouteMapping {
  source: string // React Router 路由
  target: string // Next.js 路由
  componentPath: string // 组件文件路径
  isStatic: boolean // 是否为静态路由
  params?: string[] // 动态参数
}

interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}
```

#### 路由映射数据

```typescript
const ROUTE_MAPPINGS: RouteMapping[] = [
  {
    source: '/',
    target: '/',
    componentPath: 'app/page.tsx',
    isStatic: true,
  },
  {
    source: '/dashboard',
    target: '/dashboard',
    componentPath: 'app/dashboard/page.tsx',
    isStatic: true,
  },
  {
    source: '/users',
    target: '/users',
    componentPath: 'app/users/page.tsx',
    isStatic: true,
  },
  {
    source: '/settings',
    target: '/settings',
    componentPath: 'app/settings/page.tsx',
    isStatic: true,
  },
]
```

### 2. 组件迁移契约

#### 组件转换器接口

```typescript
interface ComponentMigrator {
  /**
   * 将 React 组件转换为 Next.js 组件
   */
  migrateComponent(componentPath: string, targetType: 'client' | 'server'): MigrationResult

  /**
   * 自动检测组件类型
   */
  detectComponentType(componentCode: string): 'client' | 'server'

  /**
   * 添加必要的指令和导入
   */
  addNextDirectives(componentCode: string, type: 'client' | 'server'): string
}

interface MigrationResult {
  success: boolean
  transformedCode: string
  warnings: string[]
  requiredChanges: string[]
}
```

#### 客户端组件标识规则

```typescript
interface ClientComponentDetector {
  /**
   * 检测组件是否需要客户端渲染
   */
  isClientComponent(componentCode: string): boolean

  /**
   * 获取客户端组件的依赖项
   */
  getClientDependencies(componentCode: string): string[]
}

// 客户端组件检测规则
const CLIENT_COMPONENT_INDICATORS = [
  'useState',
  'useEffect',
  'useContext', // React Hooks
  'window',
  'document',
  'localStorage', // Browser APIs
  '@tauri-apps/api', // Tauri APIs
  'addEventListener',
  'removeEventListener', // Event APIs
  'setTimeout',
  'setInterval', // Timer APIs
]
```

### 3. 国际化迁移契约

#### i18n 适配器接口

```typescript
interface I18nAdapter {
  /**
   * 初始化客户端国际化
   */
  initializeClient(config: I18nConfig): Promise<void>

  /**
   * 迁移语言资源结构
   */
  migrateResources(
    oldResources: TranslationResource,
    targetStructure: 'client' | 'server'
  ): TranslationResource

  /**
   * 更新组件中的翻译调用
   */
  updateTranslationUsage(componentCode: string, newNamespace?: string): string
}

interface I18nConfig {
  fallbackLng: string
  supportedLngs: string[]
  ns: string[]
  defaultNS: string
  detection: DetectionConfig
}

interface DetectionConfig {
  order: string[]
  lookupLocalStorage: string
  caches: string[]
}
```

### 4. 主题系统契约

#### 主题管理器接口

```typescript
interface ThemeManager {
  /**
   * 初始化主题系统
   */
  initialize(config: ThemeConfig): void

  /**
   * 迁移主题配置到 Next.js 环境
   */
  migrateThemeConfig(oldConfig: any): ThemeConfig

  /**
   * 应用主题到 DOM
   */
  applyTheme(theme: string): void

  /**
   * 监听系统主题变化
   */
  watchSystemTheme(callback: (theme: string) => void): void
}

interface ThemeConfig {
  defaultTheme: 'light' | 'dark' | 'auto'
  themes: Record<string, string>
  storage: {
    key: string
  }
  daisyui?: {
    themes: string[]
  }
}
```

## 外部接口契约

### 1. Tauri 集成接口

#### Tauri API 包装器

```typescript
interface TauriAPIWrapper {
  /**
   * 安全地调用 Tauri 命令
   */
  invoke<T>(command: string, args?: any): Promise<T>

  /**
   * 检查 Tauri 环境可用性
   */
  isTauriAvailable(): boolean

  /**
   * 获取应用信息
   */
  getAppInfo(): Promise<AppInfo>

  /**
   * 窗口管理
   */
  window: WindowAPI
}

interface AppInfo {
  name: string
  version: string
  tauriVersion: string
}

interface WindowAPI {
  minimize(): Promise<void>
  maximize(): Promise<void>
  unmaximize(): Promise<void>
  close(): Promise<void>
  setTitle(title: string): Promise<void>
}

// 实现示例
const tauriAPI: TauriAPIWrapper = {
  async invoke<T>(command: string, args?: any): Promise<T> {
    if (!this.isTauriAvailable()) {
      throw new Error('Tauri API not available')
    }
    return await import('@tauri-apps/api/core').then(({ invoke }) => invoke(command, args))
  },

  isTauriAvailable(): boolean {
    return typeof window !== 'undefined' && '__TAURI__' in window
  },
}
```

### 2. 构建系统集成

#### 构建配置生成器

```typescript
interface BuildConfigGenerator {
  /**
   * 生成 Next.js 配置文件
   */
  generateNextConfig(options: NextConfigOptions): string

  /**
   * 生成 Tauri 配置更新
   */
  generateTauriConfigUpdate(
    currentConfig: TauriConfig,
    nextjsConfig: NextJSConfig
  ): Partial<TauriConfig>

  /**
   * 验证构建配置兼容性
   */
  validateConfigCompatibility(
    nextjsConfig: NextJSConfig,
    tauriConfig: TauriConfig
  ): CompatibilityResult
}

interface NextConfigOptions {
  outputDir: string
  devPort: number
  enableImageOptimization: boolean
  trailingSlash: boolean
}

interface CompatibilityResult {
  compatible: boolean
  issues: string[]
  suggestions: string[]
}
```

### 3. 文件系统操作契约

#### 文件迁移器接口

```typescript
interface FileMigrator {
  /**
   * 迁移单个文件
   */
  migrateFile(
    sourcePath: string,
    targetPath: string,
    transformer: (content: string) => string
  ): Promise<MigrationResult>

  /**
   * 批量迁移文件
   */
  migrateBatch(mappings: FileMapping[]): Promise<BatchMigrationResult>

  /**
   * 创建目录结构
   */
  createDirectoryStructure(structure: DirectoryStructure): Promise<void>
}

interface FileMapping {
  source: string
  target: string
  transformer?: (content: string) => string
  backup: boolean
}

interface DirectoryStructure {
  [path: string]: DirectoryStructure | null
}

interface BatchMigrationResult {
  success: boolean
  results: MigrationResult[]
  summary: {
    total: number
    successful: number
    failed: number
  }
}
```

## 数据传输对象 (DTOs)

### 1. 配置 DTOs

#### Next.js 配置 DTO

```typescript
interface NextConfigDTO {
  output: 'export'
  images: {
    unoptimized: boolean
  }
  assetPrefix?: string
  trailingSlash: boolean
  distDir?: string
  experimental?: {
    serverComponentsExternalPackages?: string[]
  }
}

// 验证规则
const nextConfigValidation = {
  output: { required: true, enum: ['export'] },
  images: {
    required: true,
    unoptimized: { required: true, type: 'boolean' },
  },
  trailingSlash: { required: true, type: 'boolean' },
  assetPrefix: { required: false, type: 'string' },
}
```

#### Tauri 配置 DTO

```typescript
interface TauriBuildConfigDTO {
  beforeDevCommand: string // 必须是 'next dev'
  beforeBuildCommand: string // 必须是 'next build'
  devUrl: string // 必须是 'http://localhost:3000'
  frontendDist: string // 必须指向 Next.js 输出目录
}

// 配置验证
const validateTauriConfig = (config: TauriBuildConfigDTO): ValidationResult => {
  const errors: string[] = []

  if (!config.beforeDevCommand.includes('next dev')) {
    errors.push('beforeDevCommand must be "next dev"')
  }

  if (!config.beforeBuildCommand.includes('next build')) {
    errors.push('beforeBuildCommand must be "next build"')
  }

  if (config.devUrl !== 'http://localhost:3000') {
    errors.push('devUrl must be "http://localhost:3000"')
  }

  if (!config.frontendDist.endsWith('/out')) {
    errors.push('frontendDist must point to Next.js output directory (../out)')
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: [],
  }
}
```

### 2. 状态 DTOs

#### 应用状态 DTO

```typescript
interface ApplicationStateDTO {
  theme: {
    current: 'light' | 'dark' | 'auto'
    system: 'light' | 'dark'
    preferences: ThemePreferences
  }
  i18n: {
    current: string
    fallback: string
    loadedResources: string[]
  }
  routing: {
    currentPath: string
    previousPath?: string
    navigationHistory: string[]
  }
}

interface ThemePreferences {
  light: string
  dark: string
  auto: boolean
}

// 状态序列化
const serializeState = (state: ApplicationStateDTO): string => {
  return JSON.stringify(state, null, 2)
}

// 状态反序列化
const deserializeState = (data: string): ApplicationStateDTO => {
  try {
    return JSON.parse(data)
  } catch (error) {
    throw new Error(`Invalid state format: ${error}`)
  }
}
```

### 3. 错误处理 DTOs

#### 错误响应 DTO

```typescript
interface ErrorDTO {
  code: string // 错误代码
  message: string // 错误消息
  details?: any // 错误详情
  stack?: string // 堆栈跟踪
  context?: ErrorContextDTO // 错误上下文
}

interface ErrorContextDTO {
  component: string // 发生错误的组件
  route: string // 当前路由
  userAgent: string // 用户代理
  timestamp: number // 时间戳
  userId?: string // 用户 ID（如果适用）
}

// 错误代码枚举
enum ErrorCode {
  MIGRATION_FAILED = 'MIGRATION_FAILED',
  ROUTE_CONVERSION_FAILED = 'ROUTE_CONVERSION_FAILED',
  COMPONENT_MIGRATION_FAILED = 'COMPONENT_MIGRATION_FAILED',
  I18N_INITIALIZATION_FAILED = 'I18N_INITIALIZATION_FAILED',
  THEME_APPLICATION_FAILED = 'THEME_APPLICATION_FAILED',
  TAURI_API_UNAVAILABLE = 'TAURI_API_UNAVAILABLE',
  CONFIG_VALIDATION_FAILED = 'CONFIG_VALIDATION_FAILED',
}
```

## 事件契约

### 1. 生命周期事件

#### 迁移事件接口

```typescript
interface MigrationEvent {
  type: MigrationEventType
  timestamp: number
  data: any
  error?: ErrorDTO
}

enum MigrationEventType {
  MIGRATION_STARTED = 'MIGRATION_STARTED',
  ROUTE_CONVERSION_STARTED = 'ROUTE_CONVERSION_STARTED',
  ROUTE_CONVERSION_COMPLETED = 'ROUTE_CONVERSION_COMPLETED',
  COMPONENT_MIGRATION_STARTED = 'COMPONENT_MIGRATION_STARTED',
  COMPONENT_MIGRATION_COMPLETED = 'COMPONENT_MIGRATION_COMPLETED',
  MIGRATION_COMPLETED = 'MIGRATION_COMPLETED',
  MIGRATION_FAILED = 'MIGRATION_FAILED',
  MIGRATION_ROLLBACK = 'MIGRATION_ROLLBACK',
}

// 事件监听器
interface MigrationEventListener {
  (event: MigrationEvent): void
}
```

### 2. 用户交互事件

#### UI 事件契约

```typescript
interface UIEventContract {
  theme: {
    changed: ThemeChangeEvent
    systemChanged: SystemThemeChangeEvent
  }
  i18n: {
    languageChanged: LanguageChangeEvent
    resourceLoaded: ResourceLoadedEvent
  }
  navigation: {
    routeChanged: RouteChangeEvent
    navigationFailed: NavigationFailedEvent
  }
}

interface ThemeChangeEvent {
  oldTheme: string
  newTheme: string
  source: 'user' | 'system'
}

interface LanguageChangeEvent {
  oldLanguage: string
  newLanguage: string
  resources: TranslationResource[]
}

interface RouteChangeEvent {
  from: string
  to: string
  type: 'push' | 'replace' | 'pop'
}
```

## 测试契约

### 1. 单元测试契约

#### 组件测试接口

```typescript
interface ComponentTestContract {
  /**
   * 测试组件渲染
   */
  testRendering(component: React.ComponentType<any>): Promise<TestResult>

  /**
   * 测试组件交互
   */
  testInteraction(
    component: React.ComponentType<any>,
    interactions: UserInteraction[]
  ): Promise<TestResult>

  /**
   * 测试组件性能
   */
  testPerformance(
    component: React.ComponentType<any>,
    metrics: PerformanceMetric[]
  ): Promise<PerformanceTestResult>
}

interface TestResult {
  passed: boolean
  duration: number
  assertions: Assertion[]
  coverage: CoverageReport
}

interface PerformanceTestResult {
  renderTime: number
  memoryUsage: number
  bundleSize: number
  passesThreshold: boolean
}
```

### 2. 集成测试契约

#### E2E 测试接口

```typescript
interface E2ETestContract {
  /**
   * 测试完整用户流程
   */
  testUserFlow(flow: UserFlow): Promise<E2ETestResult>

  /**
   * 测试跨浏览器兼容性
   */
  testCrossBrowserCompatibility(scenarios: TestScenario[]): Promise<CrossBrowserResult>

  /**
   * 测试 Tauri 桌面功能
   */
  testTauriIntegration(features: TauriFeature[]): Promise<TauriTestResult>
}

interface UserFlow {
  name: string
  steps: FlowStep[]
  expectedOutcome: ExpectedOutcome
}

interface FlowStep {
  action: string
  target: string
  value?: any
  waitFor?: string
}

interface E2ETestResult {
  flowName: string
  passed: boolean
  steps: StepResult[]
  duration: number
  screenshots: string[]
}
```

## 版本兼容性

### API 版本控制

```typescript
interface APIVersion {
  major: number
  minor: number
  patch: number
}

interface VersionCompatibility {
  minVersion: APIVersion
  maxVersion: APIVersion
  deprecatedFeatures: string[]
  breakingChanges: BreakingChange[]
}

interface BreakingChange {
  version: APIVersion
  description: string
  migrationGuide: string
}

// 当前支持的 API 版本
const SUPPORTED_API_VERSIONS: APIVersion[] = [
  { major: 1, minor: 0, patch: 0 },
  { major: 1, minor: 1, patch: 0 },
]

// 版本兼容性检查
const isVersionSupported = (version: APIVersion): boolean => {
  return SUPPORTED_API_VERSIONS.some(
    supported => version.major === supported.major && version.minor >= supported.minor
  )
}
```
