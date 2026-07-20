declare const __DEV__: boolean
/** Extension name, defined in packageJson.name */
declare const __NAME__: string
// package version
declare const __APP_VERSION__: string
declare const __BUILD_TIME__: string
declare const __USEEXTENSION__: boolean

declare module '*.vue' {
  const component: any
  export default component
}

declare interface Engines {
  name: string
  url: string
  icon?: string
  iconUrl?: string
  translateUrl?: string
}

declare interface WeatherCity {
  province: {
    id: number
    name: string
    pinyin: string
  }
  city: {
    id: number
    name: string
    pinyin: string
  }
  area: {
    id: number
    name: string
    pinyin: string
  }
}

// Docking
type DockingID = 'all' | 'ai' | 'cover' | 'translate' | 'video' | 'music' | 'camera' | 'photo' | 'settings' | 'mail' | 'calendar' | 'note' | 'github' | 'theme'
interface DockingItem {
  id: DockingID
  name: string
  icon: string
  iconUrl?: string
  iconKey?: string
  link?: string
  class?: string
  target?: '_self' | '_blank'
}
type ColorTheme = 'green' | 'red' | 'purple' | 'yellow' | 'pink' | 'blue' | 'orange'
interface ConsoleItem {
  link: string
  name: string
  tag: string
  icon?: string
  iconUrl?: string
  class?: string
}
