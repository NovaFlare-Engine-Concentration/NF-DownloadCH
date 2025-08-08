// NF下载站 API模块
// 提供与后端服务器交互的功能

// API基础配置
const API_BASE_URL = "https://api.nfdownload.com/v1"; // 实际使用时替换为真实的API地址
const API_TIMEOUT = 10000; // 10秒超时

// 通用API请求函数
/**
 * 发送API请求
 * @param {string} endpoint - API端点
 * @param {string} method - HTTP方法 (GET, POST, PUT, DELETE)
 * @param {object} data - 请求数据
 * @param {object} headers - 自定义请求头
 * @returns {Promise} 返回Promise对象
 */
function apiRequest(endpoint, method = "GET", data = null, headers = {}) {
    return new Promise((resolve, reject) => {
        // 显示加载动画
        showFooterLoading();

        const url = `${API_BASE_URL}${endpoint}`;
        const options = {
            method: method,
            headers: {
                "Content-Type": "application/json",
                ...headers
            },
            timeout: API_TIMEOUT
        };

        // 如果有请求数据，添加到请求体
        if (data) {
            options.body = JSON.stringify(data);
        }

        fetch(url, options)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP错误! 状态: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                // 隐藏加载动画
                hideFooterLoading();
                resolve(result);
            })
            .catch(error => {
                // 隐藏加载动画
                hideFooterLoading();
                console.error("API请求错误:", error);
                mdui.snackbar({
                    message: `请求失败: ${error.message}`,
                    position: "bottom",
                    timeout: 3000
                });
                reject(error);
            });
    });
}

// 文件相关API
const fileAPI = {
    /**
     * 获取文件列表
     * @param {number} page - 页码
     * @param {number} limit - 每页数量
     * @returns {Promise} 返回文件列表
     */
    getFileList(page = 1, limit = 20) {
        return apiRequest(`/files?page=${page}&limit=${limit}`, "GET");
    },

    /**
     * 搜索文件
     * @param {string} keyword - 搜索关键词
     * @param {number} page - 页码
     * @param {number} limit - 每页数量
     * @returns {Promise} 返回搜索结果
     */
    searchFiles(keyword, page = 1, limit = 20) {
        return apiRequest(`/files/search?q=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`, "GET");
    },

    /**
     * 获取文件详情
     * @param {string} fileId - 文件ID
     * @returns {Promise} 返回文件详情
     */
    getFileDetail(fileId) {
        return apiRequest(`/files/${fileId}`, "GET");
    },

    /**
     * 下载文件
     * @param {string} fileId - 文件ID
     * @returns {Promise} 返回下载链接
     */
    downloadFile(fileId) {
        return apiRequest(`/files/${fileId}/download`, "POST");
    },

    /**
     * 上传文件
     * @param {File} file - 文件对象
     * @param {object} metadata - 文件元数据
     * @returns {Promise} 返回上传结果
     */
    uploadFile(file, metadata = {}) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("metadata", JSON.stringify(metadata));

        return apiRequest("/files/upload", "POST", formData, {
            "Content-Type": "multipart/form-data"
        });
    }
};

// 用户相关API
const userAPI = {
    /**
     * 用户登录
     * @param {string} username - 用户名
     * @param {string} password - 密码
     * @returns {Promise} 返回登录结果
     */
    login(username, password) {
        return apiRequest("/auth/login", "POST", { username, password });
    },

    /**
     * 用户注册
     * @param {string} username - 用户名
     * @param {string} email - 邮箱
     * @param {string} password - 密码
     * @returns {Promise} 返回注册结果
     */
    register(username, email, password) {
        return apiRequest("/auth/register", "POST", { username, email, password });
    },

    /**
     * 获取用户信息
     * @param {string} userId - 用户ID
     * @returns {Promise} 返回用户信息
     */
    getUserInfo(userId) {
        return apiRequest(`/users/${userId}`, "GET");
    },

    /**
     * 更新用户信息
     * @param {string} userId - 用户ID
     * @param {object} data - 更新数据
     * @returns {Promise} 返回更新结果
     */
    updateUserInfo(userId, data) {
        return apiRequest(`/users/${userId}`, "PUT", data);
    }
};

// 评论相关API
const commentAPI = {
    /**
     * 获取文件评论
     * @param {string} fileId - 文件ID
     * @param {number} page - 页码
     * @param {number} limit - 每页数量
     * @returns {Promise} 返回评论列表
     */
    getComments(fileId, page = 1, limit = 20) {
        return apiRequest(`/files/${fileId}/comments?page=${page}&limit=${limit}`, "GET");
    },

    /**
     * 添加评论
     * @param {string} fileId - 文件ID
     * @param {string} content - 评论内容
     * @returns {Promise} 返回添加结果
     */
    addComment(fileId, content) {
        return apiRequest(`/files/${fileId}/comments`, "POST", { content });
    }
};

// 导出API模块
window.NFAPI = {
    fileAPI,
    userAPI,
    commentAPI,
    apiRequest
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log("NF下载站 API模块已加载");
});
