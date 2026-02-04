#!/bin/bash

# Claude Skills Daemon API 测试脚本

DAEMON_URL="http://localhost:8080"

echo "================================"
echo "Claude Skills Daemon API 测试"
echo "================================"
echo ""

# 1. 健康检查
echo "1. 健康检查..."
curl -s $DAEMON_URL/api/health | json_pp 2>/dev/null || curl -s $DAEMON_URL/api/health
echo ""

# 2. 查看状态
echo "2. 查看守护进程状态..."
curl -s $DAEMON_URL/api/status | json_pp 2>/dev/null || curl -s $DAEMON_URL/api/status
echo ""

# 3. 安装一个测试 skill
echo "3. 安装测试 skill..."
curl -s -X POST $DAEMON_URL/api/skills/install \
  -H "Content-Type: application/json" \
  -d '{
    "id": 999,
    "name": "Test Skill",
    "author": "test-author",
    "version": "1.0.0",
    "description": "A test skill for demonstration",
    "category": "Development",
    "tags": ["test", "demo"]
  }' | json_pp 2>/dev/null || curl -s -X POST $DAEMON_URL/api/skills/install \
  -H "Content-Type: application/json" \
  -d '{
    "id": 999,
    "name": "Test Skill",
    "author": "test-author",
    "version": "1.0.0",
    "description": "A test skill for demonstration",
    "category": "Development",
    "tags": ["test", "demo"]
  }'
echo ""

# 4. 查看已安装的 skills
echo "4. 查看已安装的 skills..."
curl -s $DAEMON_URL/api/skills/installed | json_pp 2>/dev/null || curl -s $DAEMON_URL/api/skills/installed
echo ""

# 5. 检查 skill 是否已安装
echo "5. 检查 skill 999 是否已安装..."
curl -s $DAEMON_URL/api/skills/999/installed | json_pp 2>/dev/null || curl -s $DAEMON_URL/api/skills/999/installed
echo ""

# 6. 查看安装的文件
echo "6. 查看安装的文件..."
ls -la ~/.claude/skills/
echo ""

# 7. 卸载 skill
echo "7. 卸载测试 skill..."
curl -s -X POST $DAEMON_URL/api/skills/uninstall \
  -H "Content-Type: application/json" \
  -d '{"skillId": 999}' | json_pp 2>/dev/null || curl -s -X POST $DAEMON_URL/api/skills/uninstall \
  -H "Content-Type: application/json" \
  -d '{"skillId": 999}'
echo ""

# 8. 再次查看已安装的 skills
echo "8. 验证卸载（应该为空）..."
curl -s $DAEMON_URL/api/skills/installed | json_pp 2>/dev/null || curl -s $DAEMON_URL/api/skills/installed
echo ""

echo "================================"
echo "测试完成！"
echo "================================"
