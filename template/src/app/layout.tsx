import type { Metadata } from 'next'
import './globals.css'
import { I18nProvider } from './i18n/provider'
import { ThemeProvider } from './components/theme-provider'

export const metadata: Metadata = {
  title: 'Tauri App',
  description: 'A modern Tauri application with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>{children}</I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
