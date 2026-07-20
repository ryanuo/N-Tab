import { defineStore } from 'pinia'
import { useReactiveStorage } from '~/composables/useReactiveStorage'
import { fileStorage } from '~/composables/indexedDB'
import { coverRandomUrl, coverUrl } from '~/constants/settings'

export const useCoverStore = defineStore('cover', () => {
  const { data: cover } = useReactiveStorage<string>('cover', coverRandomUrl)
  const { data: coverMethod } = useReactiveStorage<'custom' | 'origin'>('coverMethod', 'origin')
  const { data: coverType } = useReactiveStorage<'image' | 'video'>('coverType', 'image')
  const { data: coverCustomKey } = useReactiveStorage<string>('coverCustomKey', '')
  let objectUrl: string | null = null

  const applyCover = () => {
    if (coverMethod.value === 'custom' && coverCustomKey.value) {
      fileStorage.getFile(coverCustomKey.value).then((file: any) => {
        if (file) {
          if (objectUrl)
            URL.revokeObjectURL(objectUrl)
          objectUrl = URL.createObjectURL(file.data)
          cover.value = objectUrl
        }
      })
    }
    else {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
        objectUrl = null
      }
      coverCustomKey.value = ''
    }
  }

  //   applyCover()
  // })

  const setCover = (url?: string) => {
    cover.value = url || coverUrl
    const isOrigin = url?.startsWith('https://') || url?.startsWith('http://')
    coverMethod.value = isOrigin ? 'origin' : 'custom'
    if (!url) {
      coverMethod.value = 'origin'
      coverCustomKey.value = ''
    }
  }

  const reset = () => {
    cover.value = coverRandomUrl
    coverMethod.value = 'origin'
    coverType.value = 'image'
    coverCustomKey.value = ''
    applyCover()
  }

  // 添加 apply 方法
  const apply = () => {
    watchEffect(() => {
      applyCover()
    })
  }

  return {
    cover,
    coverMethod,
    coverType,
    coverCustomKey,
    setCover,
    setCoverMethod: (v: 'custom' | 'origin') => (coverMethod.value = v),
    setCoverType: (v: 'image' | 'video') => (coverType.value = v),
    setCoverCustomKey: (v: string) => (coverCustomKey.value = v),
    reset,
    apply,
  }
})
