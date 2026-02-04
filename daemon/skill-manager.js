const fs = require('fs');
const path = require('path');
const { CONFIG } = require('./config');

class SkillManager {
    constructor() {
        this.skillsDir = CONFIG.SKILLS_DIR;
        this.installedSkillsFile = path.join(this.skillsDir, 'installed.json');
        this.ensureInstalledFile();
    }

    ensureInstalledFile() {
        if (!fs.existsSync(this.installedSkillsFile)) {
            fs.writeFileSync(this.installedSkillsFile, JSON.stringify([], null, 2));
        }
    }

    // 获取已安装的 skills
    getInstalledSkills() {
        try {
            const data = fs.readFileSync(this.installedSkillsFile, 'utf8');
            return JSON.parse(data);
        } catch (err) {
            console.error('[SkillManager] Failed to read installed skills:', err.message);
            return [];
        }
    }

    // 检查 skill 是否已安装
    isInstalled(skillId) {
        const installed = this.getInstalledSkills();
        return installed.some(s => s.id === skillId);
    }

    // 安装 skill
    async installSkill(skillData) {
        const { id, name, author, version, files } = skillData;

        if (this.isInstalled(id)) {
            throw new Error(`Skill ${name} is already installed`);
        }

        // 创建 skill 目录
        const skillDir = path.join(this.skillsDir, `${author}_${name.toLowerCase().replace(/\s+/g, '-')}`);
        if (!fs.existsSync(skillDir)) {
            fs.mkdirSync(skillDir, { recursive: true });
        }

        // 保存 skill 元数据
        const metadataPath = path.join(skillDir, 'skill.json');
        fs.writeFileSync(metadataPath, JSON.stringify(skillData, null, 2));

        // 模拟保存 skill 文件（实际应该从远程下载）
        if (files && files.length > 0) {
            files.forEach(file => {
                const filePath = path.join(skillDir, file.name);
                fs.writeFileSync(filePath, file.content || '// Skill implementation');
            });
        } else {
            // 默认创建一个空的实现文件
            const mainFile = path.join(skillDir, 'index.js');
            fs.writeFileSync(mainFile, `// ${name} Skill Implementation\nconsole.log('${name} skill loaded');`);
        }

        // 更新已安装列表
        const installed = this.getInstalledSkills();
        installed.push({
            id,
            name,
            author,
            version,
            installedAt: new Date().toISOString(),
            path: skillDir
        });
        fs.writeFileSync(this.installedSkillsFile, JSON.stringify(installed, null, 2));

        console.log(`[SkillManager] Successfully installed: ${name}`);
        return { success: true, message: `Skill ${name} installed successfully`, path: skillDir };
    }

    // 卸载 skill
    uninstallSkill(skillId) {
        const installed = this.getInstalledSkills();
        const skill = installed.find(s => s.id === skillId);

        if (!skill) {
            throw new Error(`Skill with ID ${skillId} is not installed`);
        }

        // 删除 skill 目录
        if (fs.existsSync(skill.path)) {
            fs.rmSync(skill.path, { recursive: true, force: true });
        }

        // 更新已安装列表
        const updatedInstalled = installed.filter(s => s.id !== skillId);
        fs.writeFileSync(this.installedSkillsFile, JSON.stringify(updatedInstalled, null, 2));

        console.log(`[SkillManager] Successfully uninstalled: ${skill.name}`);
        return { success: true, message: `Skill ${skill.name} uninstalled successfully` };
    }

    // 获取 skill 详情
    getSkillDetails(skillId) {
        const installed = this.getInstalledSkills();
        const skill = installed.find(s => s.id === skillId);

        if (!skill) {
            return null;
        }

        // 读取完整的元数据
        const metadataPath = path.join(skill.path, 'skill.json');
        if (fs.existsSync(metadataPath)) {
            const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
            return { ...skill, ...metadata };
        }

        return skill;
    }

    // 更新 skill
    async updateSkill(skillId, newData) {
        // 先卸载旧版本
        this.uninstallSkill(skillId);
        // 安装新版本
        return await this.installSkill(newData);
    }
}

module.exports = SkillManager;
