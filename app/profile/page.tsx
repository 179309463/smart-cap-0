'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight,
  Smartphone,
  FileText,
  ShieldCheck,
  Bell,
  Headphones,
  Settings,
  Gift,
  ScrollText,
  Star,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { BottomTab } from '@/components/bottom-tab'
import { Card, IconChip } from '@/components/ui-kit'

const STATS = [
  { label: '护理天数', value: '128' },
  { label: '检测次数', value: '36' },
  { label: '积分', value: '1,280' },
]

const GROUP1 = [
  { href: '/device/asset', icon: Smartphone, color: 'blue', label: '我的设备' },
  { href: '/detect/report', icon: FileText, color: 'mint', label: '检测报告' },
  { href: '/care/plan/calendar', icon: ScrollText, color: 'orange', label: '护理记录' },
]

const GROUP2 = [
  { href: '/shop/supply', icon: Gift, color: 'pink', label: '我的订单' },
  { href: '/notifications', icon: Bell, color: 'yellow', label: '消息通知' },
  { href: '/profile/privacy', icon: ShieldCheck, color: 'mint', label: '隐私与合规' },
  { href: '/notifications', icon: Headphones, color: 'blue', label: '在线客服' },
]

export default function ProfilePage() {
  return (
    <AppShell bottomSpace>
      <header className="flex items-center justify-between px-5 pb-1 pt-5">
        <h1 className="text-[22px] font-bold">我的</h1>
        <Link
          href="/notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#efe7db] text-[#5c5145]"
          aria-label="设置"
        >
          <Settings className="h-5 w-5" />
        </Link>
      </header>

      <div className="space-y-4 px-5 pt-3">
        <Card className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 overflow-hidden rounded-full bg-accent">
              <Image src="/device.png" alt="头像" width={64} height={64} className="h-full w-full object-cover" />
            </div>
            <div className="flex-1">
              <p className="text-[18px] font-bold">安琪</p>
              <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-0.5 text-[12px] text-accent-foreground">
                <Star className="h-3.5 w-3.5" /> 黄金会员
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-around rounded-2xl bg-[#faf6ef] py-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-[20px] font-bold text-foreground">{s.value}</p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-2">
          {GROUP1.map((item) => (
            <MenuRow key={item.label} {...item} />
          ))}
        </Card>

        <Card className="p-2">
          {GROUP2.map((item) => (
            <MenuRow key={item.label} {...item} />
          ))}
        </Card>
      </div>

      <BottomTab active="/profile" />
    </AppShell>
  )
}

function MenuRow({
  href,
  icon: Icon,
  color,
  label,
}: {
  href: string
  icon: typeof Bell
  color: string
  label: string
}) {
  return (
    <Link href={href} className="flex items-center gap-3 rounded-2xl px-3 py-3 active:bg-[#faf6ef]">
      <IconChip color={color} size="sm">
        <Icon className="h-4 w-4" />
      </IconChip>
      <span className="flex-1 text-[14px] font-medium">{label}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </Link>
  )
}
