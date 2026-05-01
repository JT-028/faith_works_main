"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { num: "01", href: "/",          label: "Home" },
  { num: "02", href: "/about",     label: "About Faith" },
  { num: "03", href: "/programs",  label: "Programs" },
  { num: "04", href: "/community", label: "Community" },
  { num: "05", href: "/events",    label: "Events" },
  { num: "06", href: "/media",     label: "Media" },
]

const DESKTOP_UTILITY_LINKS = [
  { href: "/programs", label: "Accelerator Enrollment LP" },
  { href: "/events", label: "AI Workshop Registration LP" },
  { href: "/media", label: "Lead Magnet Download LP" },
  { href: "/speaking", label: "Keynote / Speaking Inquiry LP" },
]

const OVERLAY_CSS = `
  /* ── Overlay: circle-reveal from top-right button ── */
  .fw-overlay {
    position: fixed;
    inset: 0;
    z-index: 48;
    background:
      radial-gradient(circle at 10% 80%, rgba(239,172,186,0.22) 0%, transparent 45%),
      radial-gradient(circle at 90% 10%, rgba(252,232,42,0.14), transparent 40%),
      linear-gradient(160deg, #FAFAF7 0%, #fcf0f2 60%, #FAFAF7 100%);
    /* Default (mobile): button center ≈ calc(100% - 48px), 40px */
    --bx: calc(100% - 48px);
    --by: 40px;
    clip-path: circle(0px at var(--bx) var(--by));
    transition: clip-path 0.9s cubic-bezier(0.77, 0, 0.18, 1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 0 8vw;
    overflow: hidden;
    pointer-events: none;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  .fw-overlay::-webkit-scrollbar { display: none; }
  /* Desktop: button shifts due to wider padding */
  @media (min-width: 1024px) {
    .fw-overlay { --bx: calc(100% - 72px); }
  }
  .fw-overlay.open {
    clip-path: circle(180% at var(--bx) var(--by));
    pointer-events: auto;
  }

  /* ── Nav item row: number + link ── */
  .fw-nav-item {
    overflow: hidden;
    padding: 0.2rem 0;
  }
  .fw-nav-row {
    display: flex;
    align-items: baseline;
    gap: 1.25rem;
    transform: translateY(110%);
    opacity: 0;
    transition:
      transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
      opacity   0.65s ease;
  }
  .fw-overlay.open .fw-nav-row { transform: translateY(0); opacity: 1; }

  /* stagger */
  .fw-overlay.open .fw-nav-item:nth-child(1) .fw-nav-row { transition-delay: 0.18s; }
  .fw-overlay.open .fw-nav-item:nth-child(2) .fw-nav-row { transition-delay: 0.25s; }
  .fw-overlay.open .fw-nav-item:nth-child(3) .fw-nav-row { transition-delay: 0.32s; }
  .fw-overlay.open .fw-nav-item:nth-child(4) .fw-nav-row { transition-delay: 0.39s; }
  .fw-overlay.open .fw-nav-item:nth-child(5) .fw-nav-row { transition-delay: 0.46s; }
  .fw-overlay.open .fw-nav-item:nth-child(6) .fw-nav-row { transition-delay: 0.53s; }

  /* Item number */
  .fw-nav-num {
    font-size: clamp(0.6rem, 0.9vw, 0.75rem);
    font-weight: 500;
    color: #0c090a;
    opacity: 0.38;
    letter-spacing: 0.1em;
    padding-bottom: 0.25em;
    flex-shrink: 0;
    line-height: 1;
  }

  /* Link label */
  .fw-nav-link {
    font-size: clamp(2.6rem, 6.5vw, 6.5rem);
    font-weight: 700;
    letter-spacing: -0.03em;
    line-height: 0.95;
    color: rgba(12,9,10,0.8);
    text-decoration: none;
    position: relative;
    transition: color 0.22s ease;
  }
  .fw-nav-link:hover  { color: #EFACBA; }
  .fw-nav-link.active { color: #EFACBA; }

  /* Deep-rose underline on hover / active */
  .fw-nav-link::after {
    content: '';
    position: absolute;
    left: 0; bottom: -5px;
    width: 0; height: 3px;
    background: #EFACBA;
    border-radius: 2px;
    transition: width 0.35s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .fw-nav-link:hover::after,
  .fw-nav-link.active::after { width: 100%; }

  /* ── CTA button inside overlay ── */
  .fw-overlay-cta {
    margin-top: 2.75rem;
    transform: translateY(36px);
    opacity: 0;
    transition:
      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.52s,
      opacity   0.6s ease                             0.52s;
  }
  .fw-overlay.open .fw-overlay-cta { transform: translateY(0); opacity: 1; }

  /* ── Bottom tagline row ── */
  .fw-overlay-footer {
    position: absolute;
    bottom: 2.5rem;
    left: 8vw; right: 8vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateY(20px);
    opacity: 0;
    transition:
      transform 0.5s ease 0.58s,
      opacity   0.5s ease 0.58s;
  }
  .fw-overlay.open .fw-overlay-footer { transform: translateY(0); opacity: 1; }
  .fw-overlay-footer span {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(12,9,10,0.32);
    font-weight: 500;
  }

  /* ── Decorative watermark ── */
  .fw-watermark {
    position: absolute;
    right: -3%;
    bottom: -8%;
    font-size: clamp(8rem, 24vw, 24rem);
    font-weight: 700;
    letter-spacing: -0.06em;
    color: rgba(12,9,10,0.045);
    user-select: none;
    pointer-events: none;
    line-height: 1;
    white-space: nowrap;
  }

  /* ── Pink accent line left ── */
  .fw-overlay-accent {
    position: absolute;
    left: 0; top: 15%; bottom: 15%;
    width: 3px;
    background: linear-gradient(to bottom, transparent, #b83050 30%, #a0240e 70%, transparent);
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center;
    transition:
      opacity   0.5s ease 0.3s,
      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.3s;
    border-radius: 2px;
  }
  .fw-overlay.open .fw-overlay-accent { opacity: 1; transform: scaleY(1); }

  @keyframes fw-burger-drift {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(4px); }
  }

  .fw-desktop-burger {
    display: inline-flex;
    flex-direction: column;
    gap: 0.38rem;
    color: currentColor;
  }

  .fw-desktop-burger-bar {
    display: block;
    height: 2px;
    width: 1.7rem;
    border-radius: 999px;
    background: currentColor;
    transform-origin: left center;
    transition: transform 0.24s ease, opacity 0.2s ease, width 0.24s ease;
  }

  .fw-desktop-burger:not(.is-open) .fw-desktop-burger-bar:first-child {
    animation: fw-burger-drift 2.8s ease-in-out infinite;
  }

  .fw-desktop-burger:not(.is-open) .fw-desktop-burger-bar:last-child {
    animation: fw-burger-drift 2.8s ease-in-out infinite 0.18s;
  }

  .fw-desktop-burger.is-open .fw-desktop-burger-bar:last-child {
    opacity: 0;
    transform: scaleX(0.35);
  }

  .fw-desktop-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: auto;
    height: 75vh;
    min-height: 75vh;
    width: 100vw;
    z-index: 55;
    pointer-events: none;
    visibility: hidden;
    overflow: hidden;
    border-radius: 0;
    box-shadow: none;
    transition: visibility 0.8s ease; 
  }

  .fw-nav-wipe {
    position: absolute;
    inset: 0;
    transform: translateY(-100%);
    will-change: transform;
  }

  .fw-nav-wipe-1 {
    background: linear-gradient(135deg, #EFACBA 0%, #f8d878 55%, #FCE82A 100%);
    z-index: 1;
    transition: transform 0.5s cubic-bezier(0.7, 0, 0.3, 1) 0.15s;
  }

  .fw-nav-wipe-2 {
    background: linear-gradient(135deg, #FCE82A 0%, #EFACBA 100%);
    z-index: 2;
    transition: transform 0.5s cubic-bezier(0.7, 0, 0.3, 1) 0.05s;
  }

  .fw-nav-wipe-bg {
    background: linear-gradient(160deg, #FAFAF7 0%, #fcf0f2 60%, #FAFAF7 100%);
    z-index: 3;
    transition: transform 0.5s cubic-bezier(0.7, 0, 0.3, 1) 0s;
  }

  .fw-nav-wipe-bg::before {
    content: '';
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at 10% 80%, rgba(239,172,186,0.18) 0%, transparent 42%),
      radial-gradient(circle at 90% 10%, rgba(252,232,42,0.12), transparent 38%);
    opacity: 1;
  }

  .fw-desktop-overlay.open {
    pointer-events: auto;
    visibility: visible;
  }

  .fw-desktop-overlay.open .fw-nav-wipe {
    transform: translateY(0);
  }

  .fw-desktop-overlay.open .fw-nav-wipe-1 {
    transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0s;
  }
  
  .fw-desktop-overlay.open .fw-nav-wipe-2 {
    transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.08s;
  }

  .fw-desktop-overlay.open .fw-nav-wipe-bg {
    transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.16s;
  }

  .fw-desktop-panel {
    position: relative;
    z-index: 4;
    display: grid;
    grid-template-columns: minmax(220px, 0.8fr) minmax(400px, 1.15fr);
    gap: clamp(2rem, 4vw, 4rem);
    align-items: start;
    max-width: 1440px;
    margin: 0 auto;
    padding: 6.6rem clamp(2.5rem, 4vw, 4rem) 2.25rem;
  }

  .fw-desktop-side,
  .fw-desktop-main {
    position: relative;
    z-index: 1;
    transform: translateY(-30px);
    opacity: 0;
    transition:
      transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
      opacity 0.45s ease;
  }

  .fw-desktop-overlay.open .fw-desktop-side,
  .fw-desktop-overlay.open .fw-desktop-main {
    transform: translateY(0);
    opacity: 1;
  }

  .fw-desktop-overlay.open .fw-desktop-side { transition-delay: 0.28s; }
  .fw-desktop-overlay.open .fw-desktop-main { transition-delay: 0.36s; }

  .fw-desktop-side {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 1.4rem;
    padding-left: 1.5rem;
  }

  .fw-desktop-side::before {
    content: '';
    position: absolute;
    left: 0;
    top: 1.8rem;
    bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, rgba(12,9,10,0.22), rgba(12,9,10,0.04));
  }

  .fw-side-group {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  .fw-side-label,
  .fw-side-footer {
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(12,9,10,0.45);
  }

  .fw-side-copy {
    max-width: 19rem;
    font-size: clamp(0.95rem, 1.2vw, 1.18rem);
    line-height: 1.4;
    color: rgba(12,9,10,0.82);
  }

  .fw-side-links {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .fw-side-link {
    width: fit-content;
    color: rgba(12,9,10,0.78);
    font-size: clamp(1rem, 1.05vw, 1.15rem);
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s ease, transform 0.25s ease;
  }

  .fw-side-link:hover,
  .fw-side-link:focus-visible {
    color: #b83050;
    transform: translateX(6px);
  }

  .fw-desktop-main {
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .fw-desktop-main nav {
    width: min(100%, 40rem);
  }

  .fw-desktop-main ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .fw-desktop-item + .fw-desktop-item {
    margin-top: 0.5rem;
  }

  .fw-desktop-link {
    position: relative;
    display: inline-flex;
    align-items: baseline;
    gap: 0.75rem;
    font-size: clamp(2.9rem, 4.8vw, 5rem);
    line-height: 0.94;
    font-weight: 600;
    letter-spacing: -0.06em;
    color: rgba(12,9,10,0.82);
    text-decoration: none;
    transition: color 0.24s ease, transform 0.28s ease;
  }

  .fw-desktop-link:hover,
  .fw-desktop-link:focus-visible,
  .fw-desktop-link.active {
    color: #EFACBA;
    transform: translateX(10px);
  }

  .fw-desktop-link::after {
    content: '↗';
    font-size: 0.22em;
    letter-spacing: 0;
    transform: translateY(-0.6em);
    opacity: 0;
    transition: opacity 0.2s ease, transform 0.28s ease;
  }

  .fw-desktop-link:hover::after,
  .fw-desktop-link:focus-visible::after,
  .fw-desktop-link.active::after {
    opacity: 1;
    transform: translate(0.05em, -0.8em);
  }

  .fw-desktop-link .fw-desktop-num {
    font-size: 0.18em;
    font-weight: 500;
    letter-spacing: 0.08em;
    opacity: 0.55;
  }

  .fw-desktop-footer {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    padding-top: 1.4rem;
    color: rgba(12,9,10,0.38);
    font-size: 0.8rem;
  }

  @media (max-width: 1023px) {
    .fw-desktop-overlay {
      display: none;
    }
  }

  /* Ensure mobile overlay is never rendered at desktop breakpoints */
  @media (min-width: 1024px) {
    .fw-overlay {
      display: none !important;
    }
  }

  @media (max-height: 840px) {
    .fw-desktop-panel {
      padding-top: 4.5rem;
      padding-bottom: 1.5rem;
    }

    .fw-desktop-link {
      font-size: clamp(2.4rem, 4.1vw, 4.25rem);
    }

    .fw-desktop-footer {
      padding-top: 1rem;
    }
  }
`

function DesktopMenuButton({ isOpen }: { isOpen: boolean }) {
  return (
    <>
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      <span
        className={cn("fw-desktop-burger hidden lg:inline-flex", isOpen && "is-open")}
        aria-hidden="true"
      >
        <span className="fw-desktop-burger-bar" />
        <span className="fw-desktop-burger-bar" />
      </span>
      <span className="hidden lg:block text-sm font-medium tracking-tight leading-none">
        {isOpen ? "Close" : ""}
      </span>
    </>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDesktopNavVisible, setIsDesktopNavVisible] = useState(true)
  const mobileOverlayRef = useRef<HTMLDivElement>(null)
  const desktopOverlayRef = useRef<HTMLDivElement>(null)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)
  const shouldRestoreFocusRef = useRef(false)
  const lastScrollYRef = useRef(0)
  const scrollLockYRef = useRef(0)
  const hasLockedScrollRef = useRef(false)
  const justClosedRef = useRef(false)

  function closeMenu(restoreFocus: boolean) {
    shouldRestoreFocusRef.current = restoreFocus
    setIsOpen(false)
    justClosedRef.current = true
    setTimeout(() => { justClosedRef.current = false }, 400)
  }

  function toggleMenu() {
    if (isOpen) {
      closeMenu(true)
      return
    }

    shouldRestoreFocusRef.current = false
    setIsOpen(true)
  }

  // Close on route change
  useEffect(() => {
    if (!isOpen) return
    closeMenu(false)
  }, [pathname])

  // Scroll detection + desktop hide/show behavior.
  useEffect(() => {
    lastScrollYRef.current = window.scrollY
    setIsScrolled(window.scrollY > 20)
    setIsDesktopNavVisible(true)

    function onScroll() {
      const currentScrollY = window.scrollY
      const delta = currentScrollY - lastScrollYRef.current

      setIsScrolled(currentScrollY > 20)

      if (window.innerWidth >= 1024) {
        if (isOpen || currentScrollY < 24 || delta < -6) {
          setIsDesktopNavVisible(true)
        } else if (delta > 8 && !justClosedRef.current) {
          setIsDesktopNavVisible(false)
        }
      } else {
        setIsDesktopNavVisible(true)
      }

      lastScrollYRef.current = currentScrollY
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      setIsDesktopNavVisible(true)
    }
  }, [isOpen])

  // Body scroll lock — covers iOS Safari + Android
  useEffect(() => {
    const html = document.documentElement
    const { body } = document
    const shellNodes = Array.from(document.querySelectorAll<HTMLElement>("main, footer"))

    if (isOpen) {
      hasLockedScrollRef.current = true
      scrollLockYRef.current = window.scrollY
      html.style.overflow = "hidden"
      body.style.overflow = "hidden"
      body.style.position = "fixed"
      body.style.inset = "0"
      body.style.top = `-${scrollLockYRef.current}px`
      body.style.touchAction = "none"
      shellNodes.forEach((node) => node.setAttribute("inert", ""))
    } else {
      html.style.overflow = ""
      body.style.overflow = ""
      body.style.position = ""
      body.style.inset = ""
      body.style.top = ""
      body.style.touchAction = ""
      shellNodes.forEach((node) => node.removeAttribute("inert"))

      if (hasLockedScrollRef.current) {
        window.scrollTo({ top: scrollLockYRef.current, behavior: "instant" })
        hasLockedScrollRef.current = false
      }
    }

    return () => {
      html.style.overflow = ""
      body.style.overflow = ""
      body.style.position = ""
      body.style.inset = ""
      body.style.top = ""
      body.style.touchAction = ""
      shellNodes.forEach((node) => node.removeAttribute("inert"))
    }
  }, [isOpen])

  // Escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        closeMenu(true)
        return
      }

      if (e.key !== "Tab" || !isOpen) return

      const activeOverlay = window.innerWidth >= 1024 ? desktopOverlayRef.current : mobileOverlayRef.current
      if (!activeOverlay) return

      const focusableItems = Array.from(
        activeOverlay.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      )

      if (focusableItems.length === 0) return

      const firstItem = focusableItems[0]
      const lastItem = focusableItems[focusableItems.length - 1]
      const activeElement = document.activeElement as HTMLElement | null

      if (e.shiftKey && activeElement === firstItem) {
        e.preventDefault()
        lastItem.focus()
      } else if (!e.shiftKey && activeElement === lastItem) {
        e.preventDefault()
        firstItem.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)")

    function handleBreakpointChange() {
      closeMenu(false)
    }

    mediaQuery.addEventListener("change", handleBreakpointChange)
    return () => mediaQuery.removeEventListener("change", handleBreakpointChange)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      if (shouldRestoreFocusRef.current) {
        lastFocusedElementRef.current?.focus?.()
      }
      shouldRestoreFocusRef.current = false
      return
    }

    lastFocusedElementRef.current = document.activeElement as HTMLElement | null

    const activeOverlay = window.innerWidth >= 1024 ? desktopOverlayRef.current : mobileOverlayRef.current
    const firstFocusable = activeOverlay?.querySelector<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    firstFocusable?.focus()
  }, [isOpen])

  const mobileLogoSrc = isScrolled && !isOpen
    ? "/images/faithworks.png"
    : "/images/faithworks-black.png"

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: OVERLAY_CSS }} />

      <header className="fixed inset-x-0 top-0 z-[60]">
        <div className="mx-auto max-w-[var(--container-max)] px-4 pt-4 lg:hidden lg:px-0 lg:pt-0">
          <div
            className={cn(
              "flex items-center justify-between rounded-[22px] px-4 py-3 transition-all duration-300",
              isOpen
                ? "bg-transparent text-brand-dark"
                : isScrolled
                ? "border border-white/55 bg-white/70 text-brand-dark shadow-[0_18px_40px_rgba(12,9,10,0.08)] backdrop-blur-2xl"
                : "bg-white/40 text-brand-dark backdrop-blur-xl"
            )}
          >
            <Link
              href="/"
              aria-label="Faith Works Home"
              aria-hidden={isOpen}
              className="relative z-[52]"
              data-navbar-logo-anchor
            >
              <Image
                src={mobileLogoSrc}
                alt="Faith Works"
                width={150}
                height={60}
                className="h-10 w-auto object-contain transition-all duration-300"
                tabIndex={isOpen ? -1 : 0}
                priority
              />
            </Link>

            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="fw-nav-overlay"
              className={cn(
                "relative z-[52] flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300",
                isOpen
                  ? "bg-brand-dark/8 text-brand-dark hover:bg-brand-dark/14"
                  : isScrolled
                  ? "bg-brand-pink/12 text-brand-dark hover:bg-brand-pink/22"
                  : "bg-black/6 text-brand-dark hover:bg-black/12"
              )}
            >
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-all duration-300",
                  isOpen ? "rotate-45" : "-translate-y-[4px]"
                )}
                aria-hidden="true"
              />
              <span
                className={cn(
                  "absolute h-px w-5 bg-current transition-all duration-300",
                  isOpen ? "-rotate-45" : "translate-y-[4px]"
                )}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <div
          className={cn(
            "hidden w-full lg:block transition-transform",
            isDesktopNavVisible ? "translate-y-0" : "-translate-y-[150%]"
          )}
          style={{
            transitionDuration: isDesktopNavVisible ? "500ms" : "600ms",
            transitionTimingFunction: isDesktopNavVisible 
              ? "cubic-bezier(0.22, 1, 0.36, 1)" 
              : "cubic-bezier(0.6, -0.05, 0.9, 0.5)",
            transitionDelay: isDesktopNavVisible ? "0ms" : "0ms"
          }}
        >
          <div
            className={cn(
              "relative mx-auto flex items-center justify-between transition-all duration-500",
              isOpen
                ? "w-full max-w-none px-8 lg:px-12 xl:px-16 mt-0 h-[5.5rem] rounded-none border-transparent bg-transparent shadow-none backdrop-blur-0 text-brand-dark"
                : isScrolled
                ? "w-[calc(100vw-2rem)] lg:w-[calc(100vw-4rem)] max-w-none px-8 lg:px-10 mt-4 h-[5rem] rounded-[999px] border border-white/20 bg-brand-pink/15 shadow-[0_20px_54px_rgba(0,0,0,0.15)] backdrop-blur-2xl text-[#202020]"
                : "w-full max-w-none px-8 lg:px-12 xl:px-16 mt-0 h-[5.5rem] rounded-none border-transparent bg-transparent shadow-none backdrop-blur-0 text-white"
            )}
          >
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="fw-desktop-nav-overlay"
              className="relative z-[62] inline-flex items-center gap-3 py-2 text-left transition-opacity duration-300 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current"
            >
              <DesktopMenuButton isOpen={isOpen} />
            </button>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Link
                href="/"
                aria-label="Faith Works Home"
                className="relative z-[62] pointer-events-auto"
                data-navbar-logo-anchor
              >
                <Image
                  src={isOpen || (isScrolled && !isOpen) ? "/images/faithworks-black.png" : "/images/faithworks.png"}
                  alt="Faith Works"
                  width={230}
                  height={82}
                  className={cn(
                    "w-auto object-contain transition-all duration-500",
                    isScrolled && !isOpen 
                      ? "h-[2.5rem]" 
                      : "h-[3.5rem]"
                  )}
                  priority
                />
              </Link>
            </div>

            <Link
              href="/programs"
              className={cn(
                "relative z-[62] inline-flex items-center gap-2 rounded-full border px-6 py-3 text-[15px] font-medium tracking-tight transition-all duration-300",
                isOpen
                  ? "border-brand-dark/20 bg-transparent hover:bg-brand-dark/6 text-brand-dark"
                  : isScrolled
                  ? "border-transparent bg-[#202020]/5 hover:bg-[#202020]/10 text-[#202020]"
                  : "border-white/20 bg-transparent hover:bg-white/10 text-white"
              )}
            >
              Join the Accelerator
              <span aria-hidden="true" className="text-[17px] font-light leading-none">↗</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Mobile-only full-screen overlay ── */}
      <div
        id="fw-nav-overlay"
        className={cn("fw-overlay lg:hidden", isOpen && "open")}
        aria-hidden={!isOpen}
        aria-label="Site navigation"
        aria-modal="true"
        role="dialog"
        ref={mobileOverlayRef}
      >
        {/* Left accent bar */}
        <div className="fw-overlay-accent" aria-hidden="true" />

        {/* Background watermark */}
        <span className="fw-watermark" aria-hidden="true">FW</span>

        {/* Nav links */}
        <nav aria-label="Main navigation">
          <ul className="m-0 list-none p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="fw-nav-item">
                <div className="fw-nav-row">
                  <span className="fw-nav-num">{link.num}</span>
                  <Link
                    href={link.href}
                    tabIndex={isOpen ? 0 : -1}
                    className={cn(
                      "fw-nav-link font-heading",
                      pathname === link.href && "active"
                    )}
                  >
                    {link.label}
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="fw-overlay-cta">
            <Link
              href="/programs"
              tabIndex={isOpen ? 0 : -1}
              className="inline-flex items-center gap-2 rounded-full gradient-pink-gold px-7 py-3.5 text-sm font-semibold text-brand-dark transition-all hover:scale-[1.03] hover:shadow-lg"
            >
              Join the Accelerator
            </Link>
          </div>
        </nav>

        {/* Footer row */}
        <div className="fw-overlay-footer" aria-hidden="true">
          <span>Faith Works™</span>
          <span>Where faith meets strategy</span>
        </div>
      </div>

      <div
        id="fw-desktop-nav-overlay"
        className={cn("fw-desktop-overlay", isOpen && "open")}
        aria-hidden={!isOpen}
        aria-label="Site navigation"
        aria-modal="true"
        role="dialog"
        ref={desktopOverlayRef}
      >
        <div className="fw-nav-wipe fw-nav-wipe-1" aria-hidden="true" />
        <div className="fw-nav-wipe fw-nav-wipe-2" aria-hidden="true" />
        <div className="fw-nav-wipe fw-nav-wipe-bg" aria-hidden="true" />

        <div className="fw-desktop-panel">
          <aside className="fw-desktop-side" aria-hidden={!isOpen}>
            <div className="fw-side-group">
              <span className="fw-side-label">Faith Works</span>
              <p className="fw-side-copy">
                Strategy, conviction, and founder-level clarity for entrepreneurs building with purpose.
              </p>

              <ul className="fw-side-links">
                {DESKTOP_UTILITY_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      tabIndex={isOpen ? 0 : -1}
                      className="fw-side-link"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="fw-side-footer">For founders who want a brand that sounds like conviction, not noise.</span>
              <div className="fw-desktop-footer">
                <span>Faith Works 2026</span>
                <span>Where faith meets strategy</span>
              </div>
            </div>
          </aside>

          <div className="fw-desktop-main">
            <nav aria-label="Desktop navigation">
              <ul>
                {NAV_LINKS.map((link) => (
                  <li key={link.href} className="fw-desktop-item">
                    <Link
                      href={link.href}
                      tabIndex={isOpen ? 0 : -1}
                      className={cn("fw-desktop-link", pathname === link.href && "active")}
                    >
                      <span className="fw-desktop-num">{link.num}</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  )
}
