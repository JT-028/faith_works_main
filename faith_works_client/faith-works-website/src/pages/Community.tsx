import { CommunityHero } from "./sections/community/CommunityHero"
import { CommunityBenefits } from "./sections/community/CommunityBenefits"
import { Testimonials } from "./sections/community/Testimonials"
import { JoinCTA } from "./sections/community/JoinCTA"

export default function CommunityPage() {
  return (
    <div>
      <CommunityHero />
      <CommunityBenefits />
      <Testimonials />
      <JoinCTA />
    </div>
  )
}
