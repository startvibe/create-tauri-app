# Implementation Plan: 简化模板首页

**Branch**: `002-simplify-template-homepage` | **Date**: 2025-11-18 | **Spec**: [简化模板首页](./spec.md)
**Input**: Feature specification from `/specs/002-simplify-template-homepage/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

简化Tauri模板首页，移除多余页面（dashboard、settings、users），只保留核心首页展示。实现中英文双语切换、深色/浅色主题切换功能，支持自动跟随系统主题。提供干净简洁的模板项目，方便开发者直接进行业务开发。

## Technical Context

**Language/Version**: TypeScript 5.8.3+, JavaScript ES2022, Rust 1.89.0+
**Primary Dependencies**: React 19, Next.js 16.0.3, Tauri 2.0, Tailwind CSS v3, DaisyUI 5, react-i18next, lucide-react
**Storage**: localStorage (用户偏好设置) + JSON文件 (多语言资源)
**Testing**: Playwright MCP (UI测试), 内置Tauri测试框架
**Target Platform**: Windows, macOS, Linux (Tauri桌面应用)
**Project Type**: web (Tauri + Next.js 混合架构)
**Performance Goals**: 3秒主题切换, 5秒语言切换, 2秒应用启动, WCAG 2.1 AA级可访问性
**Constraints**: Next.js静态导出模式, <2秒启动时间, 100%双语支持, 代码减少40%+
**Scale/Scope**: 单页面应用, 简化UI组件, 优化用户体验

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

✅ **双项目架构原则**: 明确区分主项目（npx CLI工具）和模板子项目（Tauri应用模板）职责
✅ **技术栈标准化**: 遵循主项目Node.js CLI和模板子项目Tauri 2.0+Next.js 16.0.3技术栈要求
✅ **统一代码质量标准**: 两个项目都配置ESLint + Prettier + husky hooks，支持中文提交
✅ **MCP驱动开发**: 已使用Context7研究所有依赖库，执行SDD和测试驱动开发
✅ **开发环境路径管理**: 明确主项目在根目录开发，模板子项目在template目录内开发
✅ **模板子项目特殊要求**: 配置Next.js静态导出，支持Tauri桌面应用集成
✅ **主项目CLI工具要求**: 主项目提供交互式创建、模板复制、配置更新核心功能
✅ **项目间协同**: 考虑版本同步和依赖管理，使用pnpm统一包管理
✅ **中文优先沟通**: 所有文档、代码注释、用户交互和技术讨论使用中文

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

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation                  | Why Needed         | Simpler Alternative Rejected Because |
| -------------------------- | ------------------ | ------------------------------------ |
| [e.g., 4th project]        | [current need]     | [why 3 projects insufficient]        |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient]  |
