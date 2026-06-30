'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CloudDownload, ArrowRight, TriangleAlert, Check } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { TopBar } from '@/components/top-bar'
import { BottomBar, GoldButton, OutlineButton, Card } from '@/components/ui-kit'

const CHANGES = [
  '新增毛囊唤醒模式，提升护理效果',
  '优化蓝牙连接稳定性',
  '修复已知问题，提升使用体验',
]

export default function OtaPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(65)

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : p + 1))
    }, 220)
    return () => clearInterval(t)
  }, [])

  const done = progress >= 100

  return (
    <AppShell bottomSpace>
      <TopBar title="固件升级" />
      <div className="px-5 pt-1">
        <Card className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent">
            <Image src="/device.png" alt="护理仪" width={40} height={40} className="h-10 w-10 object-contain" />
          </div>
          <div>
            <p className="text-[16px] font-bold">ScalpCare Pro</p>
            <p className="text-[13px] text-muted-foreground">智能头部护理仪 · 旗舰版</p>
          </div>
        </Card>

        <div className="mt-4 rounded-3xl bg-gradient-to-br from-[#fbeedd] to-[#f6e2c9] p-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-gold shadow-sm">
            {done ? <Check className="h-8 w-8" strokeWidth={3} /> : <CloudDownload className="h-8 w-8" />}
          </div>
          <p className="mt-4 text-[18px] font-bold text-[#5c4a2c]">{done ? '升级完成' : '正在升级固件'}</p>
          <p className="mt-1 text-[13px] text-[#a3854f]">
            {done ? '设备已更新至最新版本' : '固件传输中，请勿关闭 App 或断开设备'}
          </p>
          <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/70">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#d3a64c] to-[#a6781f] transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-[13px]">
            <span className="font-bold text-gold">{progress}%</span>
            <span className="text-[#a3854f]">{done ? '已完成' : '预计还需 2 分钟'}</span>
          </div>
        </div>

        <Card className="mt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] text-muted-foreground">当前版本</p>
              <p className="text-[16px] font-bold">v2.1.3</p>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
            <div className="text-right">
              <p className="text-[12px] text-gold">新版本</p>
              <p className="text-[16px] font-bold text-gold">v2.2.0</p>
            </div>
          </div>
          <div className="mt-4 border-t border-[#f0ece4] pt-4">
            <p className="text-[14px] font-semibold">升级内容</p>
            <ul className="mt-2 space-y-2">
              {CHANGES.map((c) => (
                <li key={c} className="flex items-start gap-2 text-[13px] text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /> {c}
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-[#f3ede2] p-4 text-[12px] leading-relaxed text-muted-foreground">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-chip-orange-fg" />
          <div>
            <p className="font-medium text-foreground">升级期间请注意</p>
            <p className="mt-0.5">保持设备电量充足，不要关闭 App 或断开蓝牙连接，升级过程中设备可能会自动重启。</p>
          </div>
        </div>
      </div>

      <BottomBar>
        {done ? (
          <GoldButton onClick={() => router.push('/device/asset')}>完成</GoldButton>
        ) : (
          <OutlineButton onClick={() => router.push('/device/asset')}>后台升级</OutlineButton>
        )}
      </BottomBar>
    </AppShell>
  )
}
