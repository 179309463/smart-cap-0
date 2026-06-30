'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Check, Bluetooth, BatteryFull } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { BottomBar, GoldButton, OutlineButton } from '@/components/ui-kit'

export default function BindSuccessPage() {
  const router = useRouter()
  return (
    <AppShell>
      <div className="flex flex-col items-center px-6 pt-20 text-center">
        <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-green-soft">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green text-white">
            <Check className="h-9 w-9" strokeWidth={3} />
          </span>
        </div>
        <h1 className="mt-7 text-[22px] font-bold">设备连接成功</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">护理仪已绑定到你的账号</p>

        <div className="mt-8 w-full rounded-3xl bg-gradient-to-br from-[#3a2f24] to-[#251d15] p-5 text-left text-white">
          <div className="flex items-center gap-4">
            <Image src="/device.png" alt="护理仪" width={56} height={56} className="h-14 w-14 object-contain" />
            <div className="flex-1">
              <p className="text-[15px] font-semibold">ScalpCare Pro</p>
              <div className="mt-1 flex items-center gap-3 text-[12px] text-white/70">
                <span className="flex items-center gap-1">
                  <Bluetooth className="h-3.5 w-3.5" /> 已连接
                </span>
                <span className="flex items-center gap-1">
                  <BatteryFull className="h-3.5 w-3.5" /> 86%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomBar>
        <div className="space-y-3">
          <GoldButton onClick={() => router.push('/care/goal')}>定制护理计划</GoldButton>
          <OutlineButton onClick={() => router.push('/home')}>进入首页</OutlineButton>
        </div>
      </BottomBar>
    </AppShell>
  )
}
