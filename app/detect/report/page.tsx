"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Share2, ChevronRight, Sparkles, ShoppingBag, TrendingUp } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar, TopBarIconButton } from "@/components/top-bar"
import { BottomBar, GoldButton, Card, Badge } from "@/components/ui-kit"
import { metrics } from "@/lib/data"

export default function ReportPage() {
  const router = useRouter()
  const score = 78

  return (
    <AppShell bottomSpace>
      <TopBar
        title="检测报告"
        onBack={() => router.push("/detect")}
        right={
          <TopBarIconButton label="分享">
            <Share2 className="h-5 w-5" />
          </TopBarIconButton>
        }
      />

      <div className="px-5 pt-2">
        {/* 综合评分 */}
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#3a2f24] to-[#251d15] p-6 text-white">
          <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gold/20 blur-2xl" />
          <div className="relative flex items-center gap-5">
            <div className="relative flex h-28 w-28 items-center justify-center">
              <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="9" />
                <circle
                  cx="60"
                  cy="60"
                  r="52"
                  fill="none"
                  stroke="url(#sg)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={2 * Math.PI * 52 * (1 - score / 100)}
                />
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#f0c878" />
                    <stop offset="100%" stopColor="#bd8b30" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center">
                <p className="text-[30px] font-bold leading-none">{score}</p>
                <p className="text-[11px] text-white/50">综合分</p>
              </div>
            </div>
            <div className="flex-1">
              <Badge tone="gold">头皮状态良好</Badge>
              <p className="mt-2 text-[13px] leading-relaxed text-white/70">
                整体健康，出油偏高、水分偏低，建议加强控油补水护理。
              </p>
            </div>
          </div>
        </div>

        {/* 维度指标 */}
        <h2 className="mb-3 mt-6 text-[16px] font-semibold">维度分析</h2>
        <div className="space-y-3">
          {metrics.map((m) => (
            <Link key={m.key} href={`/detect/report/${m.key}`}>
              <Card className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] font-semibold">{m.label}</p>
                    <Badge tone={m.level === "良好" || m.level === "正常" ? "green" : "gold"}>{m.level}</Badge>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#f1ebe1]">
                    <div className="h-full rounded-full" style={{ width: `${m.value}%`, background: m.color }} />
                  </div>
                </div>
                <span className="text-[20px] font-bold" style={{ color: m.color }}>
                  {m.value}
                  <span className="text-[12px] font-normal text-muted-foreground">{m.unit}</span>
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Card>
            </Link>
          ))}
        </div>

        {/* 建议 */}
        <h2 className="mb-3 mt-6 text-[16px] font-semibold">护理建议</h2>
        <Card className="space-y-3">
          <div className="flex items-start gap-3">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <p className="text-[14px] leading-relaxed text-foreground">
              建议采用「深层清洁」模式控油，每周 3-4 次，搭配头皮舒缓精华液改善水油平衡。
            </p>
          </div>
          <Link
            href="/detect/trend"
            className="flex items-center gap-2 rounded-2xl bg-[#faf6ef] px-4 py-3 text-[13px] text-gold"
          >
            <TrendingUp className="h-4 w-4" /> 查看历史趋势对比
            <ChevronRight className="ml-auto h-4 w-4" />
          </Link>
        </Card>
      </div>

      <BottomBar>
        <div className="flex gap-3">
          <GoldButton href="/shop/product/serum-blue" className="flex-1">
            <ShoppingBag className="h-5 w-5" /> 选购护理液
          </GoldButton>
        </div>
      </BottomBar>
    </AppShell>
  )
}
