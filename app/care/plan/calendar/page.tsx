'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Settings,
  ChevronLeft,
  ChevronRight,
  Droplet,
  CheckCheck,
  Pencil,
  Play,
} from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { TopBar, TopBarIconButton } from '@/components/top-bar'
import { BottomBar, GoldButton, OutlineButton, Card } from '@/components/ui-kit'

// 1 号是周一
const FIRST_WEEKDAY = 1
const DAYS = 31
const DONE = [1, 3, 7, 8, 10, 12, 14]
const MANUAL = [9]
const TODAY = 15

const RECORDS = [
  { type: 'done', title: '控油舒缓护理', meta: '今天 10:30 · 15 分钟 · 设备记录', tag: '已完成' },
  { type: 'manual', title: '控油舒缓护理', meta: '昨天 21:15 · 12 分钟 · 手动补记', tag: '补记' },
  { type: 'done', title: '控油舒缓护理', meta: '1月13日 20:45 · 15 分钟 · 设备记录', tag: '已完成' },
]

export default function CalendarPage() {
  const router = useRouter()
  const cells = Array.from({ length: FIRST_WEEKDAY }, () => null).concat(
    Array.from({ length: DAYS }, (_, i) => i + 1) as never[],
  )

  return (
    <AppShell bottomSpace>
      <TopBar
        title="护理计划"
        right={
          <Link href="/care/plan/confirm">
            <TopBarIconButton label="设置">
              <Settings className="h-5 w-5" />
            </TopBarIconButton>
          </Link>
        }
      />
      <div className="px-5 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[22px] font-bold">控油舒缓计划</h1>
            <p className="mt-1 text-[13px] text-muted-foreground">第 2 周 / 共 4 周 · 基础调理期</p>
          </div>
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-chip-blue text-chip-blue-fg">
            <Droplet className="h-6 w-6" />
          </span>
        </div>

        <Card className="mt-4 flex items-center justify-around">
          <Stat value="7" unit="天" label="连续打卡" color="text-foreground" />
          <Stat value="11" unit="次" label="累计护理" color="text-green" />
          <Stat value="85" unit="%" label="计划完成率" color="text-chip-blue-fg" />
        </Card>

        <Card className="mt-4">
          <div className="flex items-center justify-between">
            <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3ede2] text-muted-foreground" aria-label="上个月">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <p className="text-[15px] font-semibold">2024年 1月</p>
            <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f3ede2] text-muted-foreground" aria-label="下个月">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-4 grid grid-cols-7 text-center text-[12px] text-muted-foreground">
            {['日', '一', '二', '三', '四', '五', '六'].map((d) => (
              <span key={d} className="py-1">{d}</span>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-y-2 text-center">
            {cells.map((day, i) => {
              if (day === null) return <span key={`e${i}`} />
              const isDone = DONE.includes(day as number)
              const isManual = MANUAL.includes(day as number)
              const isToday = day === TODAY
              return (
                <div key={day as number} className="flex justify-center">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-[14px] ${
                      isToday
                        ? 'bg-gold font-semibold text-white'
                        : isDone
                          ? 'bg-green-soft font-medium text-green'
                          : isManual
                            ? 'bg-accent font-medium text-accent-foreground'
                            : 'border border-[#ece4d7] text-muted-foreground'
                    }`}
                  >
                    {day as number}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-muted-foreground">
            <Legend color="bg-green-soft" label="已完成" />
            <Legend color="bg-accent" label="手动补记" />
            <Legend color="border border-[#d8cdb9]" label="待完成" />
            <Legend color="bg-gold" label="今天" />
          </div>
        </Card>

        <section className="mt-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-semibold">最近记录</h2>
            <span className="text-[13px] text-gold">查看全部</span>
          </div>
          <Card className="mt-3 space-y-1 p-2">
            {RECORDS.map((r, i) => (
              <div key={i} className="flex items-center gap-3 rounded-2xl px-3 py-3">
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-full ${
                    r.type === 'done' ? 'bg-green-soft text-green' : 'bg-accent text-accent-foreground'
                  }`}
                >
                  {r.type === 'done' ? <CheckCheck className="h-5 w-5" /> : <Pencil className="h-4 w-4" />}
                </span>
                <div className="flex-1">
                  <p className="text-[14px] font-medium">{r.title}</p>
                  <p className="text-[12px] text-muted-foreground">{r.meta}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] ${
                    r.type === 'done' ? 'bg-green-soft text-green' : 'bg-accent text-accent-foreground'
                  }`}
                >
                  {r.tag}
                </span>
              </div>
            ))}
          </Card>
        </section>
      </div>

      <BottomBar>
        <div className="space-y-3">
          <GoldButton onClick={() => router.push('/care/session')}>
            <Play className="h-5 w-5" fill="currentColor" /> 开始今日护理
          </GoldButton>
          <OutlineButton onClick={() => router.push('/care/log')}>
            <Pencil className="h-4 w-4" /> 补记护理记录
          </OutlineButton>
        </div>
      </BottomBar>
    </AppShell>
  )
}

function Stat({ value, unit, label, color }: { value: string; unit: string; label: string; color: string }) {
  return (
    <div className="text-center">
      <p className={`text-[24px] font-bold ${color}`}>
        {value}<span className="ml-0.5 text-[13px] font-normal text-muted-foreground">{unit}</span>
      </p>
      <p className="mt-0.5 text-[12px] text-muted-foreground">{label}</p>
    </div>
  )
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className={`h-3 w-3 rounded-full ${color}`} /> {label}
    </span>
  )
}
