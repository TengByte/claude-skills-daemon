const path = require('path');
const os = require('os');
const fs = require('fs');

const CONFIG = {
    // 服务器配置
    PORT: process.env.DAEMON_PORT || 8080,
    HOST: 'localhost',

    // 路径配置
    SKILLS_DIR: path.join(os.homedir(), '.claude', 'skills'),
    LOGS_DIR: path.join(__dirname, '..', 'logs'),
    CONFIG_FILE: path.join(os.homedir(), '.claude', 'daemon-config.json'),

    // API 配置（模拟的 skills registry）
    SKILLS_REGISTRY_URL: 'https://api.example.com/skills',

    // 日志配置
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
};

// 确保必要的目录存在
function ensureDirectories() {
    const dirs = [
        CONFIG.SKILLS_DIR,
        CONFIG.LOGS_DIR,
        path.dirname(CONFIG.CONFIG_FILE)
    ];

    dirs.forEach(dir => {
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
            console.log(`[Config] Created directory: ${dir}`);
        }
    });
}

// 加载或创建配置文件
function loadConfig() {
    ensureDirectories();

    if (fs.existsSync(CONFIG.CONFIG_FILE)) {
        try {
            const userConfig = JSON.parse(fs.readFileSync(CONFIG.CONFIG_FILE, 'utf8'));
            Object.assign(CONFIG, userConfig);
        } catch (err) {
            console.error('[Config] Failed to load config file:', err.message);
        }
    } else {
        // 创建默认配置
        const defaultConfig = {
            autoUpdate: false,
            telemetry: false
        };
        fs.writeFileSync(CONFIG.CONFIG_FILE, JSON.stringify(defaultConfig, null, 2));
    }

    return CONFIG;
}

module.exports = {
    CONFIG,
    loadConfig,
    ensureDirectories
};
