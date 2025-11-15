---
description: 'Task list for Next.js migration feature implementation'
---

# Tasks: Template Next.js Migration

**Input**: Design documents from `/specs/001-nextjs-migrate/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Tests are NOT explicitly requested in the feature specification. Focus on functional validation and code quality checks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

本项目采用双项目架构，路径约定如下：

- **主项目 (npx 工具)**: 根目录直接包含 CLI 工具文件 (`create.js`, `package.json`)
- **模板子项目**: `template/` 目录包含完整的 Tauri 2 + Next.js 应用
- **模板源码**: `template/src/`, `template/src-tauri/`
- **配置文件**: 双项目共享的配置文件在根目录，模板特定配置在 `template/` 目录
- **文档**: `.specify/` 目录包含 Speckit 配置和模板文件

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 项目初始化和基本结构，为Next.js迁移做准备

- [ ] T001 创建迁移前的完整备份策略和回滚机制文档
- [ ] T002 测量当前Vite版本的构建时间基准（5次干净构建取平均值）
- [ ] T003 记录当前模板项目的所有功能和页面布局状态
- [ ] T004 创建迁移分支并确认当前工作目录在template/内开发
- [ ] T004-A 验证template目录结构完整性和开发环境准备状态
- [ ] T005 [P] 验证主项目和模板项目的代码质量工具配置正常工作
- [ ] T006 [P] 确认MCP服务器配置（Context7 + Playwright）完整可用

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 核心基础设施，必须在任何用户故事实现之前完成

**⚠️ CRITICAL**: 在此阶段完成之前，无法开始任何用户故事工作

- [ ] T007 卸载React Router相关依赖并安装Next.js 16.0.3
- [ ] T008 创建Next.js配置文件支持Tauri静态导出
- [ ] T009 更新TypeScript配置支持App Router
- [ ] T010 修改Tauri配置适配Next.js开发服务器和构建命令
- [ ] T011 创建Next.js App Router目录结构
- [ ] T012 迁移现有组件到新目录结构

**Checkpoint**: 基础设施准备就绪 - 用户故事实现现在可以开始

---

## Phase 3: User Story 1 - 开发者无缝迁移体验 (Priority: P1) 🎯 MVP

**Goal**: 开发者使用CLI工具创建新项目时，获得完全迁移到Next.js架构的模板项目，保持所有现有功能和页面布局

**Independent Test**: 创建新项目并验证所有页面正常显示和功能，构建时间不超过原版本120%，热重载响应时间<1秒

### MCP 研究阶段（强制） 🔍

> **NOTE: 实施前必须使用 Context7 MCP 研究所有相关库和框架**

**主项目CLI工具研究**:

- [ ] T013 [P] [US1] 使用 Context7 研究Commander.js CLI框架最佳实践
- [ ] T014 [P] [US1] 使用 Context7 研究fs-extra文件操作和模板引擎实现
- [ ] T015 [P] [US1] 使用 Context7 研究交互式命令行界面设计和用户输入处理
- [ ] T016 [P] [US1] 使用 Context7 研究pnpm包管理器在项目创建中的最佳实践

**Next.js迁移研究**:

- [ ] T017 [P] [US1] 使用 Context7 研究Vite到Next.js App Router迁移最佳实践
- [ ] T018 [P] [US1] 使用 Context7 研究Next.js静态导出与Tauri 2.0集成方案
- [ ] T019 [P] [US1] 使用 Context7 研究客户端组件标记规则和最佳实践

**国际化适配研究**:

- [ ] T020 [P] [US1] 使用 Context7 研究i18next在Next.js环境下的客户端集成
- [ ] T021 [P] [US1] 使用 Context7 研究Next.js中多语言资源加载和语言检测

### Implementation for User Story 1

**根布局和核心架构**:

- [ ] T022 [US1] 创建Next.js根布局在template/src/app/layout.tsx
- [ ] T023 [US1] 实现根布局metadata配置和HTML结构
- [ ] T024 [US1] 迁移AppLayout组件到template/src/app/components/app-layout.tsx
- [ ] T025 [US1] 适配AppLayout组件使用Next.js Link组件

**页面迁移**:

- [ ] T026 [P] [US1] 创建首页在template/src/app/page.tsx
- [ ] T027 [P] [US1] 创建仪表板页面在template/src/app/dashboard/page.tsx
- [ ] T028 [P] [US1] 创建用户管理页面在template/src/app/users/page.tsx
- [ ] T029 [P] [US1] 创建设置页面在template/src/app/settings/page.tsx

**组件适配**:

- [ ] T030 [P] [US1] 标记ThemeToggle组件为客户端组件并适配Next.js
- [ ] T031 [P] [US1] 标记LanguageToggle组件为客户端组件并适配Next.js
- [ ] T032 [P] [US1] 更新所有包含Tauri API调用的组件添加客户端组件指令
- [ ] T033 [P] [US1] 适配所有组件的导入路径和引用

**国际化集成**:

- [ ] T034 [P] [US1] 创建客户端i18n配置在template/src/app/i18n/client.ts
- [ ] T035 [P] [US1] 迁移i18n资源文件到template/src/app/i18n/
- [ ] T036 [P] [US1] 适配语言检测逻辑为客户端环境
- [ ] T037 [P] [US1] 验证所有多语言资源正确加载和切换

### MCP 验证阶段（强制） 🧪

> **NOTE: 实施后必须使用 Playwright MCP 测试所有 Web 相关更改**

- [ ] T038 [US1] 使用 Playwright 启动Next.js开发服务器并测试用户界面
- [ ] T039 [US1] 使用 Playwright 验证Next.js App Router路由功能正常
- [ ] T040 [US1] 使用 Playwright 验证所有页面布局与原版本一致
- [ ] T041 [US1] 使用 Playwright 测试用户交互和导航功能
- [ ] T042 [US1] 使用 Playwright 验证深色/浅色模式主题切换功能
- [ ] T043 [US1] 使用 Playwright 验证多语言切换功能正常工作
- [ ] T044 [US1] 验证Next.js与Tauri 2.0桌面应用集成
- [ ] T045 [US1] 运行 `pnpm lint` 和 `pnpm format:check` 验证代码质量
- [ ] T046 [US1] 测量迁移后构建时间并确认不超过原版本120%
- [ ] T047 [US1] 验证热重载响应时间保持在1秒以内

**Checkpoint**: 此时，用户故事 1 应该完全功能化且可独立测试

---

## Phase 4: User Story 2 - 构建和部署兼容性 (Priority: P1)

**Goal**: 迁移后的模板项目保持与Tauri 2.0的完整兼容性，支持静态导出模式

**Independent Test**: 运行 `pnpm tauri build` 成功生成桌面应用，启动应用后所有页面和交互功能正常

### Implementation for User Story 2

**构建配置优化**:

- [ ] T044 [P] [US2] 优化Next.js配置确保Tauri静态导出完全兼容
- [ ] T045 [P] [US2] 配置图片处理为unoptimized模式避免构建错误
- [ ] T046 [P] [US2] 确认assetPrefix配置在开发和生产环境正确工作
- [ ] T047 [P] [US2] 配置trailingSlash确保路由一致性

**Tauri集成验证**:

- [ ] T048 [P] [US2] 验证Tauri开发服务器与Next.js集成正常
- [ ] T049 [P] [US2] 测试Tauri命令在Next.js客户端组件中正确调用
- [ ] T050 [P] [US2] 验证静态导出输出目录与Tauri配置匹配
- [ ] T051 [P] [US2] 测试桌面应用启动时间不超过原版本110%

### MCP 验证阶段（强制） 🧪

- [ ] T052 [US2] 使用 Playwright 验证桌面应用构建和启动流程
- [ ] T053 [US2] 测试所有Tauri API调用在桌面环境中正常工作
- [ ] T054 [US2] 验证静态导出文件结构和内容正确
- [ ] T055 [US2] 确认桌面应用在不同平台（Windows/macOS/Linux）正常工作

**Checkpoint**: 此时，用户故事 2 应该完全功能化且可独立测试

---

## Phase 5: User Story 3 - 开发体验保持一致 (Priority: P2)

**Goal**: 开发者在使用迁移后的模板项目时，获得与原Vite版本相同的开发体验

**Independent Test**: 修改代码验证热重载功能，运行代码质量检查确认正常工作

### Implementation for User Story 3

**开发工具链适配**:

- [ ] T056 [P] [US3] 确认ESLint配置对Next.js项目正常工作
- [ ] T057 [P] [US3] 验证Prettier格式化在Next.js环境中正确
- [ ] T058 [P] [US3] 适配TypeScript配置支持Next.js类型检查
- [ ] T059 [P] [US3] 确认husky hooks在迁移后项目中正常工作

**开发体验优化**:

- [ ] T060 [P] [US3] 优化热重载配置确保开发服务器性能
- [ ] T061 [P] [US3] 配置适当的错误边界和开发时错误提示
- [ ] T062 [P] [US3] 确保开发环境的日志和调试信息清晰有用

### MCP 验证阶段（强制） 🧪

- [ ] T063 [US3] 使用 Playwright 验证开发环境热重载响应速度
- [ ] T064 [US3] 测试代码修改后的实时更新功能
- [ ] T065 [US3] 验证TypeScript类型检查和错误提示
- [ ] T066 [US3] 确认所有开发工具链命令正常工作

**Checkpoint**: 此时，用户故事 3 应该完全功能化且可独立测试

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: 影响多个用户故事的改进和最终验证

- [ ] T067 [P] 删除所有Vite和React Router相关文件
- [ ] T068 [P] 清理未使用的依赖和配置文件
- [ ] T069 [P] 更新template项目README.md文档反映新的Next.js架构
- [ ] T070 [P] 更新package.json描述和脚本说明
- [ ] T071 [P] 执行视觉回归测试确保100%视觉和功能一致性
- [ ] T072 [P] 运行完整的功能清单验证所有功能正常
- [ ] T073 [P] 执行性能基准测试确认所有成功标准达成
- [ ] T074 [P] 创建回滚文档说明如何恢复到Vite版本（如果需要）
- [ ] T075 [P] 验证所有MCP服务器配置在迁移后项目中正常工作

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 无依赖 - 可以立即开始
- **Foundational (Phase 2)**: 依赖Setup完成 - 阻塞所有用户故事
- **User Stories (Phase 3-5)**: 都依赖Foundational阶段完成
  - 用户故事可以按优先级顺序进行（P1 → P2 → P3）
  - 或者并行进行（如果有团队容量）
- **Polish (Final Phase)**: 依赖所有所需用户故事完成

### User Story Dependencies

- **User Story 1 (P1)**: 可以在Foundational之后开始 - 不依赖其他故事
- **User Story 2 (P1)**: 可以在Foundational之后开始 - 可能与US1集成但应独立测试
- **User Story 3 (P2)**: 可以在Foundational之后开始 - 可能与US1/US2集成但应独立测试

### Within Each User Story

- MCP研究必须在实际实施前完成
- 根布局和核心组件在页面迁移之前
- 页面迁移可以在组件适配后并行进行
- 国际化集成与页面组件迁移并行
- MCP验证必须在每个故事完成后进行

### Parallel Opportunities

- 所有Setup任务标记[P]可以并行运行
- 所有Foundational任务标记[P]可以在Phase 2内并行运行
- 一旦Foundational阶段完成，所有用户故事可以开始并行（如果团队容量允许）
- 页面迁移任务（T022-T025）可以并行运行
- 组件适配任务（T026-T028）可以并行运行
- 国际化集成任务（T030-T033）可以并行运行

---

## Parallel Example: User Story 1

```bash
# 并行启动所有页面迁移任务:
Task: "创建首页在template/src/app/page.tsx"
Task: "创建仪表板页面在template/src/app/dashboard/page.tsx"
Task: "创建用户管理页面在template/src/app/users/page.tsx"
Task: "创建设置页面在template/src/app/settings/page.tsx"

# 并行启动所有组件适配任务:
Task: "标记ThemeToggle组件为客户端组件并适配Next.js"
Task: "标记LanguageToggle组件为客户端组件并适配Next.js"
Task: "更新所有包含Tauri API调用的组件添加'use client'指令"
Task: "适配所有组件的导入路径和引用"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成Phase 1: Setup
2. 完成Phase 2: Foundational (CRITICAL - 阻塞所有故事)
3. 完成Phase 3: User Story 1
4. **停止并验证**: 独立测试User Story 1
5. 如果准备就绪，部署/演示

### Incremental Delivery

1. 完成Setup + Foundational → 基础准备就绪
2. 添加User Story 1 → 独立测试 → 部署/演示 (MVP!)
3. 添加User Story 2 → 独立测试 → 部署/演示
4. 添加User Story 3 → 独立测试 → 部署/演示
5. 每个故事都在不破坏先前故事的情况下增加价值

### 性能基准策略

1. 在Phase 1中测量当前Vite版本基准（T002）
2. 在User Story 1验证中测量Next.js版本性能（T042）
3. 在Polish阶段进行最终性能验证（T073）
4. 确保所有成功标准（SC-001到SC-005）达成

### 迁移安全策略

1. 在Phase 1中创建完整备份策略（T001）
2. 在Polish阶段创建回滚文档（T074）
3. 每个阶段完成后进行渐进验证
4. 保留回滚选项直到完全验证成功

---

## Notes

- [P] tasks = 不同文件，无依赖
- [Story] 标签将任务映射到特定用户故事以便追踪
- 每个用户故事应该可以独立完成和测试
- 在每个任务或逻辑组后提交
- 在任何检查点停止以独立验证故事
- 避免：模糊任务、同一文件冲突、破坏独立性的跨故事依赖
- MCP研究阶段强制执行 - 使用Context7和Playwright确保质量
- 性能基准测量是关键成功标准，必须严格执行
