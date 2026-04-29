"use client"

import Link from "next/link"
import { ArrowRight, Zap, Shield, Clock } from "lucide-react"

const trustPoints = [
  { icon: Zap, text: "Results in 12 weeks" },
  { icon: Shield, text: "Money-back guarantee" },
  { icon: Clock, text: "Flexible schedule" },
]

export function FinalCTASection() {
  return (
    <section
      className="relative overflow-visible py-[var(--section-padding-mobile)] lg:py-[var(--section-padding)]"
      style={{
        background: "linear-gradient(135deg, var(--color-gradient-pink) 0%, var(--color-brand-pink-light) 100%)",
      }}
    >
      {/* Seamless top fade transition extending UPWARD over the previous section */}
      <div 
        className="pointer-events-none absolute -top-32 lg:-top-48 left-0 w-full h-32 lg:h-48 z-50 bg-brand-offwhite" 
        style={{ 
          WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)"
        }} 
      />

      {/* Inner top fade blending down into the pink */}
      <div 
        className="pointer-events-none absolute top-0 left-0 w-full h-24 lg:h-32 z-10 bg-brand-offwhite" 
        style={{ 
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%)"
        }} 
      />

      {/* Background decorative elements */}
      <div className="pointer-events-none absolute top-0 -left-32 h-64 w-64 rounded-full bg-brand-gold/10 blur-3xl overflow-hidden" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-64 w-64 rounded-full bg-brand-pink/20 blur-3xl overflow-hidden" />

      <div
        data-cta-content
        className="relative mx-auto max-w-[var(--container-max)] px-6 text-center lg:px-16"
      >
        {/* Urgency badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-dark/10 px-4 py-2 text-xs font-semibold text-brand-dark backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-dark/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-dark" />
          </span>
          Next cohort starts July 2026 — Limited spots
        </div>

        <h2 className="font-heading text-3xl font-bold text-brand-dark lg:text-5xl">
          Ready to build something real
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base text-brand-dark/70">
          Stop waiting. The next cohort starts soon and spots are limited. Take
          the first step toward the business you&apos;ve been building in your mind.
        </p>

        {/* Trust points */}
        <div className="mx-auto mt-8 flex  flex-wrap items-center justify-center gap-6">
          {trustPoints.map((point) => (
            <div
              key={point.text}
              className="flex items-center gap-2 text-sm text-brand-dark/70"
            >
              <point.icon size={16} className="text-brand-dark" />
              {point.text}
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/programs"
            className="group inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-brand-dark px-8 py-4 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.03] hover:bg-brand-navy"
          >
            Join the Accelerator
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/community"
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border-2 border-brand-dark/30 px-8 py-4 text-sm font-semibold text-brand-dark transition-all hover:border-brand-dark hover:bg-brand-dark/5"
          >
            Join the Free Community
          </Link>
        </div>

        {/* Social proof footer */}
        <div className="mt-10 flex items-center justify-center gap-3">
          {/* Avatar stack */}
          <div className="flex -space-x-2">
            {["AR", "CM", "MS", "JR"].map((initials, i) => (
              <div
                key={initials}
                className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-brand-pink to-brand-gold text-[10px] font-bold text-brand-dark"
                style={{ zIndex: 4 - i }}
              >
                {initials}
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-dark/60">
            <span className="font-semibold text-brand-dark">500+</span>{" "}
            entrepreneurs already inside
          </p>
        </div>
      </div>
    </section>
  )
}
