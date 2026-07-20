<script lang="ts" setup>
import hotkeys from 'hotkeys-js'
import { storeToRefs } from 'pinia'
import { useMarkStore } from '~/store/option/mark'
import { useSearchStore } from '~/store/option/search'

const isShowEngine = ref(false)

const markStore = useMarkStore()
const searchStore = useSearchStore()
const { searchEngine, engines } = storeToRefs(searchStore)
const { setSearchEngine } = searchStore

function handleSelectEngine(engine: Engines) {
  setSearchEngine(engine)
  isShowEngine.value = false
}

defineExpose({
  isShowEngine,
  setIsShowEngine(val: boolean) {
    isShowEngine.value = val
  },
})

function onAltPress(event: KeyboardEvent, key: number) {
  if (!markStore.isInputActive)
    return

  event.preventDefault()

  const selectedEngine = engines.value[key - 1]
  handleSelectEngine(selectedEngine)
}

const handlers: Array<(event: KeyboardEvent) => void> = []

onMounted(() => {
  engines.value.forEach((_, index) => {
    const key = index + 1
    const shortcut = `alt+${key}, option+${key}`
    const handler = (event: KeyboardEvent) => onAltPress(event, key)
    handlers.push(handler)
    hotkeys(shortcut, handler)
  })
})

// 卸载时移除快捷键
onUnmounted(() => {
  engines.value.forEach((_, index) => {
    hotkeys.unbind(`alt+${index + 1}, option+${index + 1}`, handlers[index])
  })
})
</script>

<template>
  <div class="h-full w-full flex items-center justify-center" @click.stop="isShowEngine = !isShowEngine">
    <IconRenderer style-class="mr-0!" :icon="searchEngine.icon" :icon-url="searchEngine.iconUrl" />
  </div>
  <div
    v-if="isShowEngine"
    class="engine z-50"
  >
    <div class="engine-list">
      <div
        v-for="(engine, index) in engines" :key="index"
        class="relative h-8 flex flex-row cursor-pointer items-center justify-between rounded-xl bg-[var(--main-card-background)] p-1 transition-colors duration-300 hover:bg-gray-100/50"
        dark="bg-transparent hover:bg-gray-800"
        @click="handleSelectEngine(engine)"
      >
        <div class="mr-2 max-w-30 flex flex-row items-center overflow-auto">
          <IconRenderer :icon="engine.icon" :icon-url="engine.iconUrl" />
          <span class="ml-1 text-gray-800 dark:text-gray-100">{{ engine.name }}</span>
        </div>
        <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
          <span class="i-ci-option" /><span>{{ index + 1 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.engine {
  @apply: dark:bg-[#000]/50
  @apply absolute mt-2 max-h-[44vh] overflow-auto rounded-xl bg-[var(--white-alpha-80)] p-2 backdrop-blur-[var(--main-card-blur)] backdrop-filter;
}
</style>
