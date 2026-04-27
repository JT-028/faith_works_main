"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Image from "next/image"

interface IntroLoaderProps {
  onComplete: () => void
}

const PHASES = [
  { word: "saves.", bg: "#E84C5E", color: "#f8b4bb" },
  { word: "guides.", bg: "#F5B5C4", color: "#E84C5E" },
  { word: "works.", bg: "#FCE82A", color: "#d4940a" },
]

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const prefixRef = useRef<HTMLSpanElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const textBlockRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const logoInnerRef = useRef<HTMLDivElement>(null)
  const [phase, setPhase] = useState(0)
  const [isDone, setIsDone] = useState(false)

  useGSAP(() => {
    if (isDone) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete()
      return
    }

    const tl = gsap.timeline({
      onComplete: () => {
        if (phase < PHASES.length - 1) {
          setPhase((p) => p + 1)
        } else {
          animateToCenter()
        }
      },
    })

    gsap.set(containerRef.current, { backgroundColor: PHASES[phase].bg })

    tl.fromTo(
      wordRef.current,
      { y: 60, opacity: 0, filter: "blur(8px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power3.out" }
    )
    if (phase === 0) {
      tl.fromTo(
        prefixRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
        "<0.1"
      )
    }

    tl.to({}, { duration: 0.8 })

    if (phase < PHASES.length - 1) {
      tl.to(wordRef.current, {
        y: -40,
        opacity: 0,
        filter: "blur(6px)",
        duration: 0.4,
        ease: "power2.in",
      })
    }
  }, { scope: containerRef, dependencies: [phase, isDone] })

  function animateToCenter() {
    const textBlock = textBlockRef.current
    const logo = logoRef.current
    const logoInner = logoInnerRef.current
    if (!textBlock || !containerRef.current || !logo || !logoInner) {
      onComplete()
      return
    }

    setIsDone(true)

    const anchors = Array.from(document.querySelectorAll<HTMLElement>("[data-navbar-logo-anchor]"))
    const visibleAnchor = anchors.find((anchor) => {
      const rect = anchor.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0
    })

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete()
      },
    })

    const containerRect = containerRef.current.getBoundingClientRect()
    const textRect = textBlock.getBoundingClientRect()

    const centerX = containerRect.width / 2 - textRect.width / 2
    const centerY = containerRect.height / 2 - textRect.height / 2

    const currentX = textRect.left - containerRect.left
    const currentY = textRect.top - containerRect.top

    const deltaX = centerX - currentX
    const deltaY = centerY - currentY

    const logoRect = logoInner.getBoundingClientRect()
    const targetRect = visibleAnchor?.getBoundingClientRect()
    const translateX = targetRect ? targetRect.left + targetRect.width / 2 - (logoRect.left + logoRect.width / 2) : 0
    const translateY = targetRect ? targetRect.top + targetRect.height / 2 - (logoRect.top + logoRect.height / 2) : 0
    const scaleRatio = targetRect && logoRect.width > 0 ? targetRect.width / logoRect.width : 0.38

    // Phase 1: Move text to center + background to white
    tl.to(containerRef.current, {
      backgroundColor: "#ffffff",
      duration: 0.6,
      ease: "power2.inOut",
    })

    tl.to(
      textBlock,
      { x: deltaX, y: deltaY, duration: 0.8, ease: "power3.inOut" },
      "<"
    )
    tl.to(
      [prefixRef.current, wordRef.current],
      { color: "#d28899", duration: 0.6, ease: "power2.inOut" },
      "<"
    )

    // Phase 2: Crossfade text → logo
    tl.to(textBlock, {
      opacity: 0,
      scale: 0.92,
      filter: "blur(6px)",
      duration: 0.5,
      ease: "power2.in",
    }, "+=0.3")

    tl.fromTo(
      logo,
      { opacity: 0, scale: 0.85, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.7, ease: "power2.out" },
      "<0.15"
    )

    // Phase 3: Hold on logo before handoff
    tl.to({}, { duration: 0.45 })

    // Phase 4: Move the logo into the visible navbar mark.
    tl.to(logoInner, {
      x: translateX,
      y: translateY,
      scale: scaleRatio,
      duration: 0.9,
      ease: "power3.inOut",
    })

    // Phase 5: Fade the loader away so the navbar logo underneath takes over.
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.24,
      ease: "power2.out",
    })
  }

  const currentPhase = PHASES[phase]

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-end justify-start overflow-hidden"
      style={{ backgroundColor: currentPhase.bg }}
      role="status"
      aria-busy="true"
      aria-live="polite"
      aria-label="Loading Faith Works"
    >
      <span className="sr-only">Loading Faith Works</span>

      {/* Animated text block */}
      <div
        ref={textBlockRef}
        className="mb-[12vh] ml-[8vw] select-none"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <div className="flex flex-col leading-[0.9]">
          <span
            ref={prefixRef}
            className="font-heading text-[clamp(2.5rem,8vw,7rem)] font-bold uppercase tracking-tight"
            style={{ color: currentPhase.color }}
          >
            faith
          </span>
          <span
            ref={wordRef}
            className="font-heading text-[clamp(2.5rem,8vw,7rem)] font-bold uppercase tracking-tight"
            style={{ color: currentPhase.color }}
          >
            {currentPhase.word}
          </span>
        </div>
      </div>

      {/* Logo reveal — centered, initially hidden */}
      <div
        ref={logoRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: 0, willChange: "transform, opacity" }}
        aria-hidden="true"
      >
        <div ref={logoInnerRef} style={{ willChange: "transform, opacity" }}>
          <Image
            src="/images/faithworks.png"
            alt="FaithWorks"
            width={480}
            height={280}
            className="h-auto w-[clamp(240px,40vw,480px)]"
            priority
          />
        </div>
      </div>
    </div>
  )
}
