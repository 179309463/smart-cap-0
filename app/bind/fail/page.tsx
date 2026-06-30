'use client'

import { useRouter } from 'next/navigation'
import { Wifi, Bluetooth, RotateCw, X } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { TopBar } from '@/components/top-bar'
import { BottomBar, GoldButton, OutlineButton } from '@/components/ui-kit'

const TIPS = [
  { icon: <Bluetooth className="h-5 w-5" />, text: '确认设备已开机，指示灯处于蓝色闪烁状态' },
  { icon: <Wifi className="h-5 w-5" />, text: '将手机靠近设备，距离保持在 1 米以内' },
  { icon: <RotateCw className="h-5 w-5" />, text: '长按设备电源键 3 秒重置后再次尝试' },
]

export default function BindFailPage() {
  const router = useRouter()
  return (
    <AppShell>
      <TopBar title="连接失败" />
      <div className="flex flex-col items-center px-6 pt-10 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-danger-soft text-danger">
          <X className="h-12 w-12" />
        </div>
        <h1 className="mt-6 text-[20px] font-bold">设备连接失败</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          未能成功连接到护理仪，请按以下提示检查后重试
        </p>
      </div>

      <div className="mt-8 space-y-3 px-6">
        {TIPS.map((t, i) => (
          <div key={i} className="flex items-center gap-4 rounded-2xl bg-white p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f3ece0] text-[#8a6a36]">
              {t.icon}
            </span>
            <p className="flex-1 text-[13px] leading-relaxed text-foreground">{t.text}</p>
          </div>
        ))}
      </div>

      <BottomBar>
        <div className="space-y-3">
          <GoldButton onClick={() => router.push('/bind/scan')}>重新连接</GoldButton>
          <OutlineButton onClick={() => router.push('/home')}>稍后再说</OutlineButton>
        </div>
      </BottomBar>
    </AppShell>
  )
}
