const generalTools: ConsoleItem[] = [
  {
    link: 'https://www.loom.com/',
    name: 'Loom',
    tag: '在线工具',
    icon: 'i-fxemoji-growingheart',
    class: 'screen-recorder',
  },
]

const entertainment: ConsoleItem[] = [
  {
    link: 'https://www.netflix.com/',
    name: 'Netflix',
    tag: '娱乐',
    icon: 'netflix',
    class: 'streaming',
  },
  {
    link: 'https://www.spotify.com/',
    name: 'Spotify',
    tag: '娱乐',
    icon: 'spotify',
    class: 'music-streaming',
  },
  {
    link: 'https://www.youtube.com/',
    name: 'YouTube',
    tag: '娱乐',
    icon: 'youtube',
    class: 'video-streaming',
  },
  {
    link: 'https://www.twitch.tv/',
    name: 'Twitch',
    tag: '娱乐',
    icon: 'twitch',
    class: 'live-streaming',
  },
  {
    link: 'https://www.amazon.com/gp/video/detail/amazon-video',
    name: 'Amazon Prime Video',
    tag: '娱乐',
    icon: 'amazon-prime',
    class: 'streaming',
  },
  {
    link: 'https://www.discord.com/',
    name: 'Discord',
    tag: '娱乐',
    icon: 'discord',
    class: 'gaming-communication',
  },
  {
    link: 'https://www.steam.com/',
    name: 'Steam',
    tag: '娱乐',
    icon: 'steam',
    class: 'gaming-platform',
  },
  {
    link: 'https://www.epicgames.com/store/en-US/',
    name: 'Epic Games Store',
    tag: '娱乐',
    icon: 'epic-games',
    class: 'gaming-platform',
  },
  {
    link: 'https://www.hulu.com/',
    name: 'Hulu',
    tag: '娱乐',
    icon: 'hulu',
    class: 'streaming',
  },
  {
    link: 'https://www.apple.com/apple-music/',
    name: 'Apple Music',
    tag: '娱乐',
    icon: 'apple-music',
    class: 'music-streaming',
  },
]

const aiTools: ConsoleItem[] = [
  {
    link: 'https://www.google.com/search?q=',
    name: 'Google',
    tag: 'AI 工具',
    icon: 'google',
  },
  {
    link: 'https://www.bing.com/search?q=',
    name: 'Bing',
    tag: 'AI 工具',
    icon: 'bing',
  },
]

export const consoles: ConsoleItem[] = [
  ...generalTools,
  ...entertainment,
  ...aiTools,
]

export const consolesMap = consoles.reduce((acc, cur) => {
  acc[cur.tag] = acc[cur.tag] || []
  acc[cur.tag].push(cur)
  return acc
}, {} as Record<string, ConsoleItem[]>)

// 快捷翻译跳转地址（搜索框左侧按钮 / Option+Enter 触发）
export const TRANSLATE_URL = 'https://www.bing.com/translator?fromLang=auto-detect&toLang=zh-Hans&text='
