import { ProgramsHero } from "./sections/programs/ProgramsHero"
import { FeaturedProgram } from "./sections/programs/FeaturedProgram"
import { ProgramCards } from "./sections/programs/ProgramCards"

export default function ProgramsPage({ ready = false }: { ready?: boolean }) {
  return (
    <div>
      <ProgramsHero ready={ready} />
      <FeaturedProgram />
      <ProgramCards />
    </div>
  )
}
