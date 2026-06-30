'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Info, Check, Pencil, RefreshCw, Unlink, Plus, Lightbulb } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { TopBar } from '@/components/top-bar'
import { Card } from '@/components/ui-kit'

export default function DeviceAssetPage() {
  const router = useRouter()
  return (
    <AppShell bottomSpace>
      <TopBar title="我的设备" />
      <div className="px-5 pt-1">
        <div className="flex items-center gap-2 rounded-2xl bg-accent px-4 py-3 text-[13px] text-[#8a6a36]">
          <Info className="h-4 w-4 shrink-0" /> 点击设备卡片可切换当前使用设备
        </div>

        {/* 当前设备 */}
        <div className="mt-4 rounded-3xl border-2 border-gold bg-white p-5">
          <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-[12px] font-medium text-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} /> 当前使用
          </span>
          <div className="mt-3 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent">
              <Image src="/device.png" alt="护理仪" width={48} height={48} className="h-12 w-12 object-contain" />
            </div>
            <div>
              <p className="text-[18px] font-bold">ScalpCare Pro</p>
              <p className="text-[13px] text-muted-foreground">智能头部护理仪 · 旗舰版</p>
              <div className="mt-1 flex items-center gap-3 text-[13px]">
                <span className="flex items-center gap-1 text-green">
                  <span className="h-2 w-2 rounded-full bg-green" /> 在线
                </span>
                <span className="text-green">85%</span>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-[#f0ece4] pt-4 text-center">
            <Spec label="固件版本" value="v2.1.3" />
            <Spec label="护理液" value="68%" valueClass="text-gold" />
            <Spec label="累计使用" value="22 次" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <ChipBtn icon={<Pencil className="h-4 w-4" />} label="重命名" />
            <ChipBtn icon={<RefreshCw className="h-4 w-4" />} label="固件升级" tone="gold" onClick={() => router.push('/ota')} />
            <ChipBtn icon={<Unlink className="h-4 w-4" />} label="解绑" tone="red" onClick={() => router.push('/bind/fail')} />
          </div>
        </div>

        {/* 其它设备 */}
        <Card className="mt-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0ece4] opacity-70">
              <Image src="/device.png" alt="护理仪" width={40} height={40} className="h-10 w-10 object-contain grayscale" />
            </div>
            <div className="flex-1">
              <p className="text-[16px] font-bold">ScalpCare Lite</p>
              <p className="text-[13px] text-muted-foreground">智能头部护理仪 · 轻享版</p>
              <div className="mt-1 flex items-center gap-2 text-[12px] text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-[#c4baa9]" /> 离线 · 3天前
              </div>
            </div>
            <button type="button" className="rounded-full border border-[#ece0cd] px-4 py-1.5 text-[13px] text-muted-foreground">
              切换
            </button>
          </div>
        </Card>

        <button
          type="button"
          onClick={() => router.push('/bind/scan')}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-3xl border border-dashed border-[#d8cdb9] bg-white py-5 text-[15px] font-medium text-[#8a6a36]"
        >
          <Plus className="h-5 w-5" /> 添加新设备
        </button>

        <div className="mt-4 flex items-start gap-2 rounded-2xl bg-[#f3ede2] p-4 text-[12px] leading-relaxed text-muted-foreground">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <div>
            <p className="font-medium text-foreground">温馨提示</p>
            <p className="mt-0.5">一个账号最多可绑定 5 台设备，解绑后设备可被其他账号绑定。设备 ID 等敏感信息已做脱敏处理。</p>
          </div>
        </div>
      </div>
    </AppShell>
  )
}

function Spec({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div>
      <p className="text-[12px] text-muted-foreground">{label}</p>
      <p className={`mt-1 text-[15px] font-semibold ${valueClass ?? ''}`}>{value}</p>
    </div>
  )
}

function ChipBtn({
  icon,
  label,
  tone,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  tone?: 'gold' | 'red'
  onClick?: () => void
}) {
  const cls =
    tone === 'gold'
      ? 'bg-accent text-accent-foreground'
      : tone === 'red'
        ? 'bg-danger-soft text-danger'
        : 'bg-[#f3ede2] text-[#5c5145]'
  return (
    <button type="button" onClick={onClick} className={`flex items-center justify-center gap-1.5 rounded-2xl py-3 text-[13px] font-medium ${cls}`}>
      {icon} {label}
    </button>
  )
}
