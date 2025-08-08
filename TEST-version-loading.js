(function debugVersions() {
    const TEST_VERSIONS = {
        '1.1.9': {
            date: '2024-11-20',
            changelog: 'v1.1.9版本更新 - 界面重构，性能提升30%',
            downloads: [
                { name: '百度网盘', link: '#', code: 'abcd' }
            ]
        },
        '1.1.8': {
            date: '2024-11-01',
            changelog: 'v1.1.8版本更新 - 支持多线程下载',
            downloads: [
                { name: '百度网盘', link: '#', code: 'efgh' }
            ]
        },
        '1.1.7': {
            date: '2024-10-15',
            changelog: 'v1.1.7版本更新 - 修复下载失败',
            downloads: [
                { name: '百度网盘', link: '#', code: 'ijkl' }
            ]
        }
    };

    // 强制立即显示版本
    function forceDisplayVersions() {
        const versions = Object.keys(TEST_VERSIONS);
        const latest = versions[0];
        
        // 更新主版本
        document.getElementById('main-version-content').innerHTML = `
            <div class="version-number">v${latest}</div>
            <div class="version-date">${TEST_VERSIONS[latest].date}</div>
            <div class="version-changelog mdui-text-color-secondary mdui-m-t-2">${TEST_VERSIONS[latest].changelog}</div>
        `;

        // 显示所有版本在历史区域
        const historyContainer = document.getElementById('history-list');
        historyContainer.innerHTML = `
            <div class="mdui-list">
                ${versions.map(version => `
                    <div class="mdui-list-item mdui-ripple">
                        <div class="mdui-list-item-content">
                            <div class="mdui-list-item-title">v${version}</div>
                            <div class="mdui-list-item-text mdui-text-color-secondary">${TEST_VERSIONS[version].date}</div>
                            <div class="mdui-list-item-text">${TEST_VERSIONS[version].changelog}</div>
                        </div>
                        <button class="mdui-btn mdui-ripple" 
                                onclick="alert('下载v${version}')">下载</button>
                    </div>
                `).join('')}
            </div>
        `;
        historyContainer.parentElement.classList.remove('mdui-hidden');
    }

    // 直接执行
    forceDisplayVersions();
    console.log('所有版本已强制显示完成');
})()