'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, ShoppingBag, TriangleAlert, ChevronRight } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { BottomTab } from '@/components/bottom-tab'
import { Card, Badge } from '@/components/ui-kit'
import { products } from '@/lib/data'

const CATEGORIES = ['全部', '护理液', '耗材', '护发', '配件']

export default function ShopPage() {
  return (
    <AppShell bottomSpace>
      <header className="px-5 pb-1 pt-5">
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] font-bold">优选商城</h1>
          <Link
            href="/shop/supply/confirm"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#efe7db] text-[#5c5145]"
            aria-label="购物袋"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>
        </div>
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-sm">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="搜索护理液、耗材"
            className="flex-1 bg-transparent text-[14px] outline-none placeholder:text-muted-foreground"
          />
        </div>
      </header>

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 py-3">
        {CATEGORIES.map((c, i) => (
          <button
            key={c}
            type="button"
            className={`shrink-0 rounded-full px-4 py-1.5 text-[13px] ${
              i === 0 ? 'bg-gold text-white' : 'bg-white text-muted-foreground'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="space-y-4 px-5">
        <Link href="/shop/supply" className="block">
          <div className="flex items-center gap-3 rounded-3xl border border-[#f3d9c8] bg-[#fdf1e8] p-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-chip-orange text-chip-orange-fg">
              <TriangleAlert className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-[14px] font-medium">护理液余量不足</p>
              <p className="text-[12px] text-muted-foreground">基于使用频率为你智能补给</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-4">
          {products.map((p) => (
            <Link key={p.id} href={`/shop/product/${p.id}`}>
              <Card className="p-3">
                <div className="relative flex h-32 items-center justify-center rounded-2xl bg-[#faf6ef]">
                  <Image src={p.image} alt={p.name} width={96} height={96} className="h-24 w-24 object-contain" />
                  {p.tag && (
                    <span className="absolute left-2 top-2">
                      <Badge tone="gold">{p.tag}</Badge>
                    </span>
                  )}
                </div>
                <p className="mt-3 line-clamp-1 text-[14px] font-medium">{p.name}</p>
                <p className="mt-0.5 line-clamp-1 text-[12px] text-muted-foreground">{p.subtitle}</p>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-[16px] font-bold text-gold">¥{p.price}</span>
                  {p.originalPrice && (
                    <span className="text-[12px] text-muted-foreground line-through">¥{p.originalPrice}</span>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <BottomTab active="/shop" />
    </AppShell>
  )
}
