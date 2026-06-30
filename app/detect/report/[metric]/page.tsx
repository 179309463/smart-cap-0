"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Lightbulb, Sparkles, ShoppingBag, AlertCircle } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar } from "@/components/top-bar"
import { BottomBar, GoldButton, Card } from "@/components/ui-kit"
import { metrics } from "@/lib/data"

const DETAIL: Record<string, { desc: string; advice: string[] }> = {
  oil: {
    desc: "出油指数反映头皮皮脂分泌水平。你的出油偏高，可能与作息、饮食或清洁不当有关。",
    advice: ["每周 3-4 次深层清洁护理", "避免高糖高油饮食", "选用控油型护理液"],
  },
  hydration: {
    desc: "头皮水分代表角质层含水量。你的水分偏低，头皮容易干燥紧绷、产生头屑。",
    advice: ["护理后及时补水导入", "减少高温吹风时间", "搭配保湿精华液"],
  },
  density: {
    desc: "毛囊密度反映单位面积内的毛囊数量。你的毛囊密度良好，请继续保持。",
    advice: ["保持规律护理习惯", "适度头皮按摩促进循环", "均衡营养摄入"],
  },
  redness: {
    desc: "红肿指数反映头皮炎症与敏感程度。你的指数正常，头皮状态稳定。",
    advice: ["避免过度抓挠", "使用温和无刺激产品", "注意防晒"],
  },
}

export default function MetricDetailPage({ params }: { params: Promise<{ metric: string }> }) {
  const { metric } = use(params)
  const router = useRouter()
  const m = metrics.find((x) => x.key === metric) ?? metrics[0]
  const d = DETAIL[m.key] ?? DETAIL.oil

  return (
    <AppShell bottomSpace>
      <TopBar title={m.label} />
      <div className="px-5 pt-2">
        {/* 数值展示 */}
        <Card className="text-center">
          <p className="text-[13px] text-muted-foreground">{m.label}</p>
          <p className="mt-2 text-[44px] font-bold leading-none" style={{ color: m.color }}>
            {m.value}
            <span className="text-[16px] font-normal text-muted-foreground">{m.unit}</span>
          </p>
          <span
            className="mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-[13px] font-medium"
            style={{ background: `${m.color}1a`, color: m.color }}
          >
            <AlertCircle className="h-3.5 w-3.5" /> 当前水平：{m.level}
          </span>
          {/* 区间条 */}
          <div className="mt-5">
            <div className="relative h-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#5aa469] via-[#e8c34c] to-[#d98c3f]">
              <div
                className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-[3px] border-white shadow"
                style={{ left: `calc(${m.value}% - 10px)`, background: m.color }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
              <span>偏低</span>
              <span>正常</span>
              <span>偏高</span>
            </div>
          </div>
        </Card>

        {/* 解读 */}
        <h2 className="mb-3 mt-6 flex items-center gap-2 text-[16px] font-semibold">
          <Lightbulb className="h-5 w-5 text-gold" /> 指标解读
        </h2>
        <Card>
          <p className="text-[14px] leading-relaxed text-foreground">{d.desc}</p>
        </Card>

        {/* 建议 */}
        <h2 className="mb-3 mt-6 flex items-center gap-2 text-[16px] font-semibold">
          <Sparkles className="h-5 w-5 text-gold" /> 改善建议
        </h2>
        <Card className="space-y-3">
          {d.advice.map((a, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[12px] font-semibold text-accent-foreground">
                {i + 1}
              </span>
              <p className="text-[14px] text-foreground">{a}</p>
            </div>
          ))}
        </Card>
      </div>

      <BottomBar>
        <GoldButton onClick={() => router.push("/care")}>
          <ShoppingBag className="h-5 w-5" /> 制定改善计划
        </GoldButton>
      </BottomBar>
    </AppShell>
  )
}
