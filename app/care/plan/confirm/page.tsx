'use client'

import { useRouter } from 'next/navigation'
import { Target, CalendarDays, Clock, Bell, Check, Sparkles, ChevronRight } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { TopBar } from '@/components/top-bar'
import { BottomBar, GoldButton, Card, IconChip } from '@/components/ui-kit'

const WEEK = ['一', '二', '三', '四', '五', '六', '日']
const PLAN_DAYS = [0, 2, 4] // 周一三五

const PHASES = [
  { week: '第 1-2 周', title: '基础调理期', desc: '建立护理习惯，舒缓头皮', active: true },
  { week: '第 3-4 周', title: '深度改善期', desc: '强化控油，平衡水油' },
  { week: '第 5-8 周', title: '巩固维护期', desc: '稳定状态，长效养护' },
]

export default function PlanPage() {
  const router = useRouter()
  return (
    <AppShell bottomSpace>
      <TopBar title="护理计划" />
      <div className="px-5 pt-2">
        <div className="rounded-3xl bg-gradient-to-br from-[#3a2f24] to-[#251d15] p-5 text-white">
          <Sparkles className="h-6 w-6 text-gold" />
          <p className="mt-3 text-[20px] font-bold">控油舒缓 · 8 周专属计划</p>
          <p className="mt-1 text-[13px] text-white/70">已根据你的头皮检测数据智能生成</p>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
            <PlanStat value="3 次" label="每周护理" />
            <PlanStat value="15 分" label="单次时长" />
            <PlanStat value="8 周" label="计划周期" />
          </div>
        </div>

        <section className="mt-5">
          <h2 className="text-[16px] font-semibold">每周护理安排</h2>
          <Card className="mt-3">
            <div className="flex items-center justify-between">
              {WEEK.map((d, i) => (
                <div key={d} className="flex flex-col items-center gap-2">
                  <span className="text-[13px] text-muted-foreground">{d}</span>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-[13px] ${
                      PLAN_DAYS.includes(i) ? 'bg-gold text-white' : 'bg-[#f3ede2] text-muted-foreground'
                    }`}
                  >
                    {PLAN_DAYS.includes(i) ? <Check className="h-4 w-4" strokeWidth={3} /> : '—'}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#faf6ef] px-4 py-3 text-[13px] text-muted-foreground">
              <Clock className="h-4 w-4 text-gold" /> 建议护理时段：每天 21:00 晚间
            </div>
          </Card>
        </section>

        <section className="mt-5">
          <h2 className="text-[16px] font-semibold">阶段目标</h2>
          <div className="mt-3 space-y-3">
            {PHASES.map((p) => (
              <Card key={p.week} className={`flex items-center gap-3 ${p.active ? 'border border-gold' : ''}`}>
                <IconChip color={p.active ? 'gold' : 'mint'}>
                  <Target className="h-5 w-5" />
                </IconChip>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-[14px] font-semibold">{p.title}</p>
                    <span className="text-[12px] text-muted-foreground">{p.week}</span>
                  </div>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">{p.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <button
          type="button"
          className="mt-5 flex w-full items-center gap-3 rounded-3xl bg-white p-4 text-left"
        >
          <IconChip color="yellow">
            <Bell className="h-5 w-5" />
          </IconChip>
          <div className="flex-1">
            <p className="text-[14px] font-medium">护理提醒</p>
            <p className="text-[12px] text-muted-foreground">每天 21:00 推送护理通知</p>
          </div>
          <span className="relative h-6 w-11 rounded-full bg-gold">
            <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white" />
          </span>
        </button>
      </div>

      <BottomBar>
        <GoldButton onClick={() => router.push('/care/plan/calendar')}>
          <CalendarDays className="h-5 w-5" /> 确认并开启计划
        </GoldButton>
      </BottomBar>
    </AppShell>
  )
}

function PlanStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="text-[18px] font-bold">{value}</p>
      <p className="mt-0.5 text-[12px] text-white/60">{label}</p>
    </div>
  )
}
