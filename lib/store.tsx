"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type AppState = {
  deviceBound: boolean
  deviceOnline: boolean
  battery: number
  liquidLevel: number
  setDeviceBound: (v: boolean) => void
  setDeviceOnline: (v: boolean) => void
}

const AppContext = createContext<AppState | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [deviceBound, setDeviceBound] = useState(true)
  const [deviceOnline, setDeviceOnline] = useState(true)
  const [battery] = useState(78)
  const [liquidLevel] = useState(32)

  return (
    <AppContext.Provider
      value={{ deviceBound, deviceOnline, battery, liquidLevel, setDeviceBound, setDeviceOnline }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error("useApp must be used within AppProvider")
  return ctx
}
