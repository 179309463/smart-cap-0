"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ScanLine, Check } from "lucide-react"
import { AppShell } from "@/components/app-shell"

const STEPS = ["图像预处理", "识别头皮区域", "分析出油与水分", "评估毛囊密度", "生成健康报告"]

export default function AnalyzingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        const next = p + 2
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => router.replace("/detect/report"), 400)
          return 100
        }
        return next
      })
    }, 45)
    return () => clearInterval(timer)
  }, [router])

  useEffect(() => {
    setStep(Math.min(STEPS.length - 1, Math.floor((progress / 100) * STEPS.length)))
  }, [progress])

  return (
    <AppShell dark>
      <div className="flex min-h-dvh flex-col items-center justify-center px-8">
        {/* 扫描圆环 */}
        <div className="relative flex h-48 w-48 items-center justify-center">
          <svg className="absolute inset-0 -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="8" />
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="#bd8b30"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 88}
              strokeDashoffset={2 * Math.PI * 88 * (1 - progress / 100)}
            />
          </svg>
          <div className="text-center">
            <ScanLine className="mx-auto h-8 w-8 text-gold" />
            <p className="mt-2 font-mono text-[28px] font-bold text-white">{progress}%</p>
          </div>
        </div>

        <h1 className="mt-8 text-[18px] font-semibold text-white">AI 正在分析头皮状态</h1>

        <div className="mt-6 w-full space-y-3">
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] ${
                  i < step ? "bg-green text-white" : i === step ? "bg-gold text-white" : "bg-white/10 text-white/40"
                }`}
              >
                {i < step ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
              </span>
              <span className={`text-[14px] ${i <= step ? "text-white" : "text-white/40"}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
