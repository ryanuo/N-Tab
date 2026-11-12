import { defineStore } from 'pinia'

/**
 * 搜索 store
 *
 * 合规说明（Chrome Web Store 单一用途政策 / 违规参考 ID: Red Argon）：
 * 提交搜索时必须通过 chrome.search（Firefox 为 browser.search）API 使用
 * 用户所选的默认搜索引擎，而不是跳转到扩展内置的搜索引擎列表，
 * 也不改变用户的默认搜索服务提供商。
 */
export const useSearchStore = defineStore('search', () => {
  const searchQuery = ref<string>('')

  // 优先使用 WebExtension 搜索 API，遵循用户默认搜索引擎
  function getSearchApi(): any {
    const g = globalThis as any
    return g.browser?.search ?? g.chrome?.search
  }

  function submit(value?: string) {
    const query = value?.trim() || searchQuery.value?.trim()

    if (!query)
      return

    const searchApi = getSearchApi()

    // Chrome 87+ / Chromium：chrome.search.query
    if (typeof searchApi?.query === 'function') {
      searchApi
        .query({ text: query, disposition: 'CURRENT_TAB' })
        .catch((error: any) => console.error('chrome.search.query failed:', error))
      return
    }

    // Firefox 63+：browser.search.search（未指定 engine 时使用默认搜索引擎）
    if (typeof searchApi?.search === 'function') {
      searchApi
        .search({ query })
        .catch((error: any) => console.error('browser.search.search failed:', error))
      return
    }

    // 兜底：无搜索 API 时直接按地址打开（仅输入了 URL 时有意义）
    window.open(query, '_blank')
  }

  const setSearchQuery = (query: string) => {
    searchQuery.value = query
  }

  return {
    searchQuery,
    submit,
    setSearchQuery,
  }
})
