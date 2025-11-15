#!/bin/bash
# Vite 构建时间基准测试脚本

echo "=== Vite 构建时间基准测试 ==="
echo "测试环境: $(date)"
echo "测试目录: $(pwd)"
echo "Node.js 版本: $(node --version)"
echo "pnpm 版本: $(pnpm --version)"
echo ""

# 清理函数
cleanup() {
    echo "清理构建输出..."
    rm -rf dist/
    rm -rf src-tauri/target/debug/
    rm -rf src-tauri/target/release/
}

# 初始化时间数组
times=()
total_time=0

echo "开始 5 次构建测试..."
echo "每次构建前都会进行干净清理"
echo ""

# 进行 5 次构建测试
for i in {1..5}; do
    echo "=== 第 $i 次构建 ==="

    # 清理构建输出
    cleanup

    # 测量构建时间
    start_time=$(date +%s)

    # 执行构建
    if pnpm build > /dev/null 2>&1; then
        end_time=$(date +%s)
        build_time=$((end_time - start_time))
        times[$i]=$build_time
        total_time=$((total_time + build_time))
        echo "构建 $i: ${build_time}s ✓"
    else
        echo "构建 $i: 失败 ✗"
        exit 1
    fi

    # 短暂休息
    sleep 2
done

echo ""
echo "=== 构建时间统计 ==="
echo "所有构建时间: ${times[@]}s"

# 计算平均时间
average_time=$((total_time / 5))
echo "平均构建时间: ${average_time}s"

# 计算最大最小时间
min_time=${times[1]}
max_time=${times[1]}
for time in "${times[@]}"; do
    if (( time < min_time )); then
        min_time=$time
    fi
    if (( time > max_time )); then
        max_time=$time
    fi
done

echo "最短构建时间: ${min_time}s"
echo "最长构建时间: ${max_time}s"
echo "时间差: $((max_time - min_time))s"

echo ""
echo "=== 基准记录 ==="
echo "Vite版本构建时间基准: ${average_time}s (5次平均)"
echo "记录时间: $(date)"
echo "这个基准将用于Next.js迁移后的性能对比"