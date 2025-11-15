# Next.js 迁移备份策略和回滚机制

**创建日期**: 2025-11-16
**目的**: 为模板项目的 Next.js 迁移提供完整的备份和回滚方案
**适用范围**: template/ 目录下的所有文件和配置

## 1. 迁移前备份策略

### 1.1 Git 版本控制备份

#### 当前状态备份

```bash
# 创建迁移前的提交标记
git add .
git commit -m "chore: 迁移前备份 - 保存当前 Vite + React Router 版本状态

📦 Current State:
- 构建系统: Vite 7.0.4
- 路由系统: React Router 7.9.2
- 框架: React 19.1.1 + TypeScript 5.8.3
- 样式: Tailwind CSS 3.4.1 + DaisyUI 5.0.38
- 桌面框架: Tauri 2.0.0

🎯 Migration Target:
- 构建系统: Next.js 16.0.3 (静态导出模式)
- 路由系统: Next.js App Router
- 保持所有现有功能和页面布局不变

🔄 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"
```

#### 创建备份分支

```bash
# 创建明确的备份分支
git branch backup-before-nextjs-migration
git push origin backup-before-nextjs-migration
```

#### 创建迁移标签

```bash
# 为当前状态创建版本标签
git tag -a v1.1.4-vite-stable -m "Vite + React Router 稳定版本
- 构建时间基准: [待测量]
- 所有功能正常工作
- 可作为回滚目标版本"
git push origin v1.1.4-vite-stable
```

### 1.2 文件系统备份

#### 完整目录备份

```bash
# 创建时间戳备份
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_DIR="../template-backups/template-before-nextjs-${TIMESTAMP}"

# 创建备份目录
mkdir -p "${BACKUP_DIR}"

# 复制整个 template 目录
cp -r template/ "${BACKUP_DIR}/"

# 验证备份完整性
echo "备份创建完成: ${BACKUP_DIR}"
ls -la "${BACKUP_DIR}/"
```

#### 关键配置文件单独备份

```bash
# 创建配置文件备份目录
mkdir -p "${BACKUP_DIR}/critical-configs"

# 备份关键配置文件
cp template/package.json "${BACKUP_DIR}/critical-configs/"
cp template/vite.config.ts "${BACKUP_DIR}/critical-configs/"
cp template/react-router.config.ts "${BACKUP_DIR}/critical-configs/"
cp template/tsconfig.json "${BACKUP_DIR}/critical-configs/"
cp template/src-tauri/tauri.conf.json "${BACKUP_DIR}/critical-configs/"
cp template/tailwind.config.js "${BACKUP_DIR}/critical-configs/"

echo "关键配置文件备份完成"
```

### 1.3 依赖和基准备份

#### 依赖版本快照

```bash
# 创建依赖版本报告
cd template
pnpm list --depth=0 > "${BACKUP_DIR}/dependency-snapshot.txt"
cat package.json > "${BACKUP_DIR}/package-snapshot.json"
echo "pnpm-lock.yaml 文件版本:" > "${BACKUP_DIR}/lockfile-info.txt"
head -5 pnpm-lock.yaml >> "${BACKUP_DIR}/lockfile-info.txt"
```

#### 构建性能基准

```bash
# 测量当前构建时间基准（将在 T002 中执行）
echo "构建时间基准测量将在 T002 任务中执行" > "${BACKUP_DIR}/build-baseline-pending.txt"
```

## 2. 迁移过程监控

### 2.1 阶段性检查点

在每个主要阶段完成后创建检查点：

```bash
# 阶段 1 完成检查点
git add -A
git commit -m "chore: Phase 1 完成 - 项目结构和依赖更新
✅ 卸载 React Router 依赖
✅ 安装 Next.js 16.0.3
✅ 更新 package.json 脚本
🔄 Generated with [Claude Code](https://claude.com/claude-code)"

Co-Authored-By: Claude <noreply@anthropic.com>"

# 阶段 2 完成检查点
git add -A
git commit -m "chore: Phase 2 完成 - 配置文件创建
✅ 创建 next.config.js
✅ 更新 tsconfig.json
✅ 修改 tauri.conf.json
🔄 Generated with [Claude Code](https://claude.com/claude-code)"

Co-Authored-By: Claude <noreply@anthropic.com>"
```

### 2.2 功能验证记录

创建验证清单记录每个步骤的结果：

```markdown
## 迁移验证记录

### Phase 1: 依赖更新

- [ ] React Router 依赖完全卸载
- [ ] Next.js 16.0.3 安装成功
- [ ] package.json 脚本更新完成
- [ ] 依赖安装无冲突

### Phase 2: 配置创建

- [ ] next.config.js 创建并验证
- [ ] tsconfig.json 更新支持 App Router
- [ ] tauri.conf.json 适配 Next.js 命令

### Phase 3: 目录结构

- [ ] app/ 目录结构创建
- [ ] 路由文件迁移完成
- [ ] 组件文件路径更新

### Phase 4: 功能验证

- [ ] 开发服务器启动正常
- [ ] 所有页面路由正常工作
- [ ] 国际化功能正常
- [ ] 主题切换功能正常
- [ ] Tauri API 调用正常
```

## 3. 回滚机制

### 3.1 紧急回滚（完整回滚）

#### 如果迁移完全失败，恢复到迁移前状态：

```bash
# 方法 1: 使用 Git 回滚
git checkout backup-before-nextjs-migration
git checkout -b rollback-emergency
# 复制回 template 目录
rm -rf template/
cp -r ../template-backups/template-before-nextjs-[TIMESTAMP]/ template/

# 方法 2: 使用 Git reset（如果还未 push）
git reset --hard v1.1.4-vite-stable
git clean -fd

# 方法 3: 使用文件系统备份
rm -rf template/
cp -r ../template-backups/template-before-nextjs-[TIMESTAMP]/ template/
cd template
pnpm install
```

### 3.2 部分回滚

#### 如果只有特定组件或配置有问题：

```bash
# 回滚特定文件
git checkout backup-before-nextjs-migration -- template/package.json
git checkout backup-before-nextjs-migration -- template/vite.config.ts

# 回滚特定目录
git checkout backup-before-nextjs-migration -- template/src/
```

### 3.3 配置回滚

#### Next.js 配置回滚到 Vite：

```bash
# 恢复 Vite 配置
cp ../template-backups/template-before-nextjs-[TIMESTAMP]/critical-configs/vite.config.ts template/
cp ../template-backups/template-before-nextjs-[TIMESTAMP]/critical-configs/react-router.config.ts template/

# 恢复 package.json
cp ../template-backups/template-before-nextjs-[TIMESTAMP]/critical-configs/package.json template/

# 重新安装依赖
cd template
rm -rf node_modules/
pnpm install
```

## 4. 回滚验证

### 4.1 回滚后验证清单

```bash
# 验证基本功能
cd template

# 1. 开发环境启动
pnpm tauri dev &
sleep 10
# 检查应用是否正常启动

# 2. 构建测试
pnpm tauri build
# 检查构建是否成功

# 3. 功能测试
# - 页面导航
# - 主题切换
# - 语言切换
# - Tauri API 调用
```

### 4.2 性能验证

```bash
# 测量回滚后的构建时间
echo "测量回滚后构建时间..."
time pnpm build 3>/tmp/build-time.log
cat /tmp/build-time.log
```

## 5. 应急联系和支持

### 5.1 问题分类

- **P0 - 紧急**: 完全无法启动或构建
- **P1 - 高**: 核心功能失效
- **P2 - 中**: 次要功能问题
- **P3 - 低**: 优化或改进

### 5.2 故障排除步骤

1. **立即停止**: 停止当前迁移操作
2. **评估影响**: 确定问题范围和影响
3. **选择回滚**: 根据问题严重程度选择回滚策略
4. **执行回滚**: 按照上述回滚机制执行
5. **验证恢复**: 确认系统恢复到正常状态
6. **文档记录**: 记录问题和解决方案

## 6. 预防措施

### 6.1 迁移最佳实践

- 每个阶段完成后立即提交
- 保持详细的变更日志
- 定期验证核心功能
- 保持备份的最新性

### 6.2 监控指标

- 构建时间变化
- 启动时间变化
- 内存使用变化
- 功能完整性检查

---

**重要提醒**:

1. 在开始迁移前，请确保已完整执行上述备份步骤
2. 任何回滚操作都应记录在案，包括原因和结果
3. 保持备份文件的安全，直到迁移完全成功并经过充分测试
4. 定期测试备份的完整性和可用性
