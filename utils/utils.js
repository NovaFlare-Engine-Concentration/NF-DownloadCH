// NF下载站 工具函数库
// 提供各种实用功能函数

// 格式化文件大小
/**
 * 格式化文件大小为易读格式
 * @param {number} bytes - 字节数
 * @returns {string} 格式化后的大小字符串
 */
function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// 格式化日期
/**
 * 格式化日期为易读格式
 * @param {Date|string|number} date - 日期对象、时间戳或日期字符串
 * @returns {string} 格式化后的日期字符串
 */
function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const seconds = String(d.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// 生成随机字符串
/**
 * 生成指定长度的随机字符串
 * @param {number} length - 字符串长度
 * @returns {string} 随机字符串
 */
function generateRandomString(length = 8) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
}

// 防抖函数
/**
 * 创建防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} delay - 延迟时间(毫秒)
 * @returns {Function} 防抖后的函数
 */
function debounce(func, delay = 300) {
    let timeoutId;

    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// 节流函数
/**
 * 创建节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 时间限制(毫秒)
 * @returns {Function} 节流后的函数
 */
function throttle(func, limit = 300) {
    let inThrottle;

    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 本地存储工具
const storageUtils = {
    /**
     * 保存数据到本地存储
     * @param {string} key - 键名
     * @param {any} value - 值
     */
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error("保存到本地存储失败:", error);
            mdui.snackbar({
                message: "保存设置失败",
                position: "bottom",
                timeout: 3000
            });
        }
    },

    /**
     * 从本地存储获取数据
     * @param {string} key - 键名
     * @param {any} defaultValue - 默认值
     * @returns {any} 存储的值或默认值
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error("从本地存储获取数据失败:", error);
            return defaultValue;
        }
    },

    /**
     * 从本地存储删除数据
     * @param {string} key - 键名
     */
    remove(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error("从本地存储删除数据失败:", error);
        }
    }
};

// URL参数解析
/**
 * 解析URL查询参数
 * @returns {object} 参数对象
 */
function parseUrlParams() {
    const params = {};
    const queryString = window.location.search.substring(1);
    const pairs = queryString.split("&");

    pairs.forEach(pair => {
        const [key, value] = pair.split("=");
        params[decodeURIComponent(key)] = decodeURIComponent(value || "");
    });

    return params;
}

// 复制文本到剪贴板
/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} 复制是否成功
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text)
            .then(() => {
                mdui.snackbar({
                    message: "已复制到剪贴板",
                    position: "bottom",
                    timeout: 3000
                });
                return true;
            })
            .catch(err => {
                console.error("复制到剪贴板失败:", err);
                mdui.snackbar({
                    message: "复制失败",
                    position: "bottom",
                    timeout: 3000
                });
                return false;
            });
    } else {
        // 兼容不支持Clipboard API的浏览器
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand("copy");
            document.body.removeChild(textArea);

            if (successful) {
                mdui.snackbar({
                    message: "已复制到剪贴板",
                    position: "bottom",
                    timeout: 3000
                });
                return true;
            } else {
                mdui.snackbar({
                    message: "复制失败",
                    position: "bottom",
                    timeout: 3000
                });
                return false;
            }
        } catch (err) {
            document.body.removeChild(textArea);
            console.error("复制到剪贴板失败:", err);
            mdui.snackbar({
                message: "复制失败",
                position: "bottom",
                timeout: 3000
            });
            return false;
        }
    }
}

// 检查设备类型
/**
 * 检查设备类型
 * @returns {string} 设备类型: "mobile", "tablet" 或 "desktop"
 */
function getDeviceType() {
    const width = window.innerWidth;

    if (width <= 768) {
        return "mobile";
    } else if (width <= 1024) {
        return "tablet";
    } else {
        return "desktop";
    }
}

// 检查是否为移动设备
/**
 * 检查是否为移动设备
 * @returns {boolean} 是否为移动设备
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 768;
}

// 检查网络连接状态
/**
 * 检查网络连接状态
 * @returns {boolean} 是否在线
 */
function isOnline() {
    return navigator.onLine;
}

// 导出工具函数
window.NFUtils = {
    formatFileSize,
    formatDate,
    generateRandomString,
    debounce,
    throttle,
    storageUtils,
    parseUrlParams,
    copyToClipboard,
    getDeviceType,
    isMobile,
    isOnline
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log("NF下载站 工具函数库已加载");
});
