import * as React from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [isDark, setIsDark] = React.useState(false)

  // 将 updateTheme 函数声明移到前面
  const updateTheme = React.useCallback((dark: boolean) => {
    const html = document.documentElement
    if (dark) {
      html.classList.add('dark')
      html.setAttribute('data-theme', 'dark')
    } else {
      html.classList.remove('dark')
      html.setAttribute('data-theme', 'light')
    }
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [])

  React.useEffect(() => {
    // 初始化主题
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark)

    setIsDark(shouldBeDark)
    updateTheme(shouldBeDark)
  }, [updateTheme])

  React.useEffect(() => {
    updateTheme(isDark)
  }, [isDark, updateTheme])

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle theme-controller"
      aria-label="切换主题"
      data-theme={isDark ? 'dark' : 'light'}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  )
}
