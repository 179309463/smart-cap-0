"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Check } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar } from "@/components/top-bar"
import { BottomBar, GoldButton, Card } from "@/components/ui-kit"
import { careModes } from "@/lib/data"

const DURATIONS = [5, 8, 10, 12, 15]

export default function ManualLogPage() {
  const router = useRouter()
  const [mode, setMode] = useState(careModes[0].id)
  const [duration, setDuration] = useState(8)
  const [done, setDone] = useState(false)

  const submit = () => {
    setDone(true)
    setTimeout(() => router.push("/care"), 1200)
  }

  if (done) {
    return (
      <AppShell>
        <div className="flex min-h-dvh flex-col items-center justify-center px-6 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-green text-white">
            <Check className="h-10 w-10" strokeWidth={3} />
          </span>
          <h1 className="mt-5 text-[20px] font-bold">补记成功</h1>
          <p className="mt-2 text-[14px] text-muted-foreground">已记录到今日护理</p>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell bottomSpace>
      <TopBar title="手动补记" />
      <div className="px-5 pt-2">
        <h2 className="mb-3 text-[15px] font-semibold">护理模式</h2>
        <Card className="space-y-2 p-2">
          {careModes.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left ${
                mode === m.id ? "bg-accent" : ""
              }`}
            >
              <div>
                <p className="text-[14px] font-medium">{m.name}</p>
                <p className="text-[12px] text-muted-foreground">{m.desc}</p>
              </div>
              {mode === m.id && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-white">
                  <Check className="h-4 w-4" strokeWidth={3} />
                </span>
              )}
            </button>
          ))}
        </Card>

        <h2 className="mb-3 mt-6 text-[15px] font-semibold">护理时长（分钟）</h2>
        <div className="flex gap-2.5">
          {DURATIONS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDuration(d)}
              className={`flex h-12 flex-1 items-center justify-center rounded-2xl text-[15px] font-semibold ${
                duration === d ? "btn-gold" : "bg-card text-foreground"
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-[15px] font-semibold">护理时间</h2>
        <Card className="flex items-center justify-between">
          <span className="text-[14px] text-muted-foreground">今天</span>
          <span className="text-[15px] font-medium">21:30</span>
        </Card>
      </div>

      <BottomBar>
        <GoldButton onClick={submit}>保存记录</GoldButton>
      </BottomBar>
    </AppShell>
  )
}
