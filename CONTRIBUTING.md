# Contributing to Claude Skills Daemon

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## 🤝 How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- **Clear title** describing the problem
- **Steps to reproduce** the issue
- **Expected behavior** vs actual behavior
- **Environment details** (OS, Node.js version, etc.)
- **Logs** from `logs/daemon.log` if applicable

### Suggesting Features

Feature suggestions are welcome! Please:
- Check existing issues to avoid duplicates
- Clearly describe the feature and its use case
- Explain why this feature would be useful

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/TengByte/claude-skills-daemon.git
   cd claude-skills-daemon
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clean, readable code
   - Follow existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   # Start the daemon
   node cli/daemon-cli.js start --foreground

   # Test the API
   ./test-api.sh

   # Test in browser
   open ../skills-marketplace-demo.html
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

   Use conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub.

## 📝 Code Style

- Use **2 spaces** for indentation
- Use **semicolons**
- Use **single quotes** for strings
- Add **JSDoc comments** for functions
- Keep functions **small and focused**
- Use **descriptive variable names**

Example:
```javascript
/**
 * Install a skill to the local directory
 * @param {Object} skillData - The skill metadata
 * @returns {Promise<Object>} Installation result
 */
async function installSkill(skillData) {
  // Implementation
}
```

## 🧪 Testing

Before submitting a PR:

1. **Manual testing**
   ```bash
   # Test daemon lifecycle
   node cli/daemon-cli.js start
   node cli/daemon-cli.js status
   node cli/daemon-cli.js stop

   # Test API
   ./test-api.sh
   ```

2. **Check for errors**
   ```bash
   # Review logs
   node cli/daemon-cli.js logs
   ```

3. **Test edge cases**
   - Daemon not running
   - Port already in use
   - Invalid skill data
   - Network errors

## 📚 Documentation

Update documentation when:
- Adding new features
- Changing APIs
- Updating configuration
- Fixing significant bugs

Files to update:
- `README.md` - Main documentation
- `QUICKSTART.md` - Quick start guide
- `CHANGELOG.md` - Version history
- Code comments

## 🏗️ Project Structure

```
claude-skills-daemon/
├── daemon/           # Core daemon logic
│   ├── server.js    # HTTP server
│   ├── config.js    # Configuration
│   └── skill-manager.js  # Skill management
├── cli/             # Command-line interface
│   └── daemon-cli.js
└── docs/            # Additional documentation
```

## 🐛 Debugging Tips

### Enable debug mode
```bash
# Start in foreground to see logs
node cli/daemon-cli.js start --foreground
```

### Check daemon logs
```bash
tail -f logs/daemon.log
```

### Test API directly
```bash
# Health check
curl http://localhost:8080/api/health

# Status
curl http://localhost:8080/api/status
```

### Browser console
Open DevTools (F12) to see:
- Network requests
- JavaScript errors
- Console logs

## 🔄 Development Workflow

1. **Setup**
   ```bash
   npm install
   ```

2. **Development mode** (auto-restart)
   ```bash
   npm run dev
   ```

3. **Test changes**
   - Manual testing with CLI
   - API testing with curl
   - Browser testing with marketplace HTML

4. **Review**
   - Check code style
   - Verify documentation
   - Test edge cases

5. **Submit PR**
   - Clear description
   - Reference issues if applicable
   - Wait for review

## ✅ PR Review Process

1. **Automated checks** (if set up)
   - Linting
   - Tests
   - Build verification

2. **Manual review**
   - Code quality
   - Documentation
   - Feature completeness

3. **Feedback**
   - Address review comments
   - Update PR as needed

4. **Merge**
   - Squash commits if requested
   - Update CHANGELOG

## 📋 Checklist

Before submitting a PR:

- [ ] Code follows style guidelines
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] Manually tested the changes
- [ ] No console errors or warnings
- [ ] Commit messages follow conventions
- [ ] PR description is clear

## 🙏 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Credited in CHANGELOG.md

Thank you for contributing! 🎉
