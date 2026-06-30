'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, HeartPulse, ScanLine, Store, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const TABS = [
  { href: '/home', label: '首页', icon: Home },
  { href: '/care', label: '护理', icon: HeartPulse },
  { href: '/detect', label: '检测', icon: ScanLine },
  { href: '/shop', label: '商城', icon: Store },
  { href: '/profile', label: '我的', icon: User },
] as const

export function BottomTab({ active }: { active?: string }) {
  const pathname = usePathname()
  const current = active ?? pathname

  return (
    <nav className="absolute bottom-0 left-0 right-0 z-30 border-t border-[#eee3d4] bg-[#fffdfa]/95 backdrop-blur">
      <ul className="mx-auto flex max-w-[430px] items-center justify-around px-2 pb-5 pt-2">
        {TABS.map((tab) => {
          const isActive =
            tab.href === '/home' ? current === '/home' : current.startsWith(tab.href)
          const Icon = tab.icon
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                className={cn(
                  'flex w-14 flex-col items-center gap-1 py-1 text-[11px]',
                  isActive ? 'text-gold' : 'text-[#b3a692]',
                )}
              >
                <Icon className="h-[22px] w-[22px]" strokeWidth={isActive ? 2.4 : 2} />
                <span className={cn(isActive && 'font-medium')}>{tab.label}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
