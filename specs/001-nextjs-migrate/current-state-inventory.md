# 模板项目当前状态清单

**创建日期**: 2025-11-16
**目的**: 记录迁移前模板项目的完整功能和页面布局状态
**架构**: Vite 7.0.4 + React Router 7.9.2 + React 19.1.1 + TypeScript 5.8.3
**构建时间基准**: 2秒 (5次干净构建平均值)

## 1. 项目概览

### 技术栈详情

- **构建工具**: Vite 7.0.4
- **路由系统**: React Router 7.9.2 (文件系统路由)
- **前端框架**: React 19.1.0 + TypeScript 5.8.3
- **桌面框架**: Tauri 2.0.0
- **样式框架**: Tailwind CSS 3.4.1 + DaisyUI 5.0.38
- **国际化**: i18next 25.5.2 + react-i18next 16.0.0
- **包管理器**: pnpm 10.15.1

### 目录结构

```
template/
├── src/
│   ├── components/           # 共享组件
│   │   ├── app-layout.tsx    # 应用布局组件
│   │   ├── theme-toggle.tsx  # 主题切换组件
│   │   └── language-toggle.tsx # 语言切换组件
│   ├── routes/              # 页面组件 (React Router 文件系统路由)
│   │   ├── _index.tsx        # 首页
│   │   ├── dashboard.tsx     # 仪表板页面
│   │   ├── users.tsx         # 用户管理页面
│   │   └── settings.tsx      # 设置页面
│   ├── i18n/                # 国际化配置
│   │   ├── resources.ts     # 语言资源导出
│   │   └── locales/         # 语言文件目录
│   │       ├── zh-CN/       # 简体中文
│   │       └── en-US/       # 英文
│   ├── entry.client.tsx     # 客户端入口
│   ├── entry.server.tsx     # 服务器端入口
│   ├── root.tsx             # 根组件
│   ├── routes.ts            # 路由配置
│   └── vite-env.d.ts        # Vite 环境类型定义
├── src-tauri/              # Tauri 后端 (Rust)
├── public/                 # 静态资源
└── 配置文件 (vite.config.ts, tailwind.config.js, 等)
```

## 2. 页面功能详细分析

### 2.1 首页 (`/` - `src/routes/_index.tsx`)

**功能特性**:

- Tauri API 集成: 使用 `invoke('greet', { name })` 调用 Rust 后端
- 交互式问候功能: 输入姓名并获取个性化问候
- 国际化支持: 使用 `useTranslation('home')` 和 `useTranslation('common')`
- 响应式布局: 使用 Tailwind CSS 和 DaisyUI 组件

**UI 组件**:

- 标题区域: 大标题 + 副标题
- 问候卡片: 输入框 + 按钮 + 成功消息显示
- 功能展示卡片: 3列网格布局展示性能、安全、现代化特性

**布局结构**:

```
AppLayout
└── Container
    ├── 标题区域 (text-center)
    ├── 问候卡片 (card shadow-xl)
    └── 功能网格 (grid grid-cols-1 md:grid-cols-3 gap-4)
        ├── 性能卡片 (card shadow-lg)
        ├── 安全卡片 (card shadow-lg)
        └── 现代化卡片 (card shadow-lg)
```

**状态管理**:

- `greetMsg`: 问候消息状态
- `name`: 用户输入状态

### 2.2 仪表板页面 (`/dashboard` - `src/routes/dashboard.tsx`)

**功能特性**:

- 统计数据展示: 用户数、项目数、任务数
- 最近活动时间线: 系统事件实时展示
- 数据可视化: 使用颜色编码的状态指示器

**UI 组件**:

- 页面标题: 仪表板标题 + 描述
- 统计卡片网格: 3列响应式布局
- 活动时间线卡片: 带状态指示器的活动列表

**布局结构**:

```
AppLayout
└── Container
    ├── 页面标题区域
    └── 内容区域
        ├── 统计网格 (grid grid-cols-1 md:grid-cols-3)
        │   ├── 用户统计 (card-title text-primary)
        │   ├── 项目统计 (card-title text-secondary)
        │   └── 任务统计 (card-title text-accent)
        └── 最近活动卡片
            └── 活动列表 (space-y-2)
                ├── 新用户注册 (w-2 h-2 bg-success)
                ├── 项目更新 (w-2 h-2 bg-warning)
                └── 系统维护 (w-2 h-2 bg-info)
```

**静态数据**:

- 用户数: 1234
- 项目数: 56
- 任务数: 89
- 活动记录: 3条示例活动

### 2.3 用户管理页面 (`/users` - `src/routes/users.tsx`)

**功能特性**:

- 用户列表展示: 表格形式展示用户信息
- 状态管理: 活跃/未活跃状态显示
- 操作按钮: 查看、编辑用户信息
- 添加用户功能: 页面右上角添加按钮

**UI 组件**:

- 页面头部: 标题 + 添加用户按钮
- 数据表格: 响应式表格布局
- 状态徽章: 不同颜色表示用户状态

**布局结构**:

```
AppLayout
└── Container
    ├── 页面头部 (flex justify-between items-center)
    │   ├── 标题区域
    │   └── 添加用户按钮 (btn btn-primary)
    └── 用户表格卡片 (card bg-base-100 shadow-lg)
        └── 表格容器 (overflow-x-auto)
            └── 表格 (table)
                ├── 表头 (thead)
                │   ├── ID | 姓名 | 邮箱 | 状态 | 操作
                └── 表体 (tbody)
                    └── 用户行 (map渲染)
                        ├── 用户数据单元格
                        ├── 状态徽章 (badge badge-success/warning)
                        └── 操作按钮组 (flex gap-2)
                            ├── 查看按钮 (btn btn-sm btn-outline)
                            └── 编辑按钮 (btn btn-sm btn-outline)
```

**数据结构**:

```typescript
interface User {
  id: number
  name: string
  email: string
  status: 'active' | 'inactive'
}
```

**示例数据**: 4个用户 (张三、李四、王五、赵六)

### 2.4 设置页面 (`/settings` - `src/routes/settings.tsx`)

**功能特性**:

- 应用偏好设置: 通知、深色模式、自动保存
- 语言选择: 4种语言支持 (中文、英文、日文)
- 设置保存: 保存按钮应用更改
- 应用信息显示: 版本、构建信息、框架信息

**UI 组件**:

- 页面标题区域
- 常规设置卡片: 多个开关控件
- 语言选择器: 下拉菜单选择
- 关于信息卡片: 静态信息展示

**布局结构**:

```
AppLayout
└── Container
    ├── 页面标题区域
    └── 设置区域 (space-y-6)
        ├── 常规设置卡片 (card bg-base-100 shadow-lg)
        │   ├── 卡片标题 (card-title)
        │   └── 设置表单 (space-y-4)
        │       ├── 通知开关 (form-control, label cursor-pointer)
        │       ├── 深色模式开关
        │       ├── 自动保存开关
        │       └── 语言选择器 (form-control, select select-bordered)
        │           ├── 简体中文
        │           ├── 繁体中文
        │           ├── English
        │           └── 日本語
        └── 关于信息卡片 (card bg-base-100 shadow-lg)
            └── 应用信息 (space-y-2)
                ├── 版本: 1.0.0
                ├── 构建: 2024-01-20
                └── 框架: Tauri 2 + React 19 + TypeScript
```

**状态管理**:

```typescript
const [settings, setSettings] = useState({
  notifications: true,
  darkMode: false,
  autoSave: true,
  language: 'zh-CN',
})
```

## 3. 共享组件详细分析

### 3.1 应用布局组件 (`AppLayout` - `src/components/app-layout.tsx`)

**功能特性**:

- 响应式导航栏: 顶部固定导航
- 多语言导航: 使用 i18next 翻译导航标签
- 主题切换集成: 集成 ThemeToggle 组件
- 语言切换集成: 集成 LanguageToggle 组件

**UI 组件**:

- 导航栏 (navbar): DaisyUI 导航栏组件
- 品牌链接: 首页链接大按钮
- 导航菜单: 4个页面链接按钮
- 切换组件: 语言和主题切换按钮

**布局结构**:

```
div (min-h-screen bg-base-200)
└── nav (navbar bg-base-100 shadow)
    └── div (container mx-auto)
        ├── 品牌区域 (flex-1)
        │   └── 品牌链接 (Link to="/")
        │       └── btn btn-ghost text-xl
        │           └── {t('nav.brand')}
        └── 导航区域 (flex-none gap-2)
            ├── 首页链接 (Link to="/")
            ├── 仪表板链接 (Link to="/dashboard")
            ├── 用户管理链接 (Link to="/users")
            ├── 设置链接 (Link to="/settings")
            ├── LanguageToggle 组件
            └── ThemeToggle 组件
└── main (container mx-auto p-4)
    └── {children}
```

**国际化键值**:

- `nav.brand`: 应用品牌名称
- `nav.home`: 首页
- `nav.dashboard`: 仪表板
- `nav.users`: 用户管理
- `nav.settings`: 设置

### 3.2 主题切换组件 (`ThemeToggle` - `src/components/theme-toggle.tsx`)

**功能特性**:

- DaisyUI 主题切换: 支持 light/dark 主题
- 本地存储持久化: 使用 localStorage 保存主题设置
- 系统主题检测: 自动检测系统主题偏好

### 3.3 语言切换组件 (`LanguageToggle` - `src/components/language-toggle.tsx`)

**功能特性**:

- 多语言支持: 中文简体、英文
- 下拉菜单选择: DaisyUI 下拉组件
- 本地存储持久化: 保存用户语言偏好

## 4. 国际化系统详细分析

### 支持语言

- **简体中文 (zh-CN)**: 默认语言
- **英文 (en-US)**: 第二语言

### 命名空间结构

每个语言包含以下命名空间:

- `common`: 通用词汇 (导航、按钮、操作等)
- `home`: 首页专用文本
- `dashboard`: 仪表板专用文本
- `users`: 用户管理专用文本
- `settings`: 设置页面专用文本
- `validation`: 表单验证消息

### 中文键值示例 (zh-CN/common.json)

```json
{
  "nav": {
    "brand": "Tauri 应用",
    "home": "首页",
    "dashboard": "仪表板",
    "users": "用户管理",
    "settings": "设置"
  },
  "actions": {
    "greet": "问候",
    "save": "保存",
    "cancel": "取消",
    "edit": "编辑",
    "delete": "删除",
    "view": "查看"
  }
}
```

## 5. 路由系统详细分析

### React Router 7.9.2 配置

- **路由模式**: 文件系统路由 (File-based routing)
- **路由文件**: `src/routes.ts` 自动生成
- **路由插件**: `@react-router/fs-routes` 自动扫描 routes 目录

### 路由映射

```
文件路径                    → URL路径
src/routes/_index.tsx      → /
src/routes/dashboard.tsx   → /dashboard
src/routes/users.tsx       → /users
src/routes/settings.tsx    → /settings
```

### 路由配置文件 (src/routes.ts)

使用 `@react-router/fs-routes` 和 `@react-router/dev/routes` 自动生成路由配置。

## 6. Tauri 集成详细分析

### 后端命令

- **greet**: Rust 端的问候命令，接受 `name` 参数并返回个性化问候

### API 调用示例

```typescript
import { invoke } from '@tauri-apps/api/core'

// 调用 Rust 端命令
const response = await invoke('greet', { name: 'World' })
```

## 7. 样式系统详细分析

### Tailwind CSS 配置

- **版本**: 3.4.1
- **响应式断点**: sm, md, lg, xl, 2xl
- **颜色系统**: 基于 CSS 自定义属性

### DaisyUI 组件使用

- **版本**: 5.0.38
- **主题**: light/dark 自动切换
- **常用组件**: card, btn, navbar, table, badge, alert, form-control

### 常用样式类

- **布局**: `container`, `min-h-screen`, `space-y-6`, `grid grid-cols-1 md:grid-cols-3`
- **卡片**: `card bg-base-100 shadow-lg`, `card-body`, `card-title`
- **按钮**: `btn btn-primary`, `btn btn-ghost`, `btn btn-outline`
- **表格**: `table`, `thead`, `tbody`, `overflow-x-auto`
- **状态**: `badge badge-success`, `badge warning`, `alert alert-success`

## 8. 构建和开发系统

### 开发命令

- `pnpm tauri dev`: 启动开发服务器 (前端 + Tauri)
- `pnpm dev`: 仅启动前端开发服务器
- `pnpm build`: 构建生产版本
- `pnpm preview`: 预览构建结果

### 构建输出

- **前端构建**: `build/` 目录 (Vite 默认输出)
- **Tauri 应用**: `src-tauri/target/debug/` 或 `release/`

### 性能基准

- **构建时间**: 平均 2 秒 (5次干净构建)
- **热重载**: 快速响应 (< 1秒)
- **包大小**: 优化后的生产构建

## 9. 代码质量工具

### ESLint 配置

- **配置文件**: `eslint.config.js`
- **规则**: React + TypeScript 规则集
- **自动修复**: `pnpm lint:fix`

### Prettier 配置

- **配置文件**: `.prettierrc`
- **忽略文件**: `.prettierignore`
- **格式化**: `pnpm format`

### Git Hooks

- **工具**: Husky 9.1.7 + lint-staged
- **预提交**: 自动 lint 和 format
- **提交信息**: 使用 Commitizen 规范

## 10. 迁移关键点总结

### 必须保留的功能

1. **Tauri API 集成**: `invoke('greet')` 调用
2. **完整页面布局**: 4个页面及其所有 UI 组件
3. **国际化系统**: 中文/英文切换和所有翻译
4. **主题切换**: light/dark 模式切换
5. **响应式设计**: 所有断点的响应式布局
6. **导航功能**: 页面间跳转和当前页面高亮

### 需要适配的技术点

1. **路由系统**: React Router → Next.js App Router
2. **文件结构**: `src/routes/` → `src/app/`
3. **组件类型**: 需要标记 `'use client'` 的组件
4. **链接组件**: `react-router` Link → Next.js Link
5. **静态导出**: 配置 Next.js `output: 'export'`
6. **构建命令**: Vite 命令 → Next.js 命令

### 性能目标

- **构建时间**: 不超过当前版本的 120% (≤ 2.4秒)
- **热重载**: 响应时间 < 1秒
- **应用启动**: 不超过当前版本的 110%
- **功能完整性**: 100% 视觉和功能一致性

---

**备注**: 此状态清单将作为 Next.js 迁移后功能验证的基准，确保所有现有功能和用户体验完全保留。
