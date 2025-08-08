// 完全修复 - 版本直接显示
const VERSIONS_DATA = {
    '1.1.9': {
        date: '2024-11-20',
        changelog: 'v1.1.9 功能升级 - 界面重构，性能提升30%',
        downloads: [
            { name: '百度网盘', link: '#', code: 'abcd1' },
            { name: '蓝奏云', link: '#', code: '' }
        ]
    },
    '1.1.8': {
        date: '2024-11-01', 
        changelog: 'v1.1.8 性能优化 - 多线程下载支持，内存减少50%',
        downloads: [
            { name: '百度网盘', link: '#', code: 'efgh' }
        ]
    },
    '1.1.7': {
        date: '2024-10-15',
        changelog: 'v1.1.7 修复版本 - 解决下载失败，响应速度提升',
        downloads: [
            { name: '百度网盘', link: '#', code: 'ijkl' }
        ]
    }
};

// 直接显示所有版本
window.displayAllVersions = function() {
    const versions = Object.keys(VERSIONS_DATA).sort((a, b) => b.localeCompare(a));
    
    // 主版本
    const mainEl = document.getElementById('main-version-content') || document.querySelector('.current-version');
    if (mainEl) {
        const latest = VERSIONS_DATA[versions[0]];
        mainEl.innerHTML = `
            <div class="version-number" style="font-size: 24px; font-weight: bold; color: var(--primary-color)">v${versions[0]}</div>
            <div style="color: #666; margin: 8px 0; font-size: 14px">${latest.date}</div>
            <div style="color: var(--text-secondary)">${latest.changelog}</div>
        `;
    }
    
    // 历史版本
    const historyEl = document.getElementById('history-list');
    if (historyEl) {
        historyEl.innerHTML = `<div class="mdui-list">
            ${versions.map(version => {
                const data = VERSIONS_DATA[version];
                return `
                <div class="mdui-list-item">
                    <div class="mdui-list-item-content">
                        <div class="mdui-list-item-title">v${version}</div>
                        <div class="mdui-list-item-text mdui-text-color-secondary">${data.date}</div>
                        <div class="mdui-list-item-text">${data.changelog}</div>
                    </div>
                <button class="mdui-btn mdui-ripple" 
                        onclick="window.selectVersion('${version}')">下载</button></div>`;
            }).join('')}
        </div>`;
        historyEl.parentElement.classList.remove('mdui-hidden');
    }
    
    console.log('✅ 版本显示完成:', versions);
};

// 夜间模式支持
function initTheme() {
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        document.body.classList.toggle('mdui-theme-layout-dark');
    });
}

// 直接执行版本显示
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        window.displayAllVersions();
        initTheme();
    }, 100);
});

// 版本选择
define:window.selectVersion = function(version) {
    const data = VERSIONS_DATA[version];
    if (data && data.downloads) {
        const dialog = new mdui.Dialog('#cloud-dialog');
        const container = document.querySelector('.cloud-options');
        container.innerHTML = data.downloads.map((link, i) => `
            <label class="mdui-radio mdui-m-b-2">
                <input type="radio" name="cloud-provider" value="${i}" ${i===0?'checked':''}>
                <i class="mdui-radio-icon"></i>${link.name}${link.code ? ` (${link.code})` : ''}
            </label>`).join('');
        
        window.currentVersion = version;
        window.currentLinks = data.downloads;
        dialog.open();
    }
};

window.startDownload = function() {
    if (window.currentLinks) {
        const index = document.querySelector('input[name="cloud-provider"]:checked')?.value;
        const code = document.getElementById('extract-code')?.value || '';
        
        if (index !== undefined) {
            window.open('#下载页面', '_blank');
            mdui.snackbar({message: `开始下载 v${window.currentVersion}`});
        }
    }
};

// 确保立即加载
setTimeout(() => {
    if (typeof mdui !== 'undefined') {
        window.displayAllVersions();
    }
}, 0);