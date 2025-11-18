// 中文语言包
import zhCNCommon from './locales/zh-CN/common.json'
import zhCNHome from './locales/zh-CN/home.json'
import zhCNValidation from './locales/zh-CN/validation.json'

// 英文语言包
import enUSCommon from './locales/en-US/common.json'
import enUSHome from './locales/en-US/home.json'
import enUSValidation from './locales/en-US/validation.json'

export const resources = {
  'zh-CN': {
    common: zhCNCommon,
    home: zhCNHome,
    validation: zhCNValidation,
  },
  'en-US': {
    common: enUSCommon,
    home: enUSHome,
    validation: enUSValidation,
  },
} as const

export type Language = keyof typeof resources
export type Namespace = keyof (typeof resources)['zh-CN']
