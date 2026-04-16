"use client"

import { useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Mic, Lightbulb, Rocket } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface ProgramCard {
  tag: string
  tagColor: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  icon: React.ReactNode
}

const programs: ProgramCard[] = [
  {
    tag: "Workshop",
    tagColor: "bg-brand-pink/15 text-brand-pink-dark",
    title: "Master AI for your business",
    description:
      "Learn to use AI without the hype. Solo or bring your team. Both tracks work.",
    ctaLabel: "Register",
    ctaHref: "/programs/workshop",
    icon: <Lightbulb className="h-5 w-5" />,
  },
  {
    tag: "Speaking",
    tagColor: "bg-brand-gold/15 text-brand-dark",
    title: "Bring Faith to your event",
    description:
      "Corporate events, conferences, retreats. Faith speaks on strategy, AI, and building with conviction.",
    ctaLabel: "Inquire",
    ctaHref: "/speaking",
    icon: <Mic className="h-5 w-5" />,
  },
  {
    tag: "Accelerator",
    tagColor: "bg-brand-navy/10 text-brand-navy",
    title: "Six weeks. Real mentorship. Real growth.",
    description:
      "For CEOs and founders serious about building a brand that lasts and scales fast.",
    ctaLabel: "Enroll",
    ctaHref: "/programs/accelerator",
    icon: <Rocket className="h-5 w-5" />,
  },
]

export function ProgramCards() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from("[data-pc-heading]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 82%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })

    gsap.from("[data-pc-card]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: "[data-pc-card]",
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      stagger: 0.15,
      duration: 0.7,
      ease: "power3.out",
    })
  }, { scope: sectionRef })

  return (
    <section
      id="programs"
      ref={sectionRef}
      className="relative bg-brand-offwhite px-6 pb-[var(--section-padding)] lg:px-16"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        {/* Section header */}
        <div data-pc-heading className="mb-12 text-center lg:mb-16">
          <h2 className="font-heading text-[1.75rem] font-bold tracking-tight text-brand-dark md:text-3xl">
            Choose your path
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-brand-muted">
            Three programs designed for different stages of your journey.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {programs.map((program) => (
            <div
              key={program.tag}
              data-pc-card
              className="group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-white shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover"
            >
              {/* Image area */}
              <div className="relative aspect-[16/10] overflow-hidden bg-brand-card">
                <div className="flex h-full w-full items-center justify-center text-brand-muted/15">
                  <svg
                    width={48}
                    height={48}
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
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6 lg:p-7">
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${program.tagColor}`}>
                    {program.icon}
                    {program.tag}
                  </span>
                </div>

                <h3 className="mt-4 font-heading text-xl font-bold leading-snug tracking-tight text-brand-dark lg:text-[1.35rem]">
                  {program.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-muted">
                  {program.description}
                </p>

                <Link
                  href={program.ctaHref}
                  className="group/link mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-pink-dark"
                >
                  {program.ctaLabel}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
