'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Phone, ShieldCheck } from 'lucide-react'
import { AppShell } from '@/components/app-shell'
import { GoldButton } from '@/components/ui-kit'

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [sent, setSent] = useState(false)

  return (
    <AppShell>
      <div className="flex min-h-dvh flex-col px-6 pb-8 pt-16">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#fbefe0] to-[#f3e2c9]">
            <Image src="/device.png" alt="logo" width={56} height={56} className="h-14 w-14 object-contain" />
          </div>
          <h1 className="text-[24px] font-bold">欢迎使用 ScalpCare</h1>
          <p className="mt-2 text-[14px] text-muted-foreground">登录以管理你的头皮护理之旅</p>
        </div>

        <div className="space-y-4">
          <label className="flex items-center gap-3 rounded-2xl border border-[#ece0cd] bg-white px-4 py-4">
            <Phone className="h-5 w-5 text-muted-foreground" />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              inputMode="numeric"
              placeholder="请输入手机号"
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            />
          </label>
          <div className="flex items-center gap-3 rounded-2xl border border-[#ece0cd] bg-white px-4 py-4">
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              inputMode="numeric"
              placeholder="请输入验证码"
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
            />
            <button
              type="button"
              onClick={() => setSent(true)}
              className="text-[13px] font-medium text-gold"
            >
              {sent ? '60s 后重发' : '获取验证码'}
            </button>
          </div>
        </div>

        <label className="mt-5 flex items-start gap-2 text-[12px] leading-relaxed text-muted-foreground">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-[#bd8b30]"
          />
          <span>
            我已阅读并同意
            <span className="text-gold">《用户协议》</span>和
            <span className="text-gold">《隐私政策》</span>
          </span>
        </label>

        <div className="mt-8">
          <GoldButton onClick={() => router.push('/bind/permissions')}>登录 / 注册</GoldButton>
        </div>

        <button
          type="button"
          onClick={() => router.push('/bind/permissions')}
          className="mt-4 text-center text-[13px] text-muted-foreground"
        >
          其他方式登录
        </button>
      </div>
    </AppShell>
  )
}
