"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { MapPin, ChevronRight, Truck, Ticket } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar } from "@/components/top-bar"
import { BottomBar, GoldButton, Card } from "@/components/ui-kit"
import { products } from "@/lib/data"

export default function SupplyConfirmPage() {
  const router = useRouter()
  const item = products[1]
  const freight = 0
  const coupon = 30
  const total = item.price - coupon + freight

  return (
    <AppShell bottomSpace>
      <TopBar title="确认订单" />
      <div className="px-5 pt-2">
        {/* 收货地址 */}
        <Card className="flex items-center gap-3">
          <MapPin className="h-5 w-5 text-gold" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[15px] font-semibold">林小姐</span>
              <span className="text-[13px] text-muted-foreground">138****6688</span>
            </div>
            <p className="mt-0.5 text-[13px] text-muted-foreground">上海市浦东新区世纪大道 100 号 2201 室</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </Card>

        {/* 商品 */}
        <Card className="mt-3 flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f3ede2]">
            <Image src={item.image} alt={item.name} width={60} height={60} className="object-contain" />
          </div>
          <div className="flex-1">
            <p className="text-[15px] font-semibold">{item.name}</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">{item.subtitle}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[16px] font-bold text-gold">¥{item.price}</span>
              <span className="text-[13px] text-muted-foreground">x1</span>
            </div>
          </div>
        </Card>

        {/* 费用明细 */}
        <Card className="mt-3 space-y-3">
          <Row icon={<Truck className="h-4 w-4" />} label="配送方式" value="顺丰包邮" />
          <Row icon={<Ticket className="h-4 w-4" />} label="优惠券" value={`-¥${coupon}`} valueClass="text-danger" />
          <div className="border-t border-border pt-3">
            <Row label="商品金额" value={`¥${item.price}`} muted />
          </div>
        </Card>
      </div>

      <BottomBar>
        <div className="flex items-center gap-4">
          <div>
            <p className="text-[12px] text-muted-foreground">实付款</p>
            <p className="text-[22px] font-bold text-gold">¥{total}</p>
          </div>
          <GoldButton onClick={() => router.push("/shop/pay/success")} className="flex-1">
            提交订单
          </GoldButton>
        </div>
      </BottomBar>
    </AppShell>
  )
}

function Row({
  icon,
  label,
  value,
  valueClass,
  muted,
}: {
  icon?: React.ReactNode
  label: string
  value: string
  valueClass?: string
  muted?: boolean
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-[14px] text-muted-foreground">
        {icon && <span className="text-gold">{icon}</span>}
        {label}
      </span>
      <span className={`text-[14px] font-medium ${muted ? "text-muted-foreground" : "text-foreground"} ${valueClass ?? ""}`}>
        {value}
      </span>
    </div>
  )
}
