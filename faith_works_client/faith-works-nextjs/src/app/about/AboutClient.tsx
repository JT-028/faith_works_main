"use client"

import { AboutHero } from "@/sections/about/AboutHero"
import { Timeline } from "@/sections/about/Timeline"
import { Mission } from "@/sections/about/Mission"
import { MediaPress } from "@/sections/about/MediaPress"
import { SpeakingTopics } from "@/sections/about/SpeakingTopics"
import { SpeakingCTA } from "@/sections/about/SpeakingCTA"
import { useApp } from "@/context/AppContext"

export default function AboutClient() {
  const { ready } = useApp()

  return (
    <div>
      <AboutHero ready={ready} />
      <Timeline />
      <Mission />
      <MediaPress />
      <SpeakingTopics />
      <SpeakingCTA />
    </div>
  )
}
