'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  Bell,
  Bluetooth,
  BatteryFull,
  ChevronRight,
  Droplet,
  ScanLine,
  Sparkles,
  CalendarHeart,
  TriangleAlert,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { BottomTab } from '@/components/bottom-tab'
import { TopBarIconButton } from '@/components/top-bar'
import { Badge, Card, IconChip } from '@/components/ui-kit'
import { metrics } from '@/lib/data'

export default function HomePage() {
  return (
    <AppShell bottomSpace>
      <header className="flex items-center justify-between px-5 pb-2 pt-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 overflow-hidden rounded-full bg-accent">
            <Image src="/device.png" alt="头像" width={44} height={44} className="h-full w-full object-contain p-1" />
          </div>
          <div>
            <p className="text-[13px] text-muted-foreground">下午好，安琪</p>
            <p className="text-[15px] font-semibold">今天也要好好护理头皮</p>
          </div>
        </div>
        <Link href="/notifications">
          <TopBarIconButton label="通知">
            <Bell className="h-5 w-5" />
          </TopBarIconButton>
        </Link>
      </header>

      <div className="space-y-4 px-5 pt-2">
        <Link href="/device/asset" className="block">
          <div className="card-soft overflow-hidden">
            <div className="flex items-center gap-4 bg-gradient-to-br from-[#3a2f24] to-[#251d15] p-5 text-white">
              <Image src="/device.png" alt="护理仪" width={64} height={64} className="h-16 w-16 object-contain drop-shadow" />
              <div className="flex-1">
                <p className="text-[15px] font-semibold">ScalpCare 护理仪</p>
                <div className="mt-1 flex items-center gap-3 text-[12px] text-white/70">
                  <span className="flex items-center gap-1">
                    <Bluetooth className="h-3.5 w-3.5" /> 已连接
                  </span>
                  <span className="flex items-center gap-1">
                    <BatteryFull className="h-3.5 w-3.5" /> 86%
                  </span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-white/50" />
            </div>
          </div>
        </Link>

        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">今日护理</h2>
            <Link href="/care/plan/calendar" className="flex items-center text-[13px] text-gold">
              查看计划 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <QuickAction href="/care/session" color="orange" icon={<Sparkles className="h-5 w-5" />} label="开始护理" />
            <QuickAction href="/detect" color="blue" icon={<ScanLine className="h-5 w-5" />} label="AI 检测" />
            <QuickAction href="/care/plan/calendar" color="mint" icon={<CalendarHeart className="h-5 w-5" />} label="护理日历" />
          </div>
        </Card>

        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">最近头皮状态</h2>
            <Link href="/detect/report" className="flex items-center text-[13px] text-gold">
              查看报告 <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((m) => (
              <div key={m.key} className="rounded-2xl bg-[#faf6ef] p-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-muted-foreground">{m.label}</span>
                  <Badge tone={m.level === '良好' || m.level === '正常' ? 'green' : 'gold'}>{m.level}</Badge>
                </div>
                <p className="mt-2 text-[22px] font-semibold" style={{ color: m.color }}>
                  {m.value}
                  <span className="text-[13px] font-normal text-muted-foreground">{m.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Link href="/shop/supply" className="block">
          <div className="flex items-center gap-3 rounded-3xl border border-[#f3d9c8] bg-[#fdf1e8] p-4">
            <IconChip color="orange">
              <TriangleAlert className="h-5 w-5" />
            </IconChip>
            <div className="flex-1">
              <p className="text-[14px] font-medium text-foreground">护理液余量不足</p>
              <p className="text-[12px] text-muted-foreground">剩余约 3 次使用量，建议及时补给</p>
            </div>
            <span className="rounded-full bg-gold px-3 py-1.5 text-[12px] font-medium text-white">去补给</span>
          </div>
        </Link>

        <Link href="/shop/product/serum-blue" className="block">
          <Card className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-chip-blue">
              <Droplet className="h-7 w-7 text-chip-blue-fg" />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold">头皮舒缓精华液</p>
              <p className="text-[12px] text-muted-foreground">控油保湿 · 适配护理仪</p>
              <p className="mt-1 text-[15px] font-semibold text-gold">¥199</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Card>
        </Link>
      </div>

      <BottomTab active="/home" />
    </AppShell>
  )
}

function QuickAction({
  href,
  icon,
  label,
  color,
}: {
  href: string
  icon: React.ReactNode
  label: string
  color: string
}) {
  return (
    <Link href={href} className="flex flex-col items-center gap-2 rounded-2xl bg-[#faf6ef] py-4">
      <IconChip color={color}>{icon}</IconChip>
      <span className="text-[12px] font-medium text-foreground">{label}</span>
    </Link>
  )
}
