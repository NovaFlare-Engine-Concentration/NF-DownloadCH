// 网站配置
const SITE_CONFIG = {
    COPYRIGHT: '© 2024-2025 NF下载站 版权所有',
    POWERED_BY: 'Powered by NovaFlare-Engine-Dev',
    AUTHOR: 'NF团队',
    VERSION: '1.0.0'
};

// 版本配置 - 所有版本数据集中管理
/**
 * 网站配置对象 - 集中管理所有版本数据和配置信息
 * @type {object}
 */
const CONFIG = {
    /**
     * 版本数据集合 - 包含所有NovaFlare-Engine版本信息
     * @type {object}
     */
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
    }
};

// 处理changelog换行
function formatChangelog(text) {
    if (!text) return '';
    
    // 处理各种换行符格式
    let formatted = String(text);
    
    // 处理转义的换行符
    formatted = formatted.replace(/\\n/g, '\n');
    formatted = formatted.replace(/\\r/g, '');
    
    // 处理 HTML 换行标签
    formatted = formatted.replace(/<br\s*\/?>/gi, '\n');
    formatted = formatted.replace(/<p>/gi, '');
    formatted = formatted.replace(/<\/p>/gi, '\n');
    formatted = formatted.replace(/<div>/gi, '');
    formatted = formatted.replace(/<\/div>/gi, '\n');
    
    // 处理多个连续空格
    formatted = formatted.replace(/ {2,}/g, ' ');
    
    // 保留换行符，并确保它们被正确显示
    formatted = formatted.replace(/\n\s*\n/g, '\n\n');
    
    // 处理特殊字符
    formatted = formatted.replace(/&nbsp;/g, ' ');
    formatted = formatted.replace(/&lt;/g, '<');
    formatted = formatted.replace(/&gt;/g, '>');
    formatted = formatted.replace(/&amp;/g, '&');
    
    return formatted;
}

// 全局状态
const state = {
    versions: {},
    latestVersion: '',
    currentDialog: null,
    nightMode: false
};

// 入口函数
document.addEventListener('DOMContentLoaded', init);

// 页面加载完成后隐藏过渡动画
window.addEventListener('load', function() {
    // 延迟几秒后隐藏加载屏幕，给用户足够的时间看到动画
    setTimeout(function() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        
        // 使用配置中的版权信息更新页面
        updateFooterContent();
    }, 2000); // 2秒后隐藏
});

// 更新页脚内容
function updateFooterContent() {
    const copyrightEl = document.getElementById('copyright-text');
    const poweredByEl = document.getElementById('powered-by-text');
    
    if (copyrightEl && SITE_CONFIG.COPYRIGHT) {
        copyrightEl.textContent = SITE_CONFIG.COPYRIGHT;
    }
    
    if (poweredByEl && SITE_CONFIG.POWERED_BY) {
        poweredByEl.textContent = SITE_CONFIG.POWERED_BY;
    }
}

async function init() {
    setupTheme();
    preloadVersions();
    registerEvents();
}

// 主题管理
function setupTheme() {
    const savedTheme = localStorage.getItem('nightMode') === 'true';
    state.nightMode = savedTheme;
    
    if (state.nightMode) {
        document.body.classList.add('mdui-theme-layout-dark');
    }
    
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
}

function toggleTheme() {
    state.nightMode = !state.nightMode;
    document.body.classList.toggle('mdui-theme-layout-dark');
    localStorage.setItem('nightMode', state.nightMode);
}

// 加载版本数据
function preloadVersions() {
    state.versions = CONFIG.VERSIONS;
    renderVersions();
}

// 渲染版本界面
function renderVersions() {
    const versions = Object.keys(state.versions).sort((a, b) => b.localeCompare(a));
    
    if (versions.length === 0) return;

    state.latestVersion = versions[0];
    const historyVersions = versions;

    // 更新主版本显示
    const mainVersionEl = document.querySelector('#main-version-content');
    if (mainVersionEl) {
        const latestData = state.versions[state.latestVersion];
        mainVersionEl.innerHTML = `
            <div class="version-number">v${state.latestVersion}</div>
            ${latestData.date ? `<div class="version-date">${latestData.date}</div>` : ''}
            ${latestData.changelog ? `<div class="version-changelog mdui-text-color-secondary mdui-m-t-2" style="white-space: pre-wrap;">${formatChangelog(latestData.changelog)}</div>` : ''}
        `;
    }

    // 显示多版本选择
    const versionsContainer = document.createElement('div');
    versionsContainer.className = 'mdui-card mdui-shadow-3 version-card mdui-m-t-2';
    versionsContainer.innerHTML = `
        <div class="mdui-card-content">
            <div class="mdui-typo-title mdui-text-color-theme">选择版本</div>
            <div class="mdui-list">
                ${historyVersions.map(version => {
                    const data = state.versions[version];
                    const isLatest = version === state.latestVersion;
                    return `
                        <div class="mdui-list-item ${isLatest ? 'mdui-list-item-active' : ''}">
                            <div class="mdui-list-item-content">
                                <div class="mdui-list-item-title ${isLatest ? 'mdui-text-color-theme' : ''}">
                                    v${version} ${isLatest ? '(最新)' : ''}
                                </div>
                                ${data.date ? `<div class="mdui-list-item-text mdui-text-color-secondary">${data.date}</div>` : ''}
                                ${data.changelog ? `<div class="mdui-list-item-text" style="white-space: pre-wrap;">${formatChangelog(data.changelog)}</div>` : ''}
                            </div>
                            <button class="mdui-btn mdui-ripple" onclick="showCloudVersions('${version}')">下载</button>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
    
    // 插入到主版本卡片之后
    const mainVersionCard = document.querySelector('.version-card');
    if (mainVersionCard && versionsContainer) {
        mainVersionCard.insertAdjacentElement('afterend', versionsContainer);
    }
}

// 云盘选择对话
function showCloudVersions(version) {
    const data = state.versions[version];
    if (!data) return;

    state.currentDialog = new mdui.Dialog('#cloud-dialog');
    
    const title = document.querySelector('#cloud-version');
    if (title) title.textContent = `NF引擎 v${version}`;
    
    const container = document.querySelector('.cloud-options');
    if (container) {
        container.innerHTML = data.downloads.map((opt, i) => {
            // 为每个云盘添加标签，支持多个标签
            const tags = Array.isArray(opt.tags) ? opt.tags : [];
            
            // 生成标签HTML
            const tagsHtml = tags.map(tag => {
                const tagClass = tag.class || 'tag-blue';
                const tagText = tag.text || '';
                return tagText ? `<span class="cloud-tag ${tagClass}">${tagText}</span>` : '';
            }).join('');
            
            return `
                <label class="mdui-radio mdui-m-b-2">
                    <input type="radio" name="cloud-provider" value="${i}" ${i===0?'checked':''}>
                    <i class="mdui-radio-icon"></i>
                    ${opt.name}
                    ${tagsHtml}
                    ${opt.code ? ` (${opt.code})` : ''}
                </label>
            `;
        }).join('');
    }
    
    window.currentVersion = version;
    window.currentLinks = data.downloads;
    state.currentDialog.open();
}

// 开始下载 - 直接跳转
function startDownload() {
    if (!window.currentVersion || !window.currentLinks) return;

    const version = window.currentVersion;
    const cloudLinks = window.currentLinks;
    const selectedIndex = document.querySelector('input[name="cloud-provider"]:checked')?.value;

    if (selectedIndex === undefined) {
        mdui.snackbar({ message: '请选择一个下载方式' });
        return;
    }

    const linkData = cloudLinks[selectedIndex];
    let finalLink = linkData.link;



    // 淡出问题后跳转
    state.currentDialog.close();
    
    // 创建并显示加载动画
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="mdui-center">
            <div class="mdui-spinner mdui-spinner-colorful mdui-spinner-active" style="width: 64px; height: 64px;"></div>
            <div class="mdui-typo-title mdui-text-color-theme mdui-m-t-2">正在跳转至${linkData.name}...</div>
        </div>
    `;
    document.body.appendChild(loadingOverlay);
    
    // 淡入效果
    setTimeout(() => {
        loadingOverlay.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        window.open(finalLink, '_blank', 'noopener,noreferrer');
        mdui.snackbar({ message: `v${version} 已跳转到 ${linkData.name}` });
        delete window.currentCloudData;
        
        // 淡出效果
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingOverlay);
        }, 300);
    }, 1200);
}

// 事件注册
function registerEvents() {
    document.querySelector('.mdui-fab-fixed')?.remove(); // 移除不必要的浮动按钮
}

// 全局函数（保持兼容性）
window.showCloudDialog = showCloudVersions;

// 简单的错误处理
window.onerror = function(msg, url, line) {
    console.log('⚠️ 错误:', msg);
};

// 底部加载动画控制函数
function showFooterLoading() {
    const footerLoading = document.getElementById('footer-loading');
    if (footerLoading) {
        footerLoading.style.display = "block";
    }
}

function hideFooterLoading() {
    const footerLoading = document.getElementById('footer-loading');
    if (footerLoading) {
        footerLoading.style.display = "none";
    }
}

// 确保版本初始化
setTimeout(() => {
    if (Object.keys(state.versions).length === 0) {
        state.versions = CONFIG.VERSIONS;
        renderVersions();
    }

}, 50);
