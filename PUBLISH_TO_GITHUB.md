# 📤 发布到 GitHub 指南

按照以下步骤将项目发布到 GitHub。

## 🚀 快速发布（5分钟）

### 步骤 1：初始化 Git 仓库

```bash
cd /Users/teng.li/PycharmProjects/claude-skills-daemon

# 初始化 git（如果还没有）
git init

# 添加所有文件
git add .

# 创建首次提交
git commit -m "feat: initial commit - Claude Skills Daemon v1.0.0"
```

### 步骤 2：在 GitHub 上创建仓库

1. 访问 https://github.com/new
2. 仓库名称：`claude-skills-daemon`
3. 描述：`🤖 Local daemon for one-click Claude skills installation`
4. 选择 **Public** 或 **Private**
5. **不要**勾选 "Initialize with README"（我们已经有了）
6. 点击 **"Create repository"**

### 步骤 3：连接到远程仓库

复制 GitHub 给你的命令，类似：

```bash
# 添加远程仓库
git remote add origin https://github.com/TengByte/claude-skills-daemon.git

# 推送代码
git branch -M main
git push -u origin main
```

### 步骤 4：验证上传

访问你的仓库页面：
```
https://github.com/TengByte/claude-skills-daemon
```

你应该看到：
- ✅ README.md 自动显示
- ✅ 文件结构清晰
- ✅ LICENSE 文件
- ✅ 徽章显示正常

## 📝 配置仓库（可选但推荐）

### 添加仓库描述和标签

1. 在仓库页面点击 **⚙️ Settings**
2. 在 **About** 部分：
   - **Description**: `🤖 Local daemon for one-click Claude skills installation`
   - **Website**: 留空或添加文档链接
   - **Topics**: 添加标签
     - `claude`
     - `skills`
     - `daemon`
     - `nodejs`
     - `cli`
     - `marketplace`
     - `anthropic`

### 启用 Issues 和 Discussions

1. 在 Settings → Features
2. 勾选：
   - ✅ Issues
   - ✅ Discussions（推荐，方便用户讨论）
   - ✅ Projects（如果需要项目管理）

### 设置默认分支保护（推荐）

如果你计划接受 PR，建议保护 main 分支：

1. Settings → Branches
2. 点击 **Add rule**
3. Branch name pattern: `main`
4. 勾选：
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass (如果配置了 CI)

## 🏷️ 创建首个 Release

### 步骤 1：创建 Tag

```bash
# 创建版本标签
git tag -a v1.0.0 -m "Release v1.0.0 - Initial release"

# 推送标签
git push origin v1.0.0
```

### 步骤 2：在 GitHub 创建 Release

1. 访问仓库页面
2. 点击右侧 **Releases** → **Create a new release**
3. 选择标签：`v1.0.0`
4. Release title: `v1.0.0 - Initial Release`
5. 描述（从 CHANGELOG.md 复制）：

```markdown
## 🎉 Initial Release

First stable release of Claude Skills Daemon!

### Features
- ✅ One-click skill installation from browser
- ✅ HTTP API server with RESTful endpoints
- ✅ CLI tool for daemon management
- ✅ Local skill storage in `~/.claude/skills/`
- ✅ Real-time daemon status detection
- ✅ Cross-platform support (macOS, Linux, Windows)

### Installation
\`\`\`bash
git clone https://github.com/TengByte/claude-skills-daemon.git
cd claude-skills-daemon
npm install
node cli/daemon-cli.js start
\`\`\`

See [README.md](README.md) for full documentation.
```

6. 点击 **Publish release**

## 📦 发布到 npm（可选）

如果你想发布到 npm registry：

### 步骤 1：注册 npm 账号

```bash
npm login
```

### 步骤 2：更新 package.json

确保 `package.json` 中有：
```json
{
  "name": "claude-skills-daemon",
  "version": "1.0.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/TengByte/claude-skills-daemon.git"
  },
  "bugs": {
    "url": "https://github.com/TengByte/claude-skills-daemon/issues"
  },
  "homepage": "https://github.com/TengByte/claude-skills-daemon#readme"
}
```

### 步骤 3：发布

```bash
npm publish
```

然后用户就可以：
```bash
npm install -g claude-skills-daemon
```

## 🎨 添加项目预览图（推荐）

### 创建 screenshots 目录

```bash
mkdir -p docs/images
```

### 添加截图

1. 启动 daemon 和打开 marketplace
2. 截图保存到 `docs/images/`：
   - `marketplace.png` - Marketplace 界面
   - `daemon-status.png` - Daemon 状态
   - `install-demo.gif` - 安装演示动图

### 更新 README

在 README.md 中添加：

```markdown
## 📸 Screenshots

### Marketplace Interface
![Marketplace](docs/images/marketplace.png)

### One-Click Installation
![Installation Demo](docs/images/install-demo.gif)
```

## 📊 添加徽章

在 README.md 顶部已经有基础徽章，你可以添加更多：

```markdown
[![GitHub Stars](https://img.shields.io/github/stars/TengByte/claude-skills-daemon?style=social)](https://github.com/TengByte/claude-skills-daemon/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/TengByte/claude-skills-daemon)](https://github.com/TengByte/claude-skills-daemon/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/TengByte/claude-skills-daemon)](https://github.com/TengByte/claude-skills-daemon/pulls)
[![CI Status](https://github.com/TengByte/claude-skills-daemon/workflows/CI/badge.svg)](https://github.com/TengByte/claude-skills-daemon/actions)
```

## ✅ 发布检查清单

在推送之前，确保：

- [ ] 所有代码已提交
- [ ] README.md 中的 `TengByte` 已替换为你的 GitHub 用户名
- [ ] LICENSE 文件存在
- [ ] .gitignore 配置正确
- [ ] package.json 信息完整
- [ ] CHANGELOG.md 更新
- [ ] 测试过 daemon 能正常启动

## 🔄 日常更新流程

以后更新代码时：

```bash
# 1. 修改代码
# 2. 测试
# 3. 提交
git add .
git commit -m "feat: add new feature"

# 4. 推送
git push origin main

# 5. 如果是新版本，创建 tag
git tag -a v1.1.0 -m "Release v1.1.0"
git push origin v1.1.0

# 6. 在 GitHub 创建 Release
```

## 🌟 推广你的项目

发布后，可以：

1. **发布到社交媒体**
   - Twitter/X
   - Reddit (r/programming, r/opensource)
   - Hacker News

2. **分享到社区**
   - Claude Discord/Slack
   - Dev.to 写文章
   - Medium 发布教程

3. **添加到列表**
   - awesome-claude (如果存在)
   - awesome-nodejs
   - awesome-cli

## 📈 跟踪项目数据

使用 GitHub Insights 查看：
- ⭐ Stars 数量
- 👀 Watchers
- 🍴 Forks
- 📊 Traffic（访问量）
- 🔗 Referrers（来源）

## 🎉 完成！

现在你的项目已经在 GitHub 上了！分享链接：

```
https://github.com/TengByte/claude-skills-daemon
```

需要帮助？在仓库中创建 Issue 或 Discussion！
