"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Zap, RefreshCw, ImageIcon, Check, AlertCircle } from "lucide-react"
import { AppShell } from "@/components/app-shell"
import { TopBar } from "@/components/top-bar"

export default function ShootPage() {
  const router = useRouter()
  // captured: 拍摄后预览（含重拍）; 质量不合格提示
  const [captured, setCaptured] = useState(false)
  const [lowQuality, setLowQuality] = useState(false)

  const capture = () => {
    // 模拟：随机一次质量不合格以演示重拍
    const ok = Math.random() > 0.35
    setCaptured(true)
    setLowQuality(!ok)
  }

  const retake = () => {
    setCaptured(false)
    setLowQuality(false)
  }

  return (
    <AppShell dark>
      <TopBar title="头皮拍摄" dark close onBack={() => router.push("/detect")} />

      {/* 取景区 */}
      <div className="relative mx-5 mt-2 aspect-[3/4] overflow-hidden rounded-[28px] bg-[#0f0c0a]">
        {/* 模拟头皮纹理背景 */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, #5b463099 0%, #2a1f15 55%, #100c08 100%)",
          }}
        />
        {/* 对焦框 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`h-44 w-44 rounded-full border-2 ${
              captured && !lowQuality ? "border-green" : lowQuality ? "border-danger" : "border-white/70"
            }`}
          />
        </div>

        {/* 顶部提示 */}
        <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-black/40 px-4 py-1.5 text-[12px] text-white/90 backdrop-blur">
          {captured
            ? lowQuality
              ? "图像模糊，请重新拍摄"
              : "拍摄成功"
            : "将对焦框对准头皮区域"}
        </div>

        {/* 状态角标 */}
        {captured && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <span
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-[13px] font-medium ${
                lowQuality ? "bg-danger text-white" : "bg-green text-white"
              }`}
            >
              {lowQuality ? <AlertCircle className="h-4 w-4" /> : <Check className="h-4 w-4" />}
              {lowQuality ? "质量不合格" : "质量合格"}
            </span>
          </div>
        )}
      </div>

      {/* 控制区 */}
      <div className="px-6 pt-8">
        {!captured ? (
          <div className="flex items-center justify-between">
            <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
              <Zap className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={capture}
              aria-label="拍摄"
              className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/30"
            >
              <span className="h-16 w-16 rounded-full bg-white" />
            </button>
            <button type="button" className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white">
              <ImageIcon className="h-5 w-5" />
            </button>
          </div>
        ) : lowQuality ? (
          <button
            type="button"
            onClick={retake}
            className="btn-gold flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-[16px] font-semibold"
          >
            <RefreshCw className="h-5 w-5" /> 重新拍摄
          </button>
        ) : (
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => router.push("/detect/analyzing")}
              className="btn-gold flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-[16px] font-semibold"
            >
              <Check className="h-5 w-5" /> 使用这张，开始分析
            </button>
            <button
              type="button"
              onClick={retake}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white/10 text-[15px] font-medium text-white"
            >
              <RefreshCw className="h-4 w-4" /> 重拍
            </button>
          </div>
        )}
      </div>
    </AppShell>
  )
}
