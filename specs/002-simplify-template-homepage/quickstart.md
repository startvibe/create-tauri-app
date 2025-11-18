# Quick Start Guide: 简化模板首页

**Feature**: 简化模板首页
**Date**: 2025-11-17
**Target Audience**: 开发者
**Based on**: [plan.md](plan.md), [research.md](research.md), [data-model.md](data-model.md)

## 🚀 快速开始

### 前置条件

- Node.js v22.19.0 LTS 或更高版本
- pnpm v10.15.1 或更高版本
- Rust 1.89.0 或更高版本（用于 Tauri 开发）
- WSL2（Windows 开发环境）

### 1. 环境准备

#### 安装依赖

```bash
# 在项目根目录安装主项目依赖
pnpm install

# 进入模板目录
cd template

# 安装模板项目依赖
pnpm install
```

#### 开发环境验证

```bash
# 检查代码质量
pnpm lint
pnpm format:check

# 启动开发服务器
pnpm tauri dev
```

### 2. 项目结构概览

```
template/                          # 模板项目根目录
├── src/                           # 源代码目录
│   └── app/                       # Next.js App Router
│       ├── layout.tsx             # 根布局组件
│       ├── page.tsx               # 首页组件
│       ├── globals.css            # 全局样式
│       └── components/            # React 组件
│           ├── theme-toggle.tsx   # 主题切换组件
│           ├── language-toggle.tsx # 语言切换组件
│           └── home-page.tsx      # 首页主组件
├── src-tauri/                     # Tauri 后端
│   ├── src/                       # Rust 源码
│   ├── Cargo.toml                 # Rust 依赖
│   └── tauri.conf.json            # Tauri 配置
├── public/                        # 静态资源
├── package.json                   # 项目依赖
├── next.config.js                 # Next.js 配置
├── tailwind.config.js             # Tailwind CSS 配置
└── .mcp.json                      # MCP 服务器配置
```

## 🎨 主题系统

### 主题配置

#### CSS 变量定义

```css
/* src/app/globals.css */
:root {
  /* 亮色主题变量 */
  --color-primary: #3b82f6;
  --color-background: #ffffff;
  --color-text: #1f2937;
  --color-border: #e5e7eb;
}

[data-theme='dark'] {
  /* 暗色主题变量 */
  --color-primary: #60a5fa;
  --color-background: #111827;
  --color-text: #f9fafb;
  --color-border: #374151;
}
```

#### 主题切换实现

```typescript
// src/app/components/theme-toggle.tsx
'use client';

import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { theme, setTheme, autoFollowSystem, toggleAutoFollow } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        aria-label="切换主题"
      >
        {theme === 'light' && <SunIcon />}
        {theme === 'dark' && <MoonIcon />}
        {theme === 'system' && <ComputerIcon />}
      </button>

      <div className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52">
        <div className="menu-title">
          <span>主题设置</span>
          <div className="form-control">
            <label className="label cursor-pointer">
              <input
                type="checkbox"
                className="toggle toggle-sm"
                checked={autoFollowSystem}
                onChange={toggleAutoFollow}
              />
              <span className="label-text ml-2">自动跟随系统</span>
            </label>
          </div>
        </div>

        <ul>
          <li>
            <button onClick={() => setTheme('light')}>
              <SunIcon className="w-4 h-4" />
              亮色模式
            </button>
          </li>
          <li>
            <button onClick={() => setTheme('dark')}>
              <MoonIcon className="w-4 h-4" />
              暗色模式
            </button>
          </li>
          <li>
            <button onClick={() => setTheme('system')}>
              <ComputerIcon className="w-4 h-4" />
              跟随系统
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
```

### 主题 Hook

```typescript
// src/hooks/use-theme.ts
'use client'

import { useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemePreferences {
  mode: Theme
  autoFollowSystem: boolean
  lastManualTheme?: 'light' | 'dark'
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('system')
  const [autoFollowSystem, setAutoFollowSystem] = useState(true)
  const [storageAvailable, setStorageAvailable] = useState(true)

  // 初始化主题设置
  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme-preferences')
      if (stored) {
        const preferences: ThemePreferences = JSON.parse(stored)
        setThemeState(preferences.mode)
        setAutoFollowSystem(preferences.autoFollowSystem)
      }
    } catch (error) {
      console.warn('无法加载主题偏好设置:', error)
      setStorageAvailable(false)
    }
  }, [])

  // 应用主题
  useEffect(() => {
    const applyTheme = () => {
      let resolvedTheme = theme

      if (theme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      }

      document.documentElement.setAttribute('data-theme', resolvedTheme)
    }

    applyTheme()

    // 监听系统主题变化
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      mediaQuery.addEventListener('change', applyTheme)
      return () => mediaQuery.removeEventListener('change', applyTheme)
    }
  }, [theme])

  // 保存主题设置
  const saveTheme = (newTheme: Theme) => {
    if (!storageAvailable) return

    try {
      const preferences: ThemePreferences = {
        mode: newTheme,
        autoFollowSystem,
        lastManualTheme: newTheme !== 'system' ? newTheme : undefined,
      }
      localStorage.setItem('theme-preferences', JSON.stringify(preferences))
    } catch (error) {
      console.warn('无法保存主题偏好设置:', error)
    }
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    saveTheme(newTheme)
  }

  const toggleAutoFollow = () => {
    const newValue = !autoFollowSystem
    setAutoFollowSystem(newValue)
    if (storageAvailable) {
      try {
        const preferences: ThemePreferences = {
          mode: theme,
          autoFollowSystem: newValue,
        }
        localStorage.setItem('theme-preferences', JSON.stringify(preferences))
      } catch (error) {
        console.warn('无法保存自动跟随设置:', error)
      }
    }
  }

  return {
    theme,
    setTheme,
    autoFollowSystem,
    toggleAutoFollow,
    storageAvailable,
  }
}
```

## 🌍 国际化系统

### 语言资源文件

#### 中文翻译 (zh.json)

```json
{
  "ui": {
    "home": {
      "title": "现代桌面应用模板",
      "subtitle": "基于 Tauri 2 + Next.js 16 + React 19",
      "description": "一个功能完整、性能优秀的现代桌面应用开发模板，提供开箱即用的开发体验。",
      "features": [
        {
          "title": "现代化技术栈",
          "description": "采用最新的 Tauri 2、Next.js 16 和 React 19 技术栈"
        },
        {
          "title": "主题切换",
          "description": "支持亮色/暗色主题，自动跟随系统设置"
        },
        {
          "title": "国际化支持",
          "description": "内置中英文双语支持，易于扩展其他语言"
        },
        {
          "title": "类型安全",
          "description": "完整的 TypeScript 支持，确保代码质量"
        }
      ]
    },
    "theme": {
      "toggle": "切换主题",
      "light": "亮色模式",
      "dark": "暗色模式",
      "system": "跟随系统",
      "autoFollow": "自动跟随系统主题"
    },
    "language": {
      "toggle": "切换语言",
      "chinese": "中文",
      "english": "English"
    },
    "errors": {
      "storageUnavailable": "本地存储不可用，设置将不会被保存",
      "translationLoadFailed": "翻译加载失败，显示默认语言",
      "themeSwitchFailed": "主题切换失败，请重试"
    }
  },
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2025-11-17",
    "language": "zh"
  }
}
```

#### 英文翻译 (en.json)

```json
{
  "ui": {
    "home": {
      "title": "Modern Desktop App Template",
      "subtitle": "Built with Tauri 2 + Next.js 16 + React 19",
      "description": "A feature-rich, high-performance modern desktop app development template with out-of-the-box development experience.",
      "features": [
        {
          "title": "Modern Tech Stack",
          "description": "Using the latest Tauri 2, Next.js 16 and React 19 technologies"
        },
        {
          "title": "Theme Switching",
          "description": "Support light/dark themes with automatic system detection"
        },
        {
          "title": "Internationalization",
          "description": "Built-in Chinese and English support, easy to extend"
        },
        {
          "title": "Type Safety",
          "description": "Complete TypeScript support ensuring code quality"
        }
      ]
    },
    "theme": {
      "toggle": "Toggle Theme",
      "light": "Light Mode",
      "dark": "Dark Mode",
      "system": "Follow System",
      "autoFollow": "Auto follow system theme"
    },
    "language": {
      "toggle": "Switch Language",
      "chinese": "中文",
      "english": "English"
    },
    "errors": {
      "storageUnavailable": "Local storage unavailable, settings will not be saved",
      "translationLoadFailed": "Translation loading failed, showing default language",
      "themeSwitchFailed": "Theme switch failed, please try again"
    }
  },
  "metadata": {
    "version": "1.0.0",
    "lastUpdated": "2025-11-17",
    "language": "en"
  }
}
```

### 国际化 Hook

```typescript
// src/hooks/use-translation.ts
'use client'

import { useState, useEffect } from 'react'

type Language = 'zh' | 'en'

interface TranslationResources {
  ui: {
    [key: string]: any
  }
  metadata: {
    version: string
    lastUpdated: string
    language: string
  }
}

export function useTranslation() {
  const [language, setLanguage] = useState<Language>('zh')
  const [translations, setTranslations] = useState<TranslationResources | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // 加载翻译资源
  const loadTranslations = async (lang: Language) => {
    setIsLoading(true)
    setHasError(false)

    try {
      const response = await fetch(`/i18n/${lang}.json`)
      if (!response.ok) {
        throw new Error(`Failed to load ${lang} translations`)
      }

      const data = await response.json()
      setTranslations(data)
    } catch (error) {
      console.warn(`无法加载 ${lang} 翻译:`, error)
      setHasError(true)

      // 降级到中文翻译
      if (lang !== 'zh') {
        try {
          const fallbackResponse = await fetch('/i18n/zh.json')
          const fallbackData = await fallbackResponse.json()
          setTranslations(fallbackData)
        } catch (fallbackError) {
          console.error('无法加载备用翻译:', fallbackError)
        }
      }
    } finally {
      setIsLoading(false)
    }
  }

  // 初始化语言设置
  useEffect(() => {
    try {
      const stored = localStorage.getItem('language-preferences')
      if (stored) {
        const preferences = JSON.parse(stored)
        setLanguage(preferences.current || 'zh')
      }
    } catch (error) {
      console.warn('无法加载语言偏好设置:', error)
    }
  }, [])

  // 加载对应语言的翻译
  useEffect(() => {
    loadTranslations(language)
    document.documentElement.lang = language
  }, [language])

  // 切换语言
  const changeLanguage = (newLanguage: Language) => {
    setLanguage(newLanguage)

    try {
      localStorage.setItem(
        'language-preferences',
        JSON.stringify({
          current: newLanguage,
          fallback: 'zh',
        })
      )
    } catch (error) {
      console.warn('无法保存语言偏好设置:', error)
    }
  }

  // 翻译函数
  const t = (key: string, fallback?: string) => {
    if (!translations) return fallback || key

    const keys = key.split('.')
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return fallback || key
      }
    }

    return typeof value === 'string' ? value : fallback || key
  }

  return {
    language,
    setLanguage: changeLanguage,
    t,
    isLoading,
    hasError,
    translations,
  }
}
```

## 🏗️ 主要组件实现

### 首页组件

```typescript
// src/app/components/home-page.tsx
'use client';

import { useTranslation } from '@/hooks/use-translation';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';

export function HomePage() {
  const { t } = useTranslation();

  const features = [
    {
      id: 'tech-stack',
      icon: '🚀',
      title: t('ui.home.features.0.title'),
      description: t('ui.home.features.0.description')
    },
    {
      id: 'theme-switch',
      icon: '🎨',
      title: t('ui.home.features.1.title'),
      description: t('ui.home.features.1.description')
    },
    {
      id: 'i18n',
      icon: '🌍',
      title: t('ui.home.features.2.title'),
      description: t('ui.home.features.2.description')
    },
    {
      id: 'typescript',
      icon: '🔒',
      title: t('ui.home.features.3.title'),
      description: t('ui.home.features.3.description')
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200">
      {/* 头部导航 */}
      <header className="navbar bg-base-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
          </div>
          <a href="/" className="btn btn-ghost normal-case text-xl">
            {t('ui.home.title')}
          </a>
        </div>

        <div className="navbar-end">
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="container mx-auto px-4 py-16">
        {/* Hero 区域 */}
        <section className="hero min-h-[60vh]">
          <div className="hero-content text-center">
            <div className="max-w-4xl">
              <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t('ui.home.title')}
              </h1>
              <p className="text-xl mb-4 text-base-content/80">
                {t('ui.home.subtitle')}
              </p>
              <p className="text-lg mb-8 text-base-content/60 max-w-2xl mx-auto">
                {t('ui.home.description')}
              </p>

              <div className="flex gap-4 justify-center">
                <button className="btn btn-primary btn-lg">
                  开始使用
                </button>
                <button className="btn btn-outline btn-lg">
                  查看文档
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 特性展示 */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">核心特性</h2>
            <p className="text-lg text-base-content/60">
              为现代桌面应用开发提供完整解决方案
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="card-body items-center text-center">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="card-title text-lg">{feature.title}</h3>
                  <p className="text-base-content/70">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="footer footer-center p-10 bg-base-200 text-base-content">
        <div>
          <p className="font-bold">
            现代桌面应用模板
            <br />
            基于 Tauri 2 + Next.js 16 + React 19
          </p>
          <p>Copyright © 2025 - All right reserved</p>
        </div>
      </footer>
    </div>
  );
}
```

### 语言切换组件

```typescript
// src/app/components/language-toggle.tsx
'use client';

import { useTranslation } from '@/hooks/use-translation';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export function LanguageToggle() {
  const { language, setLanguage, isLoading, hasError } = useTranslation();

  const languages = [
    { code: 'zh' as const, name: '中文', flag: '🇨🇳' },
    { code: 'en' as const, name: 'English', flag: '🇺🇸' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <div className="dropdown dropdown-end">
      <button
        tabIndex={0}
        className="btn btn-ghost btn-circle"
        aria-label="切换语言"
      >
        {hasError && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full" />
        )}
        <GlobeAltIcon className="w-5 h-5" />
      </button>

      <div className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-48">
        <div className="menu-title">
          <span>选择语言</span>
          {isLoading && <span className="loading loading-spinner loading-xs"></span>}
        </div>

        <ul>
          {languages.map((lang) => (
            <li key={lang.code}>
              <button
                onClick={() => setLanguage(lang.code)}
                className={language === lang.code ? 'active' : ''}
              >
                <span className="mr-2">{lang.flag}</span>
                {lang.name}
                {language === lang.code && (
                  <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>

        {hasError && (
          <div className="divider"></div>
        )}
        {hasError && (
          <div className="p-2">
            <div className="alert alert-warning">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span className="text-xs">翻译加载失败</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
```

## 📋 开发检查清单

### 功能实现检查

- [ ] 主题切换功能正常工作
- [ ] 自动跟随系统主题
- [ ] 语言切换功能正常工作
- [ ] 翻译加载失败时的错误处理
- [ ] 本地存储不可用时的降级处理
- [ ] 响应式设计适配移动端

### 性能检查

- [ ] 首屏加载时间 < 2秒
- [ ] 主题切换时间 < 300ms
- [ ] 语言切换时间 < 500ms
- [ ] 没有内存泄漏
- [ ] 代码分割正常工作

### 可访问性检查

- [ ] 键盘导航支持
- [ ] 屏幕阅读器支持
- [ ] 颜色对比度符合 WCAG 2.1 AA
- [ ] 语义化 HTML 结构
- [ ] ARIA 标签正确设置

### 代码质量检查

- [ ] ESLint 检查通过
- [ ] Prettier 格式化通过
- [ ] TypeScript 类型检查通过
- [ ] 单元测试覆盖率 > 90%
- [ ] 集成测试通过

## 🔧 故障排除

### 常见问题

#### 1. 主题切换不生效

**症状**: 点击主题切换按钮后界面没有变化
**解决方案**:

- 检查 CSS 变量是否正确定义
- 确认 `data-theme` 属性是否正确设置
- 检查 localStorage 是否可用

#### 2. 语言切换失败

**症状**: 切换语言后界面文本没有更新
**解决方案**:

- 检查翻译文件是否存在且格式正确
- 确认网络请求是否成功
- 检查翻译文件的 JSON 格式

#### 3. 开发服务器启动失败

**症状**: `pnpm tauri dev` 命令执行失败
**解决方案**:

- 确认 Rust 和 Node.js 版本符合要求
- 检查 Tauri 依赖是否正确安装
- 确认端口没有被占用

## 📚 相关文档

- [Tauri 2.0 文档](https://tauri.app/v1/guides/)
- [Next.js 16.0.3 文档](https://nextjs.org/docs)
- [React 19 文档](https://react.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [DaisyUI 文档](https://daisyui.com/docs/)

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

确保所有更改都通过代码质量检查和测试。
