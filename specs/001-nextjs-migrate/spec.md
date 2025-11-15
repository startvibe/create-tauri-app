# Feature Specification: Template Next.js Migration

**Feature Branch**: `1-nextjs-migrate`
**Created**: 2025-11-16
**Status**: Draft
**Input**: User description: "现在需要按新的架构修改template子项目。原template子项目的构建系统使用的是vite，路由使用的是react-router，现在需要迁移到nextjs和nextjs的app router。要求迁移后，当前template模板项目的业务页面和功能不变。"

## Clarifications

### Session 2025-11-16

- Q: 如何测量构建时间性能基准？ → A: 使用相同硬件环境，5次干净构建取平均值测量
- Q: 哪些组件需要标记为客户端组件？ → A: 包含Tauri API调用、状态hooks、浏览器API、事件监听器的组件需要标记
- Q: 代码质量检查覆盖率包含哪些内容？ → A: 包括linting和formatting检查，不要求单元测试覆盖率

## User Scenarios & Testing _(mandatory)_

### User Story 1 - 开发者无缝迁移体验 (Priority: P1)

开发者在使用CLI工具创建新项目时，应该获得完全迁移到Next.js架构的模板项目，同时保持所有现有的业务功能和页面布局不变，无需额外的迁移工作。

**Why this priority**: 这是核心功能，直接影响开发者的使用体验和工具的可用性。

**Independent Test**: 可以通过创建新项目并验证所有页面正常显示和功能来独立测试。

**Acceptance Scenarios**:

1. **Given** 开发者使用CLI工具创建新项目，**When** 项目创建完成，**Then** 新项目使用Next.js 16.0.3 + App Router架构
2. **Given** 创建的项目，**When** 运行 `pnpm tauri dev`，**Then** 应用正常启动并显示首页
3. **Given** 运行的应用，**When** 访问所有路由页面，**Then** 所有页面布局和功能与原Vite版本完全一致

---

### User Story 2 - 构建和部署兼容性 (Priority: P1)

迁移后的模板项目必须保持与Tauri 2.0的完整兼容性，支持静态导出模式，确保桌面应用的正常构建和部署流程。

**Why this priority**: 这是模板项目的核心要求，直接影响生成应用的可用性。

**Independent Test**: 可以通过构建完整的桌面应用并验证所有功能正常来独立测试。

**Acceptance Scenarios**:

1. **Given** 迁移后的模板项目，**When** 运行 `pnpm tauri build`，**Then** 构建成功生成桌面应用
2. **Given** 构建的桌面应用，**When** 启动应用，**Then** 所有页面和交互功能正常工作
3. **Given** Next.js配置，**When** 检查静态导出设置，**Then** 配置符合Tauri桌面应用要求

---

### User Story 3 - 开发体验保持一致 (Priority: P2)

开发者在使用迁移后的模板项目进行开发时，应该获得与原Vite版本相同的开发体验，包括热重载、类型检查、代码格式化等功能。

**Why this priority**: 保证开发者的工作效率不受迁移影响。

**Independent Test**: 可以通过开发环境的功能测试来独立验证。

**Acceptance Scenarios**:

1. **Given** 开发环境，**When** 修改代码，**Then** 热重载功能正常工作
2. **Given** 开发过程，**When** 运行代码质量检查，**Then** ESLint和Prettier正常工作
3. **Given** TypeScript代码，**When** 进行类型检查，**Then** 类型系统正常工作

---

### Edge Cases

- 迁移过程中Tauri命令的集成方式需要特别处理，因为Next.js的服务端渲染特性与Tauri的静态导出要求存在冲突
- 国际化(i18n)功能在Next.js环境下的实现方式与React Router不同，需要重新适配
- 客户端组件和服务器组件的区分需要明确处理，特别是涉及Tauri API调用的部分

## Requirements _(mandatory)_

### Functional Requirements

- **FR-001**: 模板项目必须从Vite + React Router架构迁移到Next.js 16.0.3 + App Router架构
- **FR-002**: 所有现有页面（首页、仪表板、设置、用户管理）必须完整保留功能和布局
- **FR-003**: 必须配置Next.js静态导出模式以支持Tauri桌面应用
- **FR-004**: 国际化功能(i18next)必须在Next.js环境下正常工作
- **FR-005**: 主题切换(深色/浅色模式)功能必须保持完整
- **FR-006**: Tauri API集成必须与Next.js客户端组件正确配合
- **FR-007**: 所有React组件必须正确标记为客户端组件('use client')（包含Tauri API调用、状态hooks、浏览器API、事件监听器的组件需要标记）
- **FR-008**: 开发工具链(ESLint、Prettier、TypeScript)必须正常工作
- **FR-009**: 构建流程必须支持Tauri桌面应用的打包要求
- **FR-010**: 路由导航必须保持用户体验一致性
- **FR-011**: 迁移过程必须包含完整的备份策略和回滚机制

### Key Entities

- **Template Pages**: 首页、仪表板、设置页面、用户管理页面
- **Layout Components**: 应用布局组件、导航组件、主题切换组件
- **Configuration Files**: Next.js配置、Tauri配置、TypeScript配置
- **Build Artifacts**: 静态导出文件、桌面应用打包文件

## Success Criteria _(mandatory)_

### Measurable Outcomes

- **SC-001**: 迁移后的模板项目构建时间不超过原Vite版本的120%（使用相同硬件环境，5次干净构建取平均值测量）
- **SC-002**: 所有现有页面在迁移后保持100%的视觉和功能一致性（通过视觉回归测试和功能清单验证）
- **SC-003**: 开发环境热重载响应时间保持在1秒以内
- **SC-004**: 桌面应用启动时间不超过原版本的110%（从点击应用到首页完全渲染测量）
- **SC-005**: 代码质量检查(ESLint + Prettier)覆盖率达到100%（包括linting和formatting检查，不要求单元测试覆盖率）

### Compliance Criteria _(项目宪法要求)_

- **CC-001**: 双项目都必须通过 `pnpm lint` 和 `pnpm format:check` 验证
- **CC-002**: 实施前必须使用 Context7 MCP 研究所有相关库文档
- **CC-003**: Web 相关更改后必须使用 Playwright MCP 进行验证测试
- **CC-004**: 主项目和模板项目都必须包含完整的 MCP 服务器配置（Context7 + Playwright）
- **CC-005**: 主项目必须使用 Node.js CLI 技术栈，模板项目使用 TypeScript + Next.js 技术栈
- **CC-006**: 两个项目都必须配置 ESLint + Prettier + husky hooks 代码规范工具
- **CC-007**: 主项目功能必须专注于 npx CLI 工具，模板项目专注于 Tauri 2 + Next.js 应用模板
- **CC-008**: 必须遵循 SDD (Specification Driven Development) 和测试驱动开发
- **CC-009**: 主项目开发必须在根目录进行，模板项目开发必须在 `template/` 目录内进行
- **CC-010**: 模板项目技术栈必须符合 Tauri 2.0 + React 19 + Next.js 16.0.3 + Tailwind CSS + DaisyUI 5
- **CC-011**: 模板项目必须配置 Next.js 静态导出 (`output: 'export'`) 支持 Tauri 桌面应用
- **CC-012**: 所有文档、代码注释、用户交互和技术讨论必须使用中文（专业术语和源代码除外）
