"use client"

import { useEffect, useRef, useCallback } from "react"
import { usePathname, useRouter } from "next/navigation"
import gsap from "gsap"

/* ─── CSS ─────────────────────────────────────────────────────────────────── */
const TRANSITION_CSS = `
  .fw-page-transition {
    position: fixed;
    inset: 0;
    z-index: 9998;
    pointer-events: none;
    overflow: hidden;
  }

  /* Primary wipe panel — brand gradient */
  .fw-wipe-panel {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #EFACBA 0%, #f8d878 55%, #FCE82A 100%);
    transform: translateY(100%);
    will-change: transform;
  }

  /* Secondary accent panel — slightly offset timing */
  .fw-wipe-accent {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, #FCE82A 0%, #EFACBA 100%);
    transform: translateY(100%);
    opacity: 0.55;
    will-change: transform;
  }

  /* Logo centred over the panels */
  .fw-wipe-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.85);
    opacity: 0;
    will-change: transform, opacity;
    pointer-events: none;
  }
  .fw-wipe-logo img {
    height: clamp(40px, 6vw, 64px);
    width: auto;
    display: block;
  }

  /* Thin progress stripe at the bottom of the panel */
  .fw-progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: rgba(12,9,10,0.22);
    width: 0%;
    will-change: width;
  }

  /*
   * KEY FIX: while a transition is in flight the page's <main> is
   * immediately invisible via CSS so the new route can render underneath
   * the covering panels without any flash.
   */
  body.fw-transitioning main {
    opacity: 0 !important;
    pointer-events: none !important;
  }
`

export default function PageTransition() {
  const pathname = usePathname()
  const router = useRouter()
  const panelRef    = useRef<HTMLDivElement>(null)
  const accentRef   = useRef<HTMLDivElement>(null)
  const logoRef     = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Guards
  const isAnimatingRef    = useRef(false)
  const animateOutDoneRef = useRef(false)
  const safetyTimerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const prevPathnameRef   = useRef(pathname)

  /* ── Inject CSS client-side only — prevents SSR hydration mismatch ── */
  useEffect(() => {
    const id = "fw-transition-styles"
    if (document.getElementById(id)) return
    const tag = document.createElement("style")
    tag.id = id
    tag.textContent = TRANSITION_CSS
    document.head.appendChild(tag)
    return () => { document.getElementById(id)?.remove() }
  }, [])

  /* ── Animate panels OFF screen + reveal new page ── */
  const animateOut = useCallback(() => {
    // Guard: only run once per transition
    if (animateOutDoneRef.current) return
    animateOutDoneRef.current = true

    // Clear the safety timer — we're already handling the exit
    if (safetyTimerRef.current) {
      clearTimeout(safetyTimerRef.current)
      safetyTimerRef.current = null
    }

    const panel    = panelRef.current
    const accent   = accentRef.current
    const logo     = logoRef.current
    const progress = progressRef.current
    if (!panel || !accent || !logo || !progress) return

    // Immediately reset scroll to top using custom event for our SmoothScroll wrapper
    window.dispatchEvent(new CustomEvent("fw-reset-scroll"))
    window.scrollTo({ top: 0, behavior: "instant" })

    const tl = gsap.timeline({
      onComplete: () => {
        const main = document.querySelector("main")

        // FIX FLICKER: pin main to opacity:0 via inline style BEFORE removing
        // the CSS class. Removing the class would otherwise lift opacity:0 for
        // one paint frame before the fromTo can start.
        if (main) gsap.set(main, { opacity: 0, y: 28 })

        // Now safe to remove the class — inline style holds opacity:0
        document.body.classList.remove("fw-transitioning")

        // Reset panels off-screen (invisible, below viewport)
        gsap.set([panel, accent], { y: "100%" })
        gsap.set(logo,     { opacity: 0, scale: 0.85 })
        gsap.set(progress, { width: "0%" })

        isAnimatingRef.current    = false
        animateOutDoneRef.current = false

        // Fade new page content in — inline style already at opacity:0 so no jump
        if (main) {
          gsap.to(main, { opacity: 1, y: 0, duration: 0.65, ease: "power3.out" })
        }
      },
    })

    tl.to(logo,   { opacity: 0, scale: 0.9, duration: 0.2,  ease: "power2.in" })
    tl.to(panel,  { y: "-100%", duration: 0.55, ease: "power3.inOut" }, "-=0.05")
    tl.to(accent, { y: "-100%", duration: 0.5,  ease: "power3.inOut" }, "-=0.45")
  }, [])

  /* ── Watch pathname: when Next.js completes navigation → animate out ── */
  useEffect(() => {
    if (pathname === prevPathnameRef.current) return
    prevPathnameRef.current = pathname
    // Only kick the exit animation when WE triggered this transition
    if (isAnimatingRef.current) {
      animateOut()
    }
  }, [pathname, animateOut])

  /* ── Full in-animation: covers screen, then pushes route ── */
  const runTransition = useCallback(async (href: string) => {
    if (isAnimatingRef.current) return
    if (href === pathname) return

    isAnimatingRef.current    = true
    animateOutDoneRef.current = false

    // Immediately hide main via CSS class — zero chance of a flash
    document.body.classList.add("fw-transitioning")

    const panel    = panelRef.current
    const accent   = accentRef.current
    const logo     = logoRef.current
    const progress = progressRef.current

    if (!panel || !accent || !logo || !progress) {
      document.body.classList.remove("fw-transitioning")
      router.push(href)
      isAnimatingRef.current = false
      return
    }

    // Cover animation: panels slide up from bottom
    const tl = gsap.timeline()
    tl.to(accent, { y: 0, duration: 0.5,  ease: "power3.inOut" })
    tl.to(panel,  { y: 0, duration: 0.45, ease: "power3.inOut" }, "-=0.35")

    // Panels must fully cover before we push the new route
    await tl.then()

    // Dispatch scroll reset immediately while the screen is completely covered
    window.dispatchEvent(new CustomEvent("fw-reset-scroll"))
    window.scrollTo({ top: 0, behavior: "instant" })
    
    // Logo + progress bar appear on the solid panel
    gsap.to(logo,     { opacity: 1, scale: 1, duration: 0.3,  ease: "back.out(1.5)" })
    gsap.to(progress, { width: "100%",         duration: 0.45, ease: "power2.inOut" })

    // Push route — new page renders silently underneath the covering panels
    router.push(href, { scroll: true })

    // Safety valve stored in a ref so animateOut can cancel it
    safetyTimerRef.current = setTimeout(() => {
      if (isAnimatingRef.current) animateOut()
    }, 3000)
  }, [pathname, router, animateOut])

  /* ── Intercept all internal link clicks (capture phase — fires first) ── */
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a")
      if (!link) return
      if (link.target === "_blank") return
      if (link.hasAttribute("download")) return

      const href = link.getAttribute("href")
      if (!href) return
      if (href.startsWith("#")) return
      if (href.startsWith("http") && !href.includes(window.location.host)) return
      if (href.startsWith("mailto:") || href.startsWith("tel:")) return
      if (href === pathname) return

      e.preventDefault()
      // stopImmediatePropagation prevents Next.js Link's own handler from also firing
      e.stopImmediatePropagation()
      runTransition(href)
    }

    // capture: true — fires before React/Next link handlers
    document.addEventListener("click", handleClick, { capture: true })
    return () => document.removeEventListener("click", handleClick, { capture: true })
  }, [pathname, runTransition])

  return (
    <>
      <div className="fw-page-transition" aria-hidden="true">
        <div ref={accentRef} className="fw-wipe-accent" />
        <div ref={panelRef} className="fw-wipe-panel">
          <div ref={logoRef} className="fw-wipe-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/faithworks-black.png" alt="" />
          </div>
          <div ref={progressRef} className="fw-progress-bar" />
        </div>
      </div>
    </>
  )
}
