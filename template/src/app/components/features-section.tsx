'use client'

import { useState } from 'react'
import { ZapIcon, ShieldIcon, GlobeIcon, Code2Icon, PaletteIcon, WrenchIcon } from 'lucide-react'
import { useTranslation } from '../i18n/provider'

interface Feature {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  details: string[]
}

export function FeaturesSection() {
  const { t } = useTranslation()
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  const features: Feature[] = [
    {
      id: 'performance',
      title: t('features.performance.title', '高性能'),
      description: t('features.performance.description', 'Rust 后端提供卓越的性能和安全性'),
      icon: ZapIcon,
      details: [
        t('features.performance.details.0', '极快的启动速度'),
        t('features.performance.details.1', '低内存占用'),
        t('features.performance.details.2', '原生应用性能'),
      ],
    },
    {
      id: 'security',
      title: t('features.security.title', '安全可靠'),
      description: t('features.security.description', '多层安全架构保护您的应用和数据'),
      icon: ShieldIcon,
      details: [
        t('features.security.details.0', '权限控制系统'),
        t('features.security.details.1', '安全沙箱环境'),
        t('features.security.details.2', '加密数据传输'),
      ],
    },
    {
      id: 'crossplatform',
      title: t('features.crossplatform.title', '跨平台'),
      description: t(
        'features.crossplatform.description',
        '一套代码，多平台部署，覆盖主流操作系统'
      ),
      icon: GlobeIcon,
      details: [
        t('features.crossplatform.details.0', 'Windows、macOS、Linux'),
        t('features.crossplatform.details.1', '统一的用户体验'),
        t('features.crossplatform.details.2', '原生系统集成'),
      ],
    },
    {
      id: 'modern',
      title: t('features.modern.title', '现代化技术栈'),
      description: t('features.modern.description', '使用最新的前端技术构建用户界面'),
      icon: Code2Icon,
      details: [
        t('features.modern.details.0', 'React 19 + TypeScript'),
        t('features.modern.details.1', 'Next.js 16 框架'),
        t('features.modern.details.2', '热重载开发体验'),
      ],
    },
    {
      id: 'design',
      title: t('features.design.title', '精美设计'),
      description: t('features.design.description', '内置现代化 UI 组件库，支持主题切换'),
      icon: PaletteIcon,
      details: [
        t('features.design.details.0', 'Tailwind CSS + DaisyUI'),
        t('features.design.details.1', '暗色/亮色主题'),
        t('features.design.details.2', '响应式设计'),
      ],
    },
    {
      id: 'tooling',
      title: t('features.tooling.title', '开发工具'),
      description: t('features.tooling.description', '完整的开发工具链，提升开发效率'),
      icon: WrenchIcon,
      details: [
        t('features.tooling.details.0', 'TypeScript 类型检查'),
        t('features.tooling.details.1', 'ESLint + Prettier'),
        t('features.tooling.details.2', '热模块替换'),
      ],
    },
  ]

  return (
    <section id="features" className="py-20 lg:py-32 bg-base-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 标题区域 */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {t('features.title', '强大特性')}
            </span>
          </h2>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            {t('features.subtitle', '集成了现代化的技术栈和工具，为您提供最佳的桌面应用开发体验。')}
          </p>
        </div>

        {/* 特性网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map(feature => {
            const Icon = feature.icon
            const isActive = activeFeature === feature.id

            return (
              <div
                key={feature.id}
                className="group relative"
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div
                  className={`
                    relative h-full p-6 lg:p-8 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                    ${
                      isActive
                        ? 'border-primary bg-primary/5 shadow-2xl transform -translate-y-2'
                        : 'border-base-300 bg-base-200/50 hover:border-primary/50 hover:bg-base-100 hover:shadow-xl'
                    }
                  `}
                >
                  {/* 背景装饰 */}
                  <div
                    className={`
                    absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300
                    ${isActive ? 'opacity-100' : ''}
                  `}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl" />
                  </div>

                  {/* 内容 */}
                  <div className="relative z-10">
                    {/* 图标 */}
                    <div
                      className={`
                      w-12 h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300
                      ${
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-base-100 text-primary group-hover:bg-primary/10'
                      }
                    `}
                    >
                      <Icon className="w-6 h-6 lg:w-7 lg:h-7" />
                    </div>

                    {/* 标题和描述 */}
                    <h3 className="text-xl lg:text-2xl font-bold mb-3 text-base-content">
                      {feature.title}
                    </h3>
                    <p className="text-base-content/70 mb-6 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* 详细信息 */}
                    <div
                      className={`
                      space-y-2 transition-all duration-300 overflow-hidden
                      ${isActive ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}
                    `}
                    >
                      <div className="pt-4 border-t border-base-300">
                        <ul className="space-y-2">
                          {feature.details.map((detail, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm text-base-content/60"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* 悬浮指示器 */}
                  <div
                    className={`
                    absolute bottom-4 right-4 w-2 h-2 rounded-full bg-primary transition-all duration-300
                    ${isActive ? 'scale-150' : 'scale-0 group-hover:scale-100'}
                  `}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* 底部行动提示 */}
        <div className="text-center mt-16 lg:mt-20">
          <p className="text-base-content/60 mb-8">
            {t('features.ready', '准备好开始您的项目了吗？')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg">
              {t('features.getStarted', '立即开始')}
            </button>
            <button className="btn btn-outline btn-lg">
              {t('features.viewExamples', '查看示例')}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
