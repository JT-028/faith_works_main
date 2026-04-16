"use client"

import { useRef, useState, useEffect } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ChevronRight, ChevronsDown } from "lucide-react"

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

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
  // Prevents double-animation: snap event fires it first, onEnter should skip it that time
  const headingAnimatedBySnap = useRef(false)

  // Fire heading animation when snap scroll from hero lands here
  useEffect(() => {
    function onSnapArrival() {
      if (!headingRef.current) return
      headingAnimatedBySnap.current = true
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
      )
    }
    window.addEventListener("faithworks:timeline-snap", onSnapArrival)
    return () => window.removeEventListener("faithworks:timeline-snap", onSnapArrival)
  }, [])

  // Reverse snap — upward scroll from timeline top snaps back to hero
  useEffect(() => {
    let snapping = false

    function snapToHero() {
      if (snapping) return
      const heroEl = document.querySelector<HTMLElement>("[data-about-hero]")
      if (!heroEl) return
      snapping = true
      gsap.to(window, {
        scrollTo: { y: 0 },
        duration: 0.9,
        ease: "power3.inOut",
        onComplete: () => { snapping = false },
      })
    }

    function isAtTimelineTop() {
      if (!wrapperRef.current) return false
      return window.scrollY <= wrapperRef.current.offsetTop + 10
    }

    function onWheel(e: WheelEvent) {
      if (!isAtTimelineTop()) return
      if (e.deltaY >= 0) return
      e.preventDefault()
      snapToHero()
    }

    let touchStartY = 0
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY
    }
    function onTouchEnd(e: TouchEvent) {
      if (!isAtTimelineTop()) return
      const delta = touchStartY - e.changedTouches[0].clientY
      if (delta < -40) snapToHero()
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  useGSAP(() => {
    // ── Heading entrance: also fires on native scroll into the section ──
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      onEnter: () => {
        // Skip if the snap animation already ran — consume the flag
        if (headingAnimatedBySnap.current) {
          headingAnimatedBySnap.current = false
          return
        }
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        )
      },
      onLeaveBack: () => {
        headingAnimatedBySnap.current = false
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
      {/* Sticky panel */}
      <div className="sticky top-0 flex h-screen flex-col bg-white px-6 pt-20 pb-4 lg:px-16 lg:pt-24 lg:pb-8">

        {/* ── Section heading — visible on all sizes, compact on mobile ── */}
        <div ref={headingRef} className="mx-auto w-full max-w-[var(--container-max)] opacity-0">
          <div className="mb-4 text-center md:mb-8 lg:mb-10">
            <span className="text-xs font-semibold tracking-wide text-brand-dark md:text-sm">
              The Journey
            </span>
            <h2 className="mt-1 font-heading text-2xl font-bold tracking-tight text-brand-dark md:mt-2 md:text-5xl lg:text-[52px]">
              Faith&apos;s story
            </h2>
            <p className="mx-auto mt-1 max-w-xl text-sm text-brand-muted md:mt-3 md:text-lg">
              From starting with nothing to empowering hundreds of Filipino entrepreneurs.
            </p>
          </div>
        </div>

        {/* ── Card + Image (fills remaining space) ── */}
        <div
          ref={cardRef}
          className="mx-auto flex w-full max-w-[var(--container-max)] flex-1 flex-col gap-4 overflow-hidden md:gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-8"
        >
          {/* Content */}
          <div className="flex flex-col gap-3 md:gap-5">
            <span className="gradient-pink-gold inline-block w-fit rounded-full px-4 py-1 text-xs font-bold tracking-wider text-brand-dark uppercase">
              {active.highlight}
            </span>
            <div>
              <p className="mb-1 font-heading text-4xl font-bold tracking-tight text-brand-dark md:text-5xl lg:text-[72px]">
                {active.year}
              </p>
              <h3 className="font-heading text-xl font-bold text-brand-dark md:text-2xl lg:text-3xl">
                {active.title}
              </h3>
            </div>
            <p className="text-sm leading-relaxed text-brand-muted md:text-base lg:max-w-lg">
              {active.description}
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="group inline-flex w-fit items-center gap-2 rounded-[var(--radius-md)] bg-brand-dark/5 px-5 py-2 text-sm font-medium text-brand-dark transition-all hover:bg-brand-dark/10"
              >
                Read more
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>

          {/* Image placeholder */}
          <div className="min-h-0 flex-1 overflow-hidden rounded-[var(--radius-xl)] bg-brand-card lg:flex-none lg:h-[340px] lg:rounded-[var(--radius-2xl)]">
            <div className="flex h-full w-full items-center justify-center text-brand-muted/20">
              <svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="m21 15-5-5L5 21" />
              </svg>
            </div>
          </div>
        </div>

        {/* Scroll hint — in flow above progress bar, not absolute */}
        {activeIndex === 0 && (
          <div className="flex animate-bounce flex-col items-center gap-1 pb-1 text-brand-muted/50 md:pb-2">
            <ChevronsDown className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-[10px] font-medium tracking-wide md:text-xs">Scroll to explore</span>
          </div>
        )}

        {/* ── Timeline progress bar — always pinned at the bottom ── */}
        <div className="mx-auto w-full max-w-[var(--container-max)]">
          <div className="flex items-start">
            {milestones.map((milestone, i) => (
              <div
                key={milestone.year}
                className="flex flex-1 flex-col items-center gap-1.5"
              >
                {/* Left line + dot + right line */}
                <div className="flex w-full items-center">
                  <div
                    className={`h-[3px] flex-1 transition-colors duration-500 ${
                      i <= activeIndex ? "bg-brand-dark" : "bg-gray-200"
                    }`}
                  />
                  <div
                    className={`h-3 w-3 shrink-0 rounded-full border-2 transition-all duration-500 md:h-[15px] md:w-[15px] ${
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
                  className={`font-heading text-xs font-bold transition-colors duration-500 sm:text-sm md:text-lg lg:text-2xl ${
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
        </div>

      </div>{/* end sticky panel */}
    </div>
  )
}
