import { defineStore } from 'pinia'
import { useReactiveStorage } from '~/composables/useReactiveStorage'

export const usePreferenceStore = defineStore('preference', () => {
  const { data: isAutoFocusSearchBoxOnPageLoad } = useReactiveStorage<boolean>('isAutoFocusSearchBoxOnPageLoad', false)
  const { data: showDocking } = useReactiveStorage<boolean>('showDocking', false)
  const { data: animation } = useReactiveStorage<boolean>('animation', true)

  const reset = () => {
    isAutoFocusSearchBoxOnPageLoad.value = false
    showDocking.value = false
    animation.value = true
  }

  return {
    isAutoFocusSearchBoxOnPageLoad,
    showDocking,
    animation,
    setIsAutoFocusSearchBoxOnPageLoad: (v: boolean) => (isAutoFocusSearchBoxOnPageLoad.value = v),
    setShowDocking: (v: boolean) => (showDocking.value = v),
    setAnimation: (v: boolean) => (animation.value = v),
    reset,
  }
})
