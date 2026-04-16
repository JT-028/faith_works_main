"use client"

import { useApp } from "@/context/AppContext"
import { CommunityHero } from "@/sections/community/CommunityHero"
import { CommunityBenefits } from "@/sections/community/CommunityBenefits"
import { Testimonials } from "@/sections/community/Testimonials"
import { JoinCTA } from "@/sections/community/JoinCTA"

export default function CommunityClient() {
  const { ready } = useApp()

  return (
    <div>
      <CommunityHero ready={ready} />
      <CommunityBenefits />
      <Testimonials />
      <JoinCTA />
    </div>
  )
}
