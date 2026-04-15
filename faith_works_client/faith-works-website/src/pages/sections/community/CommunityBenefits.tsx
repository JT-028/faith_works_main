import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Users, FolderOpen, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface BenefitCard {
  tag: string
  tagColor: string
  icon: React.ReactNode
  title: string
  description: string
  href: string
  featured?: boolean
}

const benefits: BenefitCard[] = [
  {
    tag: "Support",
    tagColor: "bg-brand-pink/15 text-brand-pink-dark",
    icon: <Users className="h-5 w-5" />,
    title: "Real peer accountability",
    description:
      "Monthly group calls, strategy feedback, and people who actually care. No fluff — just founders pushing each other forward.",
    href: "#join",
  },
  {
    tag: "Resources",
    tagColor: "bg-brand-gold/15 text-brand-dark",
    icon: <FolderOpen className="h-5 w-5" />,
    title: "Templates and tools that work",
    description:
      "Brand guides, sales frameworks, and playbooks from people doing it now. Tried, tested, and ready to use.",
    href: "#join",
  },
  {
    tag: "Direct",
    tagColor: "bg-brand-navy/10 text-brand-navy",
    icon: <Sparkles className="h-5 w-5" />,
    title: "You get time with Faith herself",
    description:
      "Not a distant mentor. She shows up, answers questions, and pushes you forward. Real access, real guidance.",
    href: "#join",
    featured: true,
  },
]

export function CommunityBenefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useGSAP(() => {
    gsap.from("[data-cb-tag]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 82%",
        toggleActions: "play none none none",
      },
      y: 16,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
    })

    gsap.from("[data-cb-heading]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
      delay: 0.1,
    })

    gsap.from("[data-cb-sub]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 78%",
        toggleActions: "play none none none",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.15,
    })

    gsap.from("[data-cb-card]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: "[data-cb-card]",
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

  // Desktop: hovered card grows to 52%, siblings split the rest equally
  const getCardWidth = (index: number): string | undefined => {
    if (!isDesktop) return undefined
    if (hoveredIndex === null) return "33.33%"
    return hoveredIndex === index ? "52%" : "24%"
  }

  return (
    <section
      id="benefits"
      ref={sectionRef}
      className="bg-brand-offwhite px-6 py-[var(--section-padding)] lg:px-16"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        {/* Section header */}
        <div className="mb-14 text-center lg:mb-16">
          <span
            data-cb-tag
            className="inline-block text-xs font-semibold tracking-widest text-brand-muted uppercase"
          >
            Inside
          </span>
          <h2
            data-cb-heading
            className="mt-3 font-heading text-[2rem] font-bold tracking-tight text-brand-dark md:text-4xl lg:text-5xl"
          >
            What you get here
          </h2>
          <p
            data-cb-sub
            className="mx-auto mt-4 max-w-lg text-base text-brand-muted md:text-lg"
          >
            Access a network of Filipino founders who've been where you are
          </p>
        </div>

        {/* Cards — flex row on desktop so widths can animate, stack on mobile */}
        <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-6 lg:flex lg:flex-row lg:gap-6">
          {benefits.map((benefit, index) => {
            const isHovered = hoveredIndex === index
            const anyHovered = hoveredIndex !== null

            return (
              <div
                key={benefit.tag}
                data-cb-card
                className={`relative overflow-hidden rounded-[var(--radius-xl)] h-[420px] flex-shrink-0 ${
                  benefit.featured ? "bg-brand-dark shadow-lg" : "bg-white shadow-card"
                }`}
                style={{
                  width: getCardWidth(index),
                  transition: "width 600ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >

                {/* ── Layout A: Vertical (always on mobile, fades on desktop when hovered) ── */}
                <div
                  className="flex h-full flex-col"
                  style={{
                    opacity: isHovered ? 0 : 1,
                    transition: "opacity 400ms ease",
                    // Keep pointer events active on non-hovered state
                    pointerEvents: isHovered ? "none" : "auto",
                  }}
                >
                  {/* Image top */}
                  <div className={`relative flex-1 overflow-hidden ${benefit.featured ? "bg-[#1a2444]" : "bg-brand-card"}`}>
                    <div className={`flex h-full w-full items-center justify-center ${benefit.featured ? "text-white/10" : "text-brand-muted/15"}`}>
                      <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                    </div>
                  </div>
                  {/* Content bottom */}
                  <div className="shrink-0 p-6">
                    <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${benefit.featured ? "bg-white/10 text-brand-gold" : benefit.tagColor}`}>
                      {benefit.icon}
                      {benefit.tag}
                    </span>
                    <h3 className={`mt-3 font-heading text-xl font-bold leading-snug tracking-tight ${benefit.featured ? "text-white" : "text-brand-dark"}`}>
                      {benefit.title}
                    </h3>
                    <p className={`mt-2 text-sm leading-relaxed ${benefit.featured ? "text-white/60" : "text-brand-muted"}`}>
                      {/* Truncate description in default state — full text shown on hover */}
                      {anyHovered && !isHovered
                        ? benefit.description.slice(0, 60) + "…"
                        : benefit.description}
                    </p>
                    <a href={benefit.href} className={`group/link mt-4 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${benefit.featured ? "text-brand-gold" : "text-brand-dark hover:text-brand-pink-dark"}`}>
                      Learn
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>

                {/* ── Layout B: Horizontal (desktop hover only) ── */}
                <div
                  className="absolute inset-0 hidden lg:flex flex-row"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transition: "opacity 400ms ease",
                    pointerEvents: isHovered ? "auto" : "none",
                  }}
                >
                  {/* Image — left half, full height */}
                  <div className={`relative h-full w-[52%] shrink-0 overflow-hidden ${benefit.featured ? "bg-[#1a2444]" : "bg-brand-card"}`}>
                    <div className={`flex h-full w-full items-center justify-center ${benefit.featured ? "text-white/10" : "text-brand-muted/15"}`}>
                      <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="m21 15-5-5L5 21" />
                      </svg>
                    </div>
                  </div>
                  {/* Content — right half, centered */}
                  <div className="flex flex-1 flex-col justify-center px-7">
                    <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase ${benefit.featured ? "bg-white/10 text-brand-gold" : benefit.tagColor}`}>
                      {benefit.icon}
                      {benefit.tag}
                    </span>
                    <h3 className={`mt-4 font-heading text-[1.25rem] font-bold leading-snug tracking-tight ${benefit.featured ? "text-white" : "text-brand-dark"}`}>
                      {benefit.title}
                    </h3>
                    <p className={`mt-3 text-sm leading-relaxed ${benefit.featured ? "text-white/60" : "text-brand-muted"}`}>
                      {benefit.description}
                    </p>
                    <a href={benefit.href} className={`group/link mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition-colors ${benefit.featured ? "text-brand-gold" : "text-brand-dark hover:text-brand-pink-dark"}`}>
                      Learn
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
