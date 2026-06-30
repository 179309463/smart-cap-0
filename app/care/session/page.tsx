"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Bluetooth, BatteryFull, Play, Pause, Check, Minus, Plus } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar } from "@/components/top-bar"
import { BottomBar, GoldButton, OutlineButton } from "@/components/ui-kit"
import { careModes } from "@/lib/data"

type Phase = "prep" | "run" | "done"

export default function CareSessionPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>("prep")
  const [modeIdx, setModeIdx] = useState(0)
  const mode = careModes[modeIdx]
  const total = mode.minutes * 60
  const [left, setLeft] = useState(total)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (phase !== "run" || paused) return
    if (left <= 0) {
      setPhase("done")
      return
    }
    const t = setTimeout(() => setLeft((l) => l - 1), 100) // 加速演示
    return () => clearTimeout(t)
  }, [phase, paused, left])

  const start = () => {
    setLeft(total)
    setPhase("run")
  }

  const mm = String(Math.floor(left / 60)).padStart(2, "0")
  const ss = String(left % 60).padStart(2, "0")
  const progress = phase === "run" ? ((total - left) / total) * 100 : 0

  // 准备页
  if (phase === "prep") {
    return (
      <AppShell bottomSpace dark>
        <TopBar title="护理准备" dark close onBack={() => router.push("/care")} />
        <div className="flex flex-col items-center px-6 pt-2">
          <div className="flex h-44 w-44 items-center justify-center rounded-full bg-white/5">
            <Image src="/device.png" alt="护理仪" width={120} height={120} className="object-contain" />
          </div>
          <div className="mt-4 flex items-center gap-3 rounded-full bg-white/8 px-4 py-2 text-[12px] text-white/70">
            <span className="flex items-center gap-1"><Bluetooth className="h-3.5 w-3.5" /> 已连接</span>
            <span className="flex items-center gap-1"><BatteryFull className="h-3.5 w-3.5" /> 86%</span>
          </div>

          <h2 className="mb-3 mt-8 w-full text-[15px] font-semibold text-white/80">选择护理模式</h2>
          <div className="w-full space-y-3">
            {careModes.map((m, i) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setModeIdx(i)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-4 text-left ${
                  modeIdx === i ? "border-gold bg-white/10" : "border-white/10 bg-white/5"
                }`}
              >
                <div>
                  <p className="text-[15px] font-semibold text-white">{m.name}</p>
                  <p className="mt-0.5 text-[12px] text-white/50">{m.desc}</p>
                </div>
                <span className="text-[13px] text-gold">{m.minutes} 分钟</span>
              </button>
            ))}
          </div>
        </div>
        <BottomBar dark>
          <GoldButton onClick={start}>
            <Play className="h-5 w-5" /> 开始护理
          </GoldButton>
        </BottomBar>
      </AppShell>
    )
  }

  // 运行页
  if (phase === "run") {
    const R = 130
    const C = 2 * Math.PI * R
    return (
      <AppShell dark>
        <TopBar title={mode.name} dark close onBack={() => router.push("/care")} />
        <div className="flex flex-col items-center px-6 pt-6">
          <div className="relative flex h-80 w-80 items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 300 300">
              <circle cx="150" cy="150" r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="14" />
              <circle
                cx="150"
                cy="150"
                r={R}
                fill="none"
                stroke="url(#g)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray={C}
                strokeDashoffset={C - (C * progress) / 100}
              />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f0c878" />
                  <stop offset="100%" stopColor="#bd8b30" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center">
              <p className="font-mono text-[52px] font-bold leading-none text-white">
                {mm}:{ss}
              </p>
              <p className="mt-2 text-[14px] text-white/50">剩余时间</p>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-4 rounded-2xl bg-white/8 px-5 py-3">
            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
              <Minus className="h-4 w-4" />
            </button>
            <div className="text-center">
              <p className="text-[12px] text-white/50">强度档位</p>
              <p className="text-[16px] font-semibold text-white">3 档</p>
            </div>
            <button type="button" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white">
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-white"
            >
              {paused ? <Play className="h-7 w-7" /> : <Pause className="h-7 w-7" />}
            </button>
            <button
              type="button"
              onClick={() => setPhase("done")}
              className="flex h-16 items-center rounded-full bg-danger px-8 text-[16px] font-semibold text-white"
            >
              结束
            </button>
          </div>
        </div>
      </AppShell>
    )
  }

  // 结束确认页
  return (
    <AppShell bottomSpace>
      <div className="flex flex-col items-center px-6 pt-20 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-green-soft">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green text-white">
            <Check className="h-8 w-8" strokeWidth={3} />
          </span>
        </span>
        <h1 className="mt-6 text-[22px] font-bold">护理完成</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">{mode.name} · {mode.minutes} 分钟</p>

        <div className="mt-8 grid w-full grid-cols-3 gap-3">
          {[
            { label: "本次时长", value: `${mode.minutes}分` },
            { label: "强度档位", value: "3档" },
            { label: "连续打卡", value: "6天" },
          ].map((s) => (
            <div key={s.label} className="card-soft p-4">
              <p className="text-[20px] font-bold text-gold">{s.value}</p>
              <p className="mt-1 text-[12px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 w-full rounded-2xl bg-accent p-4 text-left text-[13px] leading-relaxed text-[#8a6a36]">
          坚持得很好！建议护理后 30 分钟内避免抓挠头皮，保持清爽。
        </div>
      </div>

      <BottomBar>
        <div className="space-y-3">
          <GoldButton onClick={() => router.push("/detect")}>立即检测头皮状态</GoldButton>
          <OutlineButton onClick={() => router.push("/care")}>返回护理计划</OutlineButton>
        </div>
      </BottomBar>
    </AppShell>
  )
}
