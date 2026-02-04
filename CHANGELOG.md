# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Remote skills registry integration
- Skill signature verification
- Automatic update checking
- Dependency management
- GitHub Actions CI/CD

## [1.0.0] - 2026-02-04

### Added
- Initial release of Claude Skills Daemon
- HTTP API server for skill management
- RESTful API endpoints:
  - `GET /api/health` - Health check
  - `GET /api/status` - Daemon status
  - `POST /api/skills/install` - Install skills
  - `POST /api/skills/uninstall` - Uninstall skills
  - `GET /api/skills/installed` - List installed skills
  - `GET /api/skills/:id/installed` - Check if skill is installed
- CLI tool with commands:
  - `start` - Start daemon (background/foreground)
  - `stop` - Stop daemon
  - `restart` - Restart daemon
  - `status` - Show status
  - `logs` - View logs
- Skill Manager for local skill installation
- Configuration management with `~/.claude/` directory
- Browser integration with marketplace HTML
- Automatic daemon detection (every 5 seconds)
- CORS support for browser requests
- PID file management
- Graceful shutdown handling
- Comprehensive documentation:
  - README.md
  - QUICKSTART.md
  - PROJECT_SUMMARY.md
  - CONTRIBUTING.md
- API test script (`test-api.sh`)
- MIT License

### Features
- ✅ One-click skill installation from browser
- ✅ Background daemon process
- ✅ Local skill storage in `~/.claude/skills/`
- ✅ Real-time installation progress
- ✅ Fallback to manual installation (if daemon is not running)
- ✅ Cross-platform support (macOS, Linux, Windows)
- ✅ Logging to file system
- ✅ Error handling and validation

### Technical Details
- Built with Node.js and Express
- HTTP server on `localhost:8080`
- JSON-based skill metadata
- File-based skill storage
- Process management with PID files
- Signal handling for graceful shutdown

---

## Version History

### How to Release

1. Update version in `package.json`
2. Update this CHANGELOG.md
3. Commit changes: `git commit -am "chore: release v1.x.x"`
4. Create git tag: `git tag v1.x.x`
5. Push: `git push && git push --tags`
6. Create GitHub release

### Version Guidelines

- **MAJOR** (1.0.0) - Breaking changes
- **MINOR** (0.1.0) - New features (backward compatible)
- **PATCH** (0.0.1) - Bug fixes

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to this project.

## Links

- [Repository](https://github.com/TengByte/claude-skills-daemon)
- [Issues](https://github.com/TengByte/claude-skills-daemon/issues)
- [Pull Requests](https://github.com/TengByte/claude-skills-daemon/pulls)
