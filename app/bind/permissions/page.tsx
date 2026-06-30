'use client'

import { useRouter } from 'next/navigation'
import { Bluetooth, MapPin, Bell } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { TopBar } from '@/components/top-bar'
import { BottomBar, GoldButton, IconChip } from '@/components/ui-kit'

const PERMS = [
  { icon: <Bluetooth className="h-5 w-5" />, color: 'blue', title: '蓝牙权限', desc: '用于搜索并连接你的护理仪设备' },
  { icon: <MapPin className="h-5 w-5" />, color: 'mint', title: '位置权限', desc: '部分系统要求开启定位以扫描蓝牙设备' },
  { icon: <Bell className="h-5 w-5" />, color: 'orange', title: '通知权限', desc: '护理提醒、耗材预警等重要消息推送' },
]

export default function PermissionsPage() {
  const router = useRouter()
  return (
    <AppShell>
      <TopBar title="开启权限" />
      <div className="px-6 pt-4">
        <h1 className="text-balance text-[22px] font-bold">为获得完整体验</h1>
        <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
          连接护理仪并接收护理提醒，需要以下权限。你可以随时在系统设置中修改。
        </p>

        <div className="mt-7 space-y-3">
          {PERMS.map((p) => (
            <div key={p.title} className="flex items-center gap-4 rounded-3xl bg-white p-4">
              <IconChip color={p.color} size="lg">
                {p.icon}
              </IconChip>
              <div className="flex-1">
                <p className="text-[15px] font-semibold">{p.title}</p>
                <p className="text-[12px] leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomBar>
        <GoldButton onClick={() => router.push('/bind/scan')}>同意并继续</GoldButton>
      </BottomBar>
    </AppShell>
  )
}
