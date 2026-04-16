"use client"

import { useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

export function SpeakingHero() {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.from("[data-programs-heading]", {
      y: 40,
      opacity: 0,
      duration: 0.6,
    })
      .from("[data-programs-sub]", {
        y: 20,
        opacity: 0,
        duration: 0.5,
      }, "-=0.3")
      .from("[data-programs-cta]", {
        y: 16,
        opacity: 0,
        scale: 0.97,
        stagger: 0.1,
        duration: 0.5,
      }, "-=0.2")
      .from("[data-programs-images] > div", {
        opacity: 0,
        y: 30,
        stagger: 0.12,
        duration: 0.6,
      }, "-=0.4")
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden bg-brand-offwhite px-6 pt-28 pb-16 lg:px-16 lg:pt-36 lg:pb-24"
    >
      <div className="mx-auto flex max-w-[var(--container-max)] flex-col items-start gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Text */}
        <div className="flex-1">
          <h1
            data-programs-heading
            className="font-heading text-[2.5rem] leading-[1.08] font-bold tracking-tight text-brand-dark md:text-6xl lg:text-7xl"
          >
            Book Faith Natividad for your next event
          </h1>
          <p
            data-programs-sub
            className="mt-6 max-w-lg text-base leading-relaxed text-brand-muted md:text-lg"
          >
            Where faith meets strategy. Bring a keynote speaker who moves
            audiences and drives real change for your organization.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="#inquiry"
              data-programs-cta
              className="gradient-pink-gold inline-flex items-center rounded-[var(--radius-md)] px-7 py-3 text-sm font-semibold text-brand-dark shadow-button transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            >
              Submit
            </Link>
            <Link
              href="#inquiry"
              data-programs-cta
              className="inline-flex items-center rounded-[var(--radius-md)] border border-brand-dark/10 bg-white px-7 py-3 text-sm font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-dark/5"
            >
              Inquire
            </Link>
          </div>
        </div>

        {/* Image collage */}
        <div
          data-programs-images
          className="relative flex h-[340px] w-full flex-1 items-center justify-center md:h-[440px] lg:h-[520px]"
        >
          {/* Main tall image */}
          <div className="absolute left-1/2 top-0 h-full w-[55%] -translate-x-1/2 overflow-hidden rounded-[var(--radius-xl)] bg-brand-card">
            <div className="flex h-full w-full items-center justify-center text-brand-muted/20">
              <svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          </div>
          {/* Top-right small image */}
          <div className="absolute right-0 top-[10%] h-[32%] w-[38%] overflow-hidden rounded-[var(--radius-lg)] bg-brand-card shadow-lg">
            <div className="flex h-full w-full items-center justify-center text-brand-muted/20">
              <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          </div>
          {/* Bottom-left small image */}
          <div className="absolute bottom-0 left-0 h-[30%] w-[48%] overflow-hidden rounded-[var(--radius-lg)] bg-brand-card shadow-lg">
            <div className="flex h-full w-full items-center justify-center text-brand-muted/20">
              <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
