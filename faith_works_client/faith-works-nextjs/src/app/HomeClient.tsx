"use client"

import { useApp } from "@/context/AppContext"
import { HeroSection } from "@/sections/Hero"
import { SocialProofBar } from "@/sections/SocialProof"
import { StrategicConsultancySection } from "@/sections/StrategicConsultancy"
import { ProgramsSection } from "@/sections/Programs"
import { AboutFaithSection } from "@/sections/AboutFaith"
import { CommunityTestimonialsSection } from "@/sections/CommunityTestimonials"
import { FinalCTASection } from "@/sections/FinalCTA"

export default function HomeClient() {
  const { ready } = useApp()

  return (
    <div>
      <HeroSection ready={ready} />
      <SocialProofBar />
      <StrategicConsultancySection />
      <AboutFaithSection />
      <ProgramsSection />
      <CommunityTestimonialsSection />
      <FinalCTASection />
    </div>
  )
}
