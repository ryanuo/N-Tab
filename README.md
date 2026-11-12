<p align="center">
<img src="https://raw.githubusercontent.com/ryanuo/tab-ext/refs/heads/main/extension/assets/logo.png" style="width:100px;" />
</p>

<h1 align="center">N-Tab</h1>

<p align="center">
<a href="README_US.md"><img src="https://img.shields.io/badge/-English-blue?logo=markdown" alt="English"></a>
<span><img src="https://img.shields.io/badge/-中文-gray?logo=markdown"></span>
<a href='https://github.com/ryanuo/tab-ext/releases/latest'><img src="https://img.shields.io/badge/-Zip-black?logo=ziggo" alt="zip"></a>
<a href="https://addons.mozilla.org/firefox/addon/n-tab/"><img src="https://img.shields.io/badge/-Firefox-orange?logo=firefox" alt="Firefox"></a>
<!-- <a href="https://chrome.google.com/webstore/detail/n-tab/jgjhjhjhjhjhjhjhjhjhjhjhjh"><img src="https://img.shields.io/badge/-Chrome-green?logo=google-chrome" alt="Chrome"></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/n-tab/jgjhjhjhjhjhjhjhjhjhjhjhjh"><img src="https://img.shields.io/badge/-Edge-blueviolet?logo=edge" alt="Edge"></a> -->
</p>

## 🧩 项目说明

- N-Tab 是一个轻量级浏览器新标签页扩展：搜索直达浏览器默认搜索引擎，提供时间天气、快捷导航、快捷翻译与个性化主题壁纸。

## ✨ 功能特性

- 快捷翻译
- 多主题模式（浅色/深色/自动）
- 自定义壁纸（支持 URL、本地图片、Base64）
- 搜索直达（遵循浏览器默认搜索引擎）
- 个性化偏好设置（语言、动画等）
- 时间与天气显示（支持多时区、城市选择）
- 支持在线地址使用 [这里](https://tab.ryanuo.cc/)

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/ryanuo/nav-ext.git
cd nav-ext
```

### 2. 安装依赖

```bash
pnpm install
# 或
npm install
# 或
yarn install
```

### 3. 本地开发

```bash
pnpm dev
# 或
npm run dev
# 或
yarn dev
```

### 4. 构建生产包

```bash
pnpm build
# 或
npm run build
# 或
yarn build
```

### 5. 加载扩展

1. 构建后，进入 `extension` 目录。
2. 打开浏览器扩展管理页面，选择“加载已解压的扩展”，选择 `extension` 文件夹即可。

## 📝 使用说明

- 点击右上角设置按钮可进入设置面板，进行主题、壁纸等个性化配置。
- 支持壁纸 URL、本地图片上传、Base64 图片等多种方式。
- 搜索栏回车即搜索，结果使用浏览器默认搜索引擎。
- 时间与天气可根据需求开启/关闭，并选择时区和城市。

## 🤝 贡献指南

欢迎 PR 和 Issue！
如有建议或问题请提交 [Issue](https://github.com/ryanuo/nav-ext/issues)。

1. Fork 本仓库
2. 新建分支 `feature/xxx`
3. 提交代码并发起 PR

## 📚 参考

- [snav](https://github.com/imsyy/SNav)
- [limestart](https://www.limestart.cn/)
- [csdn](https://plugin.csdn.net/)

## ❓ 常见问题

- **Q: 如何自定义壁纸？**
  A: 在设置面板“壁纸设置”中输入图片 URL 或上传本地图片即可。

- **Q: 如何切换主题？**
  A: 在设置面板选择浅色、深色或自动模式。

- **Q: 如何恢复默认设置？**
  A: 设置面板底部点击“重置”按钮。

- **Q: 支持哪些浏览器？**
  A: 支持 Chrome、Edge、Firefox 等主流浏览器。

- **Q: 快捷键指令有哪些？**

| 快捷键组合       | 功能描述                                                                 |
|------------------|--------------------------------------------------------------------------|
| `Option + Enter` | 执行快捷翻译操作，将当前搜索框中的内容通过翻译链接打开。                   |
| `Enter`          | 提交搜索框内容，使用浏览器默认搜索引擎执行搜索。                           |
| `Command + H`    | 显示或隐藏设置面板（快捷方式切换控制台状态）。                            |

## 📄 许可证

本项目遵循 [MIT 许可证](./LICENSE)。
