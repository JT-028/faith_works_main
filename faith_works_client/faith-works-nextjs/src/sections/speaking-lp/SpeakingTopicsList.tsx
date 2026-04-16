"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"

interface SpeakingTopic {
  tagline: string
  title: string
  description: string
  href: string
}

const speakingTopics: SpeakingTopic[] = [
  {
    tagline: "Featured",
    title: "AI for entrepreneurs and founders",
    description:
      "Demystifying artificial intelligence for Filipino business owners.",
    href: "/programs/ai-workshop",
  },
  {
    tagline: "Strategy",
    title: "Brand strategy that builds real trust",
    description: "How to create a brand people actually believe in.",
    href: "/programs/brand-strategy",
  },
  {
    tagline: "Leadership",
    title: "Faith-driven leadership in business",
    description: "Lead with values, not just profit margins.",
    href: "/programs/leadership",
  },
]

export function SpeakingTopicsList() {
  return (
    <section className="bg-white px-6 py-[var(--section-padding)] lg:px-16">
      <div className="mx-auto max-w-[var(--container-max)]">
        {/* Section header */}
        <div data-animate className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold tracking-wide text-brand-dark">
            Topics
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[52px] lg:leading-[1.1]">
            What Faith speaks about
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-base text-brand-muted md:text-lg">
            Empower women leaders to build with conviction and clarity.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {speakingTopics.map((topic) => (
            <div
              key={topic.title}
              data-animate
              className="group overflow-hidden rounded-[var(--radius-xl)] bg-brand-card transition-shadow hover:shadow-lg"
            >
              {/* Image placeholder */}
              <div className="aspect-square w-full bg-brand-card">
                <div className="flex h-full w-full items-center justify-center text-brand-muted/20">
                  <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
              </div>
              {/* Content */}
              <div className="flex flex-col gap-4 p-6">
                <div>
                  <span className="text-xs font-semibold tracking-wider text-brand-dark/60 uppercase">
                    {topic.tagline}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-bold text-brand-dark md:text-2xl">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brand-muted">
                    {topic.description}
                  </p>
                </div>
                <Link
                  href={topic.href}
                  className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-brand-dark transition-colors hover:text-brand-dark/70"
                >
                  Learn
                  <ChevronRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
