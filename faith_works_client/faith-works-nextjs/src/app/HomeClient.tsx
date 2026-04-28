"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useApp } from "@/context/AppContext"
import { HeroSection } from "@/sections/Hero"
import { SocialProofBar } from "@/sections/SocialProof"
import { StrategicConsultancySection } from "@/sections/StrategicConsultancy"
import { ProgramsSection } from "@/sections/Programs"
import { AboutFaithSection } from "@/sections/AboutFaith"
import { CommunitySection } from "@/sections/Community"
import { TestimonialsSection } from "@/sections/Testimonials"
import { FinalCTASection } from "@/sections/FinalCTA"

gsap.registerPlugin(ScrollTrigger)

export default function HomeClient() {
  const { ready } = useApp()
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ready) return
    const sections = gsap.utils.toArray<HTMLElement>("[data-animate]")
    sections.forEach((section) => {
      gsap.from(section, {
        immediateRender: false,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
    })
  }, { scope: containerRef, dependencies: [ready] })

  return (
    <div ref={containerRef}>
      <HeroSection ready={ready} />
      <SocialProofBar />
      <StrategicConsultancySection />
      <ProgramsSection />
      <AboutFaithSection />
      <CommunitySection />
      <TestimonialsSection />
      <FinalCTASection />
    </div>
  )
}
