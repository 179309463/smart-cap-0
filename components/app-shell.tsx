import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: ReactNode
  className?: string
  /** 背景色，部分页面（如拍摄页）为深色 */
  dark?: boolean
  /** 是否给底部留出 tabbar / CTA 的空间 */
  bottomSpace?: boolean
}

/**
 * 移动端 H5 外壳：在桌面端居中显示为手机宽度，移动端全屏。
 */
export function AppShell({ children, className, dark, bottomSpace }: AppShellProps) {
  return (
    <div className="flex min-h-dvh w-full justify-center">
      <main
        className={cn(
          'relative flex w-full max-w-[430px] flex-col min-h-dvh overflow-hidden',
          dark ? 'bg-[#1c1714] text-white' : 'bg-background text-foreground',
          className,
        )}
      >
        <div className={cn('flex-1', bottomSpace && 'pb-28')}>{children}</div>
      </main>
    </div>
  )
}
