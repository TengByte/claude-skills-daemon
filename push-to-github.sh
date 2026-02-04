#!/bin/bash

# 一键推送到 GitHub 脚本
# 作者: TengByte

set -e

echo "🚀 Claude Skills Daemon - 推送到 GitHub"
echo "========================================"
echo ""

# 1. 配置 Git 用户信息
echo "📝 配置 Git 用户信息..."
git config user.name "TengByte"
git config user.email "tengli.global@gmail.com"
echo "✓ Git 配置完成"
echo "  Name: $(git config user.name)"
echo "  Email: $(git config user.email)"
echo ""

# 2. 替换占位符
echo "🔄 替换文档中的占位符..."
find . -type f -name "*.md" -exec sed -i '' 's/YOUR_USERNAME/TengByte/g' {} + 2>/dev/null || true
echo "✓ 占位符替换完成"
echo ""

# 3. 初始化 Git（如果需要）
if [ ! -d .git ]; then
    echo "📦 初始化 Git 仓库..."
    git init
    git add .
    git commit -m "feat: initial commit - Claude Skills Daemon v1.0.0

- HTTP API server for skill management
- CLI tool for daemon control
- Browser marketplace integration
- Local skill storage in ~/.claude/skills/
- Complete documentation and examples
"
    git branch -M main
    echo "✓ Git 仓库初始化完成"
else
    echo "✓ Git 仓库已存在"
fi
echo ""

# 4. 添加远程仓库
echo "🔗 添加远程仓库..."
if git remote | grep -q origin; then
    echo "⚠️  远程仓库已存在，跳过添加"
else
    git remote add origin https://github.com/TengByte/claude-skills-daemon.git
    echo "✓ 远程仓库已添加"
fi
echo ""

# 5. 推送到 GitHub
echo "📤 推送到 GitHub..."
echo ""
echo "准备推送到: https://github.com/TengByte/claude-skills-daemon"
echo ""
read -p "确认推送？(y/N) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    git push -u origin main
    echo ""
    echo "========================================"
    echo "✅ 推送成功！"
    echo ""
    echo "查看你的仓库："
    echo "https://github.com/TengByte/claude-skills-daemon"
    echo ""
    echo "下一步："
    echo "1. 访问仓库设置，添加 Topics: claude, skills, daemon, nodejs"
    echo "2. 启用 Issues 和 Discussions"
    echo "3. 创建第一个 Release (v1.0.0)"
    echo "========================================"
else
    echo "❌ 取消推送"
    exit 1
fi
