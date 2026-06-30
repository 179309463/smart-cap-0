"use client"

import { use, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Share2, Star, ShieldCheck, Truck, RefreshCw, Check, Minus, Plus } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar, TopBarIconButton } from "@/components/top-bar"
import { Card, Badge } from "@/components/ui-kit"
import { products } from "@/lib/data"

const FEATURES = [
  { icon: <ShieldCheck className="h-4 w-4" />, text: "正品保障" },
  { icon: <Truck className="h-4 w-4" />, text: "顺丰包邮" },
  { icon: <RefreshCw className="h-4 w-4" />, text: "7 天无理由" },
]

const HIGHLIGHTS = ["温和控油，平衡水油", "适配 ScalpCare 护理仪导入", "无硅油配方，敏感头皮可用", "植物舒缓精萃，减少紧绷"]

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const product = products.find((p) => p.id === id) ?? products[0]
  const [qty, setQty] = useState(1)
  const [sheet, setSheet] = useState<null | "cart" | "buy">(null)

  return (
    <AppShell bottomSpace>
      <TopBar
        right={
          <TopBarIconButton label="分享">
            <Share2 className="h-5 w-5" />
          </TopBarIconButton>
        }
      />

      {/* 商品图 */}
      <div className="flex h-72 items-center justify-center bg-gradient-to-b from-[#f3ede2] to-background">
        <Image src={product.image} alt={product.name} width={200} height={200} className="object-contain" />
      </div>

      <div className="space-y-4 px-5">
        {/* 价格区 */}
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-[28px] font-bold text-gold">¥{product.price}</span>
            {product.originalPrice && (
              <span className="text-[14px] text-muted-foreground line-through">¥{product.originalPrice}</span>
            )}
            {product.tag && <Badge tone="gold">{product.tag}</Badge>}
          </div>
          <h1 className="mt-2 text-[18px] font-bold">{product.name}</h1>
          <p className="mt-1 text-[13px] text-muted-foreground">{product.subtitle}</p>
        </div>

        {/* 服务标签 */}
        <div className="flex items-center gap-4 rounded-2xl bg-card p-3">
          {FEATURES.map((f) => (
            <span key={f.text} className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <span className="text-gold">{f.icon}</span>
              {f.text}
            </span>
          ))}
        </div>

        {/* 评分 */}
        <Card className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <span className="text-[14px] font-semibold">4.9</span>
          </div>
          <span className="text-[13px] text-muted-foreground">2,381 条评价</span>
        </Card>

        {/* 产品亮点 */}
        <section>
          <h2 className="mb-3 text-[16px] font-semibold">产品亮点</h2>
          <Card className="space-y-3">
            {HIGHLIGHTS.map((h, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-soft text-green">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <p className="text-[14px]">{h}</p>
              </div>
            ))}
          </Card>
        </section>

        <div className="overflow-hidden rounded-3xl bg-[#f3ede2] p-5 text-center">
          <Image src={product.image} alt="详情" width={160} height={160} className="mx-auto object-contain" />
          <p className="mt-3 text-[13px] text-muted-foreground">实验室级配方 · 经皮肤科测试</p>
        </div>
      </div>

      {/* 底部操作 */}
      <div className="absolute bottom-0 left-0 right-0 z-20 flex items-center gap-3 border-t border-border bg-card px-5 pb-7 pt-3">
        <button
          type="button"
          onClick={() => setSheet("cart")}
          className="flex h-12 flex-1 items-center justify-center rounded-2xl border border-[#ece0cd] text-[15px] font-semibold text-gold"
        >
          加入购物袋
        </button>
        <button
          type="button"
          onClick={() => setSheet("buy")}
          className="btn-gold flex h-12 flex-1 items-center justify-center rounded-2xl text-[15px] font-semibold"
        >
          立即购买
        </button>
      </div>

      {/* 购买浮层 */}
      {sheet && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end" onClick={() => setSheet(null)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            className="relative rounded-t-3xl bg-card p-5 pb-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#f3ede2]">
                <Image src={product.image} alt={product.name} width={60} height={60} className="object-contain" />
              </div>
              <div>
                <p className="text-[20px] font-bold text-gold">¥{product.price}</p>
                <p className="mt-1 text-[12px] text-muted-foreground">{product.subtitle}</p>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-[14px] font-medium">数量</span>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f1ebe1]"
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
            </div>
            <button
              type="button"
              onClick={() => router.push(sheet === "buy" ? "/shop/pay/success" : "/shop/supply/confirm")}
              className="btn-gold mt-6 flex h-13 w-full items-center justify-center rounded-2xl py-4 text-[16px] font-semibold"
            >
              {sheet === "buy" ? "确认购买" : "加入购物袋"}
            </button>
          </div>
        </div>
      )}
    </AppShell>
  )
}
