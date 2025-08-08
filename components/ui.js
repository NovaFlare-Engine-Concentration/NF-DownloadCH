// NF下载站 UI组件库
// 提供常用的界面组件

// 创建卡片组件
/**
 * 创建文件卡片组件
 * @param {object} fileData - 文件数据
 * @param {HTMLElement} container - 容器元素
 */
function createFileCard(fileData, container) {
    const card = document.createElement("div");
    card.className = "mdui-card mdui-m-b-2";

    card.innerHTML = `
        <div class="mdui-card-media">
            <img src="${fileData.thumbnail || 'https://via.placeholder.com/300x200'}" />
            <div class="mdui-card-media-covered">
                <div class="mdui-card-primary">
                    <div class="mdui-card-primary-title">${fileData.name || "未知文件"}</div>
                    <div class="mdui-card-primary-subtitle">${formatFileSize(fileData.size || 0)} • ${formatDate(fileData.uploadDate)}</div>
                </div>
            </div>
        </div>
        <div class="mdui-card-content">
            <p>${fileData.description || "暂无描述"}</p>
        </div>
        <div class="mdui-card-actions">
            <div class="mdui-card-actions-buttons">
                <button class="mdui-btn mdui-ripple mdui-btn-icon" onclick="previewFile('${fileData.id}')">
                    <i class="mdui-icon material-icons">visibility</i>
                </button>
                <button class="mdui-btn mdui-ripple mdui-btn-icon" onclick="downloadFile('${fileData.id}')">
                    <i class="mdui-icon material-icons">file_download</i>
                </button>
            </div>
            <div class="mdui-card-actions-spacer"></div>
            <button class="mdui-btn mdui-ripple" onclick="showFileDetails('${fileData.id}')">
                详情
            </button>
        </div>
    `;

    container.appendChild(card);
}

// 创建对话框组件
/**
 * 创建自定义对话框
 * @param {string} title - 标题
 * @param {string} content - 内容
 * @param {object} options - 配置选项
 * @returns {HTMLElement} 对话框元素
 */
function createDialog(title, content, options = {}) {
    const dialog = document.createElement("div");
    dialog.className = "mdui-dialog";

    const buttons = options.buttons || [
        {
            text: "确定",
            bold: false,
            onClick: () => {}
        }
    ];

    const buttonsHtml = buttons.map(btn => 
        `<button class="mdui-btn mdui-ripple ${btn.className || ''}" ${btn.bold ? 'style="font-weight: bold;"' : ''} mdui-dialog-close>${btn.text}</button>`
    ).join("");

    dialog.innerHTML = `
        <div class="mdui-dialog-title">${title}</div>
        <div class="mdui-dialog-content">
            ${content}
        </div>
        <div class="mdui-dialog-actions">
            ${buttonsHtml}
        </div>
    `;

    document.body.appendChild(dialog);

    // 初始化对话框
    const inst = new mdui.Dialog(dialog, {
        history: options.history !== false,
        overlay: options.overlay !== false
    });

    // 绑定按钮点击事件
    buttons.forEach((btn, index) => {
        if (btn.onClick) {
            const btnElement = dialog.querySelectorAll(".mdui-dialog-actions button")[index];
            if (btnElement) {
                btnElement.addEventListener("click", () => {
                    btn.onClick();
                });
            }
        }
    });

    return dialog;
}

// 创建加载提示组件
/**
 * 创建加载提示
 * @param {string} message - 提示信息
 * @returns {HTMLElement} 加载提示元素
 */
function createLoading(message = "加载中...") {
    const loading = document.createElement("div");
    loading.className = "mdui-container mdui-center mdui-text-center";
    loading.innerHTML = `
        <div class="mdui-spinner mdui-spinner-colorful mdui-spinner-active" style="width: 40px; height: 40px;"></div>
        <div class="mdui-typo-body-1">${message}</div>
    `;

    return loading;
}

// 创建提示框组件
/**
 * 显示提示框
 * @param {string} message - 提示信息
 * @param {string} type - 提示类型: "info", "success", "warning", "error"
 * @param {object} options - 配置选项
 */
function showToast(message, type = "info", options = {}) {
    const icons = {
        info: "info",
        success: "check_circle",
        warning: "warning",
        error: "error"
    };

    const colors = {
        info: "blue",
        success: "green",
        warning: "orange",
        error: "red"
    };

    const toast = document.createElement("div");
    toast.className = `mdui-toast mdui-toast-${colors[type]} mdui-center`;
    toast.innerHTML = `
        <i class="mdui-icon material-icons">${icons[type]}</i>
        <div class="mdui-toast-text">${message}</div>
    `;

    document.body.appendChild(toast);

    const inst = new mdui.Toast(toast, {
        position: options.position || "bottom",
        timeout: options.timeout || 3000
    });

    inst.open();

    return toast;
}

// 创建下拉菜单组件
/**
 * 创建下拉菜单
 * @param {HTMLElement} trigger - 触发元素
 * @param {array} items - 菜单项数组
 * @param {object} options - 配置选项
 * @returns {HTMLElement} 下拉菜单元素
 */
function createMenu(trigger, items, options = {}) {
    const menu = document.createElement("div");
    menu.className = "mdui-menu";

    const itemsHtml = items.map(item => {
        if (item.divider) {
            return '<div class="mdui-menu-divider"></div>';
        }

        return `
            <a href="${item.href || "javascript:;"}" class="mdui-ripple ${item.disabled ? "mdui-menu-item-disabled" : ""}" ${item.disabled ? "disabled" : ""}>
                ${item.icon ? `<i class="mdui-menu-item-icon mdui-icon material-icons">${item.icon}</i>` : ""}
                ${item.text}
            </a>
        `;
    }).join("");

    menu.innerHTML = itemsHtml;

    document.body.appendChild(menu);

    // 初始化下拉菜单
    const inst = new mdui.Menu(menu, {
        trigger: trigger,
        align: options.align || "left",
        gutter: options.gutter || 0,
        fixed: options.fixed !== false,
        coverTrigger: options.coverTrigger !== false
    });

    // 绑定菜单项点击事件
    menu.querySelectorAll("a:not([disabled])").forEach((item, index) => {
        item.addEventListener("click", () => {
            if (items[index].onClick) {
                items[index].onClick();
            }

            if (options.closeOnClick !== false) {
                inst.close();
            }
        });
    });

    return menu;
}

// 创建选项卡组件
/**
 * 创建选项卡组件
 * @param {array} tabs - 选项卡数组
 * @param {HTMLElement} container - 容器元素
 * @returns {HTMLElement} 选项卡元素
 */
function createTabs(tabs, container) {
    const tabsElement = document.createElement("div");
    tabsElement.className = "mdui-tabs";

    const tabsHeader = document.createElement("div");
    tabsHeader.className = "mdui-tabs-header";

    const tabsContent = document.createElement("div");
    tabsContent.className = "mdui-tabs-content";

    tabs.forEach((tab, index) => {
        // 创建选项卡标题
        const tabTitle = document.createElement("a");
        tabTitle.className = `mdui-ripple ${index === 0 ? "mdui-tabs-active" : ""}`;
        tabTitle.href = `#${tab.id}`;
        tabTitle.innerHTML = tab.title;
        tabsHeader.appendChild(tabTitle);

        // 创建选项卡内容
        const tabContent = document.createElement("div");
        tabContent.className = `mdui-p-a-2 ${index === 0 ? "mdui-tabs-panel-active" : "mdui-tabs-panel"}`;
        tabContent.id = tab.id;
        tabContent.innerHTML = tab.content;
        tabsContent.appendChild(tabContent);
    });

    tabsElement.appendChild(tabsHeader);
    tabsElement.appendChild(tabsContent);

    container.appendChild(tabsElement);

    // 初始化选项卡
    const inst = new mdui.Tabs(tabsElement);

    return tabsElement;
}

// 导出UI组件
window.NFUI = {
    createFileCard,
    createDialog,
    createLoading,
    showToast,
    createMenu,
    createTabs
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log("NF下载站 UI组件库已加载");
});
