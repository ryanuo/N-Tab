import { defineStore } from 'pinia'
import { useReactiveStorage } from '~/composables/useReactiveStorage'

const defaultDockingData: DockingItem[] = [
  { id: 'ai', name: 'AI助手', icon: 'i-simple-icons-openai', link: 'https://chat.openai.com/', target: '_blank' },
  { id: 'translate', name: '翻译', icon: 'i-ic-sharp-translate', link: 'https://www.bing.com/translator', target: '_blank' },
  { id: 'music', name: '音乐', icon: 'i-twemoji:musical-note', link: 'https://music.163.com/', target: '_blank' },
  { id: 'camera', name: '照片', icon: 'i-twemoji:camera' },
  { id: 'video', name: '视频', icon: 'i-icon-park:video-one', link: 'https://www.bilibili.com/', target: '_blank' },
  { id: 'note', name: '笔记', icon: 'i-twemoji:spiral-notepad', link: 'https://www.yuque.com/', target: '_blank' },
  { id: 'cover', name: '壁纸设置', icon: 'i-icon-park-pic' },
  { id: 'mail', name: '邮件', icon: 'i-logos:mailchimp-freddie', link: 'https://mail.aliyun.com/', target: '_blank' },
  { id: 'github', name: 'Github', icon: 'i-skill-icons:github-dark', link: 'https://github.com/ryanuo/tab-ext', target: '_blank' },
  { id: 'settings', name: '设置', icon: 'i-twemoji:gear' },
  { id: 'theme', name: '主题', icon: 'i-twemoji:sun' },
]

export const useDockStore = defineStore('dock', () => {
  const { data: dockingData } = useReactiveStorage<DockingItem[]>('dockingData', defaultDockingData)

  function addItem(item: DockingItem) {
    dockingData.value.push(item)
  }

  function removeItem(id: DockingID) {
    const index = dockingData.value.findIndex(d => d.id === id)
    if (index !== -1)
      dockingData.value.splice(index, 1)
  }

  function updateItem(item: DockingItem) {
    const index = dockingData.value.findIndex(d => d.id === item.id)
    if (index !== -1)
      dockingData.value[index] = item
  }

  function reset() {
    dockingData.value = [...defaultDockingData]
  }

  function reorder(items: DockingItem[]) {
    dockingData.value = items
  }

  return {
    dockingData,
    addItem,
    removeItem,
    updateItem,
    reorder,
    reset,
  }
})
