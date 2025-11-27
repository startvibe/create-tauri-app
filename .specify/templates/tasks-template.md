---
description: 'Task list template for feature implementation'
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

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
- Paths shown below assume dual-project architecture - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] 配置双项目代码质量工具（ESLint + Prettier + Husky）
- [ ] T004 [P] 设置主项目和模板项目的 Claude Code 和 MCP 服务器配置（Playwright + Context7）
- [ ] T005 [P] 验证主项目使用 Node.js CLI 技术栈，模板项目使用 TypeScript + Next.js 技术栈
- [ ] T006 [P] 确保主项目作为 npx 工具提供标准化的项目创建接口
- [ ] T007 [P] 确保主项目专注于 CLI 工具功能，模板项目专注于 Tauri 2 + Next.js 应用模板
- [ ] T008 [P] 确保模板项目技术栈符合 Tauri 2.0 + React 19 + Next.js 16.0.3 + Tailwind CSS + shadcn/ui
- [ ] T009 [P] 确保 SDD (Specification Driven Development) 和测试驱动开发流程
- [ ] T010 [P] 确保开发环境路径管理：主项目在根目录开发，模板项目在template目录内开发
- [ ] T011 [P] 确保所有文档、代码注释、用户交互和技术讨论使用中文（专业术语和源代码除外）

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T004 Setup database schema and migrations framework
- [ ] T005 [P] Implement authentication/authorization framework
- [ ] T006 [P] Setup API routing and middleware structure
- [ ] T007 Create base models/entities that all stories depend on
- [ ] T008 Configure error handling and logging infrastructure
- [ ] T009 Setup environment configuration management

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) 🎯 MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### MCP 研究阶段（强制） 🔍

> **NOTE: 实施前必须使用 Context7 MCP 研究所有相关库和框架**

**主项目 CLI 工具研究**:

- [ ] T010 [P] [US1] 使用 Context7 研究 Node.js CLI 工具最佳实践和 Commander.js 框架
- [ ] T011 [P] [US1] 使用 Context7 研究 fs-extra 文件操作和模板引擎实现
- [ ] T012 [P] [US1] 使用 Context7 研究交互式命令行界面设计和用户输入处理

**模板子项目研究**:

- [ ] T013 [P] [US1] 使用 Context7 研究 Next.js 16.0.3 App Router 文档和静态导出配置
- [ ] T014 [P] [US1] 使用 Context7 研究 Tauri 2.0 API 文档和桌面应用集成
- [ ] T015 [P] [US1] 使用 Context7 研究 React 19 组件最佳实践和 TypeScript 5.8.3 特性
- [ ] T016 [P] [US1] 使用 Context7 研究 Tailwind CSS 和 shadcn/ui 样式指南
- [ ] T017 [P] [US1] 使用 Context7 研究 Next.js 与 Tauri 2.0 集成方案和静态导出要求

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T013 [P] [US1] Contract test for [endpoint] in tests/contract/test\_[name].py
- [ ] T014 [P] [US1] Integration test for [user journey] in tests/integration/test\_[name].py

### Implementation for User Story 1

- [ ] T015 [P] [US1] Create [Entity1] model in src/models/[entity1].py
- [ ] T016 [P] [US1] Create [Entity2] model in src/models/[entity2].py
- [ ] T017 [US1] Implement [Service] in src/services/[service].py (depends on T015, T016)
- [ ] T018 [US1] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T019 [US1] Add validation and error handling
- [ ] T020 [US1] Add logging for user story 1 operations

### MCP 验证阶段（强制） 🧪

> **NOTE: 实施后必须使用 Playwright MCP 测试所有 Web 相关更改**

- [ ] T021 [US1] 使用 Playwright 启动 Next.js 开发服务器并测试用户界面
- [ ] T022 [US1] 使用 Playwright 验证 Next.js App Router 路由功能
- [ ] T023 [US1] 使用 Playwright 验证用户交互和功能正常工作
- [ ] T024 [US1] 使用 Playwright 测试边界情况和错误处理
- [ ] T025 [US1] 验证深色/浅色模式主题切换功能
- [ ] T026 [US1] 验证 Next.js 与 Tauri 2.0 桌面应用集成
- [ ] T027 [US1] 运行 `pnpm lint` 和 `pnpm format:check` 验证代码质量

**Checkpoint**: 此时，用户故事 1 应该完全功能化且可独立测试

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Contract test for [endpoint] in tests/contract/test\_[name].py
- [ ] T019 [P] [US2] Integration test for [user journey] in tests/integration/test\_[name].py

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create [Entity] model in src/models/[entity].py
- [ ] T021 [US2] Implement [Service] in src/services/[service].py
- [ ] T022 [US2] Implement [endpoint/feature] in src/[location]/[file].py
- [ ] T023 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T024 [P] [US3] Contract test for [endpoint] in tests/contract/test\_[name].py
- [ ] T025 [P] [US3] Integration test for [user journey] in tests/integration/test\_[name].py

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create [Entity] model in src/models/[entity].py
- [ ] T027 [US3] Implement [Service] in src/services/[service].py
- [ ] T028 [US3] Implement [endpoint/feature] in src/[location]/[file].py

**Checkpoint**: All user stories should now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests (if requested) in tests/unit/
- [ ] TXXX Security hardening
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for [endpoint] in tests/contract/test_[name].py"
Task: "Integration test for [user journey] in tests/integration/test_[name].py"

# Launch all models for User Story 1 together:
Task: "Create [Entity1] model in src/models/[entity1].py"
Task: "Create [Entity2] model in src/models/[entity2].py"
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
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
