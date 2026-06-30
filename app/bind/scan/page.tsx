'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bluetooth } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { TopBar } from '@/components/top-bar'

export default function ScanPage() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer)
          router.push('/bind/devices')
          return 100
        }
        return p + 4
      })
    }, 90)
    return () => clearInterval(timer)
  }, [router])

  return (
    <AppShell>
      <TopBar title="搜索设备" />
      <div className="flex flex-col items-center px-6 pt-16 text-center">
        <div className="relative flex h-56 w-56 items-center justify-center">
          <span className="absolute inset-0 animate-ping rounded-full bg-accent/60" />
          <span className="absolute inset-6 rounded-full bg-accent/70" />
          <span className="absolute inset-12 rounded-full bg-accent" />
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gold text-white">
            <Bluetooth className="h-9 w-9" />
          </span>
        </div>
        <h1 className="mt-10 text-[20px] font-bold">正在搜索附近的设备…</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">请确保护理仪已开机并处于配对模式</p>
        <p className="mt-6 text-[13px] text-gold">{progress}%</p>
      </div>
    </AppShell>
  )
}
