<div align="center">

# 🤖 Claude Skills Daemon

**Local daemon for one-click Claude skills installation**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen)](https://nodejs.org/)
[![npm version](https://img.shields.io/badge/npm-1.0.0-blue)](https://www.npmjs.com/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[Features](#-features) •
[Quick Start](#-quick-start) •
[Documentation](#-documentation) •
[Contributing](#-contributing) •
[License](#-license)

</div>

---

## 📖 Overview

Claude Skills Daemon is a lightweight local HTTP server that enables **one-click installation** of skills from a web-based marketplace directly to your local system. No more manual downloads or command-line installations!

### Why This Project?

- **🚀 One-Click Install** - Install skills from your browser with a single click
- **🔄 Auto-Detection** - Daemon automatically detected by the marketplace
- **📦 Smart Management** - Install, uninstall, and manage skills easily
- **🌐 Web UI** - Beautiful browser-based interface for skill discovery
- **⚡ Fast & Light** - Minimal resource usage, runs in the background
- **🔒 Secure** - Only accessible from localhost, no external exposure

## ✨ Features

### Core Functionality
- ✅ **HTTP API Server** - RESTful API for skill management
- ✅ **CLI Tool** - Start, stop, and manage the daemon from terminal
- ✅ **Auto-Detection** - Browser automatically detects running daemon
- ✅ **Local Storage** - Skills saved to `~/.claude/skills/`
- ✅ **Real-time Status** - Live daemon status in browser UI
- ✅ **Graceful Fallback** - Manual installation when daemon is offline

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/status` | GET | Daemon status & stats |
| `/api/skills/install` | POST | Install a skill |
| `/api/skills/uninstall` | POST | Uninstall a skill |
| `/api/skills/installed` | GET | List installed skills |
| `/api/skills/:id/installed` | GET | Check if skill installed |

### CLI Commands
```bash
claude-skills-daemon start      # Start daemon (background)
claude-skills-daemon stop       # Stop daemon
claude-skills-daemon restart    # Restart daemon
claude-skills-daemon status     # Show status
claude-skills-daemon logs       # View logs
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16.0.0 or higher
- **npm** or **yarn**

### Installation

#### Option 1: Clone from GitHub
```bash
git clone https://github.com/TengByte/claude-skills-daemon.git
cd claude-skills-daemon
npm install
```

#### Option 2: Install from npm (Future)
```bash
npm install -g claude-skills-daemon
```

### Start the Daemon

```bash
# Start in background (recommended)
node cli/daemon-cli.js start

# Or start in foreground (for debugging)
node cli/daemon-cli.js start --foreground
```

You should see:
```
✓ Daemon started successfully (PID: 12345)
✓ Server running at http://localhost:8080
✓ Logs: /path/to/logs/daemon.log
```

### Check Status

```bash
node cli/daemon-cli.js status
```

Output:
```
═══════════════════════════════════════
  Claude Skills Daemon Status
═══════════════════════════════════════

Status:  ✓ Running
URL:     http://localhost:8080
PID:     12345
Skills:  0 installed

═══════════════════════════════════════
```

### Use the Marketplace

1. Open the marketplace HTML in your browser
2. The daemon status should show **"Daemon: Running"** (green)
3. Browse skills and click **"Install"**
4. Wait 1-2 seconds for installation
5. Button changes to **"✓ Installed"**

That's it! Your skill is now installed in `~/.claude/skills/`

## 📚 Documentation

- **[Quick Start Guide](QUICKSTART.md)** - 5-minute getting started tutorial
- **[Project Summary](PROJECT_SUMMARY.md)** - Architecture and design details
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute
- **[Changelog](CHANGELOG.md)** - Version history

## 🏗️ Architecture

```
┌─────────────────┐
│   Browser UI    │  (Marketplace)
│  (HTML/React)   │
└────────┬────────┘
         │ HTTP (localhost:8080)
         ↓
┌─────────────────┐
│  Daemon Server  │  (Node.js/Express)
│   - REST API    │
│   - Skill Mgr   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ ~/.claude/      │  (Local Storage)
│   skills/       │
│   config.json   │
└─────────────────┘
```

## 🛠️ Development

### Project Structure
```
claude-skills-daemon/
├── daemon/              # Core daemon logic
│   ├── server.js       # HTTP server
│   ├── config.js       # Configuration
│   └── skill-manager.js # Skill management
├── cli/                # Command-line interface
│   └── daemon-cli.js   # CLI commands
├── .github/            # GitHub templates
├── logs/               # Log files
└── skills/             # Installed skills (gitignored)
```

### Development Mode
```bash
# Auto-restart on file changes
npm run dev
```

### Testing

```bash
# Test API endpoints
./test-api.sh

# Manual testing
node cli/daemon-cli.js start --foreground
```

### Debugging

```bash
# View logs
node cli/daemon-cli.js logs

# Or directly
tail -f logs/daemon.log
```

## 📋 API Usage

### Health Check
```bash
curl http://localhost:8080/api/health
```

### Install a Skill
```bash
curl -X POST http://localhost:8080/api/skills/install \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "name": "PDF Toolkit",
    "author": "document-skills",
    "version": "2.1.0",
    "description": "PDF manipulation toolkit",
    "category": "Documentation",
    "tags": ["pdf", "document"]
  }'
```

### List Installed Skills
```bash
curl http://localhost:8080/api/skills/installed
```

### Uninstall a Skill
```bash
curl -X POST http://localhost:8080/api/skills/uninstall \
  -H "Content-Type: application/json" \
  -d '{"skillId": 1}'
```

## 🔧 Configuration

Configuration is stored in `~/.claude/daemon-config.json`:

```json
{
  "autoUpdate": false,
  "telemetry": false
}
```

Skills are installed to: `~/.claude/skills/`

Change the port by setting environment variable:
```bash
DAEMON_PORT=9090 node daemon/server.js
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🐛 Troubleshooting

### Daemon won't start
- Check if port 8080 is available: `lsof -i :8080`
- Check logs: `node cli/daemon-cli.js logs`
- Try a different port: `DAEMON_PORT=9090 node daemon/server.js`

### Browser shows "Daemon: Stopped"
- Verify daemon is running: `node cli/daemon-cli.js status`
- Check browser console for errors (F12)
- Try restarting: `node cli/daemon-cli.js restart`

### Installation fails
- Check daemon logs: `tail -f logs/daemon.log`
- Verify `~/.claude/skills/` directory exists and is writable
- Check browser console for API errors

## 📝 Roadmap

- [ ] Remote skills registry integration
- [ ] Skill signature verification
- [ ] Dependency management
- [ ] Auto-update checking
- [ ] Web-based configuration UI
- [ ] GitHub Actions CI/CD
- [ ] npm package publishing
- [ ] Integration with official Claude Code CLI

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Contributors

Thanks to all contributors who have helped make this project better!

<!-- Add contributor images here when you have them -->

## 🙏 Acknowledgments

- Inspired by the Claude Code ecosystem
- Built with [Express.js](https://expressjs.com/)
- Uses [Node.js](https://nodejs.org/)

## 📧 Contact

- **Issues**: [GitHub Issues](https://github.com/TengByte/claude-skills-daemon/issues)
- **Discussions**: [GitHub Discussions](https://github.com/TengByte/claude-skills-daemon/discussions)

---

<div align="center">

**Made with ❤️ for the Claude community**

[⬆ Back to Top](#-claude-skills-daemon)

</div>
