import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SpeakingHero } from "./sections/speaking-lp/SpeakingHero"
import { SpeakingTopics } from "./sections/speaking-lp/SpeakingTopics"
import { TrustedBy } from "./sections/speaking-lp/TrustedBy"
import { SpeakerBanner } from "./sections/speaking-lp/SpeakerBanner"
import { SpeakingTopicsList } from "./sections/speaking-lp/SpeakingTopicsList"
import { SpeakingInquiry } from "./sections/speaking-lp/SpeakingInquiry"
import { InspireCTA } from "./sections/speaking-lp/InspireCTA"

gsap.registerPlugin(ScrollTrigger)

export default function SpeakingLPPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
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
  }, { scope: containerRef })

  return (
    <div ref={containerRef}>
      <SpeakingHero />
      <SpeakingTopics />
      <TrustedBy />
      <SpeakerBanner />
      <SpeakingTopicsList />
      <SpeakingInquiry />
      <InspireCTA />
    </div>
  )
}
