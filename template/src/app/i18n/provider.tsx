'use client'

import { useEffect, useState, createContext, useContext } from 'react'
import { useTranslation as useReactTranslation } from 'react-i18next'

interface I18nProviderProps {
  children: React.ReactNode
}

interface TranslationContextType {
  t: (key: string, fallback?: string) => string
  changeLanguage: (lang: string) => Promise<void>
  currentLanguage: string
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function I18nProvider({ children }: I18nProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const { t, i18n } = useReactTranslation()

  useEffect(() => {
    // 动态导入i18n配置以避免SSR问题
    import('./init').then(() => {
      setIsLoaded(true)
    })
  }, [])

  const changeLanguage = async (lang: string) => {
    await i18n.changeLanguage(lang)
  }

  const contextValue: TranslationContextType = {
    t: (key: string, fallback?: string) => {
      const translation = t(key)
      return translation !== key ? translation : fallback || key
    },
    changeLanguage,
    currentLanguage: i18n.language,
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-spinner loading-lg" />
      </div>
    )
  }

  return <TranslationContext.Provider value={contextValue}>{children}</TranslationContext.Provider>
}

export const useTranslation = () => {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within I18nProvider')
  }
  return context
}
