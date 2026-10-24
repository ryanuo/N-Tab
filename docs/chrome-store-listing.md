# Chrome Web Store 商店文案（合规版）

> 背景：v0.4.3 曾因"产品说明中有过多关键字"被拒（违规参考 ID：Yellow Argon，2026-09-02）。
> 原说明中罗列了 Baidu、Bing、Google、Yandex、GitHub、Bilibili、StackOverflow、V2EX、Metaso 等品牌名，
> 属于[元数据关键字堆砌](https://developer.chrome.com/docs/webstore/program-policies/)。
>
> 规则：说明中**不要枚举任何搜索引擎/网站品牌名**（含中文品牌名），只描述功能本身；
> 单个关键词不要反复出现。此文件是商店后台"说明"字段的唯一文案来源，改版时同步更新这里。

## 简短说明（zh，≤132 字符）

轻量级新标签页扩展：聚合搜索、多引擎一键切换、快捷翻译、时间天气与个性化主题壁纸。

## 详细说明（zh）

N-Tab 是一款轻量级的新标签页扩展，为你打造简洁、高效的浏览器起始页。

核心功能：

- 聚合搜索：在搜索框中一键切换多个常用搜索引擎，支持自定义添加；输入时实时展示搜索联想，方向键即可选择
- 快捷翻译：将输入内容一键送入翻译，学习与查阅外语资料更顺手
- 时间与天气：可按需开启，支持自选时区与城市
- 个性化外观：浅色 / 深色 / 自动主题，支持自定义壁纸（URL、本地图片、Base64）
- 高效操作：键盘快捷键切换引擎、执行翻译与管理设置面板
- 数据本地存储：所有设置保存在本地浏览器中，无需注册账号，不上传任何个人信息

使用方式：安装后打开新标签页，点击右上角设置按钮进入设置面板，即可按喜好配置主题、壁纸、搜索引擎与时区等。

反馈与建议：如有问题或功能建议，欢迎通过商店页面的开发者链接提交反馈。

## Short description (en, ≤132 chars)

A lightweight new tab page: unified search, one-click engine switching, quick translate, clock, weather, and custom themes.

## Detailed description (en)

N-Tab is a lightweight new tab extension that turns your browser start page into a clean, productive workspace.

Key features:

- Unified search: switch between multiple search engines with one click and add your own; instant suggestions appear as you type and can be picked with the arrow keys
- Quick translate: send any query to a translator in one keystroke
- Time & weather: optional clock with selectable timezone, plus local weather for your chosen city
- Personal look: light / dark / auto themes and custom wallpapers via URL, local image, or Base64
- Keyboard-first: shortcuts for switching engines, translating, and toggling the settings panel
- Local-only data: all settings stay in your browser — no account, no personal information uploaded

Getting started: open a new tab and click the settings button in the corner to configure themes, wallpapers, search engines, timezone, and more.

Feedback: questions and feature suggestions are welcome via the developer links on this store page.

## 提交前自查清单

- [ ] 简短说明与详细说明均未出现任何品牌名（Baidu/Bing/Google/Yandex/GitHub/Bilibili/StackOverflow/V2EX/Metaso 及其中文写法）
- [ ] 同一词语未在说明中机械性重复堆砌
- [ ] manifest.json 的 `description` 与本文案一致且干净（当前版本已合规）
- [ ] 截图、宣传图片中没有关键词列表
- [ ] 名称、开发者名称无无关关键词
