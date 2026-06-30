"use client"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Bluetooth,
  BatteryFull,
  Droplet,
  RefreshCw,
  ChevronRight,
  Cpu,
  Wifi,
  Trash2,
  CircleHelp,
} from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar } from "@/components/top-bar"
import { Card, IconChip, Badge, GoldButton } from "@/components/ui-kit"

export default function DeviceAssetPage() {
  const router = useRouter()
  return (
    <AppShell bottomSpace>
      <TopBar title="设备资产" />
      <div className="px-5 pt-2">
        {/* 设备卡 */}
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#3a2f24] to-[#251d15] p-5 text-white">
          <div className="pointer-events-none absolute -right-8 -top-8 h-36 w-36 rounded-full bg-gold/20 blur-2xl" />
          <div className="relative flex items-center gap-4">
            <Image src="/device.png" alt="护理仪" width={72} height={72} className="object-contain" />
            <div className="flex-1">
              <p className="text-[16px] font-semibold">ScalpCare Pro</p>
              <p className="mt-0.5 text-[12px] text-white/50">SN: SC-2024-88291</p>
              <div className="mt-2 flex items-center gap-3 text-[12px] text-white/70">
                <span className="flex items-center gap-1"><Bluetooth className="h-3.5 w-3.5 text-green" /> 已连接</span>
              </div>
            </div>
          </div>
          <div className="relative mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-white/8 px-4 py-3">
              <div className="flex items-center gap-1.5 text-[12px] text-white/60">
                <BatteryFull className="h-4 w-4" /> 电量
              </div>
              <p className="mt-1 text-[18px] font-semibold">86%</p>
            </div>
            <div className="rounded-2xl bg-white/8 px-4 py-3">
              <div className="flex items-center gap-1.5 text-[12px] text-white/60">
                <Droplet className="h-4 w-4" /> 护理液
              </div>
              <p className="mt-1 text-[18px] font-semibold text-danger">12%</p>
            </div>
          </div>
        </div>

        {/* 耗材补给 */}
        <Link href="/shop/supply" className="mt-4 block">
          <div className="flex items-center gap-3 rounded-2xl border border-[#f3d9c8] bg-[#fdf1e8] p-4">
            <IconChip color="orange"><Droplet className="h-5 w-5" /></IconChip>
            <div className="flex-1">
              <p className="text-[14px] font-medium">护理液余量不足</p>
              <p className="text-[12px] text-muted-foreground">建议及时补给</p>
            </div>
            <span className="rounded-full bg-gold px-3 py-1.5 text-[12px] font-medium text-white">去补给</span>
          </div>
        </Link>

        {/* 设备设置 */}
        <h2 className="mb-3 mt-6 text-[16px] font-semibold">设备管理</h2>
        <Card className="p-2">
          <Link href="/device/ota" className="flex items-center gap-3 rounded-2xl px-3 py-3 active:bg-[#faf6ef]">
            <IconChip color="blue" size="sm"><Cpu className="h-4 w-4" /></IconChip>
            <span className="flex-1 text-[15px] font-medium">固件升级</span>
            <Badge tone="red">有新版本</Badge>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
          <div className="flex items-center gap-3 rounded-2xl px-3 py-3">
            <IconChip color="mint" size="sm"><Wifi className="h-4 w-4" /></IconChip>
            <span className="flex-1 text-[15px] font-medium">网络配置</span>
            <span className="text-[13px] text-muted-foreground">已配置</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <Link href="/profile/help" className="flex items-center gap-3 rounded-2xl px-3 py-3 active:bg-[#faf6ef]">
            <IconChip color="yellow" size="sm"><CircleHelp className="h-4 w-4" /></IconChip>
            <span className="flex-1 text-[15px] font-medium">使用帮助</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </Card>

        {/* 解绑 */}
        <button
          type="button"
          onClick={() => router.push("/bind/permissions")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-[#f0d4cc] bg-[#fdeee9] py-3.5 text-[15px] font-medium text-danger"
        >
          <Trash2 className="h-4 w-4" /> 解绑设备
        </button>
      </div>
    </AppShell>
  )
}
