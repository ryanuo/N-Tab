<script lang="ts" setup>
import hotkeys from 'hotkeys-js'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useSearchStore } from '~/store/option/search'

const store = useSearchStore()
const { searchQuery } = storeToRefs(store) // 使用 storeToRefs 获取响应式引用
const { submit } = store

const { t } = useI18n()

// 当前选中的索引（键盘导航用）
const selectedIndex = ref(-1)
// 鼠标悬停的索引
const hoveredIndex = ref(-1)

const suggestions = ref<string[]>([])

let controller: AbortController | null = null

// 获取搜索建议
async function fetchSuggestions() {
  const query = searchQuery.value.trim()
  if (!query) {
    suggestions.value = []
    return
  }

  // 取消之前的请求
  if (controller) {
    controller.abort()
  }

  controller = new AbortController()

  try {
    const response = await fetch(
      `https://suggestion.baidu.com/su?wd=${encodeURIComponent(query)}&json=1&p=3`,
      {
        signal: controller.signal,
        headers: {
          Referer: 'https://www.baidu.com',
        },
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // 处理返回的文本格式数据 - 手动指定编码
    const arrayBuffer = await response.arrayBuffer()
    // 尝试使用GBK编码解析
    const decoder = new TextDecoder('gbk')
    const text = decoder.decode(arrayBuffer)

    // 提取JSON数据部分
    const jsonStart = text.indexOf('{')
    const jsonEnd = text.lastIndexOf('}') + 1
    const jsonData = text.substring(jsonStart, jsonEnd)

    const data = JSON.parse(jsonData)
    if (data.s && Array.isArray(data.s)) {
      suggestions.value = data.s
    }
    else {
      suggestions.value = []
    }
  }
  catch (error: any) {
    if (error?.name !== 'AbortError') {
      console.error('获取搜索建议失败:', error)
      suggestions.value = []
    }
  }
  finally {
    // 请求完成后重置控制器
    if (controller && controller.signal.aborted === false) {
      controller = null
    }
  }
}

// 过滤后的搜索建议
const filteredSuggestions = computed(() => {
  if (!searchQuery?.value.trim())
    return []

  const query = searchQuery.value.toLowerCase().trim()
  return suggestions.value.filter(item =>
    item.toLowerCase().includes(query),
  )
})

// 计算当前项的类名（高亮选中项）
function computedItemClass(index: number) {
  const isSelected = index === selectedIndex.value
  const isHovered = index === hoveredIndex.value

  if (isSelected)
    return 'bg-[--c-100] text-blue-800 transition-all duration-200'
  if (isHovered)
    return 'bg-gray-100/40 text-gray-800 transition-all duration-200 hover:font-medium'

  return 'transition-all duration-200'
}

// 高亮匹配的文本
function escapeRegExp(text: string) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function highlightMatch(text: string) {
  if (!searchQuery.value.trim())
    return text

  const query = escapeRegExp(searchQuery.value.toLowerCase().trim())
  const regex = new RegExp(`(${query})`, 'gi')
  return text.replace(regex, '<span class="font-semibold text-[--c-600]">$1</span>')
}

function resetIndex() {
  selectedIndex.value = -1
  hoveredIndex.value = -1
}

watch(() => searchQuery.value, () => {
  fetchSuggestions()
  resetIndex()
})

function updateHoveredIndex(delta: number) {
  const getLength = () => filteredSuggestions.value.length
  const length = getLength()
  if (length === 0)
    return

  hoveredIndex.value = ((hoveredIndex.value + delta) + length) % length
}

function onEnterPress(event: KeyboardEvent) {
  if (hoveredIndex.value >= 0) {
    submit(suggestions.value[hoveredIndex.value])
  }
  else {
    submit()
  }
  event.preventDefault()
}

onMounted(() => {
  hotkeys('enter', onEnterPress)

  hotkeys('up', () => {
    updateHoveredIndex(-1)
  })

  hotkeys('down', () => {
    updateHoveredIndex(1)
  })
})

onUnmounted (() => {
  hotkeys.unbind('enter', onEnterPress)
  hotkeys.unbind('up')
  hotkeys.unbind('down')
})
</script>

<template>
  <div class="suggestion relative mt-1 w-full overflow-hidden rounded-lg">
    <div
      v-if="filteredSuggestions.length > 0 && searchQuery.trim().length > 0"
      class="max-h-80 w-full overflow-y-auto rounded-sm shadow-lg"
    >
      <ul>
        <Translate />
        <li
          v-for="(suggestion, index) in filteredSuggestions"
          :key="suggestion || index"
          :class="computedItemClass(index)"
          class="cursor-pointer px-4 py-2 transition-colors"
          flex="~ justify-between items-center"
          @mouseleave="resetIndex()"
          @click.stop="submit(suggestion)"
          @mouseenter="hoveredIndex = index"
        >
          <span v-html="highlightMatch(suggestion)" />
          <span v-if="hoveredIndex === index" class="i-fluent-arrow-enter-left-20-regular" />
        </li>
      </ul>
    </div>

    <!-- 搜索结果提示 -->
    <div
      v-else-if="searchQuery.trim().length > 0 && filteredSuggestions.length === 0"
      class="mt-1 w-full rounded-sm text-white shadow-lg"
    >
      <Translate />
      <div class="px-4 py-2">
        <span class="i-hugeicons-file-not-found" />
        {{ t('search.noResult', { query: searchQuery }) }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.suggestion {
  backdrop-filter: blur(var(--main-card-blur));
  @apply bg-[var(--main-card-background)];
  @apply dark:bg-[#23272f]/50;
}
</style>
