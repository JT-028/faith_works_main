"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { num: "01", href: "/about",     label: "About Faith" },
  { num: "02", href: "/programs",  label: "Programs" },
  { num: "03", href: "/community", label: "Community" },
  { num: "04", href: "/blog",      label: "Blog" },
  { num: "05", href: "/media",     label: "Media" },
]

const OVERLAY_CSS = `
  /* ── Overlay: circle-reveal from top-right button ── */
  .fw-overlay {
    position: fixed;
    inset: 0;
    z-index: 48;
    background: linear-gradient(145deg, #EFACBA 0%, #f8d878 55%, #FCE82A 100%);
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
  }
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
  .fw-nav-link:hover  { color: #b83050; }
  .fw-nav-link.active { color: #b83050; }

  /* Deep-rose underline on hover / active */
  .fw-nav-link::after {
    content: '';
    position: absolute;
    left: 0; bottom: -5px;
    width: 0; height: 3px;
    background: #b83050;
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
`

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Close on route change
  useEffect(() => { setIsOpen(false) }, [pathname])

  // Scroll detection
  useEffect(() => {
    function onScroll() { setIsScrolled(window.scrollY > 20) }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Body scroll lock — covers iOS Safari + Android
  useEffect(() => {
    const html = document.documentElement
    const { body } = document
    if (isOpen) {
      html.style.overflow = "hidden"
      body.style.overflow = "hidden"
      body.style.position = "fixed"
      body.style.inset = "0"
      body.style.touchAction = "none"
    } else {
      html.style.overflow = ""
      body.style.overflow = ""
      body.style.position = ""
      body.style.inset = ""
      body.style.touchAction = ""
    }
    return () => {
      html.style.overflow = ""
      body.style.overflow = ""
      body.style.position = ""
      body.style.inset = ""
      body.style.touchAction = ""
    }
  }, [isOpen])

  // Escape key
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) setIsOpen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [isOpen])

  // Close overlay when resized to desktop
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 1024) setIsOpen(false)
    }
    window.addEventListener("resize", onResize, { passive: true })
    return () => window.removeEventListener("resize", onResize)
  }, [])

  // Logo: black version on the light gradient overlay; scroll-aware otherwise
  const logoSrc = isOpen
    ? "/images/faithworks-black.png"
    : isScrolled
    ? "/images/faithworks.png"
    : "/images/faithworks-black.png"

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: OVERLAY_CSS }} />

      {/* ── Header bar ── */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[50] transition-all",
          isScrolled
            ? "bg-white/60 backdrop-blur-2xl shadow-[0_1px_24px_rgba(239,172,186,0.12)] border-b border-white/40 py-3"
            : "bg-transparent py-4"
        )}
        style={isScrolled ? { backdropFilter: "blur(20px) saturate(1.8)" } : undefined}
      >
        <div className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-6 lg:px-16">
          {/* Logo */}
          <Link href="/" aria-label="Faith Works Home" className="relative z-[52]">
            <Image
              src={logoSrc}
              alt="Faith Works"
              width={140}
              height={40}
              className="h-10 w-auto object-contain transition-all duration-300"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-brand-pink",
                    pathname === link.href ? "text-brand-pink" : "text-brand-dark"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <Link
            href="/programs"
            className="hidden rounded-[var(--radius-md)] gradient-pink-gold px-6 py-2.5 text-sm font-semibold text-brand-dark shadow-[var(--shadow-button)] transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)] lg:inline-flex"
          >
            Join the Accelerator
          </Link>

          {/* Mobile hamburger — hidden on desktop */}
          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="fw-nav-overlay"
            className={cn(
              "relative z-[52] flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300 lg:hidden",
              isOpen
                ? "bg-white/10 text-white"
                : isScrolled
                ? "bg-brand-pink/12 text-brand-dark hover:bg-brand-pink/22"
                : "bg-black/6 text-brand-dark hover:bg-black/12"
            )}
          >
            <Menu
              size={20}
              className={cn(
                "absolute transition-all duration-300",
                isOpen ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
              )}
            />
            <X
              size={20}
              className={cn(
                "absolute transition-all duration-300",
                isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
              )}
            />
          </button>
        </div>
      </header>

      {/* ── Mobile-only full-screen overlay ── */}
      <div
        id="fw-nav-overlay"
        className={cn("fw-overlay lg:hidden", isOpen && "open")}
        aria-hidden={!isOpen}
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
    </>
  )
}
