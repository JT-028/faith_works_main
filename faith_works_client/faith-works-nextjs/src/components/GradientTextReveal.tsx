"use client"

import type { ReactNode } from "react"
import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

interface GradientTextRevealProps {
  children: ReactNode
  className?: string
  activeColor?: string
  inactiveColor?: string
}

/**
 * Sequential line-by-line reveal.
 * A static paragraph stays visible in the inactive color while
 * an identical overlay paragraph is split into lines and uncovered
 * by animated masks inside one staggered timeline.
 */
export function GradientTextReveal({
  children,
  className = "",
  activeColor = "rgb(255, 255, 255)",
  inactiveColor = "rgb(55, 55, 55)",
}: GradientTextRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const baseRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const wrapper = wrapperRef.current
    const base = baseRef.current
    const overlay = overlayRef.current
    if (!wrapper || !base || !overlay) return

    // Split BOTH layers identically so their line heights and positions are always in sync.
    // If only the overlay is split, <br/><br/> gaps can compress differently in each layer
    // causing the active and inactive text to appear at different vertical positions.
    const splitBase = new SplitType(base, {
      types: "lines",
      tagName: "div",
    })
    const splitOverlay = new SplitType(overlay, {
      types: "lines",
      tagName: "div",
    })

    if (!splitOverlay.lines?.length) return

    const masks: HTMLElement[] = []

    splitOverlay.lines.forEach((line) => {
      line.style.display = "block"
      line.style.position = "relative"
      line.style.clipPath = "inset(0 100% 0 0)"
      masks.push(line)
    })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top 95%",
        end: "bottom 60%",
        scrub: 1,
      },
    })

    timeline.to(masks, {
      clipPath: "inset(0 0% 0 0)",
      ease: "none",
      duration: 1,
      stagger: 1,
    })

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
      splitBase.revert()
      splitOverlay.revert()
    }
  }, { scope: wrapperRef })

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div ref={baseRef} className="relative z-0" style={{ color: inactiveColor }}>
        {children}
      </div>
      <div
        ref={overlayRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{ color: activeColor }}
      >
        {children}
      </div>
    </div>
  )
}
