# Data Model: 简化模板首页

**Feature**: 简化模板首页
**Date**: 2025-11-17
**Based on**: [spec.md](spec.md) and [research.md](research.md)

## 1. 用户偏好设置 (UserPreferences)

### 实体描述

存储用户的主题和语言偏好设置，支持本地持久化和会话保持。

### 数据结构

```typescript
interface UserPreferences {
  // 主题设置
  theme: {
    mode: 'light' | 'dark' | 'system' // 主题模式
    autoFollowSystem: boolean // 是否自动跟随系统主题
    lastManualTheme?: 'light' | 'dark' // 最后手动选择的主题
  }

  // 语言设置
  language: {
    current: 'zh' | 'en' // 当前语言
    fallback: 'zh' | 'en' // 备用语言
  }

  // 系统信息
  system: {
    storageAvailable: boolean // 本地存储是否可用
    lastUpdated: string // 最后更新时间 (ISO 8601)
  }
}
```

### 状态转换

```typescript
type ThemeTransition =
  | { from: 'light'; to: 'dark' }
  | { from: 'dark'; to: 'light' }
  | { from: 'system'; to: 'light' | 'dark' }
  | { from: 'light' | 'dark'; to: 'system' }

type LanguageTransition = { from: 'zh'; to: 'en' } | { from: 'en'; to: 'zh' }
```

### 验证规则

- `theme.mode`: 必须是 'light' | 'dark' | 'system' 之一
- `language.current`: 必须是 'zh' | 'en' 之一
- `system.lastUpdated`: 必须是有效的 ISO 8601 日期字符串
- `system.storageAvailable`: 布尔值，由运行时检测确定

## 2. 多语言资源 (LanguageResources)

### 实体描述

存储应用程序的多语言翻译内容，支持动态加载和错误处理。

### 数据结构

```typescript
interface LanguageResources {
  // 界面文本
  ui: {
    // 首页内容
    home: {
      title: string // 项目标题
      subtitle: string // 项目副标题
      description: string // 项目描述
      features: Array<{
        // 特性列表
        title: string
        description: string
      }>
    }

    // 主题切换
    theme: {
      toggle: string // 切换按钮文本
      light: string // 亮色模式
      dark: string // 暗色模式
      system: string // 跟随系统
      autoFollow: string // 自动跟随选项
    }

    // 语言切换
    language: {
      toggle: string // 切换按钮文本
      chinese: string // 中文
      english: string // 英文
    }

    // 错误信息
    errors: {
      storageUnavailable: string // 存储不可用
      translationLoadFailed: string // 翻译加载失败
      themeSwitchFailed: string // 主题切换失败
    }
  }

  // 元数据
  metadata: {
    version: string // 资源版本
    lastUpdated: string // 最后更新时间
    language: string // 语言代码
  }
}
```

### 资源文件结构

```
src/app/i18n/locales/
├── zh.json                 # 中文翻译
├── en.json                 # 英文翻译
└── index.ts               # 资源导出
```

### 验证规则

- 所有 `ui.*` 字段必须是非空字符串
- `features` 数组至少包含一个特性项
- `metadata.version` 遵循语义化版本控制
- `metadata.language` 必须是有效的语言代码

## 3. 主题配置 (ThemeConfig)

### 实体描述

定义亮色和暗色主题的颜色方案和样式变量。

### 数据结构

```typescript
interface ThemeConfig {
  // 基础颜色
  colors: {
    primary: string // 主色调
    secondary: string // 次要色调
    accent: string // 强调色

    // 背景色
    background: {
      primary: string // 主背景
      secondary: string // 次要背景
      tertiary: string // 三级背景
    }

    // 文字颜色
    text: {
      primary: string // 主文字
      secondary: string // 次要文字
      muted: string // 静音文字
      inverse: string // 反色文字
    }

    // 边框和分割线
    border: {
      primary: string // 主边框
      secondary: string // 次要边框
    }

    // 状态颜色
    state: {
      success: string // 成功状态
      warning: string // 警告状态
      error: string // 错误状态
      info: string // 信息状态
    }
  }

  // 语义化标记
  semantic: {
    isDark: boolean // 是否为暗色主题
    name: string // 主题名称
    description: string // 主题描述
  }
}
```

### 主题实现

```typescript
// 亮色主题
const lightTheme: ThemeConfig = {
  colors: {
    primary: '#3b82f6',
    background: {
      primary: '#ffffff',
      secondary: '#f8fafc',
      tertiary: '#f1f5f9',
    },
    text: {
      primary: '#1f2937',
      secondary: '#6b7280',
      muted: '#9ca3af',
      inverse: '#ffffff',
    },
    // ... 其他颜色定义
  },
  semantic: {
    isDark: false,
    name: 'light',
    description: '亮色主题',
  },
}

// 暗色主题
const darkTheme: ThemeConfig = {
  colors: {
    primary: '#60a5fa',
    background: {
      primary: '#111827',
      secondary: '#1f2937',
      tertiary: '#374151',
    },
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
      muted: '#9ca3af',
      inverse: '#111827',
    },
    // ... 其他颜色定义
  },
  semantic: {
    isDark: true,
    name: 'dark',
    description: '暗色主题',
  },
}
```

### 验证规则

- 所有颜色值必须是有效的 CSS 颜色值
- 文字和背景色的对比度必须满足 WCAG 2.1 AA 标准
- `semantic.isDark` 必须与实际主题配置一致

## 4. 系统状态 (SystemState)

### 实体描述

跟踪应用程序的运行时状态和系统信息。

### 数据结构

```typescript
interface SystemState {
  // 运行环境
  environment: {
    isTauri: boolean // 是否在 Tauri 环境中运行
    platform: 'windows' | 'macos' | 'linux' | 'unknown'
    systemTheme: 'light' | 'dark' | 'unknown' // 系统主题
  }

  // 应用状态
  application: {
    isInitialized: boolean // 是否已初始化
    hasErrors: boolean // 是否有错误
    loadingState: 'idle' | 'loading' | 'success' | 'error'
  }

  // 功能可用性
  capabilities: {
    localStorage: boolean // 本地存储可用性
    systemThemeDetection: boolean // 系统主题检测
    i18n: boolean // 国际化支持
  }
}
```

### 状态管理

```typescript
// 使用 React Context 管理全局状态
interface AppContextType {
  preferences: UserPreferences
  systemState: SystemState
  currentTheme: ThemeConfig
  currentLanguage: LanguageResources

  // 操作方法
  updateTheme: (theme: Partial<UserPreferences['theme']>) => void
  updateLanguage: (language: string) => void
  resetPreferences: () => void
}
```

## 5. 错误状态 (ErrorState)

### 实体描述

定义应用程序中可能出现的错误状态和处理策略。

### 数据结构

```typescript
interface ErrorState {
  // 错误类型
  type: 'storage' | 'translation' | 'theme' | 'system' | 'network'

  // 错误信息
  message: string // 用户友好的错误消息
  code?: string // 错误代码（用于调试）
  details?: any // 详细错误信息

  // 错误处理
  handled: boolean // 是否已处理
  retryable: boolean // 是否可重试
  retryCount: number // 重试次数

  // 时间戳
  timestamp: string // 错误发生时间
  resolvedAt?: string // 错误解决时间
}
```

### 错误处理策略

```typescript
interface ErrorHandlingStrategy {
  storage: {
    fallback: 'memory' // 降级到内存存储
    notify: true // 显示用户通知
    retry: false // 不自动重试
  }

  translation: {
    fallback: 'source' // 降级到源语言
    notify: true // 显示警告图标
    retry: true // 自动重试
    maxRetries: 3 // 最大重试次数
  }

  theme: {
    fallback: 'default' // 降级到默认主题
    notify: false // 不显示通知
    retry: true // 自动重试
    maxRetries: 1 // 最大重试次数
  }
}
```

## 数据关系图

```
UserPreferences (1) ──┐
                        ├──> SystemState (1)
LanguageResources (1) ──┤
                        ├──> ThemeConfig (1) ──> ErrorState (*)
SystemState (1) ────────┘
```

## 数据持久化策略

### localStorage 结构

```json
{
  "userPreferences": {
    "theme": {
      "mode": "dark",
      "autoFollowSystem": true,
      "lastManualTheme": "light"
    },
    "language": {
      "current": "zh",
      "fallback": "en"
    },
    "system": {
      "storageAvailable": true,
      "lastUpdated": "2025-11-17T10:30:00Z"
    }
  }
}
```

### 缓存策略

- **主题配置**: 内存缓存，实时切换
- **语言资源**: 内存缓存 + 按需加载
- **用户偏好**: localStorage + 内存缓存同步
- **系统状态**: 仅内存缓存，运行时计算

## 总结

这个数据模型为简化模板首页功能提供了完整的数据结构定义，包括用户偏好设置、多语言资源、主题配置、系统状态和错误处理。所有数据结构都考虑了类型安全、验证规则和状态管理，为实现提供了清晰的数据契约。
