"use client"

import { useApp } from "@/context/AppContext"
import { ProgramsHero } from "@/sections/programs/ProgramsHero"
import { FeaturedProgram } from "@/sections/programs/FeaturedProgram"
import { ProgramCards } from "@/sections/programs/ProgramCards"

export default function ProgramsClient() {
  const { ready } = useApp()

  return (
    <div>
      <ProgramsHero ready={ready} />
      <FeaturedProgram />
      <ProgramCards />
    </div>
  )
}
