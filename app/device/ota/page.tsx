"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Cpu, Check, AlertCircle } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar } from "@/components/top-bar"
import { BottomBar, GoldButton, OutlineButton, Card } from "@/components/ui-kit"

type Phase = "ready" | "upgrading" | "done"

export default function OtaPage() {
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>("ready")
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (phase !== "upgrading") return
    const t = setInterval(() => {
      setProgress((p) => {
        const n = p + 2
        if (n >= 100) {
          clearInterval(t)
          setTimeout(() => setPhase("done"), 400)
          return 100
        }
        return n
      })
    }, 60)
    return () => clearInterval(t)
  }, [phase])

  return (
    <AppShell bottomSpace>
      <TopBar title="固件升级" />
      <div className="px-5 pt-2">
        {phase === "done" ? (
          <div className="flex flex-col items-center pt-14 text-center">
            <span className="flex h-24 w-24 items-center justify-center rounded-full bg-green-soft">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green text-white">
                <Check className="h-8 w-8" strokeWidth={3} />
              </span>
            </span>
            <h1 className="mt-6 text-[20px] font-bold">升级完成</h1>
            <p className="mt-2 text-[14px] text-muted-foreground">已更新至 v2.4.0，设备将自动重启</p>
          </div>
        ) : (
          <>
            <div className="rounded-[28px] bg-gradient-to-br from-[#fbefe0] to-[#f3e2c9] p-6 text-center">
              <span className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-gold text-white">
                <Cpu className="h-10 w-10" />
              </span>
              {phase === "ready" ? (
                <>
                  <p className="mt-4 text-[16px] font-semibold text-[#5c4a2a]">发现新版本 v2.4.0</p>
                  <p className="mt-1 text-[13px] text-[#8a6a36]">当前版本 v2.3.1 · 大小 8.6MB</p>
                </>
              ) : (
                <>
                  <p className="mt-4 font-mono text-[28px] font-bold text-[#5c4a2a]">{progress}%</p>
                  <p className="mt-1 text-[13px] text-[#8a6a36]">正在升级，请勿断开连接</p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/60">
                    <div className="h-full rounded-full bg-gold transition-all" style={{ width: `${progress}%` }} />
                  </div>
                </>
              )}
            </div>

            <h2 className="mb-3 mt-6 text-[16px] font-semibold">更新内容</h2>
            <Card className="space-y-3">
              {["优化护理模式能量曲线，体验更舒适", "新增「营养导入」节律提醒", "修复蓝牙连接稳定性问题"].map((c, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-green" strokeWidth={3} />
                  <p className="text-[14px] leading-relaxed">{c}</p>
                </div>
              ))}
            </Card>

            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#fdf1e8] p-3 text-[12px] text-[#c2702f]">
              <AlertCircle className="h-4 w-4 shrink-0" />
              升级期间请保持设备电量充足并靠近手机
            </div>
          </>
        )}
      </div>

      <BottomBar>
        {phase === "ready" && <GoldButton onClick={() => setPhase("upgrading")}>立即升级</GoldButton>}
        {phase === "upgrading" && (
          <OutlineButton className="pointer-events-none opacity-60">升级中…</OutlineButton>
        )}
        {phase === "done" && <GoldButton onClick={() => router.push("/device/asset")}>完成</GoldButton>}
      </BottomBar>
    </AppShell>
  )
}
