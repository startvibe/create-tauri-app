# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Tauri 2 + Next.js 16 + React 19 + TypeScript template project designed to serve as a foundation for multiple desktop applications. The project uses Next.js App Router architecture with static export configuration for Tauri compatibility and follows MCP-driven development methodology.

## Architecture Overview

### Frontend (Next.js 16 + React 19 + TypeScript)

- **Framework**: Next.js 16.0.3 with App Router architecture
- **React Version**: React 19.1.1 with TypeScript 5.8.3
- **Build Tool**: Next.js built-in build system with static export (`output: 'export'`)
- **Location**: `src/`
- **Entry Point**: `src/app/layout.tsx` → `src/app/page.tsx`
- **Styling**: Tailwind CSS v3 with daisyUI component library in `src/app/globals.css`
- **UI Components**: daisyUI - pre-built components with semantic class names
- **Theme System**: Built-in dark/light mode with daisyUI theme system
- **Routing**: Next.js App Router with static pre-rendering

### Static Export Configuration

**Critical for Tauri compatibility**: Next.js is configured for static export mode:

```javascript
// next.config.mjs
const nextConfig = {
  output: 'export', // 强制静态导出，禁用 SSR
  images: {
    unoptimized: true, // 禁用图片优化适配静态导出
  },
  assetPrefix: isProd ? undefined : `http://${internalHost}:3000`,
}
```

**App Router Special Limitations**:

- All pages must be pre-rendered, no dynamic server-side functionality
- Routing is completely client-side
- API Routes are not supported in Tauri environment
- Must use React Server Components' static特性

## Project Structure

```
[project-name]/
├── src/                    # Next.js App Router source code
│   ├── app/               # Next.js App Router (强制)
│   │   ├── layout.tsx     # 根布局
│   │   ├── page.tsx       # 首页
│   │   ├── loading.tsx    # 加载状态
│   │   ├── error.tsx      # 错误边界
│   │   ├── not-found.tsx  # 404 页面
│   │   ├── globals.css    # 全局样式
│   │   └── [slug]/        # 动态路由页面
│   │       ├── page.tsx
│   │       └── layout.tsx
│   ├── components/        # 可复用组件
│   │   └── ui/           # UI 组件库
│   │       └── theme-toggle.tsx # 主题切换组件
│   ├── lib/              # 工具函数和配置
│   ├── hooks/            # 自定义 React Hooks
│   ├── types/            # TypeScript 类型定义
│   └── styles/           # 全局样式文件
├── src-tauri/              # Tauri backend (Rust)
│   ├── src/               # Rust source code
│   │   └── main.rs       # 主入口
│   ├── capabilities/       # Tauri 权限配置
│   ├── icons/             # Application icons
│   └── tauri.conf.json    # Tauri 配置
├── public/                 # Static assets
│   ├── tauri.svg          # Tauri icon
│   └── next.svg           # Next.js icon
├── out/                    # Next.js 静态导出输出目录
├── .husky/                 # Git hooks (auto-installed)
├── .vscode/                # VS Code configuration
├── .specify/               # Spec-kit 配置和文档
│   └── memory/            # 项目记忆和宪法
├── package.json            # Project dependencies and scripts
├── README.md              # Project documentation
├── CLAUDE.md              # Claude AI assistance guide
├── COMMIT_GUIDE.md        # Git commit conventions guide
├── .mcp.json              # Claude Code MCP server configuration
├── .gitignore             # Git ignore rules
├── .editorconfig          # Editor configuration
├── .prettierrc            # Prettier code formatting
├── .prettierignore        # Prettier ignore rules
├── eslint.config.js       # ESLint configuration
├── commitlint.config.js   # Commit message validation
├── cz-config.js           # Commitizen configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── postcss.config.js      # PostCSS configuration
├── tsconfig.json          # TypeScript configuration
├── next.config.mjs        # Next.js 配置（项目根）
└── pnpm-lock.yaml         # Dependency lock file
```

## Development Commands

### Primary Development Workflow

**Direct pnpm commands:**

```bash
# Install dependencies (auto-installs Git hooks)
pnpm install

# Development
pnpm tauri dev

# Build
pnpm tauri build

# Type checking
pnpm typecheck

# Lint and format
pnpm lint
pnpm format

# Commit with conventional format
pnpm commit

# Release new version
pnpm release
```

### MCP-Driven Development Workflow (强制执行)

**Phase 1 - Research (Context7 MCP)**:
在实施任何代码更改之前，必须使用 Context7 MCP 研究相关文档：

```bash
# 研究相关库和框架的最新文档
# 使用 mcp__context7__resolve-library-id 和 mcp__context7__get-library-docs
```

**Phase 2 - Implementation**:
基于文档研究和既定模式进行编码，遵循技术栈标准

**Phase 3 - Testing (Playwright MCP)**:
完成任何网页相关更改后，必须使用 Playwright MCP 验证实现：

```bash
# 启动开发服务器
pnpm tauri dev

# 使用 Playwright MCP 测试前端功能
# 使用 mcp__playwright__browser_* 工具进行浏览器自动化测试
```

**Phase 4 - Documentation**:
更新相关文档，添加中文注释，确保知识传承

## Architecture Overview

### Project Configuration

- **Package Manager**: pnpm (required)
- **Node.js**: v22.19.0 LTS (managed via nvm)
- **Frontend Dist**: `out/` (Next.js static export)
- **Tauri Config**: `src-tauri/tauri.conf.json`
- **Git Hooks**: Auto-installed via `prepare` script
- **MCP Servers**: Playwright MCP + Context7 MCP (项目级配置)

## Next.js App Router Architecture

### App Router File Conventions

**Special File Priority** (high to low):

1. `layout.tsx` - 布局组件，定义共享 UI
2. `page.tsx` - 页面组件，定义具体页面内容
3. `loading.tsx` - 加载状态，React Suspense 边界
4. `error.tsx` - 错误边界，处理运行时错误
5. `not-found.tsx` - 404 页面，处理未找到路由

**Component Types**:

- **Server Components**: 默认，用于数据获取和静态内容
- **Client Components**: 使用 `'use client'` 指令，用于交互性功能

### Tauri + Next.js Integration

**Tauri Configuration**:

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

**Package.json Scripts**:

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

### Backend (Tauri + Rust)

- **Framework**: Tauri 2.0.0
- **Language**: Rust 2021 edition
- **Location**: `src-tauri/`
- **Entry Point**: `src-tauri/src/main.rs` → `src-tauri/src/lib.rs`
- **Commands**: Defined in `lib.rs` with `#[tauri::command]` macro

## Key Development Patterns

### Tauri Command Pattern

Commands are defined in Rust with the `#[tauri::command]` macro and registered in the `invoke_handler`. Example from `template/src-tauri/src/lib.rs`:

```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// Register in builder
.invoke_handler(tauri::generate_handler![greet])
```

### Frontend-Backend Communication

React components call Rust commands using the `invoke` function:

```typescript
import { invoke } from '@tauri-apps/api/core'

const result = await invoke('greet', { name: 'World' })
```

### Next.js App Router + Tauri Integration

**Client Component Usage**:

```typescript
'use client'

import { invoke } from '@tauri-apps/api/core'
import { useState, useEffect } from 'react'

export default function GreetingComponent() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    invoke('greet', { name: 'Next.js + Tauri' })
      .then(setMessage)
  }, [])

  return <div>{message}</div>
}
```

**Server Component Limitations**:

- Server Components cannot directly call Tauri commands
- Use Client Components for Tauri interactions
- Server Components are for static content and data fetching

## Key Development Patterns

### Tauri Command Pattern

Commands are defined in Rust with the `#[tauri::command]` macro and registered in the `invoke_handler`. Example from `template/src-tauri/src/lib.rs`:

```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// Register in builder
.invoke_handler(tauri::generate_handler![greet])
```

### Frontend-Backend Communication

React components call Rust commands using the `invoke` function:

```typescript
import { invoke } from '@tauri-apps/api/core'

const result = await invoke('greet', { name: 'World' })
```

## Environment Requirements

### Development Environment

- **Node.js**: v22.19.0 LTS (via nvm)
- **pnpm**: v10.15.1 (package manager)
- **Rust**: 1.89.0 with cargo
- **WSL2**: Required for Windows development with GUI support

### System Dependencies (WSL2/Linux)

- `libwebkit2gtk-4.1-dev`
- `build-essential`
- `libxdo-dev`
- `libssl-dev`
- `libayatana-appindicator3-dev`
- `librsvg2-dev`

## Important Notes

- **Always use pnpm** - this is the mandated package manager for all projects
- **WSL2 GUI support** may be required for Windows development environments

## daisyUI + Tailwind CSS Implementation

### Critical Configuration Requirements

**daisyUI Configuration**:

- Uses `tailwind.config.js` file with daisyUI plugin
- PostCSS configuration uses `tailwindcss` and `autoprefixer` plugins
- CSS structure uses `@tailwind` directives

**Configuration Files**:

- `tailwind.config.js` - Main configuration with daisyUI plugin and themes
- `postcss.config.js` - PostCSS plugin configuration
- `src/index.css` - Custom styles and utilities

**daisyUI Setup in `tailwind.config.js`**:

```javascript
export default {
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark'],
    darkTheme: 'dark',
    themeRoot: ':root',
  },
}
```

### daisyUI Component System

**Built-in Components**:

- **Buttons**: `btn`, `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`
- **Cards**: `card`, `card-body`, `card-title`, `card-actions`
- **Inputs**: `input`, `input-bordered`, `input-primary`
- **Forms**: `form-control`, `label`, `label-text`
- **Alerts**: `alert`, `alert-info`, `alert-success`, `alert-warning`, `alert-error`
- **Layout**: `hero`, `navbar`, `footer`, `divider`

**Key Benefits**:

- Pre-built, accessible components with consistent styling
- No need for custom React component wrappers
- Semantic class names that are easy to understand
- Built-in dark mode support
- Responsive design out of the box

### Theme System

**daisyUI Themes**:

- Light and dark themes built-in
- Theme switching via `data-theme` attribute and CSS `dark` class (DaisyUI v5+)
- Consistent color tokens across themes
- Easy theme customization

**Theme Implementation**:

```javascript
// Theme switching in components (DaisyUI 5.x)
const toggleTheme = () => {
  const html = document.documentElement
  if (isDark) {
    html.classList.add('dark')
    html.setAttribute('data-theme', 'dark')
  } else {
    html.classList.remove('dark')
    html.setAttribute('data-theme', 'light')
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
}
```

**Theme Controller**:

```typescript
// Theme toggle button with DaisyUI 5.x theme-controller
<button className="btn btn-ghost btn-circle theme-controller" aria-label="切换主题">
  {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
</button>
```

**Features**:

- System preference detection via `prefers-color-scheme`
- localStorage persistence
- Automatic theme initialization
- Smooth theme transitions

### Component Usage Patterns

**Button Examples**:

```html
<button className="btn btn-primary">Primary Button</button>
<button className="btn btn-outline">Outline Button</button>
<button className="btn btn-ghost">Ghost Button</button>
```

**Card Examples**:

```html
<div className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <h2 className="card-title">Card Title</h2>
    <p className="text-base-content/70">Card content</p>
    <div className="card-actions">
      <button className="btn btn-primary">Action</button>
    </div>
  </div>
</div>
```

**Form Examples**:

```html
<div className="form-control">
  <label className="label">
    <span className="label-text">Username</span>
  </label>
  <input type="text" className="input input-bordered" />
</div>
```

### Color System

**daisyUI Color Tokens**:

- `primary` - Primary brand color
- `secondary` - Secondary color
- `accent` - Accent color for highlights
- `neutral` - Neutral colors for text and borders
- `base-100` - Background color
- `base-content` - Text color
- `info`, `success`, `warning`, `error` - Status colors

**Usage Examples**:

```html
<div className="bg-primary text-primary-content">Primary background</div>
<div className="text-base-content/70">Muted text</div>
<div className="border-neutral">Neutral border</div>
```

### Layout and Spacing

**daisyUI Layout Classes**:

- `container` - Responsive container
- `grid` - CSS Grid layouts
- `flex` - Flexbox layouts
- `divider` - Content separators
- `mockup-code` - Code display components

**Responsive Design**:

- Built-in responsive utilities
- Mobile-first approach
- Consistent breakpoint system

### Accessibility Features

**Built-in Accessibility**:

- All components follow ARIA guidelines
- Proper focus management
- Keyboard navigation support
- Screen reader compatibility

**Theme Accessibility**:

- Sufficient color contrast ratios
- Clear visual hierarchy
- Consistent focus indicators

### Performance Benefits

**Optimized CSS**:

- Tree-shaking for unused components
- Minimal CSS footprint
- Fast build times
- Optimized runtime performance

**Development Experience**:

- Rapid prototyping with pre-built components
- Consistent design system
- Easy customization and theming
- Excellent documentation

## Tauri 2.0 macOS Compatibility

### objc2 Debug Assertions Configuration

**Critical for macOS compatibility**: Tauri 2.0 requires disabling debug assertions for the `objc2` package to support older macOS versions. Add this configuration to `Cargo.toml`:

```toml
[profile.dev.package.objc2]
debug-assertions = false
```

**Why this is needed**:

- objc2 is the Rust binding to Objective-C runtime used by Tauri on macOS
- Debug assertions in objc2 can cause runtime errors on older macOS versions
- Disabling debug assertions maintains development functionality while ensuring compatibility
- This configuration does not affect production builds (release profile)

**Location**: Add this section in the root of `Cargo.toml`, typically after the `[package]` section and before or after other profile configurations.

## ESLint and Prettier Code Quality Configuration

### ESLint Configuration

The project uses ESLint for code quality and consistency. Configuration is in `template/eslint.config.js`:

**Key Plugins and Rules**:

- **JavaScript**: Base ESLint recommended rules
- **TypeScript**: @typescript-eslint plugin with recommended rules
- **React**: React and React Hooks specific rules
- **Prettier Integration**: eslint-config-prettier to avoid conflicts

**Notable Rules**:

- React JSX best practices (no React in scope, key requirements)
- TypeScript strictness (warn on explicit any, unused vars with \_ prefix)
- Custom globals for browser and Node.js APIs
- Disabled rules that conflict with modern patterns

**Commands**:

```bash
pnpm lint        # Check for issues
pnpm lint:fix    # Auto-fix issues
```

### Prettier Configuration

Prettier ensures consistent code formatting. Configuration is in `template/.prettierrc`:

**Formatting Rules**:

- No semicolons (`semi: false`)
- Single quotes (`singleQuote: true`)
- 2-space indentation (`tabWidth: 2`)
- ES5 trailing commas (`trailingComma: "es5"`)
- 100 character line length (`printWidth: 100`)
- LF line endings (`endOfLine: "lf"`)

**Commands**:

```bash
pnpm format        # Format all files
pnpm format:check  # Check if formatting is needed
```

### Development Workflow

**Recommended Process**:

1. Configure editor for format-on-save
2. Run `pnpm lint` and `pnpm format:check` before commits
3. Use `pnpm lint:fix` and `pnpm format` to fix issues

**VS Code Settings** (in `.vscode/settings.json`):

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

### Package Scripts

The template includes these quality scripts in `package.json`:

- `"lint": "eslint ."`
- `"lint:fix": "eslint . --fix"`
- `"format": "prettier --write ."`
- `"format:check": "prettier --check ."`
- `"typecheck": "tsc --noEmit"`

## Git Commit Conventions

The project uses conventional commits with automated enforcement:

### Commit Format

The project supports standard conventional commit format:

1. **Basic format**: `feat: 添加新功能`
2. **With scope**: `fix(ui): 修复按钮样式`
3. **Optional emoji**: `✨feat: 添加新功能` (emoji is optional but supported)

### Supported Commit Types

| Type     | Description    |
| -------- | -------------- |
| feat     | 新功能         |
| fix      | 修复 bug       |
| docs     | 文档更新       |
| style    | 代码格式调整   |
| refactor | 重构           |
| test     | 增加测试       |
| build    | 构建相关变动   |
| ci       | CI/CD 配置变动 |
| chore    | 其他修改       |
| revert   | 回滚           |

### Usage

```bash
# Interactive commit (recommended)
pnpm commit

# Manual commit (must follow format)
git commit -m "feat: add new feature"
git commit -m "fix(auth): fix login issue"
git commit -m "docs: update API documentation"

# The prepare script automatically installs Git hooks
pnpm install
```

### Hook Configuration

- **pre-commit**: Runs lint-staged to check and format staged files
- **commit-msg**: Validates commit message format with commitlint
- **Auto-install**: Hooks are automatically installed via `prepare` script
- **Scope support**: Optional scope in parentheses (e.g., `(ui)`, `(auth)`)

### Commitlint Configuration

The project uses standard commitlint configuration:

- Follows conventional commit format: `type(scope): subject`
- Maximum header length: 100 characters
- Enforces proper commit types and formatting

### Commitizen Configuration

Custom commitizen configuration (`cz-config.js`) provides:

- Interactive prompts for commit type, scope, and message
- Optional scope field for better change tracking
- Proper formatting according to conventional commits

## Claude Code MCP Configuration

This project includes project-level MCP (Model Context Protocol) server configuration for enhanced Claude Code capabilities.

### MCP Servers Configuration

The `.mcp.json` file contains project-scoped MCP server configurations:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {}
    },
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"],
      "env": {}
    }
  }
}
```

### Available MCP Servers

**Playwright MCP Server** (`playwright`):

- Provides browser automation and testing capabilities
- Enables web scraping, UI testing, and interaction with web pages
- Tools: `mcp__playwright__browser_*` for browser control

**Context7 MCP Server** (`context7`):

- Provides access to up-to-date library documentation
- Enables retrieving code examples and API references
- Tools: `mcp__context7__*` for documentation queries
- **API Key Required**: To enable Context7, modify `.mcp.json` to add your API key:
  ```json
  "args": ["-y", "@upstash/context7-mcp", "--api-key", "YOUR_API_KEY"]
  ```
- Get API key from: https://context7.com

### Usage

When working with this project in Claude Code, the MCP servers are automatically available:

```bash
# Check MCP server status (within Claude Code)
/mcp

# List available MCP tools
# MCP tools will be available as: mcp__playwright__* and mcp__context7__*
```

### Project-Scoped Configuration

The MCP configuration is project-scoped, meaning:

- Configuration is stored in `.mcp.json` in the project root
- Settings are checked into version control
- Available to all team members working on the project
- Claude Code will prompt for approval before using these servers

### Managing MCP Servers

```bash
# List configured servers
claude mcp list

# Add new project-scoped server
claude mcp add --scope project my-server /path/to/server

# Remove server
claude mcp remove my-server

# Reset project choices
claude mcp reset-project-choices
```

## MCP Usage Requirements and Workflow (强制执行)

当在此项目上使用 Claude Code 时，必须遵循以下 MCP 使用要求，以确保高质量、准确的代码实现。

### 强制性文档研究 (Context7 MCP) - 第一阶段

**在实施任何代码更改之前**，必须使用 Context7 MCP 研究相关文档：

**文档研究工作流程：**

1. **识别依赖项**: 确定与任务相关的库/框架
2. **查询 Context7**: 使用 Context7 MCP 工具获取最新文档
3. **研究示例**: 查看官方文档中的代码示例和 API 参考
4. **验证最佳实践**: 确保实施遵循当前最佳实践
5. **开始实施**: 只有在彻底的文档研究后才能开始编码

**必须研究场景：**

- **新功能**: 实施前研究所有涉及的库
- **错误修复**: 通过文档了解预期行为
- **重构**: 验证新方法和模式
- **库更新**: 研究新版本中的更改
- **API 集成**: 研究外部 API 文档
- **Next.js 功能**: 研究 Next.js 16 和 App Router 文档
- **Tauri 集成**: 研究 Tauri 2.0 API 文档

### 强制性网页相关测试 (Playwright MCP) - 第三阶段

**完成任何网页相关更改后**，必须使用 Playwright MCP 验证实现：

**网页测试工作流程：**

1. **启动开发服务器**: 确保应用程序运行 (`pnpm tauri dev`)
2. **导航到相关页面**: 使用浏览器导航到达受影响区域
3. **拍摄快照**: 捕获当前状态以进行视觉验证
4. **测试交互**: 点击按钮、填写表单、测试功能
5. **验证预期行为**: 确认更改按预期工作
6. **测试边缘情况**: 验证错误处理和边缘情况
7. **记录结果**: 确保测试结果被记录

**必须测试场景：**

- **UI 更改**: 测试视觉外观和用户交互
- **表单修改**: 验证表单验证和提交
- **导航更新**: 测试 Next.js App Router 路由和页面转换
- **组件更新**: 验证组件渲染和状态管理
- **API 集成**: 测试数据获取和错误处理
- **主题更改**: 验证深色/浅色模式功能
- **响应式设计**: 测试不同屏幕尺寸
- **Tauri 命令**: 测试前端与后端的通信

### 质量保证流程

**完整的 MCP 驱动开发周期：**

1. **规划阶段**:
   - 使用 Context7 研究所有要求
   - 记录实施方法
   - 识别潜在陷阱

2. **实施阶段**:
   - 基于文档研究进行代码实施
   - 遵循既定模式和最佳实践
   - 维护代码质量标准

3. **验证阶段**:
   - 使用 Playwright 测试网页相关更改
   - 验证功能满足要求
   - 测试边缘情况和错误条件

4. **文档阶段**:
   - 更新相关文档
   - 必要时添加代码注释
   - 记录任何破坏性更改

### MCP 工具使用指南

**Context7 MCP 最佳实践：**

- 在获取文档前始终解析库 ID
- 使用特定主题缩小搜索结果范围
- 查看多个代码示例（如果可用）
- 检查版本特定文档
- 跨多个源交叉引用信息

**Playwright MCP 最佳实践：**

- 始终从干净的浏览器状态开始
- 使用描述性元素引用
- 在更改前后拍摄快照
- 测试成功和失败场景
- 在适用情况下验证可访问性
- 测试后清理

### 示例工作流程：添加新功能

**第一步：使用 Context7 研究**

- 研究 React 组件模式和最佳实践
- 研究 Tauri API 文档以进行后端集成
- 研究 Next.js 16 和 App Router 文档
- 研究 Tailwind CSS 和 DaisyUI 文档以进行样式设计

**第二步：实施**

- 基于研究的文档编写代码
- 遵循既定模式
- 维护代码质量标准

**第三步：使用 Playwright 测试**

```bash
# 启动开发服务器
pnpm tauri dev

# 测试新功能
# 导航到应用程序
# 在更改前后拍摄快照
# 测试用户交互
# 验证功能按预期工作
```

**第四步：验证**

- 比较更改前后快照
- 验证所有功能按预期工作
- 测试边缘情况和错误条件
- 必要时更新文档
