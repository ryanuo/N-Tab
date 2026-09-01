# Privacy Policy for N-Tab

**Last updated:** September 2026

## Overview

N-Tab ("we", "our", or "the extension") is a Chrome extension that replaces the default new tab page with a customizable dashboard. This privacy policy explains how we handle your information.

## Information We Collect

The extension stores the following preferences **locally in your browser** using Chrome's `chrome.storage.local`:

- Theme mode (light/dark/auto)
- Wallpaper settings (custom image/video or random)
- Search engine preferences and ordering
- Dock bar custom items (names, links, icons)
- Time/timezone settings
- Weather city location
- Interface language preference

## How We Use Information

- **Tabs permission**: We monitor tab switching to pass the previous tab's title to the extension's content script. This data stays within your browser and is never sent externally.
- **Host permissions**: We make API requests to third-party services to provide core features:
  - `suggestion.baidu.com` — search suggestions
  - `faviconsnap.com` — website icon fetching
  - `wp.upx8.com` — random wallpaper images
  - `tianqiapi.com` / `i.tianqi.com` — weather data

## Third-Party Services

The extension sends requests to the third-party services listed above. Each service has its own privacy policy governing the data they receive:

- Baidu Suggestion API
- Faviconsnap API
- Tianqi Weather API

We do not control how these services handle the data transmitted to them.

## Data We Do NOT Collect

We do **not** collect, store, or transmit:

- Personal identity information (name, email, address)
- Health or medical information
- Financial or payment information
- Authentication credentials
- Personal communications
- Precise geolocation
- Browsing history beyond the current tab title
- User activity (keystrokes, clicks, scrolls)
- Website content

## Remote Code

This extension does **not** load any remote code. All JavaScript is bundled within the extension package.

## Data Security

All user preferences are stored locally in your browser. We do not operate servers or databases containing user information.

## Changes to This Policy

We may update this privacy policy from time to time. Changes will be reflected in the extension's updates and on this page.

## Contact

If you have questions about this privacy policy, please contact us at:

- Email: ryanuo@aliyun.com
- GitHub: https://github.com/ryanuo/nav-ext
