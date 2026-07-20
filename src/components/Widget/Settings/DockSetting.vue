<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { getUuid } from '@ryanuo/utils/common'
import { useI18n } from 'vue-i18n'
import { fileStorage } from '~/composables/indexedDB'
import { getDockIconUrl } from '~/composables/useDefaultAvatar'
import { useDockStore } from '~/store/option/settings/dock'

const { t } = useI18n()
const dockStore = useDockStore()
const { dockingData } = storeToRefs(dockStore)

const modalVisible = ref(false)
const isNew = ref(false)
const formData = ref<DockingItem>({ id: '' as DockingID, name: '', icon: '', target: '_blank' })
const newIconFile = ref<File | null>(null)
const iconSource = ref<'iconify' | 'url' | 'upload'>('iconify')
const dragIndex = ref<number | null>(null)
const dragOverIndex = ref<number | null>(null)

function openAddModal() {
  isNew.value = true
  formData.value = { id: '' as DockingID, name: '', icon: '', target: '_blank' }
  iconSource.value = 'url'
  newIconFile.value = null
  modalVisible.value = true
}

function openEditModal(item: DockingItem) {
  isNew.value = false
  formData.value = { ...item }
  iconSource.value = item.iconUrl ? 'url' : item.iconKey ? 'upload' : 'iconify'
  newIconFile.value = null
  modalVisible.value = true
}

function cancelModal() {
  modalVisible.value = false
  formData.value = { id: '' as DockingID, name: '', icon: '', target: '_blank' }
  newIconFile.value = null
}

async function confirmModal() {
  if (!formData.value.name && !formData.value.link)
    return

  if (newIconFile.value) {
    const key = getUuid()
    await fileStorage.saveFile(key, newIconFile.value)
    formData.value.iconKey = key
    formData.value.iconUrl = ''
  }
  else if (!formData.value.icon && formData.value.link) {
    formData.value.iconUrl = await getDockIconUrl(formData.value.name, formData.value.link)
  }

  if (isNew.value) {
    const id = getUuid() as DockingID
    dockStore.addItem({ ...formData.value, id })
  }
  else {
    dockStore.updateItem(formData.value)
  }

  cancelModal()
}

function removeItem(id: DockingID) {
  dockStore.removeItem(id)
}

function handleFileChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) {
    newIconFile.value = file
  }
}

function onDragStart(index: number) {
  dragIndex.value = index
}

function onDragOver(e: DragEvent, index: number) {
  e.preventDefault()
  dragOverIndex.value = index
}

function onDragLeave() {
  dragOverIndex.value = null
}

function onDrop(index: number) {
  if (dragIndex.value === null || dragIndex.value === index)
    return
  const items = [...dockingData.value]
  const [dragged] = items.splice(dragIndex.value, 1)
  items.splice(index, 0, dragged)
  dockingData.value = items
  dragIndex.value = null
  dragOverIndex.value = null
}

function onDragEnd() {
  dragIndex.value = null
  dragOverIndex.value = null
}
</script>

<template>
  <div class="dock-setting">
    <!-- 列表 -->
    <div class="mb-4 space-y-2">
      <div
        v-for="(item, index) in dockingData"
        :key="item.id"
        class="group relative flex items-center gap-3 border border-transparent rounded-xl bg-white/5 p-3 transition-all duration-200 hover:border-[--c-100] hover:bg-white/10 dark:hover:border-[--c-700] dark:hover:bg-white/5"
        :class="{ 'border-[--c-300] bg-white/10': dragOverIndex === index, 'opacity-50': dragIndex === index }"
        draggable="true"
        @dragstart="onDragStart(index)"
        @dragover="onDragOver($event, index)"
        @dragleave="onDragLeave"
        @drop="onDrop(index)"
        @dragend="onDragEnd"
      >
        <!-- 拖拽把手 -->
        <div class="cursor-grab text-gray-400">
          <span class="i-system-uicons-grids" />
        </div>

        <!-- 图标预览 -->
        <div class="h-10 w-10 flex flex-shrink-0 items-center justify-center rounded-lg bg-white/10 text-2xl text-[--c-600] dark:bg-white/5">
          <img v-if="item.iconUrl" :src="item.iconUrl" class="h-6 w-6 rounded" alt="">
          <span v-else :class="item.icon || 'i-carbon-cylinder'" />
        </div>

        <!-- 内容 -->
        <div class="min-w-0 flex-1">
          <div class="flex items-center gap-2">
            <span class="text-color truncate text-sm font-medium">{{ item.name }}</span>
            <span
              v-if="item.target === '_self'"
              class="flex-shrink-0 rounded bg-[--c-100] px-1.5 py-0.5 text-[10px] text-[--c-600]"
            >
              {{ t('dock.edit.currentTab') }}
            </span>
          </div>
          <div class="mt-1 truncate text-sm text-gray-600 dark:text-gray-300">
            {{ item.link }}
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="flex gap-1">
          <button
            class="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-[--c-100] hover:text-[--c-600]"
            @click="openEditModal(item)"
          >
            <span class="i-carbon-edit" />
          </button>
          <button
            class="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-red-100 hover:text-red-500"
            @click="removeItem(item.id)"
          >
            <span class="i-system-uicons-trash" />
          </button>
        </div>
      </div>
    </div>

    <!-- 添加按钮 -->
    <button
      class="w-full flex items-center justify-center gap-2 border-2 border-gray-300 rounded-xl border-dashed py-3 text-sm text-gray-500 transition-colors dark:border-gray-600 hover:border-[--c-300] hover:text-[--c-600] dark:hover:border-[--c-500]"
      @click="openAddModal"
    >
      <span class="i-system-uicons-plus" />
      {{ t('dock.add') }}
    </button>

    <!-- 编辑/添加 弹窗 -->
    <div
      v-if="modalVisible"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      @click.self="cancelModal"
    >
      <div class="m-4 max-w-lg w-full rounded-2xl bg-white p-6 shadow-xl dark:bg-[#23272f]">
        <h3 class="text-color mb-4 text-lg font-semibold">
          {{ isNew ? t('dock.add') : t('common.edit') }}
        </h3>

        <div class="space-y-4">
          <!-- 名称 -->
          <div>
            <label class="mb-1 block text-sm text-gray-600 dark:text-gray-400">{{ t('dock.edit.name') }}</label>
            <input
              v-model="formData.name"
              class="w-full border border-gray-200 rounded-lg bg-transparent px-3 py-2 text-sm outline-none dark:border-gray-600 focus:border-[--c-500] dark:text-white"
              :placeholder="t('dock.edit.name')"
            >
          </div>

          <!-- 链接 -->
          <div>
            <label class="mb-1 block text-sm text-gray-600 dark:text-gray-400">{{ t('dock.edit.link') }}</label>
            <input
              v-model="formData.link"
              class="w-full border border-gray-200 rounded-lg bg-transparent px-3 py-2 text-sm outline-none dark:border-gray-600 focus:border-[--c-500] dark:text-white"
              :placeholder="t('dock.edit.link')"
            >
          </div>

          <!-- 打开方式 -->
          <div>
            <label class="mb-1 block text-sm text-gray-600 dark:text-gray-400">{{ t('dock.edit.openMode') }}</label>
            <select
              v-model="formData.target"
              class="w-full border border-gray-200 rounded-lg bg-transparent px-3 py-2 text-sm outline-none dark:border-gray-600 focus:border-[--c-500] dark:text-white"
            >
              <option value="_blank">
                {{ t('dock.edit.newTab') }}
              </option>
              <option value="_self">
                {{ t('dock.edit.currentTab') }}
              </option>
            </select>
          </div>

          <!-- 图标来源 -->
          <div>
            <label class="mb-2 block text-sm text-gray-600 dark:text-gray-400">{{ t('dock.edit.icon') }}</label>
            <div class="mb-2 flex gap-2">
              <button
                v-for="source in [
                  { key: 'iconify', label: t('dock.edit.iconify'), icon: 'i-carbon-code' },
                  { key: 'url', label: t('dock.edit.iconUrl'), icon: 'i-carbon-link' },
                  { key: 'upload', label: t('dock.edit.upload'), icon: 'i-carbon-upload' },
                ]"
                :key="source.key"
                class="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs transition-colors"
                :class="iconSource === source.key ? 'bg-[--c-500] text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'"
                @click="iconSource = source.key as any"
              >
                <span :class="source.icon" />
                {{ source.label }}
              </button>
            </div>

            <input
              v-if="iconSource === 'iconify'"
              v-model="formData.icon"
              class="w-full border border-gray-200 rounded-lg bg-transparent px-3 py-2 text-sm outline-none dark:border-gray-600 focus:border-[--c-500] dark:text-white"
              :placeholder="t('dock.edit.iconPlaceholder')"
            >
            <input
              v-if="iconSource === 'url'"
              v-model="formData.iconUrl"
              class="w-full border border-gray-200 rounded-lg bg-transparent px-3 py-2 text-sm outline-none dark:border-gray-600 focus:border-[--c-500] dark:text-white"
              :placeholder="t('dock.edit.iconUrlPlaceholder')"
            >
            <label
              v-if="iconSource === 'upload'"
              class="w-full flex cursor-pointer items-center justify-center gap-2 border-2 border-gray-300 rounded-lg border-dashed py-6 text-sm text-gray-500 transition-colors dark:border-gray-600 hover:border-[--c-300] hover:text-[--c-600]"
            >
              <span class="i-system-uicons-upload" />
              {{ t('dock.edit.upload') }}
              <input type="file" class="hidden" accept="image/*" @change="handleFileChange">
            </label>
          </div>
        </div>

        <!-- 按钮 -->
        <div class="mt-6 flex justify-end gap-2">
          <button
            class="rounded-lg px-4 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            @click="cancelModal"
          >
            {{ t('common.cancel') }}
          </button>
          <button
            class="rounded-lg bg-[--c-500] px-4 py-2 text-sm text-white transition-colors hover:bg-[--c-600]"
            @click="confirmModal"
          >
            {{ t('common.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
