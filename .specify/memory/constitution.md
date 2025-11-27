<!--
Sync Impact Report:
Version change: 3.0.0 → 3.1.0 (minor version - new development environment principle)
Modified principles: 新增开发环境路径管理原则
Added sections: 开发环境路径管理（不可协商）
Removed sections: N/A
Templates requiring updates: ✅ plan-template.md, ✅ spec-template.md, ✅ tasks-template.md
Follow-up TODOs: 需要检查其他speckit模板文件的一致性
-->

# Create Tauri App 双项目架构宪法

## 项目架构概述

本项目是一个复合架构项目，主项目内包含一个独立但紧密关联的模板子项目：

1. **主项目**: 基于 npx 的 Tauri 2 应用创建工具
2. **模板子项目**: 提供完整的 Tauri 2 + Next.js 桌面应用模板

主项目和子项目必须遵循相同的技术规范和质量标准，但具有不同的职责和开发重点。

## 核心原则

### I. 双项目架构原则（不可协商）

项目必须严格维护双架构分离：

- **主项目职责**: 提供 CLI 工具功能，支持交互式项目创建、模板复制、配置更新
- **模板子项目职责**: 提供生产就绪的 Tauri 2 + Next.js 应用模板
- **配置共享**: ESLint、Prettier、Husky、Git 提交规范必须在两个项目中保持一致
- **技术栈同步**: 两个项目使用相同的 pnpm 包管理器和核心开发工具版本

### II. 技术栈标准化（不可协商）

**主项目技术栈**：

- **运行时**: Node.js v22.19.0 LTS+（npx 工具要求）
- **CLI 框架**: Commander.js（交互式命令行界面）
- **文件操作**: fs-extra（文件系统操作）
- **包管理器**: pnpm（强制要求，用于依赖安装）

**模板子项目技术栈**：

- **前端框架**: React 19 + Next.js 16.0.3 + TypeScript 5.8.3+
- **后端框架**: Tauri 2.0 + Rust 1.89.0+
- **路由系统**: Next.js App Router（强制）
- **样式系统**: Tailwind CSS v3 + shadcn/ui + PostCSS
- **包管理器**: pnpm（强制要求）

### III. 统一代码质量标准（不可协商）

主项目和子项目必须配置相同的质量工具：

- **代码规范**: ESLint + Prettier 配置（主项目支持 Node.js + 模板文件）
- **Git 规范**: Husky hooks + 约定式提交（支持 emoji 和中文）
- **类型检查**: TypeScript 严格模式（模板项目）
- **构建验证**: 所有代码必须通过 `pnpm lint` 和 `pnpm format:check`
- **提交规范**: 使用 Commitizen 进行交互式中文提交

### IV. MCP 驱动开发流程（不可协商）

强制执行 MCP 驱动的开发流程：

- **研究阶段**: 实施前必须使用 Context7 MCP 研究所有技术库文档
- **验证阶段**: 实施后必须使用 Playwright MCP 测试所有前端相关功能
- **开发方法**: 必须遵循 SDD（Specification Driven Development）和测试驱动开发（TDD）
- **文档研究 → 实施 → 验证**周期严格执行
- **MCP 配置**: 主项目和模板项目都必须包含 .mcp.json 配置

### V. 模板子项目特殊要求（强制执行）

模板子项目必须满足以下特殊架构要求：

- **静态导出**: Next.js 必须配置 `output: 'export'` 禁用 SSR（Tauri 不支持服务端渲染）
- **图片优化**: 必须设置 `images: { unoptimized: true }` 适配静态导出
- **Tauri 集成**: 保持 Tauri 2.0 桌面应用完整集成
- **目录结构**: 严格遵循 Next.js App Router 文件约定
- **开发命令**: 提供 `pnpm tauri dev` 和 `pnpm tauri build` 标准命令

### VI. 主项目CLI工具要求（不可协商）

主项目 CLI 工具必须提供以下核心功能：

- **交互式创建**: 支持用户输入项目名称和配置选项
- **模板复制**: 智能过滤和复制模板文件（排除 node_modules、dist 等）
- **配置更新**: 自动更新 package.json、README.md 等配置文件
- **依赖安装**: 在创建的项目中自动运行 `pnpm install`
- **Git 初始化**: 可选的 Git 仓库初始化
- **调试支持**: 提供 DEBUG 模式用于故障排查

### VII. 中文优先沟通（不可协商）

除专业术语和源代码外，所有项目文档必须优先使用中文：

- **项目文档**: README.md、CLAUDE.md、技术文档
- **代码注释**: 所有注释使用中文
- **提交信息**: 约定式提交使用中文描述
- **用户交互**: CLI 工具提示信息使用中文
- **技术讨论**: 技术讨论和知识分享使用中文

## 双项目协同开发工作流

### 开发环境路径管理（不可协商）

开发时必须严格遵守目录路径约定：

- **主项目开发**: 在项目根目录进行主项目 CLI 工具的开发和测试
- **模板子项目开发**: 必须先进入 `template/` 目录，然后进行模板项目的开发和测试
- **路径切换**: 开发过程中需要明确当前所处的工作目录，避免误操作
- **命令执行**: 在正确的目录下执行对应的 `pnpm` 命令和开发工具
- **MCP 工具使用**: Context7 和 Playwright MCP 服务器需要在对应项目目录下启动

### 主项目开发工作流

**第一阶段 - 研究**：

- 使用 Context7 MCP 研究 Node.js CLI 工具最佳实践
- 研究 Commander.js、fs-extra 等依赖的最新文档
- 分析文件操作和模板引擎的实现方案

**第二阶段 - 实施**：

- 开发 CLI 命令行界面和交互逻辑
- 实现模板文件复制和配置更新功能
- 集成依赖安装和 Git 初始化流程

**第三阶段 - 验证**：

- 测试 CLI 工具创建新项目的完整流程
- 验证生成的项目结构和配置正确性
- 确认创建的项目可以正常运行 `pnpm tauri dev`

**第四阶段 - 文档**：

- 更新主项目的 README.md 和使用说明
- 更新 CLAUDE.md 中的开发指导
- 确保模板子项目的文档同步更新

### 模板子项目开发工作流

**第一阶段 - 研究**：

- 使用 Context7 MCP 研究 Next.js 16.0.3 和 Tauri 2.0 集成方案
- 研究最新的 React 19、TypeScript 5.8.3 特性
- 分析 Tailwind CSS + shadcn/ui 在 Next.js 环境下的最佳实践

**第二阶段 - 实施**：

- 更新模板项目的技术栈和依赖版本
- 实现 Next.js App Router 目录结构和页面
- 集成 Tauri 2.0 后端命令和桌面功能
- 配置深色/浅色主题切换系统

**第三阶段 - 验证**：

- 使用 Playwright MCP 测试所有 UI 功能和交互
- 验证 Next.js 应用在 Tauri 环境下的静态导出
- 测试桌面应用特有功能（窗口管理、系统托盘等）
- 验证跨平台兼容性

**第四阶段 - 文档**：

- 更新模板项目的 README.md 和开发指南
- 确保所有代码注释使用中文
- 更新 .mcp.json MCP 服务器配置

### 质量门控（适用于两个项目）

- **代码质量**: 所有更改必须通过 `pnpm lint` 和 `pnpm format:check`
- **文档研究**: 功能开发前必须完成 Context7 MCP 文档研究
- **功能测试**: 前端相关功能必须通过 Playwright MCP 自动化测试
- **MCP 配置**: 两个项目的 MCP 服务器必须配置并正常工作
- **同步验证**: 主项目创建的模板必须可以正常开发和构建

### 开发命令标准

**主项目命令**：

- `pnpm install` - 安装主项目依赖
- `pnpm create <app-name>` - 创建新的 Tauri 应用
- `pnpm lint` / `pnpm format` - 代码质量检查
- `pnpm commit` - 约定式提交（支持中文）

**模板子项目命令**（在 template 目录下）：

- `pnpm install` - 安装模板依赖
- `pnpm tauri dev` - 启动开发服务器（Next.js 热重载）
- `pnpm tauri build` - 构建生产版本
- `pnpm lint` / `pnpm format` - 代码质量检查
- `pnpm typecheck` - TypeScript 类型检查
- `pnpm commit` - 约定式提交（支持中文）

### 测试验证要求

**主项目测试**：

- **CLI 功能**: 测试项目创建、配置更新、依赖安装流程
- **文件操作**: 验证模板文件复制和过滤逻辑
- **错误处理**: 测试异常情况和用户输入验证
- **集成测试**: 验证创建的项目可以正常运行

**模板子项目测试**：

- **UI 交互**: React 组件渲染和用户交互测试
- **路由功能**: Next.js App Router 页面导航测试
- **主题系统**: 深色/浅色模式切换功能测试
- **Tauri 集成**: 桌面应用特有功能测试
- **构建流程**: 静态导出和桌面应用打包测试

## 项目间依赖管理

### 版本同步策略

- **共享依赖**: pnpm、ESLint、Prettier、Husky 版本必须保持一致
- **技术栈**: 模板项目的 React、Next.js、Tauri 版本需要定期评估更新
- **配置模板**: 主项目的文件模板需要与模板子项目的实际结构保持同步
- **文档同步**: 两个项目的 CLAUDE.md 和 README.md 需要保持信息一致性

### 发布流程

1. **模板子项目更新**：首先更新和测试模板子项目
2. **主项目适配**：更新主项目以支持新的模板功能
3. **集成测试**：使用主项目创建测试项目，验证完整流程
4. **文档更新**：同步更新两个项目的文档
5. **版本发布**：遵循语义化版本控制进行发布

## 治理

本宪法优先于所有其他开发实践；修正需要文档、批准和迁移计划；所有代码更改必须验证符合这些原则；使用各自的 CLAUDE.md 进行运行时开发指导。

**版本**: 3.1.0 | **制定日期**: 2025-01-15 | **最后修正**: 2025-11-15
