"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { GradientTextReveal } from "@/components/GradientTextReveal"

gsap.registerPlugin(ScrollTrigger)

export function StrategicConsultancySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    })

    tl.from("[data-strategy-heading] > *", {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
    }).from(
      "[data-strategy-footer]",
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      "-=0.4"
    )
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="bg-brand-dark py-[var(--section-padding-mobile)] lg:py-[var(--section-padding)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          {/* Left Column */}
          <div data-strategy-heading className="flex flex-col justify-start pt-2">
            <p className="mb-8 text-xs font-semibold tracking-widest text-[#a3a3a3] uppercase">
              ABOUT FAITH [AI]
            </p>
            <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-7xl">
              STRATEGY.<br />
              RESILIENCE.<br />
              <span className="text-brand-gold">SCALE.</span>
            </h2>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center">
            {/* Paragraphs — combined for a single continuous scroll reveal timeline */}
            <GradientTextReveal
              activeColor="rgb(255, 255, 255)"
              inactiveColor="rgb(45, 45, 45)"
              className="text-2xl font-medium leading-snug tracking-wide md:text-3xl lg:text-[2rem] lg:leading-[1.4]"
            >
              <span style={{ WebkitTextFillColor: "var(--color-brand-gold)", color: "var(--color-brand-gold)" }}>FAITH [ai]</span>
              {" "}
              is a strategic consultancy that bridges the gap between human purpose and artificial intelligence.
              <br />
              <br />
              We don&apos;t just motivate; we operationalize. In our framework, failure isn&apos;t fatal—it&apos;s just{" "}
              <span style={{ WebkitTextFillColor: "var(--color-brand-gold)", color: "var(--color-brand-gold)" }}>data</span>.
              {" "}
              It is the essential feedback loop required to build a business that cannot be stopped.
            </GradientTextReveal>

            {/* Bottom Footer Text */}
            <div data-strategy-footer className="mt-16 flex items-start gap-4">
              <div className="h-10 w-0.5 shrink-0 bg-brand-gold"></div>
              <p className="text-sm font-medium leading-relaxed tracking-wide text-[#a3a3a3] max-w-sm">
                We guide founders through{" "}
                <span className="text-brand-gold underline decoration-[#5e5e00] underline-offset-4">Consulting</span>,{" "}
                <span className="text-brand-gold underline decoration-[#5e5e00] underline-offset-4">AI Implementation</span>, and{" "}
                <span className="text-brand-gold underline decoration-[#5e5e00] underline-offset-4">Community Support</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
