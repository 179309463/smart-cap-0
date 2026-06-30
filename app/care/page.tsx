"use client"

import Link from "next/link"
import {
  Sparkles,
  CalendarHeart,
  ScanLine,
  Check,
  Clock,
  ChevronRight,
  Plus,
  Target,
  Flame,
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { BottomTab } from "@/components/bottom-tab"
import { Card, IconChip, Badge } from "@/components/ui-kit"
import { careModes, planTasks } from "@/lib/data"

export default function CarePage() {
  const doneCount = planTasks.filter((t) => t.done).length
  return (
    <AppShell bottomSpace>
      <header className="px-5 pb-1 pt-5">
        <h1 className="text-[22px] font-bold">护理计划</h1>
        <p className="mt-1 text-[13px] text-muted-foreground">坚持养护，头皮状态稳步提升</p>
      </header>

      <div className="space-y-4 px-5 pt-3">
        {/* 计划进度卡 */}
        <div className="rounded-3xl bg-gradient-to-br from-[#3a2f24] to-[#251d15] p-5 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-gold" />
              <span className="text-[15px] font-semibold">控油平衡计划</span>
            </div>
            <Link href="/care/goal" className="rounded-full bg-white/10 px-3 py-1 text-[12px]">
              调整目标
            </Link>
          </div>
          <div className="mt-5 flex items-end justify-between">
            <div>
              <p className="text-[13px] text-white/60">已坚持</p>
              <p className="mt-1 text-[28px] font-bold leading-none">
                12<span className="ml-1 text-[14px] font-normal text-white/60">/ 28 天</span>
              </p>
            </div>
            <div className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[12px]">
              <Flame className="h-4 w-4 text-[#f0a868]" /> 连续打卡 5 天
            </div>
          </div>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-gradient-to-r from-[#d3a64c] to-[#f0c878]" style={{ width: "43%" }} />
          </div>
        </div>

        {/* 今日任务 */}
        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">今日任务 · {doneCount}/{planTasks.length}</h2>
            <Link href="/care/plan/calendar" className="flex items-center text-[13px] text-gold">
              <CalendarHeart className="mr-1 h-4 w-4" /> 日历
            </Link>
          </div>
          <Card className="mt-3 space-y-1 p-2">
            {planTasks.map((task) => (
              <Link
                key={task.id}
                href={task.mode === "AI 检测" ? "/detect" : "/care/session"}
                className="flex items-center gap-3 rounded-2xl px-3 py-3 active:bg-[#faf6ef]"
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    task.done ? "bg-green text-white" : "bg-accent text-accent-foreground"
                  }`}
                >
                  {task.done ? <Check className="h-5 w-5" strokeWidth={3} /> : <Clock className="h-4 w-4" />}
                </span>
                <div className="flex-1">
                  <p className={`text-[14px] font-medium ${task.done ? "text-muted-foreground line-through" : ""}`}>
                    {task.name}
                  </p>
                  <p className="text-[12px] text-muted-foreground">
                    {task.time} · {task.mode}
                  </p>
                </div>
                {!task.done && <Badge tone="gold">待完成</Badge>}
              </Link>
            ))}
            <Link
              href="/care/log"
              className="flex items-center justify-center gap-1.5 rounded-2xl py-3 text-[13px] text-muted-foreground"
            >
              <Plus className="h-4 w-4" /> 手动补记护理
            </Link>
          </Card>
        </section>

        {/* 护理模式 */}
        <section>
          <h2 className="text-[16px] font-semibold">护理模式</h2>
          <div className="mt-3 space-y-3">
            {careModes.map((mode, i) => (
              <Link key={mode.id} href="/care/session">
                <Card className={`flex items-center gap-4 ${i < 2 ? "mb-2.5" : ""}`}>
                  <IconChip color={["orange", "blue", "mint"][i]} size="lg">
                    <Sparkles className="h-6 w-6" />
                  </IconChip>
                  <div className="flex-1">
                    <p className="text-[15px] font-semibold">{mode.name}</p>
                    <p className="mt-0.5 text-[13px] text-muted-foreground">{mode.desc}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[13px] font-medium text-gold">{mode.minutes} 分钟</p>
                    <ChevronRight className="ml-auto mt-1 h-4 w-4 text-muted-foreground" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <BottomTab active="/care" />
    </AppShell>
  )
}
