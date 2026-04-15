import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import ThreeDCarousel, { type ThreeDCarouselItem } from "@/components/ThreeDCarousel"
import heroImg from "@/assets/hero.png"
import phoneImg from "@/assets/faithworks-phone.png"
import aboutImg from "@/assets/faith-about-img.jpg"

const programs: ThreeDCarouselItem[] = [
  {
    id: 1,
    brand: "Accelerator",
    title: "The accelerator program.",
    description:
      "A 12-week intensive for Filipino entrepreneurs ready to scale with strategy, structure, and accountability.",
    tags: [
      "Weekly strategy sessions",
      "1-on-1 mentorship",
      "Community access",
      "Business audit & roadmap",
    ],
    imageUrl: heroImg,
    link: "/programs",
  },
  {
    id: 2,
    brand: "Workshop",
    title: "AI workshop for your team.",
    description:
      "Practical AI integration workshops designed for business owners who want to stay ahead without the overwhelm.",
    tags: [
      "Hands-on AI tools training",
      "Custom workflow automation",
      "Team implementation plan",
      "Post-workshop support",
    ],
    imageUrl: phoneImg,
    link: "/programs",
  },
  {
    id: 3,
    brand: "Keynote",
    title: "Speaking and keynotes.",
    description:
      "Faith delivers keynotes at conferences, corporate events, and communities across the Philippines and beyond.",
    tags: [
      "Customized presentations",
      "Interactive Q&A sessions",
      "Virtual & in-person",
      "Media-ready content",
    ],
    imageUrl: aboutImg,
    link: "/media",
  },
]

export function ProgramsSection() {
  return (
    <section className="py-[var(--section-padding-mobile)] lg:py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <p className="mb-3 text-sm font-medium tracking-wide text-brand-pink">
            Programs
          </p>
          <h2 className="font-heading text-3xl font-bold text-brand-dark lg:text-4xl">
            Three paths forward
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-brand-muted">
            Find the path that fits where you are.
          </p>
        </div>

        {/* 3D Carousel */}
        <ThreeDCarousel items={programs} autoRotate rotateInterval={4000} cardHeight={500} />

        {/* View All Programs */}
        <div className="mt-10 text-center">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-pink"
          >
            View all programs & pricing
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
