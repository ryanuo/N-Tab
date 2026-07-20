interface FaviconResponse {
  success: boolean
  url: string
  favicon: string
  size: string
  source: string
  cached: boolean
  cacheSource: string
  cachedAt: string
}

const defaultAvatarCache = new Map<string, string>()
const pendingRequests = new Map<string, Promise<string>>()

export async function getFaviconByUrl(link: string): Promise<string> {
  if (defaultAvatarCache.has(link)) {
    return defaultAvatarCache.get(link)!
  }

  if (pendingRequests.has(link)) {
    return pendingRequests.get(link)!
  }

  const promise = (async () => {
    try {
      const api = `https://faviconsnap.com/api/favicon?url=${encodeURIComponent(link)}&format=json`
      const res = await fetch(api)
      if (!res.ok) {
        const fallback = generateSvgAvatar(link)
        defaultAvatarCache.set(link, fallback)
        return fallback
      }
      const data: FaviconResponse = await res.json()
      const favicon = data.success && data.favicon ? data.favicon : generateSvgAvatar(link)
      defaultAvatarCache.set(link, favicon)
      return favicon
    }
    catch {
      const fallback = generateSvgAvatar(link)
      defaultAvatarCache.set(link, fallback)
      return fallback
    }
    finally {
      pendingRequests.delete(link)
    }
  })()

  pendingRequests.set(link, promise)
  return promise
}

const colors = [
  '#3b82f6',
  '#22c55e',
  '#ef4444',
  '#f97316',
  '#a855f7',
  '#ec4899',
  '#eab308',
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function generateSvgAvatar(text: string): string {
  if (defaultAvatarCache.has(text)) {
    return defaultAvatarCache.get(text)!
  }

  const char = (text || '?').charAt(0).toUpperCase()
  const bg = colors[hashString(text) % colors.length]
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40"><rect width="40" height="40" rx="8" fill="${bg}"/><text x="20" y="20" dy=".35em" fill="#fff" font-family="sans-serif" font-size="20" text-anchor="middle">${char}</text></svg>`
  const dataUrl = `data:image/svg+xml,${encodeURIComponent(svg)}`
  defaultAvatarCache.set(text, dataUrl)
  return dataUrl
}

export async function getDockIconUrl(name: string, link?: string): Promise<string> {
  if (link) {
    return await getFaviconByUrl(link)
  }
  return generateSvgAvatar(name)
}

export function clearFaviconCache(link?: string) {
  if (link) {
    defaultAvatarCache.delete(link)
  }
  else {
    defaultAvatarCache.clear()
  }
}
