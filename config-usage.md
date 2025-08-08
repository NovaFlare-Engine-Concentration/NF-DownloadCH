# CONFIG 对象使用说明

## 概述

`CONFIG` 对象是NF下载站的核心配置文件，集中管理所有版本数据和配置信息。本文件详细说明了如何使用和修改这个配置对象。

## 结构说明

```javascript
const CONFIG = {
    VERSIONS: {
        '版本号': {
            date: '发布日期',
            changelog: '更新日志',
            downloads: [
                {
                    name: '下载平台名称',
                    link: '下载链接',
                    code: '提取码',
                    tags: [
                        { class: '标签类名', text: '标签文本' }
                    ]
                }
                // 更多下载链接...
            ]
        }
        // 更多版本...
    }
}
```

## 如何添加新版本

要添加新版本，请按照以下步骤操作：

1. 在 `CONFIG.VERSIONS` 对象中添加新版本，使用版本号作为键：

```javascript
'1.2.0': {
    date: '2025-6-15',
    changelog: '更新内容...',
    downloads: [
        // 下载链接配置...
    ]
}
```

2. **日期格式**：使用 `YYYY-M-D` 格式，例如：`'2025-6-15'`

3. **更新日志**：可以是字符串或模板字符串，支持多行文本

4. **下载链接**：每个版本可以配置多个下载渠道，每个渠道包含以下信息：
   - `name`: 下载平台名称，如"小飞机网盘"、"123网盘"等
   - `link`: 下载链接地址
   - `code`: 提取码（如果没有提取码则为空字符串）
   - `tags`: 标签数组，用于描述下载特点，每个标签包含：
     - `class`: 标签样式类名，如'tag-blue'、'tag-green'等
     - `text`: 标签显示文本，如'推荐'、'高速'等

## 标签说明

可用的标签类名及其含义：

- `tag-blue`: 蓝色标签，通常用于"推荐"
- `tag-green`: 绿色标签，通常用于"稳定"、"高速"、"免登录"等正面特性
- `tag-orange`: 橙色标签，通常用于"备用"、"不限速"等中性特性
- `tag-red`: 红色标签，通常用于"需登录"等限制条件
- `tag-purple`: 紫色标签，通常用于"需国外环境"等特殊条件

## 如何获取版本数据

在JavaScript代码中，可以通过以下方式访问版本数据：

```javascript
// 获取所有版本
const allVersions = CONFIG.VERSIONS;

// 获取特定版本
const specificVersion = CONFIG.VERSIONS['1.1.8H'];

// 获取版本发布日期
const versionDate = CONFIG.VERSIONS['1.1.8H'].date;

// 获取更新日志
const changelog = CONFIG.VERSIONS['1.1.8H'].changelog;

// 获取下载链接
const downloads = CONFIG.VERSIONS['1.1.8H'].downloads;
```

## 在UI中使用版本数据

以下是如何在UI中使用版本数据的示例：

```javascript
// 渲染版本列表
function renderVersionList() {
    const container = document.getElementById('version-list');
    container.innerHTML = '';

    // 按版本号排序（降序）
    const sortedVersions = Object.keys(CONFIG.VERSIONS).sort((a, b) => {
        // 简单的版本号比较逻辑
        return compareVersions(b, a);
    });

    sortedVersions.forEach(version => {
        const versionData = CONFIG.VERSIONS[version];
        const versionElement = document.createElement('div');
        versionElement.className = 'version-item mdui-card mdui-m-b-2';

        // 构建标签HTML
        const tagsHtml = versionData.downloads[0].tags.map(tag => 
            `<span class="mdui-chip ${tag.class}">
                <span class="mdui-chip-title">${tag.text}</span>
            </span>`
        ).join('');

        versionElement.innerHTML = `
            <div class="mdui-card-primary">
                <div class="mdui-card-primary-title">${version}</div>
                <div class="mdui-card-primary-subtitle">${versionData.date}</div>
            </div>
            <div class="mdui-card-content">
                <p>${versionData.changelog}</p>
            </div>
            <div class="mdui-card-actions">
                <div class="mdui-card-actions-buttons">
                    ${tagsHtml}
                </div>
                <div class="mdui-card-actions-spacer"></div>
                <button class="mdui-btn mdui-ripple mdui-btn-icon" onclick="showDownloadOptions('${version}')">
                    <i class="mdui-icon material-icons">file_download</i>
                </button>
            </div>
        `;

        container.appendChild(versionElement);
    });
}

// 显示下载选项
function showDownloadOptions(version) {
    const versionData = CONFIG.VERSIONS[version];
    let optionsHtml = '';

    versionData.downloads.forEach((download, index) => {
        optionsHtml += `
            <div class="mdui-list-item mdui-ripple">
                <div class="mdui-list-item-icon">
                    <i class="mdui-icon material-icons">cloud_download</i>
                </div>
                <div class="mdui-list-item-content">${download.name}</div>
                <div class="mdui-list-item-action">
                    <button class="mdui-btn mdui-btn-icon" onclick="downloadFile('${version}', ${index})">
                        <i class="mdui-icon material-icons">get_app</i>
                    </button>
                </div>
            </div>
        `;
    });

    const dialog = new mdui.Dialog({
        title: `下载 ${version}`,
        content: optionsHtml,
        buttons: [
            {
                text: '关闭'
            }
        ]
    });

    dialog.open();
}

// 下载文件
function downloadFile(version, downloadIndex) {
    const versionData = CONFIG.VERSIONS[version];
    const download = versionData.downloads[downloadIndex];

    // 这里实现实际的下载逻辑
    window.open(download.link, '_blank');

    // 显示提示
    mdui.snackbar({
        message: `正在从 ${download.name} 下载 ${version}...`,
        position: 'bottom',
        timeout: 3000
    });
}
```

## 版本比较函数

以下是一个简单的版本号比较函数实现：

```javascript
/**
 * 比较两个版本号
 * @param {string} a - 第一个版本号
 * @param {string} b - 第二个版本号
 * @returns {number} - 如果a > b返回1，a < b返回-1，相等返回0
 */
function compareVersions(a, b) {
    const aParts = a.split('.').map(Number);
    const bParts = b.split('.').map(Number);

    for (let i = 0; i < Math.max(aParts.length, bParts.length); i++) {
        const aPart = aParts[i] || 0;
        const bPart = bParts[i] || 0;

        if (aPart > bPart) return 1;
        if (aPart < bPart) return -1;
    }

    return 0;
}
```

## 注意事项

1. 添加新版本时，请确保版本号格式一致（如：主版本号.次版本号.修订号）
2. 下载链接应定期检查，确保有效性
3. 标签类名应使用预定义的样式，保持UI一致性
4. 更新日志应简洁明了，突出重点更新内容

## 最佳实践

1. **版本号管理**：遵循语义化版本规范（SemVer）
   - 主版本号：不兼容的API修改
   - 次版本号：向下兼容的功能性新增
   - 修订号：向下兼容的问题修正

2. **更新日志**：使用清晰的格式，如：
   - 功能性更新：新增、改进、优化
   - 问题修复：修复、解决
   - 破坏性变更：注意、警告

3. **下载链接**：提供多个下载渠道，增加下载成功率
   - 主力下载渠道（如小飞机网盘）
   - 备用下载渠道（如123网盘）
   - 开源直链（如GitHub）
