'use client'

import { useEffect, useState } from 'react'

interface I18nProviderProps {
  children: React.ReactNode
}

export function I18nProvider({ children }: I18nProviderProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // 动态导入i18n配置以避免SSR问题
    import('./init').then(() => {
      setIsLoaded(true)
    })
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return <>{children}</>
}
