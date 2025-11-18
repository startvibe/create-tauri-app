'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  systemTheme: 'light' | 'dark'
  effectiveTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // 使用 lazy initialization 获取初始主题状态
  const getInitialState = (): { theme: Theme; systemTheme: 'light' | 'dark' } => {
    if (typeof window === 'undefined') {
      return { theme: 'system' as Theme, systemTheme: 'light' as 'light' | 'dark' }
    }

    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const savedTheme = localStorage.getItem('theme') as Theme
    const theme =
      savedTheme && ['light', 'dark', 'system'].includes(savedTheme) ? savedTheme : 'system'

    return { theme, systemTheme }
  }

  const initialState = getInitialState()
  const [theme, setThemeState] = useState<Theme>(initialState.theme)
  const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>(initialState.systemTheme)

  // 检测系统主题变化
  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e: { matches: boolean }) => {
      setSystemTheme(e.matches ? 'dark' : 'light')
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // 应用主题到DOM
  useEffect(() => {
    if (typeof window === 'undefined') return

    const effectiveTheme = theme === 'system' ? systemTheme : theme

    if (effectiveTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.removeAttribute('data-theme')
      document.documentElement.classList.remove('dark')
    }
  }, [theme, systemTheme])

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else if (theme === 'dark') {
      setTheme('system')
    } else {
      setTheme('light')
    }
  }

  const effectiveTheme = theme === 'system' ? systemTheme : theme

  return (
    <ThemeContext.Provider
      value={{
        theme,
        systemTheme,
        effectiveTheme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}
