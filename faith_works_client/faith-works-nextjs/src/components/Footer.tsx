"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.022 1.791-4.692 4.533-4.692 1.313 0 2.686.236 2.686.236v2.971h-1.513c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  )
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2v10.5A4.5 4.5 0 1 0 16.5 8V6.2a6 6 0 1 1-4.5 0V2z" />
    </svg>
  )
}

const programLinks = [
  { href: "/programs", label: "Accelerator" },
  { href: "/programs", label: "AI Workshop" },
  { href: "/speaking", label: "Keynote" },
  { href: "/community", label: "Community" },
  { href: "/events", label: "Events" },
]

const aboutLinks = [
  { href: "/media", label: "Media" },
  { href: "/media", label: "Press kit" },
  { href: "/speaking", label: "Speaking" },
  { href: "/about", label: "Contact" },
  { href: "/about", label: "Resources" },
]

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", Icon: FacebookIcon },
  { href: "https://instagram.com", label: "Instagram", Icon: InstagramIcon },
  { href: "https://linkedin.com", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://tiktok.com", label: "TikTok", Icon: TikTokIcon },
]

export function Footer() {
  const [imgError, setImgError] = useState(false)
  const watermarkRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!watermarkRef.current) return

    const animate = () => {
      gsap.fromTo(
        watermarkRef.current,
        { y: 150, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: watermarkRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
          },
        }
      )
    }

    animate()

    // Re-initialize on route changes or when layout shifts
    window.addEventListener("fw-refresh-triggers", animate)
    return () => window.removeEventListener("fw-refresh-triggers", animate)
  }, { scope: watermarkRef, dependencies: [] })

  // Colors based on brand palette:
  // #EFACBA (Pink background)
  // #FCE82A (Gold accents)
  // #202020 (Dark text)
  // #FFFFFF (White card inside)

  return (
    <footer className="relative overflow-hidden bg-[#EFACBA] pb-0 pt-16 md:pt-24">
      {/* Container for the inner card - Much wider taking up most of screen */}
      <div className="relative z-10 mx-auto px-4 w-full md:px-8 lg:px-12 max-w-[1920px]">
        {/* The White Card */}
        <div className="rounded-[2.5rem] bg-[#FFFFFF] p-8 md:p-12 lg:p-16 shadow-[0_12px_40px_rgba(32,32,32,0.15)] border border-[#202020]/5">
          
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr]">
            {/* Left Col: Brand + Description + Socials */}
            <div className="flex flex-col items-start">
              {/* Logo */}
              <Link href="/" aria-label="Faith Works home" className="inline-block">
                {!imgError ? (
                  <img
                    src="/images/faithworks.png"
                    alt="Faith Works"
                    className="h-10 w-auto object-contain"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span className="font-heading text-2xl font-bold tracking-tight text-[#202020]">
                    Faith<span className="italic text-[#EFACBA]">works</span>
                  </span>
                )}
              </Link>

              <p className="mt-8 max-w-sm text-sm leading-relaxed text-[#202020]/70">
                Faith Works empowers entrepreneurs to transform raw challenges into clear, compelling strategy — making growth easier to envision, understand, and achieve.
              </p>

              {/* Socials Row */}
              <div className="mt-8 flex items-center gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-[#202020]/80 transition-colors hover:text-[#EFACBA]">
                  <FacebookIcon className="h-5 w-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#202020]/80 transition-colors hover:text-[#EFACBA]">
                  <InstagramIcon className="h-5 w-5" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-[#202020]/80 transition-colors hover:text-[#EFACBA]">
                  <LinkedInIcon className="h-5 w-5" />
                </a>
                <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-[#202020]/80 transition-colors hover:text-[#EFACBA]">
                  <TikTokIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Middle Col: Programs */}
            <div>
              <h4 className="mb-6 font-semibold text-[#202020]">Programs</h4>
              <ul className="space-y-4">
                {programLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#202020]/70 transition-colors hover:text-[#EFACBA]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Col: About */}
            <div>
              <h4 className="mb-6 font-semibold text-[#202020]">About</h4>
              <ul className="space-y-4">
                {aboutLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#202020]/70 transition-colors hover:text-[#EFACBA]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 border-t border-[#202020]/10" />

          {/* Bottom Bar inside card */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-[#202020]/70">
              &copy; {new Date().getFullYear()} Faith Works. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6">
              <a href="/privacy-policy" className="text-sm text-[#202020]/70 underline underline-offset-4 decoration-transparent transition-colors hover:text-[#202020] hover:decoration-[#EFACBA]">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-[#202020]/70 underline underline-offset-4 decoration-transparent transition-colors hover:text-[#202020] hover:decoration-[#EFACBA]">
                Terms of Service
              </a>
              <a href="/cookies" className="text-sm text-[#202020]/70 underline underline-offset-4 decoration-transparent transition-colors hover:text-[#202020] hover:decoration-[#EFACBA]">
                Cookies Settings
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Huge background text underneath card - No overlap margin anymore & much more visible */}
      <div 
        ref={watermarkRef}
        className="pointer-events-none relative pt-8 flex justify-center overflow-hidden -mb-10 lg:-mb-14 opacity-0"
      >
        {/* We use a gradient text mask to make it clearly visible but fading slightly at bottom */}
        <span 
          className="font-heading text-[28vw] font-black uppercase leading-[0.75] tracking-tighter"
          style={{
            background: "linear-gradient(to bottom, #FFFFFF 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0.1) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        > F<span style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>[</span>
          <span style={{
            background: 'linear-gradient(to bottom, #FCE82A 0%, rgba(252,232,42,0.75) 50%, rgba(252,232,42,0.15) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            AI
          </span>
          <span style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial' }}>]</span>TH
        </span>
      </div>
    </footer>
  )
}
