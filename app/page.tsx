'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/app-shell'

export default function SplashPage() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => router.push('/onboarding'), 1800)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <AppShell>
      <button
        type="button"
        onClick={() => router.push('/onboarding')}
        className="flex min-h-dvh w-full flex-col items-center justify-center bg-gradient-to-b from-[#fbefe0] to-[#f3e2c9] px-6 text-center"
        aria-label="进入应用"
      >
        <div className="flex h-32 w-32 items-center justify-center rounded-[2rem] bg-white/70 shadow-sm">
          <Image src="/device.png" alt="ScalpCare" width={96} height={96} className="h-24 w-24 object-contain" />
        </div>
        <h1 className="mt-8 text-[28px] font-bold tracking-tight text-foreground">ScalpCare</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">智能头皮检测 · 个性护理</p>

        <div className="absolute bottom-16 flex items-center gap-2">
          <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-gold [animation-delay:200ms]" />
          <span className="h-2 w-2 animate-pulse rounded-full bg-gold [animation-delay:400ms]" />
        </div>
      </button>
    </AppShell>
  )
}
