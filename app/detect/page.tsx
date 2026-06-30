'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ScanLine,
  Camera,
  History,
  TrendingUp,
  ChevronRight,
  Sparkles,
  ShieldCheck,
  Sun,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { BottomTab } from '@/components/bottom-tab'
import { Card, IconChip, GoldButton, Badge } from '@/components/ui-kit'

const TIPS = [
  { icon: Sun, text: '保持环境光线充足、均匀' },
  { icon: ShieldCheck, text: '拨开头发，露出待测头皮区域' },
  { icon: Camera, text: '镜头贴近头皮，保持稳定 2 秒' },
]

const HISTORY = [
  { date: '06-29 09:12', score: 82, label: '良好', tone: 'green' as const },
  { date: '06-22 21:30', score: 76, label: '良好', tone: 'green' as const },
  { date: '06-15 08:45', score: 68, label: '一般', tone: 'gold' as const },
]

export default function DetectPage() {
  const router = useRouter()
  return (
    <AppShell bottomSpace>
      <header className="px-5 pb-1 pt-5">
        <h1 className="text-[22px] font-bold">AI 头皮检测</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">连接护理仪镜头，秒级生成头皮报告</p>
      </header>

      <div className="space-y-4 px-5 pt-3">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3a2f24] to-[#251d15] p-6 text-white">
          <div className="relative z-10">
            <Badge tone="gold">智能识别 6 项指标</Badge>
            <p className="mt-3 text-[20px] font-bold leading-snug">开始一次<br />头皮深度检测</p>
            <p className="mt-2 text-[13px] text-white/70">出油 · 水分 · 毛囊 · 发量 · 敏感 · 头屑</p>
          </div>
          <Sparkles className="absolute -right-2 top-4 h-28 w-28 text-white/10" />
        </div>

        <Card className="space-y-4">
          <h2 className="text-[15px] font-semibold">检测前准备</h2>
          <ul className="space-y-3">
            {TIPS.map((tip) => (
              <li key={tip.text} className="flex items-center gap-3">
                <IconChip color="blue" size="sm">
                  <tip.icon className="h-4 w-4" />
                </IconChip>
                <span className="text-[14px] text-foreground">{tip.text}</span>
              </li>
            ))}
          </ul>
        </Card>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">历史检测</h2>
            <Link href="/detect/report/trend" className="flex items-center text-[13px] text-gold">
              <TrendingUp className="mr-1 h-4 w-4" /> 趋势
            </Link>
          </div>
          <Card className="mt-3 space-y-1 p-2">
            {HISTORY.map((h) => (
              <Link
                key={h.date}
                href="/detect/report"
                className="flex items-center gap-3 rounded-2xl px-3 py-3 active:bg-[#faf6ef]"
              >
                <IconChip color="mint" size="sm">
                  <History className="h-4 w-4" />
                </IconChip>
                <div className="flex-1">
                  <p className="text-[14px] font-medium">头皮综合检测</p>
                  <p className="text-[12px] text-muted-foreground">{h.date}</p>
                </div>
                <span className="text-[18px] font-bold text-gold">{h.score}</span>
                <Badge tone={h.tone}>{h.label}</Badge>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </Card>
        </section>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 px-5 pb-24 pt-3 bg-gradient-to-t from-background via-background/95 to-transparent">
        <GoldButton onClick={() => router.push('/detect/shoot')}>
          <ScanLine className="h-5 w-5" /> 开始检测
        </GoldButton>
      </div>

      <BottomTab active="/detect" />
    </AppShell>
  )
}
