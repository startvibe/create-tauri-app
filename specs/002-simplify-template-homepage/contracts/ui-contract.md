# UI Contract: 简化模板首页

**Feature**: 简化模板首页
**Date**: 2025-11-17
**Based on**: [data-model.md](data-model.md)

## 1. 主题切换组件 (ThemeToggle)

### 组件接口

```typescript
interface ThemeToggleProps {
  currentTheme: 'light' | 'dark' | 'system'
  autoFollowSystem: boolean
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void
  onAutoFollowToggle: (enabled: boolean) => void
  disabled?: boolean
  className?: string
}

interface ThemeToggleState {
  isTransitioning: boolean
  hasError: boolean
  errorMessage?: string
}
```

### 行为契约

1. **主题切换**: 点击切换按钮在亮色/暗色模式间切换
2. **系统跟随**: 提供"自动跟随系统"选项
3. **即时反馈**: 切换操作立即生效，无延迟
4. **错误处理**: 存储不可用时禁用功能并显示错误提示
5. **状态持久化**: 设置自动保存到 localStorage

### UI 规范

```typescript
interface ThemeToggleUI {
  // 切换按钮
  button: {
    variant: 'ghost' | 'outline'
    size: 'sm' | 'md'
    icon: 'sun' | 'moon' | 'computer'
    loading: boolean // 切换过渡中显示加载状态
  }

  // 下拉菜单
  dropdown: {
    position: 'bottom-right'
    items: [
      { value: 'light'; label: '亮色模式'; icon: 'sun' },
      { value: 'dark'; label: '暗色模式'; icon: 'moon' },
      { value: 'system'; label: '跟随系统'; icon: 'computer' },
    ]
  }

  // 自动跟随选项
  autoFollow: {
    type: 'switch'
    label: '自动跟随系统主题'
    description: '当系统主题变化时自动切换'
  }

  // 错误状态
  error: {
    type: 'alert' | 'toast'
    variant: 'warning'
    dismissible: true
  }
}
```

### 可访问性要求

- 支持键盘导航 (Tab, Enter, Space, Arrow keys)
- 提供屏幕阅读器友好的标签和描述
- 确保足够的颜色对比度 (WCAG 2.1 AA)
- 支持高对比度模式

## 2. 语言切换组件 (LanguageToggle)

### 组件接口

```typescript
interface LanguageToggleProps {
  currentLanguage: 'zh' | 'en'
  availableLanguages: Array<{
    code: 'zh' | 'en'
    name: string
    nativeName: string
  }>
  onLanguageChange: (language: 'zh' | 'en') => void
  disabled?: boolean
  className?: string
}

interface LanguageToggleState {
  isLoading: boolean
  hasError: boolean
  errorMessage?: string
  failedLanguage?: string
}
```

### 行为契约

1. **语言切换**: 点击切换语言，立即更新界面文本
2. **加载状态**: 翻译加载时显示加载指示器
3. **错误处理**: 翻译失败时显示警告并降级到原语言
4. **状态持久化**: 语言选择自动保存
5. **回退策略**: 翻译文件缺失时使用备用语言

### UI 规范

```typescript
interface LanguageToggleUI {
  // 切换按钮
  button: {
    variant: 'ghost' | 'outline'
    size: 'sm' | 'md'
    displayFlag: boolean // 是否显示语言国旗图标
    showNativeName: boolean // 是否显示本地语言名称
  }

  // 语言选择器
  selector: {
    type: 'dropdown' | 'modal'
    position: 'bottom-right'
    search: boolean // 是否支持搜索（为未来扩展预留）
  }

  // 语言项
  languageItem: {
    layout: 'horizontal' | 'vertical'
    showFlag: boolean
    showNativeName: boolean
    showEnglishName: boolean
  }

  // 错误状态
  error: {
    type: 'inline' | 'toast'
    icon: 'warning'
    message: string
    actionable: boolean // 是否提供重试按钮
  }
}
```

### 可访问性要求

- 使用正确的 lang 属性标记不同语言
- 提供语言切换的屏幕阅读器通知
- 确保语言切换不影响键盘焦点顺序
- 支持高对比度模式和大字体模式

## 3. 首页主组件 (HomePage)

### 组件接口

```typescript
interface HomePageProps {
  projectName: string
  projectDescription: string
  features: Array<{
    id: string
    title: string
    description: string
    icon?: string
  }>
  currentTheme: ThemeConfig
  currentLanguage: LanguageResources
  loadingState: 'loading' | 'ready' | 'error'
}

interface HomePageState {
  isScrolled: boolean
  menuOpen: boolean
  focusedSection?: string
}
```

### 布局契约

```typescript
interface HomePageLayout {
  // 响应式断点
  breakpoints: {
    mobile: '640px' // < md
    tablet: '768px' // >= md && < lg
    desktop: '1024px' // >= lg
  }

  // 头部区域
  header: {
    height: '64px' | '80px' // 移动端 | 桌面端
    position: 'sticky' | 'fixed'
    background: 'transparent' | 'backdrop-blur'
    padding: '1rem' | '2rem'
  }

  // 主内容区域
  main: {
    maxWidth: '1200px'
    padding: '2rem' | '4rem'
    gap: '3rem' | '6rem'
  }

  // 特性展示区域
  features: {
    columns: 1 | 2 | 3 // 响应式列数
    gap: '1.5rem' | '2rem'
    cardStyle: 'outlined' | 'elevated' | 'flat'
  }

  // 页脚区域
  footer: {
    height: 'auto'
    padding: '2rem' | '3rem'
    background: 'primary' | 'secondary'
  }
}
```

### 内容契约

```typescript
interface HomePageContent {
  // 项目信息
  project: {
    name: {
      maxLength: 50
      required: true
    }
    subtitle: {
      maxLength: 100
      required: false
    }
    description: {
      maxLength: 500
      required: true
    }
  }

  // 特性列表
  features: {
    minItems: 3
    maxItems: 6
    item: {
      title: {
        maxLength: 50
        required: true
      }
      description: {
        maxLength: 150
        required: true
      }
      icon: {
        type: 'string' | 'component'
        required: false
      }
    }
  }

  // 操作按钮
  actions: {
    primary: {
      text: string
      href?: string
      onClick?: () => void
    }
    secondary?: {
      text: string
      href?: string
      onClick?: () => void
    }
  }
}
```

### 交互契约

1. **滚动效果**: 页面滚动时头部背景变化
2. **平滑滚动**: 锚点导航使用平滑滚动
3. **加载状态**: 内容加载时显示骨架屏
4. **错误状态**: 加载失败时显示错误页面
5. **键盘导航**: 支持 Tab 键导航和快捷键

## 4. 全局布局组件 (AppLayout)

### 组件接口

```typescript
interface AppLayoutProps {
  children: React.ReactNode
  theme: ThemeConfig
  language: 'zh' | 'en'
  className?: string
}

interface AppLayoutState {
  isMenuOpen: boolean
  isThemeTransitioning: boolean
  isLanguageChanging: boolean
}
```

### 布局契约

```typescript
interface AppLayoutContract {
  // 主题应用
  themeApplication: {
    method: 'css-variables' | 'data-attribute'
    transition: '300ms' | '200ms'
    easing: 'ease-in-out'
  }

  // 语言应用
  languageApplication: {
    method: 'html-lang-attribute'
    fallback: 'en'
    rtl: boolean // 是否支持 RTL（未来扩展）
  }

  // 响应式设计
  responsive: {
    mobileFirst: boolean
    breakpoints: {
      sm: '640px'
      md: '768px'
      lg: '1024px'
      xl: '1280px'
    }
  }

  // 错误边界
  errorBoundary: {
    fallbackComponent: 'ErrorPage'
    logErrors: boolean
    showStackTrace: boolean // 仅开发环境
  }
}
```

## 5. 状态管理契约

### 全局状态

```typescript
interface GlobalStateContract {
  // 状态结构
  state: {
    theme: ThemeState
    language: LanguageState
    system: SystemState
    ui: UIState
  }

  // 操作定义
  actions: {
    theme: {
      setTheme: (theme: 'light' | 'dark' | 'system') => void
      toggleAutoFollow: () => void
      applySystemTheme: (systemTheme: 'light' | 'dark') => void
    }
    language: {
      setLanguage: (language: 'zh' | 'en') => void
      loadTranslations: (language: string) => Promise<void>
    }
    ui: {
      setMenuOpen: (open: boolean) => void
      setScrolled: (scrolled: boolean) => void
      setLoading: (loading: boolean) => void
    }
  }

  // 状态持久化
  persistence: {
    keys: {
      theme: 'app-theme-preferences'
      language: 'app-language-preferences'
    }
    storage: 'localStorage' | 'sessionStorage' | 'memory'
    sync: boolean // 是否跨标签页同步
  }
}
```

## 6. 性能契约

### 加载性能

```typescript
interface PerformanceContract {
  // 首屏加载
  firstContentfulPaint: '< 1.5s'
  largestContentfulPaint: '< 2.5s'
  cumulativeLayoutShift: '< 0.1'

  // 交互性能
  firstInputDelay: '< 100ms'
  timeToInteractive: '< 3.0s'

  // 主题切换
  themeTransitionTime: '< 300ms'
  languageSwitchTime: '< 500ms'

  // 内存使用
  maxMemoryUsage: '50MB'
  bundleSize: 'gzip < 200KB'
}
```

### 资源优化

```typescript
interface ResourceOptimization {
  // 代码分割
  codeSplitting: {
    enabled: true
    chunks: ['vendor', 'main', 'i18n']
  }

  // 图片优化
  images: {
    format: ['webp', 'avif', 'png']
    lazy: true
    responsive: true
  }

  // 缓存策略
  caching: {
    static: '1y'
    api: '5m'
    fonts: '1y'
  }
}
```

## 7. 测试契约

### 测试覆盖率

```typescript
interface TestingContract {
  // 单元测试
  unitTests: {
    coverage: '> 90%'
    threshold: '80%'
  }

  // 集成测试
  integrationTests: {
    coverage: '> 80%'
    criticalPaths: ['theme-switch', 'language-switch']
  }

  // E2E 测试
  e2eTests: {
    coverage: 'critical user flows'
    browsers: ['chromium', 'firefox', 'webkit']
    viewport: ['mobile', 'tablet', 'desktop']
  }

  // 可访问性测试
  accessibilityTests: {
    standard: 'WCAG 2.1 AA'
    tools: ['axe-core', 'lighthouse']
    automated: true
    manual: true
  }
}
```

## 总结

这个 UI 契约为简化模板首页的所有组件提供了详细的接口定义、行为规范和性能要求。所有组件都遵循现代 React 开发最佳实践，确保了类型安全、可访问性和性能优化。这个契约将作为实现阶段的指导文档。
