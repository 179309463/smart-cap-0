"use client"

import { useState } from "react"
import { ShieldCheck, Camera, MapPin, Bell, ChevronRight, FileText, Trash2 } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar } from "@/components/top-bar"
import { Card, IconChip } from "@/components/ui-kit"

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={onToggle}
      className={`relative h-7 w-12 rounded-full transition-colors ${on ? "bg-gold" : "bg-[#ded5c6]"}`}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-all ${
          on ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  )
}

export default function PrivacyPage() {
  const [perms, setPerms] = useState({ camera: true, location: false, push: true, analytics: true })
  const toggle = (k: keyof typeof perms) => setPerms((p) => ({ ...p, [k]: !p[k] }))

  const ITEMS = [
    { key: "camera" as const, icon: <Camera className="h-5 w-5" />, color: "blue", title: "相机权限", desc: "用于头皮拍摄检测" },
    { key: "location" as const, icon: <MapPin className="h-5 w-5" />, color: "mint", title: "位置权限", desc: "用于附近门店与配送" },
    { key: "push" as const, icon: <Bell className="h-5 w-5" />, color: "yellow", title: "消息推送", desc: "护理提醒与订单通知" },
  ]

  return (
    <AppShell bottomSpace>
      <TopBar title="隐私与合规" />
      <div className="px-5 pt-2">
        <div className="rounded-3xl bg-gradient-to-br from-[#e1f1e6] to-[#d2ecdb] p-5">
          <div className="flex items-center gap-2 text-green">
            <ShieldCheck className="h-6 w-6" />
            <span className="text-[15px] font-semibold">你的数据安全受保护</span>
          </div>
          <p className="mt-2 text-[13px] leading-relaxed text-[#3f7a57]">
            头皮照片仅在本地与加密云端用于分析，绝不用于其他用途，你可随时管理与删除。
          </p>
        </div>

        <h2 className="mb-3 mt-6 text-[16px] font-semibold">权限管理</h2>
        <Card className="space-y-1 p-2">
          {ITEMS.map((it) => (
            <div key={it.key} className="flex items-center gap-3 rounded-2xl px-3 py-3">
              <IconChip color={it.color} size="sm">{it.icon}</IconChip>
              <div className="flex-1">
                <p className="text-[14px] font-medium">{it.title}</p>
                <p className="text-[12px] text-muted-foreground">{it.desc}</p>
              </div>
              <Toggle on={perms[it.key]} onToggle={() => toggle(it.key)} />
            </div>
          ))}
        </Card>

        <h2 className="mb-3 mt-6 text-[16px] font-semibold">数据与协议</h2>
        <Card className="space-y-1 p-2">
          {[
            { icon: <FileText className="h-4 w-4" />, label: "隐私政策" },
            { icon: <FileText className="h-4 w-4" />, label: "用户服务协议" },
            { icon: <FileText className="h-4 w-4" />, label: "数据收集清单" },
          ].map((r) => (
            <button key={r.label} type="button" className="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left active:bg-[#faf6ef]">
              <IconChip color="gold" size="sm">{r.icon}</IconChip>
              <span className="flex-1 text-[15px] font-medium">{r.label}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </Card>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#f0d4cc] bg-[#fdeee9] py-3.5 text-[15px] font-medium text-danger"
        >
          <Trash2 className="h-4 w-4" /> 删除我的检测数据
        </button>
      </div>
    </AppShell>
  )
}
