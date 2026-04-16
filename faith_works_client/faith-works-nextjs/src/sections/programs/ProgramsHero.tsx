"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { AnimatedMosaicHero } from "@/components/AnimatedMosaicHero"

export function ProgramsHero({ ready = false }: { ready?: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ready) return

    // Set initial states synchronously before any paint
    gsap.set("[data-ph-heading] .word", { opacity: 0, y: 80, rotateX: 30 })
    gsap.set("[data-ph-sub]", { opacity: 0, y: 20 })
    gsap.set("[data-ph-cta]", { opacity: 0, y: 16, scale: 0.97 })

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 })

    tl.to("[data-ph-heading] .word", {
      y: 0,
      opacity: 1,
      rotateX: 0,
      stagger: 0.06,
      duration: 0.7,
    })
      .to("[data-ph-sub]", {
        y: 0,
        opacity: 1,
        duration: 0.5,
      }, "-=0.3")
      .to("[data-ph-cta]", {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.5,
      }, "-=0.2")
  }, { scope: contentRef, dependencies: [ready] })

  const headingWords = "Programs built for Filipino CEOs".split(" ")

  return (
    <AnimatedMosaicHero>
      <div ref={contentRef} style={ready ? undefined : { visibility: 'hidden' }}>
        <h1
          data-ph-heading
          className="font-heading text-[2.75rem] leading-[1.05] font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
          style={{ perspective: "600px" }}
        >
          {headingWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h1>

        <p
          data-ph-sub
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg"
        >
          Where faith meets strategy. Choose the program that fits your business
          stage and ambition.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#programs"
            data-ph-cta
            className="gradient-pink-gold inline-flex items-center rounded-[var(--radius-md)] px-8 py-3.5 text-sm font-semibold text-brand-dark shadow-button transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            Explore
          </a>
          <a
            href="#featured"
            data-ph-cta
            className="inline-flex items-center rounded-[var(--radius-md)] border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10"
          >
            Learn
          </a>
        </div>
      </div>
    </AnimatedMosaicHero>
  )
}
