<script setup lang="ts">
import { getUrlParamsString } from '@ryanuo/utils/browser'
import { useI18n } from 'vue-i18n'
import { useMarkStore } from '~/store/option/mark'
import { useTimeStore, useWeatherStore } from '~/store/option/settings'
import { useDateTime } from '~/composables/useDateTime'

const weatherStore = useWeatherStore()
const timeStore = useTimeStore()

const { currentDateTime, currentDateWeek } = useDateTime()

const isZh = useI18n().locale.value === 'zh-CN'

const markStore = useMarkStore()
function handleDateFocus() {
  markStore.setShowWidget(true)
}

const weatherIframe = computed(() => {
  if (weatherStore.weatherTheme === '1') {
    return getUrlParamsString({
      style: 'tm',
      skin: 'gif',
      align: 'center',
      color: 'fff7ff',
      fontsize: '12',
    }, 'https://widget.tianqiapi.com/')
  }

  return getUrlParamsString({
    c: 'code',
    a: 'getcode',
    id: '34',
    py: weatherStore?.weatherCity?.city?.pinyin || 'beijing',
    icon: '1',
    lang: isZh ? 'cn' : 'en',
    color: '#fff7ff',
  }, 'https://i.tianqi.com/')
})
</script>

<template>
  <div class="time">
    <p class="text-[4em] text-white" @click.stop="handleDateFocus">
      {{ currentDateTime }}
    </p>
    <p v-if="timeStore.showDateWeek" class="text-[1.2em] text-white">
      {{ currentDateWeek }}
    </p>
    <iframe
      v-if="weatherStore.showWeather" scrolling="no" :src="weatherIframe" frameborder="0" width="240" height="28"
      class="mt-2 rounded" allowtransparency="true"
    />
  </div>
</template>

<style scoped>
.time {
  @apply top-[12%] items-center animate-fade-meta-in duration-600 ease-[cubic-bezier(.21, .78, .36, 1)] flex flex-col justify-center min-h-[140px] absolute transition-transform duration-300 z-10;
}

.time p {
  @apply cursor-pointer;
}
</style>
