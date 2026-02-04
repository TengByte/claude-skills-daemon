#!/usr/bin/env node

const { spawn, exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');

const DAEMON_PORT = 8080;
const DAEMON_HOST = 'localhost';
const PID_FILE = path.join(require('os').homedir(), '.claude', 'daemon.pid');

// 确保 .claude 目录存在
const claudeDir = path.dirname(PID_FILE);
if (!fs.existsSync(claudeDir)) {
    fs.mkdirSync(claudeDir, { recursive: true });
}

// 检查守护进程是否运行
async function isDaemonRunning() {
    return new Promise((resolve) => {
        const req = http.get(`http://${DAEMON_HOST}:${DAEMON_PORT}/api/health`, (res) => {
            resolve(res.statusCode === 200);
        });
        req.on('error', () => resolve(false));
        req.setTimeout(2000, () => {
            req.destroy();
            resolve(false);
        });
    });
}

// 获取守护进程 PID
function getDaemonPid() {
    try {
        if (fs.existsSync(PID_FILE)) {
            const pid = parseInt(fs.readFileSync(PID_FILE, 'utf8').trim());
            // 验证进程是否存在
            try {
                process.kill(pid, 0); // 0 信号不会杀死进程，只是检查
                return pid;
            } catch (e) {
                // 进程不存在，删除过期的 PID 文件
                fs.unlinkSync(PID_FILE);
                return null;
            }
        }
    } catch (err) {
        return null;
    }
    return null;
}

// 保存 PID
function savePid(pid) {
    fs.writeFileSync(PID_FILE, pid.toString());
}

// 删除 PID 文件
function removePid() {
    if (fs.existsSync(PID_FILE)) {
        fs.unlinkSync(PID_FILE);
    }
}

// 启动守护进程
async function startDaemon(background = true) {
    const isRunning = await isDaemonRunning();
    if (isRunning) {
        console.log('✓ Daemon is already running');
        return;
    }

    const serverPath = path.join(__dirname, '..', 'daemon', 'server.js');

    if (background) {
        // 后台运行
        console.log('Starting daemon in background...');

        const logFile = path.join(__dirname, '..', 'logs', 'daemon.log');
        const out = fs.openSync(logFile, 'a');
        const err = fs.openSync(logFile, 'a');

        const child = spawn('node', [serverPath], {
            detached: true,
            stdio: ['ignore', out, err]
        });

        savePid(child.pid);
        child.unref();

        // 等待一下确保启动成功
        await new Promise(resolve => setTimeout(resolve, 1000));

        const running = await isDaemonRunning();
        if (running) {
            console.log(`✓ Daemon started successfully (PID: ${child.pid})`);
            console.log(`✓ Server running at http://${DAEMON_HOST}:${DAEMON_PORT}`);
            console.log(`✓ Logs: ${logFile}`);
        } else {
            console.error('✗ Failed to start daemon');
            console.error(`  Check logs at: ${logFile}`);
            removePid();
        }
    } else {
        // 前台运行
        console.log('Starting daemon in foreground... (Press Ctrl+C to stop)');
        const child = spawn('node', [serverPath], {
            stdio: 'inherit'
        });

        savePid(child.pid);

        child.on('exit', (code) => {
            removePid();
            process.exit(code || 0);
        });
    }
}

// 停止守护进程
async function stopDaemon() {
    const isRunning = await isDaemonRunning();
    if (!isRunning) {
        console.log('✓ Daemon is not running');
        removePid();
        return;
    }

    const pid = getDaemonPid();
    if (pid) {
        console.log(`Stopping daemon (PID: ${pid})...`);
        try {
            process.kill(pid, 'SIGTERM');
            // 等待进程结束
            await new Promise(resolve => setTimeout(resolve, 2000));

            const stillRunning = await isDaemonRunning();
            if (!stillRunning) {
                console.log('✓ Daemon stopped successfully');
                removePid();
            } else {
                console.log('⚠ Daemon did not stop gracefully, forcing...');
                process.kill(pid, 'SIGKILL');
                removePid();
                console.log('✓ Daemon killed');
            }
        } catch (err) {
            console.error('✗ Failed to stop daemon:', err.message);
            removePid();
        }
    } else {
        console.log('⚠ No PID file found, but daemon appears to be running');
        console.log('  Try manually killing the process on port', DAEMON_PORT);
    }
}

// 查看守护进程状态
async function statusDaemon() {
    const isRunning = await isDaemonRunning();
    const pid = getDaemonPid();

    console.log('\n═══════════════════════════════════════');
    console.log('  Claude Skills Daemon Status');
    console.log('═══════════════════════════════════════\n');

    if (isRunning) {
        console.log('Status:  ✓ Running');
        console.log(`URL:     http://${DAEMON_HOST}:${DAEMON_PORT}`);
        if (pid) {
            console.log(`PID:     ${pid}`);
        }

        // 获取详细状态
        try {
            const req = http.get(`http://${DAEMON_HOST}:${DAEMON_PORT}/api/status`, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        const status = JSON.parse(data);
                        console.log(`Uptime:  ${Math.floor(status.uptime)}s`);
                        console.log(`Skills:  ${status.installedCount} installed`);
                    } catch (e) {
                        // 忽略解析错误
                    }
                    console.log('\n═══════════════════════════════════════\n');
                });
            });
            req.on('error', () => {
                console.log('\n═══════════════════════════════════════\n');
            });
        } catch (e) {
            console.log('\n═══════════════════════════════════════\n');
        }
    } else {
        console.log('Status:  ✗ Not running');
        console.log('\nTo start: claude-skills-daemon start\n');
        console.log('═══════════════════════════════════════\n');
    }
}

// 重启守护进程
async function restartDaemon() {
    console.log('Restarting daemon...');
    await stopDaemon();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await startDaemon();
}

// 查看日志
function showLogs() {
    const logFile = path.join(__dirname, '..', 'logs', 'daemon.log');
    if (fs.existsSync(logFile)) {
        console.log(`Showing last 50 lines of ${logFile}:\n`);
        exec(`tail -50 "${logFile}"`, (err, stdout) => {
            if (err) {
                console.error('Failed to read logs:', err.message);
            } else {
                console.log(stdout);
            }
        });
    } else {
        console.log('No log file found at:', logFile);
    }
}

// 显示帮助
function showHelp() {
    console.log(`
Usage: claude-skills-daemon <command> [options]

Commands:
  start [--foreground]  Start the daemon (background by default)
  stop                  Stop the daemon
  restart              Restart the daemon
  status               Show daemon status
  logs                 Show daemon logs
  help                 Show this help message

Examples:
  claude-skills-daemon start              # Start in background
  claude-skills-daemon start --foreground # Start in foreground
  claude-skills-daemon status             # Check if running
  claude-skills-daemon logs               # View logs
    `);
}

// 主函数
async function main() {
    const args = process.argv.slice(2);
    const command = args[0] || 'help';
    const options = args.slice(1);

    switch (command) {
        case 'start':
            await startDaemon(!options.includes('--foreground'));
            break;
        case 'stop':
            await stopDaemon();
            break;
        case 'restart':
            await restartDaemon();
            break;
        case 'status':
            await statusDaemon();
            break;
        case 'logs':
            showLogs();
            break;
        case 'help':
        case '--help':
        case '-h':
            showHelp();
            break;
        default:
            console.error(`Unknown command: ${command}`);
            console.log('Run "claude-skills-daemon help" for usage information');
            process.exit(1);
    }
}

main().catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
});
