import fs from 'fs-extra'
import type { Manifest } from 'webextension-polyfill'
import type PkgType from '../package.json'
import { isDev, isFirefox, port, r } from '../scripts/utils'

export async function getManifest() {
  const pkg = await fs.readJSON(r('package.json')) as typeof PkgType

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    chrome_url_overrides: {
      newtab: './dist/options/index.html',
    },
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: './assets/icon-512.png',
      default_popup: './dist/popup/index.html',
      // default_popup: '', // 若要禁用 popup 并使用点击事件，需将 default_popup 设为空字符串
    },
    options_ui: {
      page: './dist/options/index.html',
      open_in_tab: true,
    },
    background: isFirefox
      ? {
          scripts: ['dist/background/index.mjs'],
          type: 'module',
        }
      : {
          service_worker: './dist/background/index.mjs',
        },
    // icons: {
    //   16: './assets/icons/icon-16.png',
    //   48: './assets/icons/icon-48.png',
    //   128: './assets/icons/icon-128.png',
    // },
    permissions: [
      'tabs',
      'storage',
      'activeTab',
      // 'sidePanel',
    ],
    host_permissions: [
      'https://suggestion.baidu.com/*',
      'https://faviconsnap.com/*',
      'https://wp.upx8.com/*',
      'https://widget.tianqiapi.com/*',
      'https://i.tianqi.com/*',
    ],
    // content_scripts: [
    //   {
    //     matches: [
    //       '<all_urls>',
    //     ],
    //     js: [
    //       'dist/contentScripts/index.global.js',
    //     ],
    //   },
    // ],
    web_accessible_resources: [
      {
        resources: ['dist/contentScripts/style.css'],
        matches: ['<all_urls>'],
      },
    ],
    content_security_policy: {
      extension_pages: isDev
        // this is required on dev for Vite script to load
        ? `script-src \'self\' http://localhost:${port}; object-src \'self\'`
        : 'script-src \'self\'; object-src \'self\'',
    },
    ...isFirefox
      ? { browser_specific_settings: {
          gecko: {
            id: 'ryanuo@aliyun.com',
          },
        } }
      : {},
  }

  // add sidepanel
  // if (isFirefox) {
  //   manifest.sidebar_action = {
  //     default_panel: 'dist/sidepanel/index.html',
  //   }
  // }
  // else {
  //   // the sidebar_action does not work for chromium based
  //   (manifest as any).side_panel = {
  //     default_path: 'dist/sidepanel/index.html',
  //   }
  // }

  // FIXME: not work in MV3
  if (isDev && false) {
    // for content script, as browsers will cache them for each reload,
    // we use a background script to always inject the latest version
    // see src/background/contentScriptHMR.ts
    delete manifest.content_scripts
    manifest.permissions?.push('webNavigation')
  }

  return manifest
}
