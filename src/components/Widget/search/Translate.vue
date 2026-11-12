<script lang="ts" setup>
import hotkeys from 'hotkeys-js'
import { storeToRefs } from 'pinia'
import { TRANSLATE_URL } from '~/constants/common'
import { useSearchStore } from '~/store/option/search'

const searchStore = useSearchStore()
const { searchQuery } = storeToRefs(searchStore)

function clickTranslate() {
  if (searchQuery.value.trim())
    window.open(TRANSLATE_URL + encodeURIComponent(searchQuery.value.trim()), '_blank')
}

onMounted(() => {
  hotkeys('option+enter', clickTranslate)
})

onUnmounted(() => {
  hotkeys.unbind('option+enter', clickTranslate)
})
</script>

<template>
  <div class="h-full w-full flex items-center justify-center" :title="$t('translate.quick')" @click.stop="clickTranslate">
    <span class="i-icon-park-outline-translate h-5 w-5" />
  </div>
</template>
