<p align="center">
<img src="https://raw.githubusercontent.com/ryanuo/tab-ext/refs/heads/main/extension/assets/logo.png" style="width:100px;" />
</p>

<h1 align="center">N-Tab</h1>

<p align="center">
<a href="README.md"><img src="https://img.shields.io/badge/-中文-blue?logo=markdown" alt="中文"></a>
<span><img src="https://img.shields.io/badge/-English-gray?logo=markdown"></span>
<a href='https://github.com/ryanuo/tab-ext/releases/latest'><img src="https://img.shields.io/badge/-Zip-black?logo=ziggo" alt="zip"></a>
<a href="https://addons.mozilla.org/firefox/addon/n-tab/"><img src="https://img.shields.io/badge/-Firefox-orange?logo=firefox" alt="Firefox"></a>
<!-- <a href="https://chrome.google.com/webstore/detail/n-tab/jgjhjhjhjhjhjhjhjhjhjhjhjh"><img src="https://img.shields.io/badge/-Chrome-green?logo=google-chrome" alt="Chrome"></a>
<a href="https://microsoftedge.microsoft.com/addons/detail/n-tab/jgjhjhjhjhjhjhjhjhjhjhjhjh"><img src="https://img.shields.io/badge/-Edge-blueviolet?logo=edgeimpulse" alt="Edge"></a> -->
</p>

## 🧩 Project Description

- N-Tab is a lightweight new tab extension: search via your browser's default search engine, with clock, weather, quick navigation, quick translate, and custom themes.

## ✨ Features

- Quick translate
- Multiple themes (light/dark/auto)
- Custom wallpaper (supports URL, local image, Base64)
- Search via the default search engine
- Personalized preferences (language, animation, etc.)
- Time and weather display (supports multiple time zones and city selection)
- Online version available [here](https://tab.ryanuo.cc/)

## 🚀 Quick Start

### 1. Clone the project

```bash
git clone https://github.com/ryanuo/nav-ext.git
cd nav-ext
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 3. Start development server

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

### 4. Build for production

```bash
pnpm build
# or
npm run build
# or
yarn build
```

### 5. Load the extension

1. After building, go to the `extension` directory.
2. Open your browser's extension management page, select "Load unpacked extension", and choose the `extension` folder.

## 📝 Usage

- Click the settings button in the upper right corner to open the settings panel for theme, wallpaper, and other preferences.
- Supports wallpaper via URL, local image upload, and Base64 image.
- Press Enter to search — results always use your browser's default search engine.
- Time and weather can be enabled/disabled as needed, with selectable time zone and city.

## 🤝 Contribution Guide

PRs and Issues are welcome!
For suggestions or questions, please submit an [Issue](https://github.com/ryanuo/nav-ext/issues).

1. Fork this repository
2. Create a new branch `feature/xxx`
3. Commit your code and open a PR

## 📚 References

- [snav](https://github.com/imsyy/SNav)
- [limestart](https://www.limestart.cn/)
- [csdn](https://plugin.csdn.net/)

## ❓ FAQ

- **Q: How to set a custom wallpaper?**
  A: Enter an image URL or upload a local image in the "Wallpaper" section of the settings panel.

- **Q: How to switch themes?**
  A: Select light, dark, or auto mode in the settings panel.

- **Q: How to reset to default settings?**
  A: Click the "Reset" button at the bottom of the settings panel.

- **Q: Which browsers are supported?**
  A: Chrome, Edge, Firefox, and other mainstream browsers.

- **Q: What are the shortcut keys?**

| Shortcut           | Description                                                        |
|--------------------|--------------------------------------------------------------------|
| `Option + Enter`   | Quick translate the current search box content via translation link.|
| `Enter`            | Submit the query and search via the default search engine.          |
| `Command + H`      | Show or hide the settings panel (toggle console state).           |

## 📄 License

This project is licensed under the [MIT License](./LICENSE).
