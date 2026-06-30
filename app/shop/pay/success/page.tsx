"use client"

import { useRouter } from "next/navigation"
import { Check, Truck, ChevronRight } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { BottomBar, GoldButton, OutlineButton, Card } from "@/components/ui-kit"

export default function PaySuccessPage() {
  const router = useRouter()
  return (
    <AppShell bottomSpace>
      <div className="flex flex-col items-center px-6 pt-20 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-green-soft">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green text-white">
            <Check className="h-8 w-8" strokeWidth={3} />
          </span>
        </span>
        <h1 className="mt-6 text-[22px] font-bold">支付成功</h1>
        <p className="mt-2 text-[14px] text-muted-foreground">订单已提交，我们将尽快为你发货</p>

        <Card className="mt-8 w-full">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-chip-mint text-chip-mint-fg">
              <Truck className="h-5 w-5" />
            </span>
            <div className="flex-1 text-left">
              <p className="text-[14px] font-medium">顺丰速运</p>
              <p className="text-[12px] text-muted-foreground">预计 1-2 天送达</p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <div className="mt-4 w-full rounded-2xl bg-accent p-4 text-left text-[13px] leading-relaxed text-[#8a6a36]">
          护理液到货后，可在「设备资产」中重置余量提醒，开启新一轮养护。
        </div>
      </div>

      <BottomBar>
        <div className="space-y-3">
          <GoldButton onClick={() => router.push("/profile")}>查看我的订单</GoldButton>
          <OutlineButton onClick={() => router.push("/home")}>返回首页</OutlineButton>
        </div>
      </BottomBar>
    </AppShell>
  )
}
