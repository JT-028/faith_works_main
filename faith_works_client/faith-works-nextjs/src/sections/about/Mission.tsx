"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Palette,
  Target,
  Brain,
  Cpu,
  Users,
  ChevronRight,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Pillar {
  label: string
  icon: LucideIcon
  title: string
  description: string
  cta: string
}

const pillars: Pillar[] = [
  {
    label: "Brand building",
    icon: Palette,
    title: "Build your brand with strategy",
    description:
      "Learn how to position yourself in the market and stand out from the noise. We teach founders to create brands that attract ideal clients — not just followers.",
    cta: "Explore",
  },
  {
    label: "Strategic thinking",
    icon: Target,
    title: "Think in systems, not shortcuts",
    description:
      "Strategy is about making intentional choices. We help you build a decision-making framework that scales with your business and keeps you focused.",
    cta: "Explore",
  },
  {
    label: "Founder mindset",
    icon: Brain,
    title: "Develop the mindset that wins",
    description:
      "The biggest bottleneck in your business is between your ears. We work on conviction, resilience, and the mental models that separate builders from dreamers.",
    cta: "Explore",
  },
  {
    label: "AI integration",
    icon: Cpu,
    title: "Use AI without losing your soul",
    description:
      "AI should amplify your voice, not replace it. We show founders how to integrate AI tools into their workflow while keeping their brand authentic.",
    cta: "Explore",
  },
  {
    label: "Community power",
    icon: Users,
    title: "Grow through real community",
    description:
      "You don't have to build alone. Our community connects you with Filipino founders who get it — the hustles, the challenges, and the wins.",
    cta: "Explore",
  },
]

export function Mission() {
  const [activeTab, setActiveTab] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.from("[data-mission-header]", {
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

    gsap.from("[data-mission-card]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: "[data-mission-card]",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
  }, { scope: sectionRef })

  function handleTabChange(index: number) {
    if (index === activeTab) return

    const content = contentRef.current
    if (content) {
      gsap.to(content, {
        opacity: 0,
        x: 20,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          setActiveTab(index)
          gsap.fromTo(
            content,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }
          )
        },
      })
    } else {
      setActiveTab(index)
    }
  }

  const active = pillars[activeTab]
  const ActiveIcon = active.icon

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 py-[var(--section-padding)] lg:px-16"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        {/* Header */}
        <div data-mission-header className="mb-20 text-center">
          <span className="text-sm font-semibold tracking-wide text-brand-dark">
            Mission
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-brand-dark md:text-5xl lg:text-[52px]">
            Strategy over luck
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-brand-muted">
            Faith Works exists to help Filipino business owners build brands with real
            strategy and unwavering conviction. No shortcuts. No hype. Just results.
          </p>
        </div>

        {/* Tabs card */}
        <div
          data-mission-card
          className="flex flex-col overflow-hidden rounded-[var(--radius-2xl)] bg-brand-card lg:flex-row"
        >
          {/* Tab menu (left side) */}
          <div className="flex shrink-0 flex-row overflow-x-auto border-b border-brand-dark/10 lg:max-w-[400px] lg:flex-col lg:border-r lg:border-b-0">
            {pillars.map((pillar, i) => (
              <button
                key={pillar.label}
                type="button"
                onClick={() => handleTabChange(i)}
                className={`relative flex flex-1 items-center gap-3 px-6 py-5 text-left font-heading text-base font-bold tracking-tight transition-colors duration-200 whitespace-nowrap lg:px-8 lg:py-6 lg:text-xl ${
                  i === activeTab
                    ? "bg-white text-brand-dark"
                    : "text-brand-dark/60 hover:bg-white/50 hover:text-brand-dark"
                }`}
              >
                {/* Active indicator */}
                {i === activeTab && (
                  <div className="absolute bottom-0 left-0 h-[3px] w-full bg-brand-pink lg:top-0 lg:h-full lg:w-[3px]" />
                )}
                {pillar.label}
              </button>
            ))}
          </div>

          {/* Tab content (right side) */}
          <div
            ref={contentRef}
            className="flex flex-1 flex-col justify-center gap-8 p-8 lg:p-16"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-brand-pink-light">
              <ActiveIcon className="h-6 w-6 text-brand-pink-dark" />
            </div>

            <div className="flex flex-col gap-4">
              <h3 className="font-heading text-3xl font-bold tracking-tight text-brand-dark lg:text-4xl">
                {active.title}
              </h3>
              <p className="max-w-xl text-base leading-relaxed text-brand-muted">
                {active.description}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-brand-dark/5 px-6 py-2.5 text-sm font-medium text-brand-dark transition-all hover:bg-brand-dark/10"
              >
                {active.cta}
              </button>
              <button
                type="button"
                className="group inline-flex items-center gap-1 text-sm font-medium text-brand-dark"
              >
                <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
