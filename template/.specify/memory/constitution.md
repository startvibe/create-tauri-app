<!--
Sync Impact Report:
Version change: 1.0.1 → 1.1.0 (minor version - major section addition)
Modified principles: N/A
Added sections: Tauri 2.0 + Next.js App Router 集成特殊要求, Next.js App Router 目录结构指南, Next.js 文件约定说明
Removed sections: N/A
Templates requiring updates: ⚠ 需要检查其他模板文件是否存在
Follow-up TODOs: None
-->

# Tauri + Next.js 桌面应用模板项目宪法

## 核心原则

### I. 技术栈标准化（不可协商）

项目必须使用以下标准技术栈：

- **前端框架**: React 19 + Next.js + TypeScript 5.8.3+
- **后端框架**: Tauri 2.0 + Rust 1.89.0+
- **构建工具**: Next.js 16.0.3
- **路由系统**: Next.js App Router
- **样式系统**: Tailwind CSS v3 + DaisyUI 5 + PostCSS
- **包管理器**: pnpm（强制要求）

### II. 代码质量标准（不可协商）

项目必须配置以下质量工具：

- **代码规范**: ESLint + Prettier 配置
- **Git 规范**: Husky hooks + 约定式提交（支持 emoji）
- **类型检查**: TypeScript 严格模式
- **构建验证**: 所有代码必须通过 `pnpm lint` 和 `pnpm format:check`

### III. 文档驱动开发（不可协商）

强制执行 MCP 驱动的开发流程：

- **研究阶段**: 实施前必须使用 Context7 MCP 研究所有技术库文档
- **验证阶段**: 实施后必须使用 Playwright MCP 测试所有前端功能
- **开发方法**: 必须遵循 SDD（Specification Driven Development）和测试驱动开发
- **文档研究 → 实施 → 验证**周期严格执行

### IV. MCP 配置标准（不可协商）

项目必须包含 Claude Code 和 MCP 服务器配置：

- **Playwright MCP**: 用于前端自动化测试
- **Context7 MCP**: 用于技术文档查询和研究
- **项目级配置**: 所有 MCP 配置必须检查到版本控制
- **开发工作流**: MCP 工具必须集成到日常开发流程

### V. 测试驱动开发（不可协商）

所有功能开发必须遵循测试驱动原则：

- **前端测试**: 使用 Playwright MCP 进行 UI 交互测试
- **组件测试**: 验证 React 组件渲染和交互
- **路由测试**: 验证 Next.js App Router 功能
- **主题测试**: 验证深色/浅色模式切换功能
- **集成测试**: 验证 Tauri 与 Next.js 集成

### VII. 中文优先沟通（不可协商）

除专业术语和源代码外，所有项目文档必须优先使用中文：

- **项目文档**: README.md、CLAUDE.md、技术文档
- **代码注释**: 所有注释使用中文
- **提交信息**: 约定式提交使用中文描述
- **技术讨论**: 技术讨论和知识分享使用中文

## 开发工作流要求

### MCP 驱动的开发周期

**第一阶段 - 研究**：使用 Context7 MCP 在实施前研究所有依赖和库，获取最新技术文档
**第二阶段 - 实施**：基于文档研究和既定模式进行编码，遵循技术栈标准
**第三阶段 - 验证**：使用 Playwright MCP 测试所有前端功能，包括 UI 交互和路由
**第四阶段 - 文档**：更新相关文档，添加中文注释，确保知识传承

### 质量门控

- 所有代码更改必须通过 `pnpm lint` 和 `pnpm format:check` 验证
- 功能开发前必须完成 Context7 MCP 文档研究
- 功能完成后必须通过 Playwright MCP 自动化测试
- MCP 服务器（Playwright、Context7）必须配置并正常工作
- Next.js 迁移必须保持 Tauri 桌面应用功能完整

### 开发命令标准

项目必须提供以下核心开发功能：

- `pnpm tauri dev` - 启动开发服务器（支持 Next.js 热重载）
- `pnpm tauri build` - 构建生产版本
- `pnpm lint` / `pnpm format` - 代码质量检查
- `pnpm typecheck` - TypeScript 类型检查
- `pnpm commit` - 约定式提交（支持中文）

### 测试验证要求

所有开发工作必须包含以下测试验证：

- **组件测试**: React 组件渲染和用户交互
- **路由测试**: Next.js App Router 页面导航
- **主题测试**: 深色/浅色模式切换功能
- **集成测试**: Tauri 后端命令与前端交互
- **跨平台测试**: 桌面应用在不同操作系统的兼容性

## 项目结构要求

### 标准 Next.js App Router 目录结构

```
template/
├── src/                    # 源代码根目录
│   ├── app/               # Next.js App Router（强制）
│   │   ├── layout.tsx     # 根布局
│   │   ├── page.tsx       # 首页
│   │   ├── loading.tsx    # 加载状态
│   │   ├── error.tsx      # 错误边界
│   │   ├── not-found.tsx  # 404 页面
│   │   └── [slug]/        # 动态路由页面
│   │       ├── page.tsx
│   │       └── layout.tsx
│   ├── components/        # 可复用组件
│   │   └── ui/           # UI 组件库
│   ├── lib/              # 工具函数和配置
│   ├── hooks/            # 自定义 React Hooks
│   ├── types/            # TypeScript 类型定义
│   └── styles/           # 全局样式文件
├── src-tauri/            # Tauri 后端源码
│   ├── src/              # Rust 源码
│   │   └── main.rs       # 主入口
│   ├── capabilities/     # Tauri 权限配置
│   ├── icons/           # 应用图标
│   └── tauri.conf.json  # Tauri 配置
├── public/               # 静态资源（图片、字体等）
├── docs/                 # 项目文档
├── .husky/               # Git hooks
├── .vscode/              # VS Code 配置
├── .mcp.json             # Claude Code MCP 配置
├── next.config.js        # Next.js 配置（项目根）
├── tailwind.config.js    # Tailwind CSS 配置
├── tsconfig.json         # TypeScript 配置
└── package.json          # 项目配置和依赖
```

### Next.js App Router 文件约定

**特殊文件优先级**（从高到低）：

1. `layout.tsx` - 布局组件，定义共享 UI
2. `page.tsx` - 页面组件，定义具体页面内容
3. `loading.tsx` - 加载状态，React Suspense 边界
4. `error.tsx` - 错误边界，处理运行时错误
5. `not-found.tsx` - 404 页面，处理未找到路由

**组件分类**：

- **服务器组件**：默认，用于数据获取和静态内容
- **客户端组件**：使用 `'use client'` 指令，用于交互性功能

**Tauri 集成要点**：

- Tauri 命令通过 `@tauri-apps/api/core` 调用
- 桌面应用特有功能保持不变
- Next.js 路由与 Tauri 窗口管理协同工作

### Tauri 2.0 + Next.js App Router 集成特殊要求（强制）

**Next.js 配置要求**：

- **静态导出模式**: 必须设置 `output: 'export'` 禁用 SSR，Tauri 不支持服务端渲染
- **图片优化**: 必须设置 `images: { unoptimized: true }` 适配静态导出
- **资源前缀**: 开发环境必须配置 `assetPrefix` 确保资源正确解析
- **输出目录**: 构建输出必须是 `out` 目录（可配置）

**Tauri 配置要求**：

```json
// src-tauri/tauri.conf.json
{
  "build": {
    "beforeDevCommand": "pnpm dev",
    "beforeBuildCommand": "pnpm build",
    "devUrl": "http://localhost:3000",
    "frontendDist": "../out"
  }
}
```

**Package.json 脚本要求**：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "tauri": "tauri"
  }
}
```

**Next.js 配置文件示例**：

```typescript
// next.config.mjs
const isProd = process.env.NODE_ENV === 'production'
const internalHost = process.env.TAURI_DEV_HOST || 'localhost'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 强制静态导出
  images: {
    unoptimized: true, // 禁用图片优化
  },
  assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
}

export default nextConfig
```

**App Router 特殊限制**：

- 所有页面必须预渲染，不支持动态服务端功能
- 路由处理完全在客户端进行
- API Routes 不支持（Tauri 环境下）
- 必须使用 React Server Components 的静态特性

## 治理

本宪法优先于所有其他开发实践；修正需要文档、批准和迁移计划；所有代码更改必须验证符合这些原则；使用 CLAUDE.md 进行运行时开发指导。

**版本**: 1.1.0 | **制定日期**: 2025-11-15 | **最后修正**: 2025-11-15
