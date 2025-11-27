'use client'

import { useState, useEffect } from 'react'
import { ChevronDownIcon, SparklesIcon } from 'lucide-react'
import { useTranslation } from '../i18n/provider'
import { Button } from '../../components/ui/button'

export function HeroSection() {
  const { t } = useTranslation()
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features')
    featuresSection?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 动态背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />

      {/* 鼠标跟随光效 */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(var(--theme-primary), 0.1), transparent 40%)`,
        }}
      />

      {/* 主要内容 */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* 顶部徽章 */}
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
          <SparklesIcon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {t('hero.badge', '现代化的桌面应用开发')}
          </span>
        </div>

        {/* 主标题 */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            {t('hero.title', 'Tauri + Next.js')}
          </span>
          <br />
          <span className="text-base-content">{t('hero.subtitle', '构建跨平台桌面应用')}</span>
        </h1>

        {/* 描述文本 */}
        <p className="text-lg sm:text-xl text-base-content/70 mb-12 max-w-2xl mx-auto leading-relaxed">
          {t(
            'hero.description',
            '结合 Rust 的后端性能和 React 的前端体验，创建快速、安全、现代化的桌面应用程序。'
          )}
        </p>

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            onClick={scrollToFeatures}
            className="px-8 py-4 text-lg font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {t('hero.primaryAction', '开始探索')}
            <ChevronDownIcon className="w-5 h-5 ml-2" />
          </Button>

          <Button variant="outline" size="lg" asChild>
            <a
              href="https://tauri.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 text-lg font-medium transition-all duration-200"
            >
              {t('hero.secondaryAction', '查看文档')}
            </a>
          </Button>
        </div>

        {/* 技术栈展示 */}
        <div className="flex flex-wrap justify-center gap-4 text-sm text-base-content/60">
          <span className="px-3 py-1 rounded-full bg-base-100/80 backdrop-blur-sm border border-base-300">
            Rust
          </span>
          <span className="px-3 py-1 rounded-full bg-base-100/80 backdrop-blur-sm border border-base-300">
            React 19
          </span>
          <span className="px-3 py-1 rounded-full bg-base-100/80 backdrop-blur-sm border border-base-300">
            Next.js 16
          </span>
          <span className="px-3 py-1 rounded-full bg-base-100/80 backdrop-blur-sm border border-base-300">
            TypeScript
          </span>
          <span className="px-3 py-1 rounded-full bg-base-100/80 backdrop-blur-sm border border-base-300">
            Tailwind CSS
          </span>
        </div>
      </div>

      {/* 底部滚动指示器 */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
          scrolled ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <button
          onClick={scrollToFeatures}
          className="group flex flex-col items-center text-base-content/60 hover:text-primary transition-colors duration-200"
          aria-label="滚动到特性区域"
        >
          <span className="text-sm mb-2">{t('hero.scrollIndicator', '向下滚动')}</span>
          <ChevronDownIcon className="w-6 h-6 animate-bounce" />
        </button>
      </div>

      {/* 装饰性元素 */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-accent/10 rounded-full blur-xl animate-pulse delay-2000" />
    </section>
  )
}
