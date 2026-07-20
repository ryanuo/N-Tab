<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMarkStore } from '~/store/option/mark'
import { usePreferenceStore, useThemeStore } from '~/store/option/settings'
import { useDockStore } from '~/store/option/settings/dock'
import { getDockIconUrl } from '~/composables/useDefaultAvatar'
import { fileStorage } from '~/composables/indexedDB'

const markStore = useMarkStore()
const themeStore = useThemeStore()
const dockStore = useDockStore()
const { dockingData } = storeToRefs(dockStore)
function toggleDark() {
  themeStore.setTheme(themeStore.theme === 'dark' ? 'light' : 'dark')
}
const dockingId = ref<DockingID>('all')
const preferenceStore = usePreferenceStore()

function openLink(item: DockingItem) {
  if (!item.link)
    return
  if (item.target === '_self') {
    window.location.href = item.link
  }
  else {
    window.open(item.link, '_blank')
  }
}

function handleIconClick(item: DockingItem) {
  const { id: idx, link } = item
  if (['all', 'camera', 'cover', 'settings'].includes(idx)) {
    markStore.setShowWidget(true)
    dockingId.value = idx
    return
  }

  if (idx === 'theme') {
    toggleDark()
    return
  }

  if (link) {
    openLink(item)
  }
}

defineExpose({
  handleIconClick,
})

watchEffect(() => {
  if (!markStore.maskLayerEnabled) {
    dockingId.value = 'all'
  }
})

async function getIconUrl(item: DockingItem): Promise<string> {
  if (item.iconUrl)
    return item.iconUrl
  if (item.iconKey) {
    const file = await fileStorage.getFile(item.iconKey) as any
    if (file?.data)
      return URL.createObjectURL(file.data)
  }
  if (item.icon)
    return ''
  return getDockIconUrl(item.name, item.link)
}

const iconUrls = ref<Record<string, string>>({})

async function loadIcons() {
  const urls: Record<string, string> = {}
  for (const item of dockingData.value) {
    urls[item.id] = await getIconUrl(item)
  }
  iconUrls.value = urls
}

watch(dockingData, loadIcons, { deep: true })
onMounted(loadIcons)

onUnmounted(() => {
  for (const url of Object.values(iconUrls.value)) {
    if (url.startsWith('blob:'))
      URL.revokeObjectURL(url)
  }
})
</script>

<template>
  <div v-if="preferenceStore.showDocking" class="docking">
    <div
      v-for="item in dockingData"
      :key="item.id"
      class="icon h-10 w-10 flex cursor-pointer items-center justify-center rounded-xl bg-white/80 shadow transition-all duration-200 dark:bg-black/60 hover:bg-white hover:scale-105! dark:hover:bg-black/80"
      :class="item.class"
      @click.stop="handleIconClick(item)"
    >
      <img
        v-if="iconUrls[item.id] && !item.icon"
        :src="iconUrls[item.id]"
        class="m-2 h-5 w-5"
        alt=""
      >
      <span
        v-else-if="item.icon"
        class="m-2 text-2xl"
        :class="item.icon"
      />
      <span
        v-else
        class="m-2 text-2xl text-gray-400"
      >?</span>
    </div>
  </div>
  <Widget :show="markStore.isShowWidget" :idx="dockingId" />
</template>

<style scoped>
.docking {
  @apply fixed bottom-4 left-1/2 z-130 max-w-[calc(100%-40px)] flex translate-x-[-50%] gap-3 rounded-2xl bg-white/30 p-2 shadow-lg backdrop-blur-lg backdrop-brightness-125 backdrop-saturate-150 transition-all duration-250;
  @apply dark:border-white/1 dark:bg-[#23272f]/50 dark:shadow-black/40;
}

.icon {
  animation: fadeIn 0.5s ease-in-out forwards;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
