#!/bin/bash

# 初始化 Git 仓库脚本

set -e

echo "🚀 Claude Skills Daemon - Git 初始化"
echo "======================================"
echo ""

# 检查是否已经是 git 仓库
if [ -d .git ]; then
    echo "⚠️  已经是 Git 仓库"
    read -p "是否要重新初始化？(y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ 取消操作"
        exit 1
    fi
    rm -rf .git
fi

# 初始化 git
echo "📦 初始化 Git 仓库..."
git init
echo "✓ Git 仓库已初始化"
echo ""

# 添加所有文件
echo "📝 添加所有文件..."
git add .
echo "✓ 文件已添加"
echo ""

# 创建初始提交
echo "💾 创建初始提交..."
git commit -m "feat: initial commit - Claude Skills Daemon v1.0.0

- HTTP API server for skill management
- CLI tool for daemon control
- Browser marketplace integration
- Local skill storage in ~/.claude/skills/
- Complete documentation and examples
"
echo "✓ 初始提交已创建"
echo ""

# 设置默认分支为 main
echo "🌿 设置默认分支为 main..."
git branch -M main
echo "✓ 分支设置完成"
echo ""

echo "======================================"
echo "✅ Git 仓库初始化完成！"
echo ""
echo "下一步："
echo "1. 在 GitHub 创建新仓库: https://github.com/new"
echo "2. 仓库名称: claude-skills-daemon"
echo "3. 不要勾选 'Initialize with README'"
echo ""
echo "然后运行以下命令（替换 YOUR_USERNAME）："
echo ""
echo "  git remote add origin https://github.com/YOUR_USERNAME/claude-skills-daemon.git"
echo "  git push -u origin main"
echo ""
echo "详细步骤见: PUBLISH_TO_GITHUB.md"
echo "======================================"
