"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Droplet, Minus, Plus, Check, Truck } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar } from "@/components/top-bar"
import { BottomBar, GoldButton, Card } from "@/components/ui-kit"

export default function SupplyPage() {
  const router = useRouter()
  const [qty, setQty] = useState(1)
  const unit = 459
  const total = unit * qty

  return (
    <AppShell bottomSpace>
      <TopBar title="耗材补给" />
      <div className="px-5 pt-2">
        {/* 余量提示 */}
        <div className="rounded-3xl bg-gradient-to-br from-[#fdf1e8] to-[#f9e3d2] p-5">
          <div className="flex items-center gap-2 text-[#c2702f]">
            <Droplet className="h-5 w-5" />
            <span className="text-[14px] font-semibold">护理液余量</span>
          </div>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-[36px] font-bold leading-none text-[#c2702f]">12%</span>
            <span className="mb-1 text-[13px] text-[#c2702f]/70">约剩 3 次使用量</span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-white/60">
            <div className="h-full rounded-full bg-[#e08a4e]" style={{ width: "12%" }} />
          </div>
        </div>

        {/* 推荐补给套装 */}
        <h2 className="mb-3 mt-6 text-[16px] font-semibold">推荐补给</h2>
        <Card className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#f3ede2]">
            <Image src="/liquid.png" alt="护理液" width={60} height={60} className="object-contain" />
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-semibold">导入护理液补充装</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">3 支装 · 90ml · 约 3 个月用量</p>
            <p className="mt-2 text-[18px] font-bold text-gold">¥{unit}</p>
          </div>
        </Card>

        {/* 数量 */}
        <Card className="mt-3 flex items-center justify-between">
          <span className="text-[14px] font-medium">购买数量</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1ebe1] text-foreground"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-[16px] font-semibold">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-white"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </Card>

        {/* 配送 */}
        <Card className="mt-3 flex items-center gap-3">
          <Truck className="h-5 w-5 text-gold" />
          <div className="flex-1">
            <p className="text-[14px] font-medium">顺丰速运</p>
            <p className="text-[12px] text-muted-foreground">预计 1-2 天送达 · 包邮</p>
          </div>
          <Check className="h-5 w-5 text-green" />
        </Card>
      </div>

      <BottomBar>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[12px] text-muted-foreground">合计</p>
            <p className="text-[22px] font-bold text-gold">¥{total}</p>
          </div>
          <GoldButton onClick={() => router.push("/shop/pay/success")} className="flex-1">
            立即补给
          </GoldButton>
        </div>
      </BottomBar>
    </AppShell>
  )
}
