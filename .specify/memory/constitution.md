<!--
Sync Impact Report:
Version change: 1.2.0 → 2.0.0 (major version - fundamental principle redefinition)
Modified principles: 所有原则重新定义为模板项目导向
Added sections: 全新模板项目开发原则
Removed sections: 原有工具导向原则
Templates requiring updates: ✅ plan-template.md, ✅ spec-template.md, ✅ tasks-template.md
Follow-up TODOs: None
-->

# Tauri + Next.js 模板项目宪法

## 核心原则

### I. 技术栈标准化（不可协商）

项目必须使用以下标准技术栈：

- **前端框架**: React 19 + TypeScript 5.8.3+
- **后端框架**: Tauri 2.0 + Rust 1.89.0+
- **构建工具**: Vite 7.0.4（迁移到 Next.js 16.0.3）
- **路由系统**: React Router（迁移到 Next.js App Router）
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

### IV. Next.js 迁移原则（强制执行）

项目必须从 Vite + React Router 迁移到 Next.js 16.0.3：

- **迁移模式**: 使用 Next.js App Router 模式
- **Tauri 集成**: 保持 Tauri 2.0 桌面应用完整集成
- **样式兼容**: 确保 Tailwind CSS + DaisyUI 5 在 Next.js 环境下正常工作
- **迁移研究**: 必须使用 Context7 MCP 查询 Next.js 16.0.3 最新文档
- **功能验证**: 使用 Playwright MCP 验证迁移后功能完整性

### V. MCP 配置标准（不可协商）

项目必须包含 Claude Code 和 MCP 服务器配置：

- **Playwright MCP**: 用于前端自动化测试
- **Context7 MCP**: 用于技术文档查询和研究
- **项目级配置**: 所有 MCP 配置必须检查到版本控制
- **开发工作流**: MCP 工具必须集成到日常开发流程

### VI. 测试驱动开发（不可协商）

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

## 治理

本宪法优先于所有其他开发实践；修正需要文档、批准和迁移计划；所有代码更改必须验证符合这些原则；使用 CLAUDE.md 进行运行时开发指导。

**版本**: 2.0.0 | **制定日期**: 2025-01-15 | **最后修正**: 2025-11-15
