<script setup lang="ts">
import { watchOnce } from '@vueuse/core'
import hotkeys from 'hotkeys-js'
import { storeToRefs } from 'pinia'
import { useMarkStore } from '~/store/option/mark'
import { useSearchStore } from '~/store/option/search'
import { usePreferenceStore } from '~/store/option/settings'

const searchInputRef = ref<HTMLInputElement | null>(null)

const markStore = useMarkStore()
const searchStore = useSearchStore()
const { searchQuery } = storeToRefs(searchStore)
const { setSearchQuery, submit } = searchStore
const preferenceStore = usePreferenceStore()

function handleInputFocus() {
  markStore.setInputActive(true)
}

function handleInput(e: any) {
  setSearchQuery(e.target.value)
}

function onEnterPress() {
  const activeElement = document.activeElement
  if (activeElement && activeElement?.id !== 'search') {
    handleInputFocus()

    if (searchInputRef.value) {
      setTimeout(() => {
        searchInputRef.value?.focus()
      }, 0)
    }
  }
}

function onEscapePress() {
  markStore.initStatus()
  if (searchInputRef.value) {
    searchInputRef.value?.blur()
  }
}

onMounted(() => {
  hotkeys.filter = () => true
  hotkeys('enter', onEnterPress)
  hotkeys('esc', onEscapePress)
})

watchOnce(searchInputRef, () => {
  // 如果是自动聚焦搜索框，则自动聚焦
  if (searchInputRef.value && preferenceStore.isAutoFocusSearchBoxOnPageLoad) {
    onEnterPress()
  }
  else {
    // 否则聚焦到 body 上
    document.body.focus()
  }
})

onUnmounted(() => {
  hotkeys.unbind('enter', onEnterPress)
  hotkeys.unbind('esc', onEscapePress)
})
</script>

<template>
  <Wrapper>
    <DateWeather />
    <div v-show="!markStore.isShowWidget" class="form-control">
      <input
        id="search"
        ref="searchInputRef"
        :class="{
          'input-focus': markStore.isInputActive,
          'hover:bg-gray-100/50': !markStore.isInputActive,
          'dark:hover:bg-gray-800/50': !markStore.isInputActive,
        }"
        :value="searchQuery"
        autocomplete="off"
        :placeholder="$t('search.placeholder')" size="30" type="text" class="input-control"
        @input="handleInput"
        @click.stop="handleInputFocus"
      >
      <template v-if="markStore.isInputActive">
        <button
          type="button" class="btn btn-toggle"
          @click.stop
        >
          <Translate />
        </button>
        <button type="button" class="btn btn-search" @click.stop="submit()">
          <span class="i-eva-search-fill h-5 w-5" />
        </button>
      </template>
    </div>
  </Wrapper>
</template>

<style scoped>
.form-control {
  @apply animation-duration-250 rounded-18 fixed left-1/2 top-[30%] h-[43px] max-w-[80%] w-[540px] translate-x-[-50%] rounded-3xl bg-white/25 text-white shadow-[0_0_10px_rgba(0,0,0,.2)] backdrop-blur-[10px] backdrop-saturate-[1.5] transition-colors duration-250 ease-in-out;
  @apply dark:bg-black/40 dark:text-gray-200 dark:shadow-[0_0_10px_rgba(0,0,0,.5)];
}

.input-control {
  @apply h-full rounded-18 w-full border-0 bg-transparent px-10 text-center text-sm text-inherit outline-none;
  @apply dark:text-gray-100;
}

.input-focus {
  @apply bg-white/86 text-black;
  @apply dark:bg-black/50 dark:text-white;
}

.btn {
  @apply absolute h-8 w-8 top-1.4 hover:bg-white rounded-2xl;
  @apply text-black;
  @apply dark:hover:bg-black/70 dark:text-white;
}

.btn-search {
  @apply right-1 text-black;
  @apply dark:text-white;
}

.btn-toggle {
  @apply left-1 text-black;
  @apply dark:text-white;
}
</style>
