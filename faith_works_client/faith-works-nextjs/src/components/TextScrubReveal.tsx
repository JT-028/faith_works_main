"use client"

import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SplitType from "split-type"

gsap.registerPlugin(ScrollTrigger)

interface TextScrubRevealProps {
  children: string
  className?: string
  maskColor?: string // Use a CSS variable or valid color to hide unrevealed text
}

/**
 * Applies a GSAP "scrubbing text reveal" effect where a mask 
 * uncovers the text word by word or line by line as you scroll down.
 */
export function TextScrubReveal({
  children,
  className = "",
  maskColor = "#ffffff" // Defaults to white to act as a cover on white backgrounds
}: TextScrubRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current) return

    // 1. Split text into lines and words
    const split = new SplitType(containerRef.current, {
      types: "lines,words",
      tagName: "span",
    })

    const words = split.words
    if (!words) return

    // 2. Append a line-mask onto each word div
    const maskElements: HTMLElement[] = []

    words.forEach((wordElement) => {
      // Must be relative so absolute mask attaches to it
      wordElement.style.position = "relative"

      const mask = document.createElement("span")
      mask.className = "line-mask"
      mask.style.position = "absolute"
      mask.style.top = "0"
      mask.style.right = "0"
      mask.style.backgroundColor = maskColor
      mask.style.opacity = "0.75" // Slightly transparent to look styled, per user req
      mask.style.height = "100%"
      mask.style.width = "100%"
      mask.style.zIndex = "2"

      wordElement.appendChild(mask)
      maskElements.push(mask)
    })

    // 3. Animate masks away on scroll scrub
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // slightly lower so it starts animating when comfortably in view
        end: "bottom 50%",
        scrub: 1, // Smooth scrub
      },
    })

    tl.to(maskElements, {
      width: "0%",
      duration: 1,
      stagger: 0.15,
      ease: "none",
    })

    // Clean up dom manually on unmount
    return () => {
      split.revert()
    }
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={`split-word ${className}`}>
      {children}
    </div>
  )
}
