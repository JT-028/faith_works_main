import { ProgramsHero } from "./sections/programs/ProgramsHero"
import { FeaturedProgram } from "./sections/programs/FeaturedProgram"
import { ProgramCards } from "./sections/programs/ProgramCards"

export default function ProgramsPage() {
  return (
    <div>
      <ProgramsHero />
      <FeaturedProgram />
      <ProgramCards />
    </div>
  )
}
