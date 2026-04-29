"use client"

import { useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowRight } from "lucide-react"

export function HeroSection({ ready = false }: { ready?: boolean }) {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    if (!ready) return
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // Text entrance
    tl.from("[data-hero-heading] .word", {
      y: 100,
      opacity: 0,
      rotateX: 40,
      stagger: 0.06,
      duration: 0.8,
    })
      .from("[data-hero-sub]", {
        y: 24,
        opacity: 0,
        duration: 0.6,
      }, "-=0.4")
      .from("[data-hero-cta]", {
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.5,
      }, "-=0.3")

    // Main card slides up
    tl.from("[data-card-main]", {
      y: 120,
      opacity: 0,
      scale: 0.92,
      duration: 1,
      ease: "power4.out",
    }, "-=0.3")

    // Overlapping cards stagger in from their corners
    tl.from("[data-card-left]", {
      x: -80,
      y: 100,
      opacity: 0,
      scale: 0.8,
      rotate: -8,
      duration: 0.9,
      ease: "back.out(1.4)",
    }, "-=0.6")
      .from("[data-card-right]", {
        x: 80,
        y: 100,
        opacity: 0,
        scale: 0.8,
        rotate: 8,
        duration: 0.9,
        ease: "back.out(1.4)",
      }, "-=0.7")

    // Subtle floating loop after entrance
    gsap.to("[data-card-left]", {
      y: -8,
      rotate: -1,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2,
    })
    gsap.to("[data-card-right]", {
      y: -10,
      rotate: 1,
      duration: 3.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 2.2,
    })
  }, { scope: heroRef, dependencies: [ready] })

  const headlineWords = "Build your brand with strategy and conviction".split(" ")

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden pt-28 pb-24 lg:pt-36 lg:pb-32"
      style={{
        background: "linear-gradient(180deg, var(--color-brand-pink) 0%, var(--color-gradient-pink) 2%, var(--color-brand-pink-light) 25%, var(--color-brand-offwhite) 100%)",
      }}
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16" style={ready ? undefined : { visibility: 'hidden' }}>
        {/* Text Content */}
        <div className="flex flex-col items-center text-center">
          <h1
            data-hero-heading
            className="font-heading max-w-4xl text-4xl leading-[1.08] font-bold tracking-tight text-brand-dark sm:text-5xl lg:text-6xl xl:text-[4rem]"
            style={{ perspective: "600px" }}
          >
            {headlineWords.map((word, i) => (
              <span key={i} className="word inline-block mr-[0.28em]">
                {word}
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="mx-auto mt-5 max-w-lg text-[0.95rem] leading-relaxed text-brand-muted lg:text-base"
          >
            Where faith meets strategy. Join Filipino entrepreneurs who are
            building businesses that matter, not just businesses that make noise.
          </p>

          <div data-hero-cta className="mt-8 flex flex-col items-center gap-3.5 sm:flex-row">
            <Link
              href="/programs"
              className="group inline-flex items-center gap-2 rounded-full gradient-pink-gold px-8 py-3 text-sm font-semibold text-brand-dark shadow-[var(--shadow-button)] transition-all hover:scale-[1.03] hover:shadow-[var(--shadow-card-hover)]"
            >
              Join the Accelerator
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/community"
              className="inline-flex items-center gap-2 rounded-full border border-brand-dark/20 bg-white px-8 py-3 text-sm font-semibold text-brand-dark transition-all hover:border-brand-dark hover:bg-brand-dark hover:text-white"
            >
              Learn more
            </Link>
          </div>
        </div>

        {/* Overlapping Image Cards */}
        <div className="relative mx-auto mt-12 max-w-8xl sm:mt-16 lg:mt-15" style={{ paddingBottom: "clamp(280px, 58%, 720px)" }}>
          {/* Main center card */}
          <div
            data-card-main
            className="absolute inset-x-0 top-0 z-10 aspect-[16/8] overflow-hidden rounded-2xl bg-brand-card shadow-[0_8px_40px_rgba(0,0,0,0.08)] sm:rounded-[var(--radius-2xl)] md:left-[-6%] md:right-[-6%]"
          >
            <video
              src="https://mf1zxswfy323tltz.public.blob.vercel-storage.com/faith_works_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
            />
          </div>

          {/* Left overlapping card */}
          <div
            data-card-left
            className="absolute left-[-4%] top-[44%] z-20 aspect-square w-[28%] overflow-hidden rounded-xl bg-brand-card shadow-[0_20px_60px_rgba(0,0,0,0.12)] sm:left-[-10%] sm:top-[38%] sm:w-[26%] md:left-[-16%] md:top-[36%] md:w-[28%] lg:left-[-20%] lg:w-[30%]"
            aria-hidden
          />

          {/* Right overlapping card (phone mockup) */}
          <div
            data-card-right
            className="absolute right-[-4%] top-[26%] z-20 aspect-[4/5] w-[26%] sm:right-[-10%] sm:top-[22%] sm:w-[24%] md:right-[-16%] md:top-[20%] md:w-[26%] lg:right-[-20%] lg:w-[28%] lg:h-[86%]"
            aria-hidden
          >
            <img
              src="/images/faithworks-phone.png"
              alt="FaithWorks phone"
              className="h-full w-full object-contain"
              style={{ filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.22))" }}
              draggable={false}
              loading="lazy"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
