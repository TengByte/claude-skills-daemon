# ✅ 发布前检查清单

在将项目推送到 GitHub 之前，请确保完成以下检查：

## 📄 文档检查

- [ ] **README.md** 中的 `TengByte` 已替换为你的 GitHub 用户名
- [ ] **CHANGELOG.md** 中的链接已更新
- [ ] **package.json** 中的仓库信息正确
- [ ] 所有文档链接可以正常跳转
- [ ] 确认文档中的示例代码正确

## 🔧 代码检查

- [ ] 代码能正常运行（测试过）
- [ ] 守护进程能成功启动和停止
- [ ] API 接口正常响应
- [ ] 浏览器能成功检测到守护进程
- [ ] 能成功安装和卸载 skills
- [ ] 日志文件正常写入

## 📦 文件检查

- [ ] `.gitignore` 存在且正确配置
- [ ] `LICENSE` 文件存在
- [ ] `package.json` 信息完整
- [ ] 所有必要的文件都已包含
- [ ] 没有敏感信息（密码、tokens 等）

## 🧪 测试检查

运行以下命令确保一切正常：

```bash
# 1. 安装依赖
npm install

# 2. 启动守护进程
node cli/daemon-cli.js start

# 3. 检查状态
node cli/daemon-cli.js status

# 4. 测试 API
curl http://localhost:8080/api/health

# 5. 运行测试脚本（如果有）
./test-api.sh

# 6. 停止守护进程
node cli/daemon-cli.js stop
```

所有测试都通过？
- [ ] 是

## 🎨 可选增强

- [ ] 添加项目截图到 `docs/images/`
- [ ] 创建演示 GIF
- [ ] 录制使用视频
- [ ] 准备宣传文案

## 📝 更新占位符

在以下文件中搜索并替换 `TengByte`：

```bash
# 快速查找
grep -r "TengByte" .

# 需要更新的文件：
# - README.md
# - CHANGELOG.md
# - PUBLISH_TO_GITHUB.md
```

替换命令（macOS/Linux）：
```bash
find . -type f -name "*.md" -exec sed -i '' 's/TengByte/你的GitHub用户名/g' {} +
```

替换命令（Linux）：
```bash
find . -type f -name "*.md" -exec sed -i 's/TengByte/你的GitHub用户名/g' {} +
```

## 🚀 准备发布

- [ ] 所有上述检查都完成
- [ ] 代码已经本地测试通过
- [ ] 准备好发布说明
- [ ] 准备好回应 Issues 和 PRs

## 📋 快速命令

```bash
# 初始化 Git（如果还没有）
./init-git.sh

# 或手动执行：
git init
git add .
git commit -m "feat: initial commit - Claude Skills Daemon v1.0.0"
git branch -M main
```

## 🌐 GitHub 仓库设置

创建仓库后需要：

1. **基本信息**
   - Description: `🤖 Local daemon for one-click Claude skills installation`
   - Website: （可选）
   - Topics: `claude`, `skills`, `daemon`, `nodejs`, `cli`, `marketplace`

2. **功能启用**
   - ✅ Issues
   - ✅ Discussions
   - ✅ Wiki（可选）
   - ✅ Projects（可选）

3. **分支保护**（推荐）
   - 保护 main 分支
   - 要求 PR 审查
   - 要求 CI 通过（如果配置了）

## ✨ 发布清单

- [ ] 代码推送到 GitHub
- [ ] 创建 v1.0.0 Release
- [ ] 更新 README 中的 badges
- [ ] 在 Issues 中创建欢迎 issue
- [ ] 准备好回应第一个 PR

## 📢 宣传计划（可选）

- [ ] 发布到社交媒体
- [ ] 分享到相关社区
- [ ] 写一篇介绍博客
- [ ] 创建演示视频
- [ ] 提交到 awesome 列表

## 🎉 完成！

所有检查都通过？恭喜！你已准备好发布到 GitHub 了！

运行：
```bash
git remote add origin https://github.com/TengByte/claude-skills-daemon.git
git push -u origin main
```

查看详细步骤：[PUBLISH_TO_GITHUB.md](PUBLISH_TO_GITHUB.md)
