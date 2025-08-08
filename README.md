# NF下载站 - 现代化MDUI应用下载平台

一个基于Material Design风格的现代化应用下载站，参考了[mcapks.com](https://mcapks.com)的设计。

## [主站](http://xz.novaflare.top)

## 🎯 特性

### 🎨 视觉设计
- **Material Design 3**: 采用最新的Material Design设计规范
- **响应式设计**: 完美适配桌面端、平板和手机
- **深色模式**: 支持自动/手动主题切换
- **平滑动画**: 精心设计的交互动效

### 📱 用户体验
- **分类导航**: 直观的应用分类系统
- **智能搜索**: 实时搜索和筛选功能
- **一键下载**: 简化的下载流程
- **轮播推荐**: 动态展示热门应用

### ⚡ 性能优化
- **懒加载**: 图片和内容的懒加载
- **缓存机制**: 应用列表和数据的缓存
- **轻量级**: 最小化CSS和JS文件大小

## 🛠️ 技术栈

- **前端框架**: CSS3 + JavaScript ES6+
- **UI框架**: MDUI (Material Design for Web)
- **图标**: Material Icons
- **字体**: 系统字体栈

## 📁 文件结构

```
NF下载站MDUI/
├── README.md              # 项目说明文档
├── index.html             # 主页面
├── styles.css             # 样式文件
├── scripts.js             # 主要脚本
├── favicon.ico            # 网站图标
├── logo.png               # 网站logo
├── api/                   # API模块
│   └── api.js             # API接口定义
├── utils/                 # 工具函数库
│   └── utils.js           # 通用工具函数
└── components/            # UI组件库
    └── ui.js              # 自定义UI组件
```

## 🚀 快速开始

1. **克隆或下载项目**
   ```bash
   git clone [url]
   # 或者直接下载ZIP文件
   ```

2. **部署运行**
   - 将文件夹放在Nginx/Apache服务器目录
   - 或者直接双击`index.html`本地查看

3. **浏览器访问**
   - 支持所有现代浏览器
   - 推荐Chrome、Firefox、Safari

## 🎯 核心功能

### 分类系统
- 🟢 **应用类**: 工具、社交、娱乐应用
- 🔴 **游戏类**: 动作、策略、角色扮演
- 🟠 **工具类**: 系统工具、实用软件
- 🟣 **媒体类**: 视频、音乐、图片应用
- 🔵 **系统类**: 系统优化、定制化工具
- 🟤 **MOD类**: 修改版、小米版应用

### 搜索特性
- **实时搜索**: 输入时立即显示结果
- **关键词高亮**: 匹配文字高亮显示
- **分类筛选**: 可组合分类和搜索
- **缓存结果**: 快速重复搜索

### 下载管理
- **下载动画**: 友好的下载状态反馈
- **进度显示**: 实时下载进度
- **列表更新**: 自动标记已下载应用

## 🎨 自定义选项

### 主题配置
在`styles.css`中修改CSS变量：
```css
:root {
    --primary-color: #2196f3;      /* 主题色 */
    --accent-color: #00bcd4;       /* 强调色 */
    --background-color: #f5f5f5;   /* 背景色 */
}
```

### Logo替换
在`index.html`中替换：
```html
<img src="your-logo-url" alt="品牌Logo" />
```

### 内容更新
所有应用信息都在`index.html`中直接修改，搜索`编辑推荐`和`最新更新`部分即可。

## 📱 响应式设计

| 设备类型 | 布局特点 |
|---------|----------|
| 桌面端 | 多列网格式布局，完整展示所有功能 |
| 平板电脑 | 两列或三列布局，保留关键功能 |
| 手机端 | 单列堆叠式布局，触摸优化 |

## 🔧 开发扩展

### 添加新应用
1. 在`index.html`中找到对应分类的推荐区域
2. 复制现有的应用卡片模板
3. 修改应用名称、描述、版本号、图片等

### 接入API
如果要实现动态加载，可以修改`scripts.js`中的`reloadAppData()`函数：
```javascript
async function fetchLatestApps() {
    const response = await fetch('/api/apps');
    const apps = await response.json();
    // 更新DOM
}
```

## 📦 模块说明

### API模块 (api/api.js)

提供与后端服务器交互的功能，包括：

- `NFAPI.fileAPI`: 文件相关API
  - `getFileList()`: 获取文件列表
  - `searchFiles()`: 搜索文件
  - `getFileDetail()`: 获取文件详情
  - `downloadFile()`: 下载文件
  - `uploadFile()`: 上传文件

- `NFAPI.userAPI`: 用户相关API
  - `login()`: 用户登录
  - `register()`: 用户注册
  - `getUserInfo()`: 获取用户信息
  - `updateUserInfo()`: 更新用户信息

- `NFAPI.commentAPI`: 评论相关API
  - `getComments()`: 获取评论列表
  - `addComment()`: 添加评论

### 工具函数库 (utils/utils.js)

提供各种实用功能：

- `NFUtils.formatFileSize()`: 格式化文件大小
- `NFUtils.formatDate()`: 格式化日期
- `NFUtils.generateRandomString()`: 生成随机字符串
- `NFUtils.debounce()`: 防抖函数
- `NFUtils.throttle()`: 节流函数
- `NFUtils.storageUtils`: 本地存储工具
- `NFUtils.parseUrlParams()`: URL参数解析
- `NFUtils.copyToClipboard()`: 复制文本到剪贴板
- `NFUtils.getDeviceType()`: 获取设备类型
- `NFUtils.isMobile()`: 判断是否为移动设备
- `NFUtils.isOnline()`: 检查网络连接状态

### UI组件库 (components/ui.js)

提供常用的界面组件：

- `NFUI.createFileCard()`: 创建文件卡片组件
- `NFUI.createDialog()`: 创建自定义对话框
- `NFUI.createLoading()`: 创建加载提示组件
- `NFUI.showToast()`: 显示提示框
- `NFUI.createMenu()`: 创建下拉菜单
- `NFUI.createTabs()`: 创建选项卡组件

## 💡 使用示例

### 使用API获取文件列表
```javascript
// 获取文件列表
NFAPI.fileAPI.getFileList(1, 20)
    .then(result => {
        console.log("文件列表:", result);
        // 处理文件列表
    })
    .catch(error => {
        console.error("获取文件列表失败:", error);
    });
```

### 使用工具函数格式化文件大小
```javascript
// 格式化文件大小
const size = NFUtils.formatFileSize(1024 * 1024 * 5); // 5MB
console.log(size); // 输出: "5 MB"
```

### 使用UI组件创建文件卡片
```javascript
// 创建文件卡片
const container = document.getElementById("file-container");
const fileData = {
    id: "123",
    name: "示例文件.txt",
    size: 1024 * 1024,
    uploadDate: new Date(),
    description: "这是一个示例文件",
    thumbnail: "https://example.com/thumbnail.jpg"
};
NFUI.createFileCard(fileData, container);
```

## ⚙️ 配置说明

### CONFIG对象使用说明

`CONFIG` 对象是NF下载站的核心配置文件，集中管理所有版本数据和配置信息。详细使用说明请参考 [config-usage.md](./config-usage.md)。

主要内容包括：
- 如何添加新版本
- 如何配置下载链接
- 如何在UI中使用版本数据
- 版本比较函数实现
- 最佳实践建议

## 📄 许可证

MIT License - 可以自由使用和修改

## 🤝 贡献

欢迎提交Issues和改进建议！

- 📧 联系邮箱：contact@nfdownload.com

- 💬 技术支持：QQ群 12345678



