import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from './i18n/provider'

export const metadata: Metadata = {
  title: 'Tauri App',
  description: 'A modern Tauri application with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="bg-base-200">
        <I18nProvider>{children}</I18nProvider>
      </body>
    </html>
  )
}
