import { computed } from 'vue'
import {
  useCoverStore,
  useLocaleStore,
  usePreferenceStore,
  useThemeStore,
  useTimeStore,
  useWeatherStore,
} from '~/store/option/settings'

export function createComputed<T>(getter: () => T, setter: (v: T) => void) {
  return computed<T>({
    get: getter,
    set: setter,
  })
}

// 用一个函数返回所有 computed
export function useSettingsModels() {
  // 这些调用只会在组件 setup 阶段被执行，保证 Pinia 已激活
  const themeStore = useThemeStore()
  const localeStore = useLocaleStore()
  const coverStore = useCoverStore()
  const timeStore = useTimeStore()
  const weatherStore = useWeatherStore()
  const preferenceStore = usePreferenceStore()

  return {
    // 主题相关
    theme: createComputed(() => themeStore.theme, themeStore.setTheme),
    colorTheme: createComputed(() => themeStore.colorTheme, themeStore.setColorTheme),

    // 语言
    language: createComputed(() => localeStore.language, localeStore.setLanguage),

    // 封面
    cover: createComputed(() => coverStore.cover, coverStore.setCover),
    coverMethod: createComputed(() => coverStore.coverMethod, coverStore.setCoverMethod),
    coverType: createComputed(() => coverStore.coverType, coverStore.setCoverType),
    coverCustomKey: createComputed(() => coverStore.coverCustomKey, coverStore.setCoverCustomKey),

    // 时间
    timezone: createComputed(() => timeStore.timezone, timeStore.setTimezone),
    is24Hour: createComputed(() => timeStore.is24Hour, timeStore.setIs24Hour),
    showSeconds: createComputed(() => timeStore.showSeconds, timeStore.setShowSeconds),
    showDateWeek: createComputed(() => timeStore.showDateWeek, timeStore.setShowDateWeek),

    // 天气
    weatherCity: createComputed(() => weatherStore.weatherCity, weatherStore.setWeatherCity),
    showWeather: createComputed(() => weatherStore.showWeather, weatherStore.setShowWeather),
    weatherTheme: createComputed(() => weatherStore.weatherTheme, weatherStore.setWeatherTheme),

    // 偏好
    isAutoFocusSearchBoxOnPageLoad: createComputed(
      () => preferenceStore.isAutoFocusSearchBoxOnPageLoad,
      preferenceStore.setIsAutoFocusSearchBoxOnPageLoad,
    ),
    showDocking: createComputed(
      () => preferenceStore.showDocking,
      preferenceStore.setShowDocking,
    ),
    animation: createComputed(
      () => preferenceStore.animation,
      preferenceStore.setAnimation,
    ),
  }
}
