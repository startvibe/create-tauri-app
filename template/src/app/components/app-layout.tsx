'use client'

import { useState, useEffect } from 'react'
import { useTranslation } from '../i18n/provider'
import { ThemeToggle } from './theme-toggle'
import { LanguageToggle } from './language-toggle'
import ErrorBoundary from './error-boundary'

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-base-200 text-base-content">
      {/* 导航栏 */}
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${
            scrolled
              ? 'bg-base-100/80 backdrop-blur-lg shadow-lg border-b border-base-300'
              : 'bg-transparent'
          }
        `}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-primary-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <span className="text-xl font-bold">Tauri App</span>
            </div>

            {/* 导航菜单 */}
            <nav className="hidden md:flex items-center gap-8">
              <a
                href="#features"
                className="text-base-content/80 hover:text-primary transition-colors"
              >
                {t('nav.features', '特性')}
              </a>
              <a href="#demo" className="text-base-content/80 hover:text-primary transition-colors">
                {t('nav.demo', '演示')}
              </a>
              <a
                href="https://tauri.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-base-content/80 hover:text-primary transition-colors"
              >
                {t('nav.docs', '文档')}
              </a>
            </nav>

            {/* 控制按钮 */}
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />

              {/* 移动端菜单按钮 */}
              <div className="md:hidden">
                <button className="btn btn-ghost btn-square btn-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容 */}
      <main className="relative">
        {/* 占位符，避免内容被固定导航栏遮挡 */}
        <div className="h-16 lg:h-20" />

        <ErrorBoundary>{children}</ErrorBoundary>
      </main>

      {/* 页脚 */}
      <footer className="bg-base-100 border-t border-base-300 py-12 lg:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-6 h-6 bg-primary rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-primary-foreground"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" />
                  <path d="M2 17L12 22L22 17" />
                  <path d="M2 12L12 17L22 12" />
                </svg>
              </div>
              <span className="text-lg font-bold">Tauri App</span>
            </div>

            <p className="text-base-content/60 mb-6">
              {t('footer.description', '基于 Tauri + Next.js 的现代桌面应用模板')}
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-base-content/60">
              <a
                href="https://tauri.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Tauri
              </a>
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Next.js
              </a>
              <a
                href="https://react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                React
              </a>
              <a
                href="https://tailwindcss.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Tailwind CSS
              </a>
            </div>

            <div className="mt-8 pt-8 border-t border-base-300">
              <p className="text-sm text-base-content/40">
                © 2024 Tauri App. {t('footer.rights', '保留所有权利。')}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
