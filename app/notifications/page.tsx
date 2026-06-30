"use client"

import Link from "next/link"
import { Sparkles, Droplet, ScanLine, Truck, Cpu } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar } from "@/components/top-bar"
import { IconChip } from "@/components/ui-kit"

const NOTIS = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    color: "orange",
    title: "护理提醒",
    desc: "晚间营养导入护理时间到啦，开始今天的护理吧",
    time: "刚刚",
    href: "/care/session",
    unread: true,
  },
  {
    icon: <Droplet className="h-5 w-5" />,
    color: "blue",
    title: "耗材提醒",
    desc: "护理液余量不足，建议及时补给以免影响护理",
    time: "2 小时前",
    href: "/shop/supply",
    unread: true,
  },
  {
    icon: <ScanLine className="h-5 w-5" />,
    color: "mint",
    title: "检测报告已生成",
    desc: "本次头皮综合评分 78 分，点击查看详细报告",
    time: "今天 09:12",
    href: "/detect/report",
    unread: false,
  },
  {
    icon: <Truck className="h-5 w-5" />,
    color: "yellow",
    title: "订单已发货",
    desc: "你的护理液补充装已发货，预计明天送达",
    time: "昨天",
    href: "/shop/pay/success",
    unread: false,
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    color: "pink",
    title: "固件升级",
    desc: "护理仪有新版本 v2.4.0 可升级，体验更佳",
    time: "2 天前",
    href: "/device/ota",
    unread: false,
  },
]

export default function NotificationsPage() {
  return (
    <AppShell bottomSpace>
      <TopBar title="消息通知" right={<span className="text-[13px] text-gold">全部已读</span>} />
      <div className="space-y-3 px-5 pt-2">
        {NOTIS.map((n, i) => (
          <Link key={i} href={n.href}>
            <div className="card-soft flex gap-3 p-4">
              <div className="relative">
                <IconChip color={n.color}>{n.icon}</IconChip>
                {n.unread && (
                  <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-card bg-danger" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[15px] font-semibold">{n.title}</p>
                  <span className="shrink-0 text-[12px] text-muted-foreground">{n.time}</span>
                </div>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{n.desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </AppShell>
  )
}
