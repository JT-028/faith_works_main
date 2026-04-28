"use client"

import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface TextRevealProps {
  text: string
  as?: React.ElementType
  className?: string
  delay?: number
}

/**
 * A reusable GSAP Text Reveal component.
 * Splits text into words and applies a high-end "staggered pop-up" effect on scroll.
 */
export function TextReveal({ text, as: Tag = "span", className = "", delay = 0 }: TextRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null)
  
  // Split the string by spaces, while preserving the spaces for layout
  const words = text.split(/(\s+)/)

  useGSAP(() => {
    if (!containerRef.current) return
    
    // The animation: word elements start pushed down (yPercent) and slightly rotated
    gsap.from(".reveal-word", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", // Trigger when the text enters the bottom 15% of the viewport
        toggleActions: "play none none none"
      },
      y: "110%", // translation % of the element's height
      rotateX: 45,
      opacity: 0,
      stagger: 0.04,
      duration: 0.85,
      ease: "power3.out",
      delay: delay
    })
  }, { scope: containerRef })

  // Renders the element dynamically based on the `as` prop
  // Each word is wrapped in an overflow-hidden mask
  return (
    <Tag ref={containerRef as any} className={`text-reveal-container ${className}`} style={{ perspective: "600px", display: "inline-block" }}>
      {words.map((word, i) => {
        if (!word.trim()) {
          // It's a space, render it normally to preserve wrapping/layout
          return <span key={i}>{word}</span>
        }
        return (
          <span key={i} className="inline-flex overflow-hidden pb-1 -mb-1 align-bottom">
            <span className="reveal-word inline-block origin-bottom leading-tight">
              {word}
            </span>
          </span>
        )
      })}
    </Tag>
  )
}
