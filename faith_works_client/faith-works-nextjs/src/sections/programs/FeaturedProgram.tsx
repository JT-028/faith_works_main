"use client"

import { useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function FeaturedProgram() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from("[data-fp-tag]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    })

    gsap.from("[data-fp-heading]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 78%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
      delay: 0.1,
    })

    gsap.from("[data-fp-desc]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.2,
    })

    gsap.from("[data-fp-image]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      x: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 0.15,
    })

    gsap.from("[data-fp-stat]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
        toggleActions: "play none none none",
      },
      y: 24,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.3,
    })
  }, { scope: sectionRef })

  const stats = [
    { value: "6", label: "Weeks" },
    { value: "1:1", label: "Mentorship" },
    { value: "20+", label: "Graduates" },
  ]

  return (
    <section
      id="featured"
      ref={sectionRef}
      className="relative overflow-hidden bg-brand-offwhite px-6 py-[var(--section-padding)] lg:px-16"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-20">
          {/* Text content */}
          <div className="flex-1">
            <span
              data-fp-tag
              className="inline-block rounded-full bg-brand-gold/15 px-4 py-1.5 text-xs font-semibold tracking-widest text-brand-dark uppercase"
            >
              Accelerator
            </span>

            <h2
              data-fp-heading
              className="mt-5 font-heading text-[2rem] leading-[1.1] font-bold tracking-tight text-brand-dark md:text-4xl lg:text-5xl"
            >
              Build your brand
              <br />
              with strategy
            </h2>

            <p
              data-fp-desc
              className="mt-5 max-w-md text-base leading-relaxed text-brand-muted md:text-lg"
            >
              Six weeks of intensive work. Real feedback. Real results. For
              founders ready to scale.
            </p>

            <div className="mt-8 flex items-center gap-6">
              {stats.map((stat) => (
                <div key={stat.label} data-fp-stat className="text-center">
                  <div className="font-heading text-2xl font-bold text-brand-dark md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium tracking-wide text-brand-muted uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/programs/accelerator"
              data-fp-stat
              className="group mt-8 inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-brand-dark px-7 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-navy hover:shadow-lg"
            >
              Learn More
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Featured image */}
          <div
            data-fp-image
            className="relative aspect-[4/3] flex-1 overflow-hidden rounded-[var(--radius-xl)] bg-brand-card lg:aspect-[3/2]"
          >
            {/* Gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/20 via-transparent to-transparent" />
            <div className="flex h-full w-full items-center justify-center text-brand-muted/20">
              <svg
                width={64}
                height={64}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
            {/* Accent badge */}
            <div className="absolute bottom-4 left-4 rounded-full bg-brand-gold px-4 py-1.5 text-xs font-bold text-brand-dark uppercase">
              Featured
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
