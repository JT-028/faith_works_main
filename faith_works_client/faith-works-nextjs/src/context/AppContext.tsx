"use client"

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import IntroLoader from "@/components/IntroLoader"

interface AppContextValue {
  ready: boolean
}

const AppContext = createContext<AppContextValue>({ ready: false })

export function AppProvider({ children }: { children: ReactNode }) {
  const [showLoader, setShowLoader] = useState(true)
  const shellRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const shell = shellRef.current
    if (!shell) return

    if (showLoader) {
      shell.setAttribute("inert", "")
      shell.setAttribute("aria-hidden", "true")
    } else {
      shell.removeAttribute("inert")
      shell.removeAttribute("aria-hidden")
    }

    return () => {
      shell.removeAttribute("inert")
      shell.removeAttribute("aria-hidden")
    }
  }, [showLoader])

  return (
    <AppContext value={{ ready: !showLoader }}>
      {showLoader && <IntroLoader onComplete={() => setShowLoader(false)} />}
      <div ref={shellRef}>{children}</div>
    </AppContext>
  )
}

export function useApp() {
  return useContext(AppContext)
}
