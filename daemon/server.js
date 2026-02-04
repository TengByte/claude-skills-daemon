#!/usr/bin/env node

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { loadConfig, CONFIG } = require('./config');
const SkillManager = require('./skill-manager');

// 加载配置
loadConfig();

const app = express();
const skillManager = new SkillManager();

// 中间件
app.use(cors()); // 允许浏览器跨域请求
app.use(express.json());

// 日志中间件
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.path}`);
    next();
});

// ============ API Routes ============

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        version: require('../package.json').version,
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
    });
});

// 获取守护进程状态
app.get('/api/status', (req, res) => {
    const installed = skillManager.getInstalledSkills();
    res.json({
        running: true,
        port: CONFIG.PORT,
        skillsDir: CONFIG.SKILLS_DIR,
        installedCount: installed.length,
        skills: installed.map(s => ({ id: s.id, name: s.name, version: s.version }))
    });
});

// 获取已安装的 skills
app.get('/api/skills/installed', (req, res) => {
    try {
        const installed = skillManager.getInstalledSkills();
        res.json({ success: true, skills: installed });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 检查 skill 是否已安装
app.get('/api/skills/:id/installed', (req, res) => {
    try {
        const isInstalled = skillManager.isInstalled(parseInt(req.params.id));
        res.json({ installed: isInstalled });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 获取 skill 详情
app.get('/api/skills/:id', (req, res) => {
    try {
        const skill = skillManager.getSkillDetails(parseInt(req.params.id));
        if (skill) {
            res.json({ success: true, skill });
        } else {
            res.status(404).json({ success: false, error: 'Skill not found' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 安装 skill
app.post('/api/skills/install', async (req, res) => {
    try {
        const skillData = req.body;

        // 验证必需字段
        if (!skillData.id || !skillData.name || !skillData.author) {
            return res.status(400).json({
                success: false,
                error: 'Missing required fields: id, name, author'
            });
        }

        console.log(`[Server] Installing skill: ${skillData.name}`);

        // 模拟安装延迟
        await new Promise(resolve => setTimeout(resolve, 1000));

        const result = await skillManager.installSkill(skillData);
        res.json(result);
    } catch (err) {
        console.error('[Server] Install error:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 卸载 skill
app.post('/api/skills/uninstall', (req, res) => {
    try {
        const { skillId } = req.body;

        if (!skillId) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field: skillId'
            });
        }

        console.log(`[Server] Uninstalling skill ID: ${skillId}`);

        const result = skillManager.uninstallSkill(skillId);
        res.json(result);
    } catch (err) {
        console.error('[Server] Uninstall error:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 更新 skill
app.post('/api/skills/update', async (req, res) => {
    try {
        const { skillId, ...newData } = req.body;

        if (!skillId) {
            return res.status(400).json({
                success: false,
                error: 'Missing required field: skillId'
            });
        }

        console.log(`[Server] Updating skill ID: ${skillId}`);

        const result = await skillManager.updateSkill(skillId, { id: skillId, ...newData });
        res.json(result);
    } catch (err) {
        console.error('[Server] Update error:', err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 404 处理
app.use((req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});

// 错误处理
app.use((err, req, res, next) => {
    console.error('[Server] Error:', err);
    res.status(500).json({ error: 'Internal server error', message: err.message });
});

// 启动服务器
const server = app.listen(CONFIG.PORT, CONFIG.HOST, () => {
    console.log('');
    console.log('╔════════════════════════════════════════════╗');
    console.log('║   Claude Skills Daemon                     ║');
    console.log('╚════════════════════════════════════════════╝');
    console.log('');
    console.log(`✓ Server running at http://${CONFIG.HOST}:${CONFIG.PORT}`);
    console.log(`✓ Skills directory: ${CONFIG.SKILLS_DIR}`);
    console.log(`✓ Health check: http://${CONFIG.HOST}:${CONFIG.PORT}/api/health`);
    console.log('');
    console.log('Press Ctrl+C to stop');
    console.log('');
});

// 优雅关闭
process.on('SIGTERM', () => {
    console.log('\n[Server] SIGTERM received, shutting down gracefully...');
    server.close(() => {
        console.log('[Server] Server closed');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('\n[Server] SIGINT received, shutting down gracefully...');
    server.close(() => {
        console.log('[Server] Server closed');
        process.exit(0);
    });
});

module.exports = app;
