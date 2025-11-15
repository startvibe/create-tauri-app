# Implementation Plan: [FEATURE]

**Branch**: `[###-feature-name]` | **Date**: [DATE] | **Spec**: [link]
**Input**: Feature specification from `/specs/[###-feature-name]/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

[Extract from feature spec: primary requirement + technical approach from research]

## Technical Context

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**Language/Version**: [e.g., Python 3.11, Swift 5.9, Rust 1.75 or NEEDS CLARIFICATION]  
**Primary Dependencies**: [e.g., FastAPI, UIKit, LLVM or NEEDS CLARIFICATION]  
**Storage**: [if applicable, e.g., PostgreSQL, CoreData, files or N/A]  
**Testing**: [e.g., pytest, XCTest, cargo test or NEEDS CLARIFICATION]  
**Target Platform**: [e.g., Linux server, iOS 15+, WASM or NEEDS CLARIFICATION]
**Project Type**: [single/web/mobile - determines source structure]  
**Performance Goals**: [domain-specific, e.g., 1000 req/s, 10k lines/sec, 60 fps or NEEDS CLARIFICATION]  
**Constraints**: [domain-specific, e.g., <200ms p95, <100MB memory, offline-capable or NEEDS CLARIFICATION]  
**Scale/Scope**: [domain-specific, e.g., 10k users, 1M LOC, 50 screens or NEEDS CLARIFICATION]

## Constitution Check

_GATE: Must pass before Phase 0 research. Re-check after Phase 1 design._

- 双项目架构原则：此功能是否明确区分主项目（npx工具）和模板子项目的职责？
- 技术栈标准化：是否遵循主项目Node.js CLI和模板子项目Tauri 2+Next.js的技术栈要求？
- 统一代码质量标准：两个项目是否都配置ESLint + Prettier + husky hooks？是否都支持中文提交？
- MCP驱动开发：是否已使用Context7研究所有依赖库？是否执行SDD和测试驱动开发？
- 开发环境路径管理：是否明确主项目在根目录开发，模板子项目必须在template目录内开发？
- 模板子项目特殊要求：模板是否配置Next.js静态导出？是否支持Tauri桌面应用集成？
- 主项目CLI工具要求：主项目是否提供交互式创建、模板复制、配置更新等核心功能？
- 项目间协同：是否考虑主项目和模板子项目的版本同步和依赖管理？
- 中文优先沟通：所有文档、代码注释、用户交互和技术讨论是否使用中文？

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
