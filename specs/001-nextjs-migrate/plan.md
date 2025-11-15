# Implementation Plan: Template Next.js Migration

**Branch**: `001-nextjs-migrate` | **Date**: 2025-11-16 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-nextjs-migrate/spec.md`

## Summary

将模板子项目从 Vite + React Router 架构迁移到 Next.js 16.0.3 + App Router 架构，同时保持所有现有业务功能、页面布局和用户体验不变。通过 Next.js 静态导出模式与 Tauri 2.0 深度集成，确保桌面应用的构建和部署兼容性。

## Technical Context

**Language/Version**: TypeScript 5.8.3 + React 19.1.1 + Next.js 16.0.3
**Primary Dependencies**: Next.js 16.0.3, React 19.1.1, Tauri 2.0.0, Tailwind CSS 3.4.1, DaisyUI 5.0.38, i18next 25.5.2
**Storage**: 本地文件系统（Tauri 配置）+ localStorage（国际化设置）
**Testing**: ESLint 9.35.0 + Prettier 3.6.2 + Husky 9.1.7（代码质量）
**Target Platform**: 桌面应用（Windows、macOS、Linux）通过 Tauri 2.0
**Project Type**: 双项目架构（主项目 CLI 工具 + 模板子项目）
**Performance Goals**: 构建时间不超过原版本120%，热重载响应时间<1秒，启动时间不超过原版本110%
**Constraints**: 静态导出模式，不支持 SSR，必须保持100%视觉和功能一致性
**Scale/Scope**: 4个主要页面（首页、仪表板、用户管理、设置），完整的国际化支持，主题切换功能

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

✅ **双项目架构原则**：此功能明确区分主项目（npx CLI工具）和模板子项目（Tauri + Next.js应用模板）的职责，迁移仅在模板子项目内进行

✅ **技术栈标准化**：严格遵循主项目Node.js CLI和模板子项目Tauri 2.0 + Next.js 16.0.3的技术栈要求，符合CC-010和CC-011规范

✅ **统一代码质量标准**：模板项目已配置ESLint + Prettier + husky hooks，支持中文提交信息，符合CC-006规范

✅ **MCP驱动开发**：已使用Context7 MCP研究Next.js迁移和Tauri集成方案，严格遵循SDD和测试驱动开发流程，符合CC-002规范

✅ **开发环境路径管理**：明确主项目在根目录开发，模板子项目迁移工作在template目录内进行，符合CC-009规范

✅ **模板子项目特殊要求**：模板将配置Next.js静态导出(output: 'export')，完全支持Tauri桌面应用集成，符合CC-011规范

✅ **主项目CLI工具要求**：主项目保持现有CLI功能，迁移不影响create.js和项目创建流程

✅ **项目间协同**：迁移保持主项目和模板子项目的版本兼容性，确保CLI工具创建的项目正常工作

✅ **中文优先沟通**：所有文档、代码注释、用户交互和技术讨论均使用中文，符合CC-012规范

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

本项目采用双项目架构，包含主项目（npx工具）和模板子项目：

```text
# 双项目架构 (DEFAULT)
create-tauri-app/                    # 主项目根目录
├── create.js                        # CLI工具入口文件
├── package.json                     # 主项目依赖配置
├── eslint.config.js                 # 双项目ESLint配置
├── cz-config.js                     # 约定式提交配置
├── commitlint.config.js             # 提交信息验证
├── .husky/                          # Git hooks
├── .specify/                        # Speckit配置和模板
└── template/                        # 模板子项目
    ├── src/                         # Next.js应用源码
    │   └── app/                     # App Router目录
    ├── src-tauri/                   # Tauri后端
    ├── package.json                 # 模板项目依赖
    ├── next.config.js               # Next.js配置
    ├── tailwind.config.js           # Tailwind CSS配置
    └── .mcp.json                    # MCP服务器配置
```

**结构决策**: 采用双项目架构，主项目提供CLI工具功能，模板子项目提供Tauri 2 + Next.js应用模板。两个项目共享相同的代码质量标准和开发规范，但具有不同的技术栈和职责。

## Phase 0 Research Findings

### 迁移策略分析

基于Context7 MCP对Next.js官方文档的深入研究，确定了以下关键迁移策略：

#### Next.js配置要点

1. **静态导出配置**：必须设置 `output: 'export'` 以支持Tauri桌面应用
2. **图片优化禁用**：设置 `images.unoptimized: true` 避免SSG模式下的图片处理问题
3. **资源前缀配置**：开发环境需配置 `assetPrefix` 确保资源正确解析
4. **构建输出目录**：Tauri配置中 `frontendDist` 应指向 `../out`

#### 架构迁移重点

1. **App Router迁移**：将React Router的文件路由转换为Next.js App Router的文件系统路由
2. **客户端组件处理**：所有涉及Tauri API调用的组件必须添加 `'use client'` 指令
3. **根布局重构**：将 `root.tsx` 的Layout组件转换为 `app/layout.tsx`
4. **路由系统**：使用Next.js Link组件替换React Router的Link组件

#### 国际化适配

1. **i18next集成**：保持现有i18next配置，适配Next.js的SSR禁用环境
2. **客户端检测**：确保语言检测在客户端正常运行
3. **资源加载**：保持现有的多语言资源结构和命名空间

#### Tauri集成要点

1. **命令配置**：更新tauri.conf.json的beforeDevCommand和beforeBuildCommand
2. **开发服务器**：配置Next.js开发服务器端口与Tauri的集成
3. **静态资源**：确保所有静态资源在静态导出模式下正常工作

## Phase 1 Design: Migration Architecture

### 目录结构映射

```text
# 迁移前 (Vite + React Router)
template/src/
├── root.tsx              → app/layout.tsx
├── routes.ts             → 删除（Next.js自动路由）
├── routes/
│   ├── _index.tsx        → app/page.tsx
│   ├── dashboard.tsx     → app/dashboard/page.tsx
│   ├── users.tsx         → app/users/page.tsx
│   └── settings.tsx      → app/settings/page.tsx
├── components/           → app/components/（保持不变）
└── i18n/                 → app/i18n/（适配客户端加载）

# 迁移后 (Next.js App Router)
template/src/app/
├── layout.tsx            # 根布局，包含HTML结构和导航
├── page.tsx              # 首页
├── dashboard/
│   └── page.tsx          # 仪表板页面
├── users/
│   └── page.tsx          # 用户管理页面
├── settings/
│   └── page.tsx          # 设置页面
├── components/           # 共享组件
└── i18n/                 # 国际化配置
```

### 核心迁移组件

#### 1. 根布局 (app/layout.tsx)

```typescript
'use client' // 支持主题切换和国际化
import type { Metadata } from 'next'
import { AppLayout } from './components/app-layout'

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
      <body>
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  )
}
```

#### 2. 客户端组件适配

```typescript
// 所有包含Tauri API调用的组件
'use client'
import { invoke } from '@tauri-apps/api/core'

export function TauriComponent() {
  // Tauri API调用逻辑
}
```

#### 3. Next.js配置 (next.config.js)

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静态导出支持Tauri
  images: {
    unoptimized: true, // SSG模式兼容性
  },
  assetPrefix:
    process.env.NODE_ENV === 'development'
      ? `http://${process.env.TAURI_DEV_HOST || 'localhost'}:3000`
      : undefined,
  trailingSlash: true, // 确保路由一致性
}

export default nextConfig
```

### 数据流和状态管理

#### 国际化数据流

```typescript
// app/i18n/client.ts - 客户端i18n配置
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { resources } from './resources'

// 仅在客户端初始化i18n
if (typeof window !== 'undefined') {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'zh-CN',
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'tauri-app-language',
        caches: ['localStorage'],
      },
    })
}

export default i18n
```

#### 主题状态管理

```typescript
// app/components/theme-toggle.tsx - 'use client'组件
'use client'
import { useState, useEffect } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    // 主题切换逻辑，适配Next.js环境
  }, [])

  return (
    // 主题切换UI
  )
}
```

## Phase 2 Implementation Tasks

### 迁移执行顺序

1. **依赖更新** (T001)
   - 卸载React Router相关依赖
   - 安装Next.js 16.0.3
   - 更新package.json脚本

2. **配置创建** (T002)
   - 创建next.config.js
   - 更新tsconfig.json支持App Router
   - 修改tauri.conf.json

3. **目录结构调整** (T003)
   - 创建app目录结构
   - 迁移现有组件
   - 适配路由文件

4. **根布局实现** (T004)
   - 将root.tsx转换为layout.tsx
   - 实现metadata配置
   - 集成AppLayout组件

5. **页面迁移** (T005-T008)
   - 首页 (app/page.tsx)
   - 仪表板 (app/dashboard/page.tsx)
   - 用户管理 (app/users/page.tsx)
   - 设置页面 (app/settings/page.tsx)

6. **组件适配** (T009)
   - 添加'use client'指令
   - 适配Tauri API调用
   - 更新导入路径

7. **国际化集成** (T010)
   - 适配i18next客户端加载
   - 更新语言检测逻辑
   - 测试多语言功能

8. **样式和主题** (T011)
   - 迁移Tailwind CSS配置
   - 适配DaisyUI主题系统
   - 确保样式一致性

9. **构建和测试** (T012)
   - 配置静态导出构建
   - 测试开发环境热重载
   - 验证桌面应用集成

### 风险控制

- **备份策略**：迁移前完整备份当前模板
- **渐进验证**：每个步骤完成后进行功能验证
- **回滚机制**：保留原有构建系统作为回滚选项
- **性能监控**：持续监控构建时间和启动性能

## Complexity Tracking

本迁移项目符合项目宪法所有要求，无需复杂性说明。所有迁移工作都在现有双项目架构框架内进行，不引入额外的复杂性。
