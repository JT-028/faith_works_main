"use client"

import { useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function SpeakingCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from("[data-speaking-cta]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 py-[var(--section-padding)] lg:px-16"
    >
      <div
        data-speaking-cta
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2 className="font-heading text-4xl font-bold tracking-tight text-brand-dark md:text-5xl lg:text-[52px]">
          Ready to speak with Faith?
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-muted">
          Faith brings strategy and conviction to every stage. Book her for your
          next event, conference, or workshop.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="gradient-pink-gold inline-flex items-center rounded-[var(--radius-md)] px-7 py-3 text-sm font-semibold text-brand-dark shadow-button transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            Inquire
          </Link>
          <Link
            href="/programs"
            className="inline-flex items-center rounded-[var(--radius-md)] bg-brand-dark/5 px-7 py-3 text-sm font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-dark/10"
          >
            Learn
          </Link>
        </div>
      </div>
    </section>
  )
}
