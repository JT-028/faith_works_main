"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import IntroLoader from "@/components/IntroLoader"

interface AppContextValue {
  ready: boolean
}

const AppContext = createContext<AppContextValue>({ ready: false })

export function AppProvider({ children }: { children: ReactNode }) {
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [showLoader])

  return (
    <AppContext value={{ ready: !showLoader }}>
      {showLoader && <IntroLoader onComplete={() => setShowLoader(false)} />}
      {children}
    </AppContext>
  )
}

export function useApp() {
  return useContext(AppContext)
}
