'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface TopBarProps {
  title?: string
  /** 右侧操作区 */
  right?: ReactNode
  /** 关闭样式（X）而非返回箭头 */
  close?: boolean
  /** 深色背景下的样式 */
  dark?: boolean
  /** 自定义返回行为，默认 router.back() */
  onBack?: () => void
  /** 隐藏返回按钮 */
  hideBack?: boolean
}

export function TopBar({ title, right, close, dark, onBack, hideBack }: TopBarProps) {
  const router = useRouter()
  const handleBack = () => {
    if (onBack) return onBack()
    router.back()
  }

  const circle = dark
    ? 'bg-white/10 text-white'
    : 'bg-[#efe7db] text-[#5c5145]'

  return (
    <header className="relative flex h-14 items-center justify-between px-4">
      <div className="flex w-10 items-center">
        {!hideBack && (
          <button
            type="button"
            aria-label={close ? '关闭' : '返回'}
            onClick={handleBack}
            className={cn('flex h-9 w-9 items-center justify-center rounded-full', circle)}
          >
            {close ? <X className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
          </button>
        )}
      </div>
      {title && (
        <h1
          className={cn(
            'absolute left-1/2 -translate-x-1/2 text-[17px] font-semibold',
            dark ? 'text-white' : 'text-foreground',
          )}
        >
          {title}
        </h1>
      )}
      <div className="flex min-w-10 items-center justify-end gap-2">{right}</div>
    </header>
  )
}

/** 顶部栏里常用的圆形图标按钮 */
export function TopBarIconButton({
  children,
  onClick,
  label,
  dark,
}: {
  children: ReactNode
  onClick?: () => void
  label: string
  dark?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-full',
        dark ? 'bg-white/10 text-white' : 'bg-[#efe7db] text-[#5c5145]',
      )}
    >
      {children}
    </button>
  )
}
