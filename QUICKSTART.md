# 快速测试指南

## 5分钟测试流程

### 步骤 1：启动守护进程

```bash
cd claude-skills-daemon
node cli/daemon-cli.js start
```

你应该看到：
```
Starting daemon in background...
✓ Daemon started successfully (PID: xxxxx)
✓ Server running at http://localhost:8080
✓ Logs: /path/to/logs/daemon.log
```

### 步骤 2：验证守护进程运行

```bash
node cli/daemon-cli.js status
```

输出：
```
═══════════════════════════════════════
  Claude Skills Daemon Status
═══════════════════════════════════════

Status:  ✓ Running
URL:     http://localhost:8080
PID:     xxxxx
Uptime:  10s
Skills:  0 installed

═══════════════════════════════════════
```

### 步骤 3：在浏览器中打开 Marketplace

```bash
# 在项目根目录（上级目录）
open ../skills-marketplace-demo.html
```

或直接在浏览器中打开文件：
```
file:///Users/teng.li/PycharmProjects/skills-marketplace-demo.html
```

### 步骤 4：测试安装

1. 打开网页后，查看右上角状态：
   - 应该显示 **"Daemon: Running"**（绿色）

2. 点击任何一个 skill 的 **"Install"** 按钮

3. 等待 1-2 秒，按钮应该变为 **"✓ Installed"**

4. 查看已安装的 skills：
   ```bash
   ls ~/.claude/skills/
   ```

### 步骤 5：验证安装结果

```bash
# 查看已安装的 skills
cat ~/.claude/skills/installed.json

# 查看某个 skill 的详情
ls ~/.claude/skills/document-skills_pdf-toolkit/
cat ~/.claude/skills/document-skills_pdf-toolkit/skill.json
```

### 步骤 6：测试卸载

1. 在网页中点击已安装 skill 的 **"✓ Installed"** 按钮
2. 按钮应该变回 **"Install"**
3. 验证文件已删除：
   ```bash
   ls ~/.claude/skills/
   ```

### 步骤 7：停止守护进程

```bash
node cli/daemon-cli.js stop
```

输出：
```
Stopping daemon (PID: xxxxx)...
✓ Daemon stopped successfully
```

## 测试 API（可选）

### 健康检查
```bash
curl http://localhost:8080/api/health
```

### 查看已安装的 skills
```bash
curl http://localhost:8080/api/skills/installed
```

### 手动安装一个 skill
```bash
curl -X POST http://localhost:8080/api/skills/install \
  -H "Content-Type: application/json" \
  -d '{
    "id": 999,
    "name": "Test Skill",
    "author": "test-author",
    "version": "1.0.0",
    "description": "A test skill",
    "category": "Development",
    "tags": ["test"]
  }'
```

### 卸载 skill
```bash
curl -X POST http://localhost:8080/api/skills/uninstall \
  -H "Content-Type: application/json" \
  -d '{"skillId": 999}'
```

## 故障排查

### 守护进程无法启动

1. 检查端口是否被占用：
   ```bash
   lsof -i :8080
   ```

2. 查看日志：
   ```bash
   cat logs/daemon.log
   ```

### 浏览器显示 "Daemon: Stopped"

1. 检查守护进程是否运行：
   ```bash
   node cli/daemon-cli.js status
   ```

2. 尝试重启：
   ```bash
   node cli/daemon-cli.js restart
   ```

3. 检查浏览器控制台是否有 CORS 错误

### 安装失败

1. 查看守护进程日志：
   ```bash
   node cli/daemon-cli.js logs
   ```

2. 检查 `~/.claude/skills/` 目录权限

3. 在浏览器控制台查看错误信息（F12）

## 成功指标

如果一切正常，你应该能够：
- ✅ 守护进程成功启动
- ✅ 浏览器显示 "Daemon: Running"（绿色）
- ✅ 点击 Install 按钮后成功安装
- ✅ `~/.claude/skills/` 目录下有对应的文件
- ✅ 成功卸载 skill

## 下一步

恭喜！守护进程已经成功运行。你现在可以：

1. 修改 `daemon/skill-manager.js` 来自定义安装逻辑
2. 连接到真实的 skills registry
3. 添加更多 API 端点
4. 集成到实际的 Claude Code CLI

查看 `README.md` 了解更多详情。
