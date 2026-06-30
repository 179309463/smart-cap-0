'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, Headphones, MessageSquare, Phone, FileQuestion } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { TopBar } from '@/components/top-bar'
import { Card, IconChip } from '@/components/ui-kit'

const CONTACTS = [
  { icon: MessageSquare, color: 'mint', label: '在线客服', desc: '9:00 - 22:00 在线' },
  { icon: Phone, color: 'blue', label: '客服热线', desc: '400-888-6666' },
]

const FAQS = [
  { q: '设备无法连接蓝牙怎么办？', a: '请确认设备已开机且电量充足，靠近手机后在「我的设备」中重新扫描连接。若仍失败，可长按设备电源键 5 秒重置后重试。' },
  { q: 'AI 检测结果准确吗？', a: '检测基于头皮高清影像与算法模型分析，建议在光线充足、按拍摄引导规范操作时获取最佳结果，连续记录更利于趋势判断。' },
  { q: '护理液多久需要更换？', a: 'App 会根据使用频率自动估算余量，余量低于 20% 时会在商城与首页提醒补给，正常使用约可维持 30 天。' },
  { q: '如何取消已购买的订单？', a: '在「我的-我的订单」中找到对应订单，未发货状态下可直接申请取消，已发货订单请联系在线客服处理。' },
]

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <AppShell bottomSpace>
      <TopBar title="帮助与客服" />
      <div className="space-y-4 px-5 pt-1">
        <div className="rounded-3xl bg-gradient-to-br from-[#fbeedd] to-[#f6e2c9] p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-gold">
              <Headphones className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[17px] font-bold text-[#5c4a2c]">需要帮助？</p>
              <p className="text-[13px] text-[#a3854f]">我们随时为你解答护理与设备问题</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {CONTACTS.map((c) => (
            <Card key={c.label} className="flex flex-col items-start gap-2">
              <IconChip color={c.color} size="sm">
                <c.icon className="h-4 w-4" />
              </IconChip>
              <p className="text-[15px] font-bold">{c.label}</p>
              <p className="text-[12px] text-muted-foreground">{c.desc}</p>
            </Card>
          ))}
        </div>

        <div>
          <p className="mb-2 px-1 text-[15px] font-bold">常见问题</p>
          <Card className="p-2">
            {FAQS.map((f, i) => (
              <button
                key={f.q}
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full border-b border-[#f0ece4] px-3 py-3.5 text-left last:border-0"
              >
                <div className="flex items-center gap-2">
                  <FileQuestion className="h-4 w-4 shrink-0 text-gold" />
                  <span className="flex-1 text-[14px] font-medium">{f.q}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-muted-foreground transition-transform ${open === i ? 'rotate-180' : ''}`}
                  />
                </div>
                {open === i && (
                  <p className="mt-2 pl-6 text-[13px] leading-relaxed text-muted-foreground">{f.a}</p>
                )}
              </button>
            ))}
          </Card>
        </div>

        <Link
          href="/notifications"
          className="block rounded-2xl bg-[#f3ede2] py-3.5 text-center text-[14px] font-medium text-muted-foreground active:bg-[#ece4d6]"
        >
          查看历史工单
        </Link>
      </div>
    </AppShell>
  )
}
