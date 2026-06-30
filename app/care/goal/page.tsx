'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Droplet, HeartPulse, ShieldCheck, Heart, Sparkles, Check, Wand2 } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { TopBar } from '@/components/top-bar'
import { BottomBar, GoldButton } from '@/components/ui-kit'

const GOALS = [
  {
    id: 'oil',
    title: '控油舒缓',
    desc: '适合油性头皮，调节油脂分泌，舒缓头皮不适',
    icon: Droplet,
    color: 'blue',
    tags: ['每周 3 次', '每次 15 分钟', '4 周见效'],
    recommend: true,
  },
  {
    id: 'follicle',
    title: '毛囊唤醒',
    desc: '激活毛囊活力，强韧发根，改善头发稀疏',
    icon: HeartPulse,
    color: 'pink',
    tags: ['每周 5 次', '每次 20 分钟', '8 周见效'],
  },
  {
    id: 'anti',
    title: '防脱维护',
    desc: '日常头皮养护，减少掉发，维持健康状态',
    icon: ShieldCheck,
    color: 'mint',
    tags: ['每周 2-3 次', '每次 10 分钟', '长期维护'],
  },
  {
    id: 'sensitive',
    title: '敏感修护',
    desc: '温和护理敏感头皮，舒缓泛红与瘙痒',
    icon: Heart,
    color: 'yellow',
    tags: ['每周 2 次', '每次 12 分钟', '低强度'],
  },
]

const SUB_GOALS = ['+ 去屑止痒', '+ 强韧发根', '+ 乌发养发']

export default function GoalPage() {
  const router = useRouter()
  const [selected, setSelected] = useState('oil')
  const [subs, setSubs] = useState<string[]>([])

  const toggleSub = (s: string) =>
    setSubs((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]))

  return (
    <AppShell bottomSpace>
      <TopBar title="选择护理目标" />
      <div className="px-5 pt-2">
        <h1 className="text-[22px] font-bold">你的护理目标是什么?</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">选择一个主要目标，我们将为你定制专属护理计划</p>

        <div className="mt-4 flex items-start gap-3 rounded-3xl bg-accent p-4">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent-foreground" />
          <div>
            <p className="text-[14px] font-semibold text-[#8a6a36]">AI 智能推荐</p>
            <p className="mt-0.5 text-[12px] leading-relaxed text-[#a3854f]">
              根据你的头皮检测结果，推荐优先选择「控油舒缓」
            </p>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {GOALS.map((g) => {
            const active = selected === g.id
            const Icon = g.icon
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => setSelected(g.id)}
                className={`w-full rounded-3xl border bg-white p-4 text-left transition ${
                  active ? 'border-gold shadow-[0_8px_24px_-16px_rgba(189,139,48,0.6)]' : 'border-[#ece4d7]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-chip-${g.color} text-chip-${g.color}-fg`}>
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-[16px] font-bold">{g.title}</p>
                      {g.recommend && (
                        <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] text-accent-foreground">推荐</span>
                      )}
                    </div>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{g.desc}</p>
                  </div>
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                      active ? 'border-gold bg-gold text-white' : 'border-[#d8cdb9]'
                    }`}
                  >
                    {active && <Check className="h-4 w-4" strokeWidth={3} />}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.tags.map((t) => (
                    <span key={t} className="rounded-lg bg-[#f3ede2] px-2.5 py-1 text-[11px] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            )
          })}
        </div>

        <div className="mt-5">
          <p className="text-[15px] font-semibold">辅助目标（可选）</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SUB_GOALS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSub(s)}
                className={`rounded-full border px-4 py-2 text-[13px] ${
                  subs.includes(s) ? 'border-gold bg-accent text-accent-foreground' : 'border-[#ece0cd] bg-white text-muted-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-5 text-center text-[11px] text-muted-foreground">
          * 护理建议仅供健康管理参考，不作为医疗诊断依据
        </p>
      </div>

      <BottomBar>
        <GoldButton onClick={() => router.push('/care/plan/confirm')}>
          <Wand2 className="h-5 w-5" /> 生成我的护理计划
        </GoldButton>
      </BottomBar>
    </AppShell>
  )
}
