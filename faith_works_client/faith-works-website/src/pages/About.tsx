import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { AboutHero } from "./sections/about/AboutHero"
import { Timeline } from "./sections/about/Timeline"
import { Mission } from "./sections/about/Mission"
import { MediaPress } from "./sections/about/MediaPress"
import { SpeakingTopics } from "./sections/about/SpeakingTopics"
import { SpeakingCTA } from "./sections/about/SpeakingCTA"

gsap.registerPlugin(ScrollTrigger)

export default function AboutPage({ ready = false }: { ready?: boolean }) {
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
      <AboutHero ready={ready} />
      <Timeline />
      <Mission />
      <MediaPress />
      <SpeakingTopics />
      <SpeakingCTA />
    </div>
  )
}
