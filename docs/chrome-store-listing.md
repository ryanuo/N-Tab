# Chrome Web Store 商店文案（合规版）

> 背景一：v0.4.3 曾因"产品说明中有过多关键字"被拒（违规参考 ID：Yellow Argon，2026-09-02）。
> 原说明中罗列了 Baidu、Bing、Google、Yandex、GitHub、Bilibili、StackOverflow、V2EX、Metaso 等品牌名，
> 属于[元数据关键字堆砌](https://developer.chrome.com/docs/webstore/program-policies/)。
>
> 背景二：v0.4.4 曾因"单一用途 / 同时更改新标签页与搜索体验"被拒（违规参考 ID：Red Argon）。
> 整改方式（对应官方"如何纠正"指引）：
> 1. 扩展程序保持单一功能：新标签页起始页；
> 2. 新标签页中的搜索体验使用 Chrome Search API（`chrome.search.query`），
>    搜索结果始终经由用户所选的默认搜索引擎，不内置搜索引擎切换、
>    不请求第三方搜索联想接口、不修改默认搜索服务提供商；
> 3. 如未来要提供"默认搜索引擎替换"功能，必须拆分为独立扩展。
>
> 规则：说明中**不要枚举任何搜索引擎/网站品牌名**（含中文品牌名），只描述功能本身；
> 单个关键词不要反复出现。此文件是商店后台"说明"字段的唯一文案来源，改版时同步更新这里。

## 简短说明（zh，≤132 字符）

轻量级新标签页：搜索直达浏览器默认搜索引擎，配时间天气、快捷导航、快捷翻译与个性化主题壁纸。

## 详细说明（zh）

N-Tab 是一款轻量级的新标签页扩展，为你打造简洁、高效的浏览器起始页。

核心功能：

- 搜索直达：输入关键词回车即可搜索，结果始终使用你在浏览器中设置的默认搜索引擎
- 快捷翻译：将输入内容一键送入翻译，学习与查阅外语资料更顺手
- 时间与天气：可按需开启，支持自选时区与城市
- 快捷导航：常用网站一键直达，支持自定义 Dock 栏与图标
- 个性化外观：浅色 / 深色 / 自动主题，支持自定义壁纸（URL、本地图片、Base64）
- 高效操作：键盘快捷键执行翻译与管理设置面板
- 数据本地存储：所有设置保存在本地浏览器中，无需注册账号，不上传任何个人信息

使用方式：安装后打开新标签页，点击右上角设置按钮进入设置面板，即可按喜好配置主题、壁纸与时区等。

反馈与建议：如有问题或功能建议，欢迎通过商店页面的开发者链接提交反馈。

## Short description (en, ≤132 chars)

A lightweight new tab page: search via your browser's default search engine, clock, weather, quick nav, and custom themes.

## Detailed description (en)

N-Tab is a lightweight new tab extension that turns your browser start page into a clean, productive workspace.

Key features:

- Search: press Enter to search — results always go through your browser's default search engine
- Quick translate: send any query to a translator in one keystroke
- Time & weather: optional clock with selectable timezone, plus local weather for your chosen city
- Quick nav: one-click access to frequently visited sites, with a customizable dock and icons
- Personal look: light / dark / auto themes and custom wallpapers via URL, local image, or Base64
- Keyboard-first: shortcuts for translating and toggling the settings panel
- Local-only data: all settings stay in your browser — no account, no personal information uploaded

Getting started: open a new tab and click the settings button in the corner to configure themes, wallpapers, timezone, and more.

Feedback: questions and feature suggestions are welcome via the developer links on this store page.

## 提交前自查清单

- [ ] 简短说明与详细说明均未出现任何品牌名（Baidu/Bing/Google/Yandex/GitHub/Bilibili/StackOverflow/V2EX/Metaso 及其中文写法）
- [ ] 同一词语未在说明中机械性重复堆砌
- [ ] manifest.json 的 `description` 与本文案一致且干净（当前版本已合规）
- [ ] 截图、宣传图片中没有关键词列表
- [ ] 名称、开发者名称无无关关键词
- [ ] manifest 无 `chrome_settings_overrides`（不修改默认搜索服务提供商）
- [ ] manifest 无第三方搜索联想的 host 权限（如 suggestion.baidu.com）
- [ ] 权限最小：`search` / `storage` + 壁纸、图标、天气所需 host 权限（`tabs` 权限及其模板遗留的标签页跟踪代码已移除）
- [ ] 新标签页搜索提交走 `chrome.search.query`（见 `src/store/option/search.ts`）
