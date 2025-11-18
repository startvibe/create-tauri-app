import { useState, useEffect } from 'react'

// 用于媒体查询的 React Hook（简化版本）
export function useMediaQuery(query: string): boolean {
  // 使用 lazy initialization 避免在 effect 中 setState
  const getInitialState = () => {
    if (typeof window === 'undefined') {
      return false
    }
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState(getInitialState)

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined
    }

    const media = window.matchMedia(query)

    const listener = (event: { matches: boolean }) => {
      setMatches(event.matches)
    }

    // 添加事件监听器
    media.addEventListener('change', listener)

    // 清理函数
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

// 常用的媒体查询 hooks
export function usePrefersDarkMode(): boolean {
  return useMediaQuery('(prefers-color-scheme: dark)')
}

export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

export function useIsMobile(): boolean {
  return useMediaQuery('(max-width: 768px)')
}

export function useIsTablet(): boolean {
  return useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
}

export function useIsDesktop(): boolean {
  return useMediaQuery('(min-width: 1025px)')
}
