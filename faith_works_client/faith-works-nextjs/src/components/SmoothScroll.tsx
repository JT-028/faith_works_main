"use client"

import { ReactNode, useEffect, useRef } from "react"
import Lenis from "lenis"
import { usePathname, useSearchParams } from "next/navigation"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lenisRef = useRef<Lenis | null>(null)
  const isHomePage = pathname === "/"

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: isHomePage ? 0.55 : 0.85,
      easing: isHomePage ? (t) => 1 - Math.pow(1 - t, 3) : (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: isHomePage,
      wheelMultiplier: 1,
      touchMultiplier: isHomePage ? 1 : 1.5,
    })

    lenisRef.current = lenis
    lenis.on("scroll", ScrollTrigger.update)

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(updateLenis)

    gsap.ticker.lagSmoothing(0)

    // Force top scroll on page load
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)
    lenis.scrollTo(0, { immediate: true })

    const handleCustomReset = () => {
      // Temporarily halt lenis to clear inertia, then force scroll to 0
      lenis.stop()
      lenis.scrollTo(0, { immediate: true, force: true })
      window.scrollTo(0, 0)
      lenis.start()
    }
    window.addEventListener("fw-reset-scroll", handleCustomReset)

    return () => {
      window.removeEventListener("fw-reset-scroll", handleCustomReset)
      gsap.ticker.remove(updateLenis)
      lenisRef.current = null
      lenis.destroy()
    }
  }, [isHomePage])

  // Reset scroll on route change explicitly (safety backup to fw-reset-scroll)
  useEffect(() => {
    if (lenisRef.current) {
      // Force scroll reset across the next few frames to outrun Next.js's internal router reconciliation
      lenisRef.current.stop()
      window.scrollTo(0, 0)
      
      requestAnimationFrame(() => {
        if (!lenisRef.current) return
        lenisRef.current.scrollTo(0, { immediate: true, force: true })
        window.scrollTo(0, 0)
        
        setTimeout(() => {
          if (!lenisRef.current) return
          lenisRef.current.scrollTo(0, { immediate: true, force: true })
          window.scrollTo(0, 0)
          lenisRef.current.start()
        }, 50)
      })
    } else {
      window.scrollTo(0, 0)
    }
  }, [pathname, searchParams])

  return <>{children}</>
}

