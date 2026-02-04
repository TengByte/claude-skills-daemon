#!/usr/bin/env node

/**
 * Claude Skills CLI
 * 命令行工具，用于直接安装 skills（不需要守护进程）
 * 用法：npx claude-skills-daemon install <skill-name>
 */

const { Command } = require('commander');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const os = require('os');

const program = new Command();

const SKILLS_DIR = path.join(os.homedir(), '.claude', 'skills');
const SKILLS_REGISTRY = 'https://registry.example.com/skills'; // 替换为真实 registry

// 确保 skills 目录存在
function ensureSkillsDir() {
  if (!fs.existsSync(SKILLS_DIR)) {
    fs.mkdirSync(SKILLS_DIR, { recursive: true });
  }
}

// 从 registry 下载 skill
async function downloadSkill(skillName) {
  console.log(`📦 Downloading ${skillName}...`);

  // 模拟：从 registry 获取 skill 信息
  const skillUrl = `${SKILLS_REGISTRY}/${skillName}.json`;

  try {
    // 实际实现中，这里应该从真实的 registry 下载
    // const response = await fetch(skillUrl);
    // const skillData = await response.json();

    // 临时：使用模拟数据
    const skillData = {
      name: skillName,
      version: '1.0.0',
      author: 'community',
      description: `${skillName} skill`,
      files: [
        { name: 'index.js', content: `// ${skillName} implementation` }
      ]
    };

    return skillData;
  } catch (error) {
    throw new Error(`Failed to download skill: ${error.message}`);
  }
}

// 安装 skill 到本地
function installSkill(skillData) {
  const skillPath = path.join(SKILLS_DIR, skillData.name);

  console.log(`📁 Installing to ${skillPath}...`);

  // 创建 skill 目录
  if (!fs.existsSync(skillPath)) {
    fs.mkdirSync(skillPath, { recursive: true });
  }

  // 保存 skill 元数据
  const metadataPath = path.join(skillPath, 'skill.json');
  fs.writeFileSync(metadataPath, JSON.stringify(skillData, null, 2));

  // 保存 skill 文件
  if (skillData.files) {
    skillData.files.forEach(file => {
      const filePath = path.join(skillPath, file.name);
      fs.writeFileSync(filePath, file.content);
    });
  }

  // 更新已安装列表
  const installedFile = path.join(SKILLS_DIR, 'installed.json');
  let installed = [];

  if (fs.existsSync(installedFile)) {
    installed = JSON.parse(fs.readFileSync(installedFile, 'utf8'));
  }

  // 检查是否已安装
  const existing = installed.find(s => s.name === skillData.name);
  if (!existing) {
    installed.push({
      name: skillData.name,
      version: skillData.version,
      installedAt: new Date().toISOString(),
      path: skillPath
    });
    fs.writeFileSync(installedFile, JSON.stringify(installed, null, 2));
  }

  console.log(`✓ ${skillData.name} installed successfully!`);
  console.log(`  Location: ${skillPath}`);
}

// 列出已安装的 skills
function listSkills() {
  const installedFile = path.join(SKILLS_DIR, 'installed.json');

  if (!fs.existsSync(installedFile)) {
    console.log('No skills installed yet.');
    return;
  }

  const installed = JSON.parse(fs.readFileSync(installedFile, 'utf8'));

  if (installed.length === 0) {
    console.log('No skills installed yet.');
    return;
  }

  console.log('\n📦 Installed Skills:\n');
  installed.forEach(skill => {
    console.log(`  ${skill.name}@${skill.version}`);
    console.log(`    Installed: ${skill.installedAt}`);
    console.log(`    Path: ${skill.path}\n`);
  });
}

// 卸载 skill
function uninstallSkill(skillName) {
  const installedFile = path.join(SKILLS_DIR, 'installed.json');

  if (!fs.existsSync(installedFile)) {
    console.log(`✗ Skill ${skillName} is not installed.`);
    return;
  }

  const installed = JSON.parse(fs.readFileSync(installedFile, 'utf8'));
  const skill = installed.find(s => s.name === skillName);

  if (!skill) {
    console.log(`✗ Skill ${skillName} is not installed.`);
    return;
  }

  console.log(`🗑️  Uninstalling ${skillName}...`);

  // 删除 skill 目录
  if (fs.existsSync(skill.path)) {
    fs.rmSync(skill.path, { recursive: true, force: true });
  }

  // 更新已安装列表
  const updated = installed.filter(s => s.name !== skillName);
  fs.writeFileSync(installedFile, JSON.stringify(updated, null, 2));

  console.log(`✓ ${skillName} uninstalled successfully!`);
}

// CLI 配置
program
  .name('claude-skills')
  .description('Claude Skills CLI - Install skills from command line')
  .version('1.0.0');

// install 命令
program
  .command('install <skillName>')
  .description('Install a skill')
  .action(async (skillName) => {
    try {
      ensureSkillsDir();
      const skillData = await downloadSkill(skillName);
      installSkill(skillData);
    } catch (error) {
      console.error(`✗ Error: ${error.message}`);
      process.exit(1);
    }
  });

// list 命令
program
  .command('list')
  .alias('ls')
  .description('List installed skills')
  .action(() => {
    ensureSkillsDir();
    listSkills();
  });

// uninstall 命令
program
  .command('uninstall <skillName>')
  .alias('remove')
  .description('Uninstall a skill')
  .action((skillName) => {
    try {
      ensureSkillsDir();
      uninstallSkill(skillName);
    } catch (error) {
      console.error(`✗ Error: ${error.message}`);
      process.exit(1);
    }
  });

// search 命令（将来实现）
program
  .command('search <query>')
  .description('Search for skills')
  .action((query) => {
    console.log(`🔍 Searching for: ${query}`);
    console.log('⚠️  Search feature coming soon!');
  });

program.parse(process.argv);

// 如果没有参数，显示帮助
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
