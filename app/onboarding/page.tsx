'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ScanLine, Sparkles, CalendarHeart } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { GoldButton } from '@/components/ui-kit'

const SLIDES = [
  {
    icon: <ScanLine className="h-8 w-8" />,
    title: 'AI 头皮检测',
    desc: '一拍即测，专业算法解析出油、水分、毛囊密度等多维指标。',
  },
  {
    icon: <Sparkles className="h-8 w-8" />,
    title: '智能护理仪',
    desc: '多模式护理，蓝牙连接实时同步，让每一次护理都有数据可依。',
  },
  {
    icon: <CalendarHeart className="h-8 w-8" />,
    title: '个性护理计划',
    desc: '基于检测结果定制专属计划，养成长期健康的头皮护理习惯。',
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [index, setIndex] = useState(0)
  const isLast = index === SLIDES.length - 1
  const slide = SLIDES[index]

  return (
    <AppShell>
      <div className="flex min-h-dvh flex-col px-6 pb-8 pt-6">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push('/auth/login')}
            className="text-[14px] text-muted-foreground"
          >
            跳过
          </button>
        </div>

        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <div className="mb-10 flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-br from-[#fbefe0] to-[#f3e2c9]">
            <Image src="/device.png" alt="护理仪" width={160} height={160} className="h-40 w-40 object-contain" />
          </div>
          <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            {slide.icon}
          </div>
          <h1 className="text-balance text-[24px] font-bold">{slide.title}</h1>
          <p className="mt-3 max-w-xs text-pretty text-[15px] leading-relaxed text-muted-foreground">
            {slide.desc}
          </p>
        </div>

        <div className="mb-8 flex justify-center gap-2">
          {SLIDES.map((_, i) => (
            <span
              key={i}
              className={
                i === index
                  ? 'h-2 w-6 rounded-full bg-gold transition-all'
                  : 'h-2 w-2 rounded-full bg-[#e0d4bf] transition-all'
              }
            />
          ))}
        </div>

        <GoldButton onClick={() => (isLast ? router.push('/auth/login') : setIndex(index + 1))}>
          {isLast ? '立即开始' : '下一步'}
        </GoldButton>
      </div>
    </AppShell>
  )
}
