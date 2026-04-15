import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ChevronRight, ChevronsDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Milestone {
  year: string
  title: string
  description: string
  highlight: string
}

const milestones: Milestone[] = [
  {
    year: "2015",
    title: "Started from zero",
    description:
      "Started first business with zero capital and pure determination. Faith launched her entrepreneurial journey in the Philippines, learning every lesson the hard way.",
    highlight: "Zero capital, infinite drive",
  },
  {
    year: "2018",
    title: "First major breakthrough",
    description:
      "Built a 6-figure brand through strategic positioning and relentless execution. Proved that Filipino founders can compete globally with the right strategy.",
    highlight: "6-figure brand milestone",
  },
  {
    year: "2021",
    title: "Community born",
    description:
      "Launched the Faith Works community to help other Filipino entrepreneurs avoid the mistakes she made. Started with 50 members, fueled by word of mouth.",
    highlight: "50 founding members",
  },
  {
    year: "2023",
    title: "Accelerator launched",
    description:
      "Created the Faith Works Accelerator — a structured program combining brand strategy, AI tools, and founder mindset coaching for serious entrepreneurs.",
    highlight: "First accelerator cohort",
  },
  {
    year: "2024",
    title: "500+ entrepreneurs",
    description:
      "Grew the community to 500+ members across 12 countries. Featured in major Philippine media. Faith became a recognized voice in Filipino entrepreneurship.",
    highlight: "12 countries, 500+ members",
  },
]

const NUM = milestones.length

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0)
  // Ref to track current index without triggering re-renders on every scroll frame
  const activeIndexRef = useRef(0)
  // The tall outer div that absorbs scroll distance
  const wrapperRef = useRef<HTMLDivElement>(null)
  // The sticky inner panel
  const cardRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // ── Heading entrance: fires once when the sticky panel locks to the top ──
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      onEnter: () => {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        )
      },
      onLeaveBack: () => {
        gsap.set(headingRef.current, { opacity: 0, y: 30 })
      },
    })

    // ── Scroll tracker: maps scroll progress → active milestone step ──
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // Map 0→1 progress to 0→(NUM-1) steps
        const rawIdx = self.progress * (NUM - 1)
        const newIdx = Math.min(NUM - 1, Math.round(rawIdx))

        if (newIdx !== activeIndexRef.current) {
          const direction = newIdx > activeIndexRef.current ? 1 : -1
          activeIndexRef.current = newIdx
          setActiveIndex(newIdx)

          // Animate the card in from the direction of travel
          requestAnimationFrame(() => {
            if (cardRef.current) {
              gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: direction * 48 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
              )
            }
          })
        }
      },
    })
  }, { scope: wrapperRef })

  const active = milestones[activeIndex]

  return (
    // Outer wrapper: tall enough that scrolling through it advances all milestones.
    // Each milestone gets ~100vh of scroll distance.
    <div
      ref={wrapperRef}
      id="timeline"
      style={{ height: `${NUM * 100}vh` }}
      className="relative"
    >
      {/* Sticky panel: locks to the viewport top while the wrapper scrolls beneath it */}
      <div className="sticky top-0 flex h-screen flex-col justify-between bg-white px-6 pb-8 pt-24 lg:px-16">
        <div className="mx-auto flex w-full max-w-[var(--container-max)] flex-col gap-6">

          {/* Section heading */}
          <div ref={headingRef} className="text-center opacity-0">
            <span className="text-sm font-semibold tracking-wide text-brand-dark">
              The Journey
            </span>
            <h2 className="mt-2 font-heading text-4xl font-bold tracking-tight text-brand-dark md:text-5xl lg:text-[52px]">
              Faith&apos;s story
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-lg text-brand-muted">
              From starting with nothing to empowering hundreds of Filipino entrepreneurs.
            </p>
          </div>

          {/* Card + Image */}
          <div
            ref={cardRef}
            className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2"
          >
            {/* Content */}
            <div className="flex flex-col gap-5">
              <span className="gradient-pink-gold inline-block w-fit rounded-full px-4 py-1 text-xs font-bold tracking-wider text-brand-dark uppercase">
                {active.highlight}
              </span>
              <div>
                <p className="mb-1 font-heading text-5xl font-bold tracking-tight text-brand-dark lg:text-[72px]">
                  {active.year}
                </p>
                <h3 className="font-heading text-2xl font-bold text-brand-dark md:text-3xl">
                  {active.title}
                </h3>
              </div>
              <p className="max-w-lg text-base leading-relaxed text-brand-muted">
                {active.description}
              </p>
              <button
                type="button"
                className="group inline-flex w-fit items-center gap-2 rounded-[var(--radius-md)] bg-brand-dark/5 px-6 py-2.5 text-sm font-medium text-brand-dark transition-all hover:bg-brand-dark/10"
              >
                Read more
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Image placeholder */}
            <div className="h-[280px] w-full overflow-hidden rounded-[var(--radius-2xl)] bg-brand-card lg:h-[340px]">
              <div className="flex h-full w-full items-center justify-center text-brand-muted/20">
                <svg width={72} height={72} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </div>
            </div>
          </div>

          {/* Timeline progress bar — lives at the bottom of the sticky panel */}
          <div className="flex items-start">
            {milestones.map((milestone, i) => (
              <div
                key={milestone.year}
                className="flex flex-1 flex-col items-center gap-2"
              >
                {/* Left line + dot + right line */}
                <div className="flex w-full items-center">
                  <div
                    className={`h-[3px] flex-1 transition-colors duration-500 ${
                      i <= activeIndex ? "bg-brand-dark" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`h-[15px] w-[15px] shrink-0 rounded-full border-2 transition-all duration-500 ${
                      i === activeIndex
                        ? "scale-125 border-brand-dark bg-brand-dark"
                        : i < activeIndex
                          ? "border-brand-dark bg-brand-dark"
                          : "border-gray-300 bg-white"
                    }`}
                  />
                  <div
                    className={`h-[3px] flex-1 transition-colors duration-500 ${
                      i < activeIndex ? "bg-brand-dark" : "bg-gray-200"
                    }`}
                  />
                </div>
                {/* Year label */}
                <span
                  className={`font-heading text-lg font-bold transition-colors duration-500 md:text-2xl ${
                    i === activeIndex
                      ? "text-brand-dark"
                      : i < activeIndex
                        ? "text-brand-dark/40"
                        : "text-gray-300"
                  }`}
                >
                  {milestone.year}
                </span>
              </div>
            ))}
          </div>

        </div>{/* end inner max-w container */}

        {/* Scroll hint */}
        {activeIndex === 0 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-brand-muted/50 animate-bounce">
            <ChevronsDown className="h-5 w-5" />
            <span className="text-xs font-medium tracking-wide">Scroll to explore</span>
          </div>
        )}

      </div>{/* end sticky panel */}
    </div>
  )
}
