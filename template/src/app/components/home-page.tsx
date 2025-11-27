'use client'

import { useTranslation } from '../i18n/provider'
import { HeroSection } from './hero-section'
import { FeaturesSection } from './features-section'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen">
      {/* Hero 区域 */}
      <HeroSection />

      {/* 特性展示 */}
      <FeaturesSection />

      {/* 快速开始区域 */}
      <section className="py-20 lg:py-32 bg-base-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              {t('home.ready.title', '准备开始您的项目')}
            </h2>
            <p className="text-lg text-base-content/70 mb-12 max-w-2xl mx-auto">
              {t(
                'home.ready.description',
                '这个模板已经为您配置好了所有必要的工具和依赖，您可以立即开始开发自己的应用。'
              )}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="shadow-lg">
                <CardContent className="text-center pt-6">
                  <div className="text-4xl mb-4">🚀</div>
                  <h3 className="font-semibold text-lg mb-2 text-center">
                    {t('home.ready.step1', '步骤 1')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('home.ready.step1Desc', '克隆或下载这个模板项目')}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="text-center pt-6">
                  <div className="text-4xl mb-4">⚙️</div>
                  <h3 className="font-semibold text-lg mb-2 text-center">
                    {t('home.ready.step2', '步骤 2')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('home.ready.step2Desc', '运行 pnpm install 安装依赖')}
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-lg">
                <CardContent className="text-center pt-6">
                  <div className="text-4xl mb-4">✨</div>
                  <h3 className="font-semibold text-lg mb-2 text-center">
                    {t('home.ready.step3', '步骤 3')}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {t('home.ready.step3Desc', '运行 pnpm tauri dev 开始开发')}
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">{t('home.ready.getStarted', '立即开始')}</Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://tauri.app/v1/guides/" target="_blank" rel="noopener noreferrer">
                  {t('home.ready.viewDocs', '查看文档')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
