"use client"

import { useApp } from "@/context/AppContext"
import { HeroSection } from "@/sections/Hero"
import { SocialProofBar } from "@/sections/SocialProof"
import { StrategicConsultancySection } from "@/sections/StrategicConsultancy"
import { ProgramsSection } from "@/sections/Programs"
import { AboutFaithSection } from "@/sections/AboutFaith"
import { CommunitySection } from "@/sections/Community"
import { TestimonialsSection } from "@/sections/Testimonials"
import { FinalCTASection } from "@/sections/FinalCTA"

export default function HomeClient() {
  const { ready } = useApp()

  return (
    <div>
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
