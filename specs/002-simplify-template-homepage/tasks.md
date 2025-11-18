---
description: 'Task list template for feature implementation'
---

# Tasks: 简化模板首页

**Input**: Design documents from `/specs/002-simplify-template-homepage/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

本项目采用双项目架构，路径约定如下：

- **主项目 (npx 工具)**: 根目录直接包含 CLI 工具文件 (`create.js`, `package.json`)
- **模板子项目**: `template/` 目录包含完整的 Tauri 2 + Next.js 应用
- **模板源码**: `template/src/`, `template/src-tauri/`
- **配置文件**: 双项目共享的配置文件在根目录，模板特定配置在 `template/` 目录
- **文档**: `.specify/` 目录包含 Speckit 配置和模板文件
- Paths shown below assume dual-project architecture - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 验证当前模板项目结构，确保基于 Tauri 2 + Next.js 16 + React 19 + TypeScript 5.8.3
- [x] T002 [P] 检查并更新模板项目依赖版本：React 19, Next.js 16.0.3, Tauri 2.0, Tailwind CSS v3, DaisyUI 5
- [x] T003 [P] 配置双项目代码质量工具（ESLint + Prettier + Husky）
- [x] T004 [P] 设置主项目和模板项目的 Claude Code 和 MCP 服务器配置（Playwright + Context7）
- [x] T005 [P] 确保主项目使用 Node.js CLI 技术栈，模板项目使用 TypeScript + Next.js 技术栈
- [x] T006 [P] 确保主项目作为 npx 工具提供标准化的项目创建接口
- [x] T007 [P] 确保主项目专注于 CLI 工具功能，模板项目专注于 Tauri 2 + Next.js 应用模板
- [x] T008 [P] 确保模板项目技术栈符合 Tauri 2.0 + React 19 + Next.js 16.0.3 + Tailwind CSS + DaisyUI 5
- [x] T009 [P] 确保 SDD (Specification Driven Development) 和测试驱动开发流程
- [x] T010 [P] 确保开发环境路径管理：主项目在根目录开发，模板项目在template目录内开发
- [x] T011 [P] 确保所有文档、代码注释、用户交互和技术讨论使用中文（专业术语和源代码除外）

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T012 创建模板项目基础目录结构：template/src/app/components/, template/src/app/i18n/, template/src/hooks/
- [x] T013 [P] 设置 Next.js 16.0.3 静态导出配置：template/next.config.js (output: 'export', images: unoptimized)
- [x] T014 [P] 配置 Tailwind CSS + DaisyUI 5 主题系统：template/tailwind.config.js
- [x] T015 [P] 创建全局样式系统：template/src/app/globals.css (CSS自定义属性和主题变量)
- [x] T016 创建根布局组件：template/src/app/layout.tsx
- [x] T017 [P] 创建错误边界组件：template/src/app/components/error-boundary.tsx
- [x] T018 [P] 设置TypeScript配置：template/tsconfig.json (严格模式，路径映射)
- [x] T019 创建基础Hooks目录结构：template/src/hooks/

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 清晰的首页展示 (Priority: P1) 🎯 MVP

**Goal**: 提供设计精美的首页，展示项目介绍信息和主要特性

**Independent Test**: 启动应用并验证首页内容完整性 - 页面加载正常、内容显示正确、所有关键信息（项目标题、描述、特性列表）都可见，布局响应式适配不同屏幕尺寸

### MCP 研究阶段（强制） 🔍

> **NOTE: 实施前必须使用 Context7 MCP 研究所有相关库和框架**

**模板子项目研究**:

- [x] T020 [P] [US1] 使用 Context7 研究 Next.js 16.0.3 App Router 文档和静态导出配置
- [x] T021 [P] [US1] 使用 Context7 研究 React 19 组件最佳实践和 TypeScript 5.8.3 特性
- [x] T022 [P] [US1] 使用 Context7 研究 Tailwind CSS 和 DaisyUI 5 样式指南
- [x] T023 [P] [US1] 使用 Context7 研究 Next.js 与 Tauri 2.0 集成方案和静态导出要求
- [x] T024 [P] [US1] 使用 Context7 研究响应式设计和可访问性最佳实践

### Implementation for User Story 1

- [x] T025 [P] [US1] 创建首页主组件：template/src/app/page.tsx
- [x] T026 [P] [US1] 创建首页布局组件：template/src/app/components/home-page.tsx
- [x] T027 [P] [US1] 创建特性展示组件：template/src/app/components/features-section.tsx
- [x] T028 [P] [US1] 创建Hero区域组件：template/src/app/components/hero-section.tsx
- [x] T029 [US1] 实现首页响应式布局和样式
- [x] T030 [US1] 添加滚动效果和交互状态
- [x] T031 [US1] 集成组件到首页：template/src/app/page.tsx

### MCP 验证阶段（强制） 🧪

> **NOTE: 实施后必须使用 Playwright MCP 测试所有 Web 相关更改**

- [x] T032 [US1] 使用 Playwright 启动 Next.js 开发服务器并测试首页加载
- [x] T033 [US1] 使用 Playwright 验证首页内容显示正确
- [x] T034 [US1] **使用 Playwright 测试响应式布局在不同屏幕尺寸下的表现**：
  - 测试移动设备视图 (375px - 640px)
  - 测试平板设备视图 (768px - 1024px)
  - 测试桌面设备视图 (1024px+)
  - 验证特性卡片布局变化 (1列 → 2列 → 3列)
  - 验证导航栏适应性调整
- [x] T035 [US1] 使用 Playwright 验证滚动效果和用户交互
- [x] T036 [US1] 运行 `pnpm lint` 和 `pnpm format:check` 验证代码质量

**Checkpoint**: 此时，用户故事 1 应该完全功能化且可独立测试

---

## Phase 4: User Story 2 - 主题切换功能 (Priority: P1)

**Goal**: 实现亮色/暗色主题切换，支持自动跟随系统主题

**Independent Test**: 点击主题切换按钮验证界面样式变化 - 按钮功能正常、主题正确切换、设置能够持久化保存，应用重启后自动恢复设置

### MCP 研究阶段（强制） 🔍

- [x] T037 [P] [US2] 使用 Context7 研究 CSS 自定义属性和现代浏览器兼容性
- [x] T038 [P] [US2] 使用 Context7 研究系统主题检测 API 和媒体查询
- [x] T039 [P] [US2] 使用 Context7 研究事务性主题切换实现模式

### Implementation for User Story 2

- [x] T040 [P] [US2] 创建主题切换 Hook：template/src/hooks/use-theme.ts
- [x] T041 [P] [US2] 创建主题配置文件：template/src/app/config/themes.ts
- [x] T042 [P] [US2] 创建主题切换组件：template/src/app/components/theme-toggle.tsx
- [x] T043 [US2] 实现主题状态管理和 localStorage 持久化
- [x] T044 [P] [US2] 实现系统主题检测：使用 `window.matchMedia('(prefers-color-scheme: dark)')` 检测系统主题
- [x] T045 [P] [US2] 实现主题变化监听器：监听系统主题变化事件并自动切换
- [x] T046 [P] [US2] 添加手动覆盖功能：允许用户临时禁用自动跟随系统主题
- [x] T047 [US2] 实现事务性主题切换和错误处理
- [x] T048 [US2] 集成主题切换组件到布局：template/src/app/layout.tsx

### MCP 验证阶段（强制） 🧪

- [x] T049 [US2] 使用 Playwright 测试主题切换功能
- [x] T050 [US2] 使用 Playwright 验证自动跟随系统主题
- [x] T051 [US2] 使用 Playwright 测试主题设置的持久化
- [x] T052 [US2] 使用 Playwright 测试错误处理和边缘情况
- [x] T053 [US2] 运行 `pnpm lint` 和 `pnpm format:check` 验证代码质量

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - 语言切换功能 (Priority: P1)

**Goal**: 实现中文/英文语言切换，支持动态加载和错误处理

**Independent Test**: 选择不同语言验证界面文本变化 - 语言切换正常工作、文本翻译准确、设置能够持久化保存，应用重启后自动恢复语言设置

### MCP 研究阶段（强制） 🔍

- [x] T052 [P] [US3] 使用 Context7 研究 Next.js 16.0.3 的 i18n 配置和优化方案
- [x] T053 [P] [US3] 使用 Context7 研究多语言资源加载性能和错误处理策略

### Implementation for User Story 3

- [x] T054 [P] [US3] 创建翻译资源文件：template/src/app/i18n/locales/zh.json
- [x] T055 [P] [US3] 创建翻译资源文件：template/src/app/i18n/locales/en.json
- [x] T056 [P] [US3] 创建国际化 Hook：template/src/hooks/use-translation.ts
- [x] T057 [P] [US3] 创建语言切换组件：template/src/app/components/language-toggle.tsx
- [x] T058 [P] [US3] 实现语言状态管理和 localStorage 持久化
- [x] T059 [P] [US3] 实现翻译资源动态加载和错误处理
- [x] T060 [US3] 更新首页组件使用翻译文本：template/src/app/components/home-page.tsx
- [x] T061 [US3] 集成语言切换组件到布局：template/src/app/layout.tsx

### MCP 验证阶段（强制） 🧪

- [x] T062 [US3] 使用 Playwright 测试语言切换功能
- [x] T063 [US3] 使用 Playwright 验证翻译资源加载
- [x] T064 [US3] 使用 Playwright 测试错误处理和边缘情况
- [x] T065 [US3] 使用 Playwright 验证语言设置持久化
- [x] T066 [US3] 运行 `pnpm lint` 和 `pnpm format:check` 验证代码质量

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - 移除多余页面和功能 (Priority: P2)

**Goal**: 移除dashboard、settings、users等多余页面，只保留核心首页功能

**Independent Test**: 验证应用中不存在多余页面和功能 - 路由简化、导航栏只显示必要项、相关文件已清理，尝试访问多余页面URL时自动重定向到首页

### Implementation for User Story 4

- [x] T067 [P] [US4] 备份现有模板项目（如果需要保留）
- [x] T068 [P] [US4] 移除指定页面组件：删除 `template/src/app/dashboard/`, `template/src/app/settings/`, `template/src/app/users/` 目录
- [x] T069 [P] [US4] 清理路由配置：移除已删除页面的路由定义和导航链接
- [x] T070 [P] [US4] 实现重定向功能：配置访问已移除页面时自动重定向到首页
- [x] T071 [P] [US4] 移除不需要的依赖和配置
- [x] T072 [P] [US4] 更新导航组件，只保留必要的首页链接
- [x] T073 [P] [US4] 清理项目结构，移除多余文件和目录
- [x] T074 [P] [US4] 更新 package.json 移除不需要的依赖
- [x] T075 [US4] 验证项目结构和功能完整性

### MCP 验证阶段（强制） 🧪

- [x] T076 [US4] 使用 Playwright 验证多余页面已被移除
- [x] T077 [US4] 使用 Playwright 测试 URL 重定向功能
- [x] T078 [US4] 使用 Playwright 验证应用功能完整性
- [x] T079 [US4] 运行 `pnpm lint` 和 `pnpm format:check` 验证代码质量
- [x] T080 [US4] 运行 `pnpm tauri dev` 验证应用正常启动

**Checkpoint**: 项目简化完成，只保留核心首页功能

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T080 [P] **执行代码行数统计和减少目标验证**：
  - 统计当前项目总代码行数作为基准
  - 识别并移除dashboard、settings、users相关代码
  - 确保代码减少至少达到40%的目标
- [x] T081 [P] 优化主题切换性能，确保切换时间 < 300ms
- [x] T082 [P] 优化语言切换性能，确保切换时间 < 500ms
- [x] T083 [P] 添加可访问性支持和键盘导航
- [x] T084 [P] 实现高对比度模式支持
- [x] T085 [P] 优化首屏加载性能，确保加载时间 < 2秒
- [x] T086 [P] 添加加载状态和骨架屏
- [x] T087 [P] 完善错误处理和用户反馈
- [x] T088 [P] 更新项目文档：template/README.md, template/CLAUDE.md
- [x] T089 [P] 验证 WCAG 2.1 AA 可访问性标准
- [x] T090 [P] 运行完整的代码质量检查和性能测试

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P1 → P1 → P2)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Integrates with layout but independently testable
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - Integrates with all components but independently testable
- **User Story 4 (P2)**: Can start after all P1 stories complete - Removes unused components and pages

### Within Each User Story

- MCP Research MUST be completed before implementation
- Hooks before components
- Components before integration
- Core implementation before testing
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- MCP Research tasks for each user story can run in parallel
- Component creation within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all MCP research tasks for User Story 1 together:
Task: "使用 Context7 研究 Next.js 16.0.3 App Router 文档和静态导出配置"
Task: "使用 Context7 研究 React 19 组件最佳实践和 TypeScript 5.8.3 特性"
Task: "使用 Context7 研究 Tailwind CSS 和 DaisyUI 5 样式指南"
Task: "使用 Context7 研究 Next.js 与 Tauri 2.0 集成方案和静态导出要求"
Task: "使用 Context7 研究响应式设计和可访问性最佳实践"

# Launch all component creation tasks for User Story 1 together:
Task: "创建首页主组件：template/src/app/page.tsx"
Task: "创建首页布局组件：template/src/app/components/home-page.tsx"
Task: "创建特性展示组件：template/src/app/components/features-section.tsx"
Task: "创建Hero区域组件：template/src/app/components/hero-section.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Complete Polish & Cross-Cutting Concerns
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (首页展示)
   - Developer B: User Story 2 (主题切换)
   - Developer C: User Story 3 (语言切换)
3. Stories complete and integrate independently
4. Team completes User Story 4 together (清理工作)
5. Team completes Polish phase together

---

## Task Summary

**Total Tasks**: 93

- **Phase 1 (Setup)**: 11 tasks
- **Phase 2 (Foundational)**: 8 tasks
- **Phase 3 (User Story 1)**: 15 tasks
- **Phase 4 (User Story 2)**: 15 tasks
- **Phase 5 (User Story 3)**: 15 tasks
- **Phase 6 (User Story 4)**: 13 tasks
- **Phase 7 (Polish)**: 13 tasks

**Parallel Opportunities**: 65+ tasks marked [P]
**MVP Scope**: Phases 1-3 (36 tasks) - 完整的首页展示功能
**Critical Path**: Phase 2 (Foundational) → Any User Story

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- MCP research and testing phases are MANDATORY for this project
- Follow SDD (Specification Driven Development) workflow
- Ensure all code quality checks pass before moving to next phase
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
