"use client"

import { TrendingDown, TrendingUp, ArrowDownRight, ArrowUpRight } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar } from "@/components/top-bar"
import { Card, Badge } from "@/components/ui-kit"
import { trendData } from "@/lib/data"

const W = 320
const H = 160
const PAD = 28

function buildPath(values: number[]) {
  const max = 100
  const min = 0
  const stepX = (W - PAD * 2) / (values.length - 1)
  return values
    .map((v, i) => {
      const x = PAD + i * stepX
      const y = PAD + (H - PAD * 2) * (1 - (v - min) / (max - min))
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
}

export default function TrendPage() {
  const oil = trendData.map((d) => d.oil)
  const hydration = trendData.map((d) => d.hydration)
  const stepX = (W - PAD * 2) / (trendData.length - 1)

  return (
    <AppShell bottomSpace>
      <TopBar title="历史趋势" />
      <div className="px-5 pt-2">
        {/* 概要 */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted-foreground">出油指数</span>
              <span className="flex items-center text-[12px] text-green">
                <ArrowDownRight className="h-3.5 w-3.5" /> 20
              </span>
            </div>
            <p className="mt-1.5 text-[24px] font-bold text-[#d98c3f]">58</p>
            <p className="text-[11px] text-muted-foreground">较 6 周前下降，持续改善</p>
          </Card>
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-[13px] text-muted-foreground">头皮水分</span>
              <span className="flex items-center text-[12px] text-green">
                <ArrowUpRight className="h-3.5 w-3.5" /> 14
              </span>
            </div>
            <p className="mt-1.5 text-[24px] font-bold text-[#3f8fd9]">52%</p>
            <p className="text-[11px] text-muted-foreground">较 6 周前提升，状态向好</p>
          </Card>
        </div>

        {/* 折线图 */}
        <h2 className="mb-3 mt-6 text-[16px] font-semibold">6 周变化趋势</h2>
        <Card className="p-4">
          <div className="mb-3 flex items-center gap-4 text-[12px]">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#d98c3f]" /> 出油
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#3f8fd9]" /> 水分
            </span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
            {/* 网格线 */}
            {[0, 25, 50, 75, 100].map((g) => {
              const y = PAD + (H - PAD * 2) * (1 - g / 100)
              return (
                <g key={g}>
                  <line x1={PAD} y1={y} x2={W - PAD} y2={y} stroke="#ece4d7" strokeWidth="1" />
                  <text x={4} y={y + 3} fontSize="9" fill="#9b9289">{g}</text>
                </g>
              )
            })}
            {/* 折线 */}
            <path d={buildPath(oil)} fill="none" stroke="#d98c3f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d={buildPath(hydration)} fill="none" stroke="#3f8fd9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* 数据点 */}
            {oil.map((v, i) => {
              const x = PAD + i * stepX
              const y = PAD + (H - PAD * 2) * (1 - v / 100)
              return <circle key={`o${i}`} cx={x} cy={y} r="3" fill="#d98c3f" />
            })}
            {hydration.map((v, i) => {
              const x = PAD + i * stepX
              const y = PAD + (H - PAD * 2) * (1 - v / 100)
              return <circle key={`h${i}`} cx={x} cy={y} r="3" fill="#3f8fd9" />
            })}
            {/* X 轴标签 */}
            {trendData.map((d, i) => {
              const x = PAD + i * stepX
              return (
                <text key={d.date} x={x} y={H - 6} fontSize="9" fill="#9b9289" textAnchor="middle">
                  {d.date}
                </text>
              )
            })}
          </svg>
        </Card>

        {/* 报告记录 */}
        <h2 className="mb-3 mt-6 text-[16px] font-semibold">检测记录</h2>
        <Card className="space-y-1 p-2">
          {[
            { date: "06-29", score: 82, trend: "up" },
            { date: "06-22", score: 76, trend: "up" },
            { date: "06-15", score: 68, trend: "down" },
          ].map((r) => (
            <div key={r.date} className="flex items-center gap-3 rounded-2xl px-3 py-3">
              <div className="flex-1">
                <p className="text-[14px] font-medium">头皮综合检测</p>
                <p className="text-[12px] text-muted-foreground">2026-{r.date}</p>
              </div>
              <span className="text-[18px] font-bold text-gold">{r.score}</span>
              {r.trend === "up" ? (
                <Badge tone="green"><TrendingUp className="mr-0.5 h-3 w-3" />上升</Badge>
              ) : (
                <Badge tone="gray"><TrendingDown className="mr-0.5 h-3 w-3" />下降</Badge>
              )}
            </div>
          ))}
        </Card>
      </div>
    </AppShell>
  )
}
