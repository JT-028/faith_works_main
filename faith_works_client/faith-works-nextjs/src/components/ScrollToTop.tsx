"use client"

import { usePathname } from "next/navigation"
import { useLayoutEffect } from "react"

export function ScrollToTop() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    const html = document.documentElement
    html.style.scrollBehavior = "auto"
    html.scrollTop = 0
    document.body.scrollTop = 0
    requestAnimationFrame(() => {
      html.style.scrollBehavior = ""
    })
  }, [pathname])

  return null
}
