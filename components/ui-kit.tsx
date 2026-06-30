'use client'

import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { cn } from '@/lib/utils'

/* ---------- 金棕渐变主按钮 ---------- */
export function GoldButton({
  children,
  className,
  href,
  ...props
}: {
  children: ReactNode
  className?: string
  href?: string
} & ComponentProps<'button'>) {
  const cls = cn(
    'btn-gold flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-[16px] font-semibold',
    className,
  )
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  )
}

/* ---------- 描边次按钮 ---------- */
export function OutlineButton({
  children,
  className,
  href,
  ...props
}: {
  children: ReactNode
  className?: string
  href?: string
} & ComponentProps<'button'>) {
  const cls = cn(
    'btn-outline-cream flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-[16px] font-semibold',
    className,
  )
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  )
}

/* ---------- 卡片 ---------- */
export function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={cn('card-soft p-5', className)}>{children}</div>
}

/* ---------- 柔彩图标容器 ---------- */
const CHIP_BG: Record<string, string> = {
  blue: 'bg-chip-blue text-chip-blue-fg',
  pink: 'bg-chip-pink text-chip-pink-fg',
  mint: 'bg-chip-mint text-chip-mint-fg',
  yellow: 'bg-chip-yellow text-chip-yellow-fg',
  orange: 'bg-chip-orange text-chip-orange-fg',
  red: 'bg-chip-red text-chip-red-fg',
  gold: 'bg-accent text-accent-foreground',
}

export function IconChip({
  children,
  color = 'gold',
  className,
  size = 'md',
}: {
  children: ReactNode
  color?: keyof typeof CHIP_BG | string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizes = {
    sm: 'h-9 w-9 rounded-xl',
    md: 'h-11 w-11 rounded-2xl',
    lg: 'h-14 w-14 rounded-2xl',
  }
  return (
    <span
      className={cn(
        'flex shrink-0 items-center justify-center',
        sizes[size],
        CHIP_BG[color] ?? color,
        className,
      )}
    >
      {children}
    </span>
  )
}

/* ---------- 固定底部操作条 ---------- */
export function BottomBar({
  children,
  className,
  dark,
}: {
  children: ReactNode
  className?: string
  dark?: boolean
}) {
  return (
    <div
      className={cn(
        'absolute bottom-0 left-0 right-0 z-20 px-5 pb-7 pt-3',
        dark
          ? 'bg-gradient-to-t from-[#1c1714] via-[#1c1714]/95 to-transparent'
          : 'bg-gradient-to-t from-background via-background/95 to-transparent',
        className,
      )}
    >
      {children}
    </div>
  )
}

/* ---------- 状态徽标 ---------- */
export function Badge({
  children,
  tone = 'gold',
  className,
}: {
  children: ReactNode
  tone?: 'gold' | 'green' | 'red' | 'gray'
  className?: string
}) {
  const tones = {
    gold: 'bg-accent text-accent-foreground',
    green: 'bg-green-soft text-green',
    red: 'bg-danger-soft text-danger',
    gray: 'bg-[#f0ece4] text-[#9b9289]',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}
