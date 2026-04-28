"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import DragCarousel, { type DragCarouselItem } from "@/components/DragCarousel"

const programs: DragCarouselItem[] = [
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
    imageUrl: "/images/hero.png",
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
    imageUrl: "/images/faithworks-phone.png",
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
    imageUrl: "/images/faith-about-img.jpg",
    link: "/media",
  },
]

export function ProgramsSection() {
  return (
    <section className="py-[var(--section-padding-mobile)] lg:py-[var(--section-padding)]">
      {/* Section Header — contained */}
      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16 mb-12 lg:mb-16">
        <div className="text-center">
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
      </div>

      {/* Full-bleed drag carousel — clip horizontal overflow on mobile so fan cards don't cause scroll */}
      <div className="overflow-x-clip">
        <DragCarousel items={programs} cardHeight={500} />
      </div>

      {/* View All — contained */}
      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16 mt-10 text-center">
        <Link
          href="/programs"
          className="inline-flex items-center gap-2 text-sm font-medium text-brand-muted transition-colors hover:text-brand-pink"
        >
          View all programs &amp; pricing
          <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
