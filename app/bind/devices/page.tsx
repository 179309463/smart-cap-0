'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bluetooth, Check, Loader2, RefreshCw } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { TopBar, TopBarIconButton } from '@/components/top-bar'
import { BottomBar, GoldButton } from '@/components/ui-kit'

const DEVICES = [
  { id: 'sc-01', name: 'ScalpCare Pro', mac: 'A8:3E:0C:11', signal: '强' },
  { id: 'sc-02', name: 'ScalpCare Mini', mac: 'B2:71:9F:55', signal: '中' },
]

export default function DevicesPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string | null>(null)
  const [connecting, setConnecting] = useState(false)

  const handleConnect = () => {
    setConnecting(true)
    setTimeout(() => router.push('/bind/success'), 1600)
  }

  return (
    <AppShell>
      <TopBar
        title="选择设备"
        right={
          <TopBarIconButton label="重新扫描" onClick={() => router.push('/bind/scan')}>
            <RefreshCw className="h-5 w-5" />
          </TopBarIconButton>
        }
      />
      <div className="px-5 pt-4">
        <p className="px-1 text-[13px] text-muted-foreground">已发现 {DEVICES.length} 台设备，点击连接</p>
        <div className="mt-4 space-y-3">
          {DEVICES.map((d) => {
            const active = selected === d.id
            return (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelected(d.id)}
                className={`flex w-full items-center gap-4 rounded-3xl border p-4 text-left transition ${
                  active ? 'border-gold bg-accent/50' : 'border-[#ece0cd] bg-white'
                }`}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3ece0]">
                  <Image src="/device.png" alt="" width={36} height={36} className="h-9 w-9 object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-[15px] font-semibold">{d.name}</p>
                  <p className="text-[12px] text-muted-foreground">{d.mac} · 信号{d.signal}</p>
                </div>
                {active ? (
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-white">
                    <Check className="h-4 w-4" />
                  </span>
                ) : (
                  <Bluetooth className="h-5 w-5 text-muted-foreground" />
                )}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={() => router.push('/bind/fail')}
          className="mt-5 w-full text-center text-[13px] text-muted-foreground"
        >
          没有找到我的设备？
        </button>
      </div>

      <BottomBar>
        <GoldButton onClick={handleConnect} disabled={!selected || connecting}>
          {connecting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" /> 连接中…
            </>
          ) : (
            '连接设备'
          )}
        </GoldButton>
      </BottomBar>
    </AppShell>
  )
}
