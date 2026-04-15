import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Topic {
  tag: string
  title: string
  description: string
}

const topics: Topic[] = [
  {
    tag: "Strategy",
    title: "Brand strategy for Filipino founders",
    description:
      "How to position your business so it actually stands out in a crowded market.",
  },
  {
    tag: "Mindset",
    title: "The founder mindset that scales businesses",
    description:
      "What separates founders who win from those who stay stuck at the same level.",
  },
  {
    tag: "AI",
    title: "AI integration without losing your brand",
    description:
      "Use AI to work faster while keeping what makes you real and authentic.",
  },
]

export function SpeakingTopics() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from("[data-speaking-header]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out",
    })

    gsap.from("[data-speaking-card]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: "[data-speaking-card]",
        start: "top 90%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.6,
      ease: "power3.out",
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 py-[var(--section-padding)] lg:px-16"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        {/* Header */}
        <div data-speaking-header className="mb-16 text-center">
          <span className="text-sm font-semibold tracking-wide text-brand-dark">
            Speaking
          </span>
          <h2 className="mt-3 font-heading text-4xl font-bold tracking-tight text-brand-dark md:text-5xl lg:text-[52px]">
            What Faith speaks about
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-brand-muted">
            Faith brings real experience to every stage she takes.
          </p>
        </div>

        {/* Topic cards */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {topics.map((topic) => (
            <div
              key={topic.tag}
              data-speaking-card
              className="group flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-brand-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              {/* Image placeholder */}
              <div className="relative h-56 w-full bg-brand-dark/5">
                <div className="flex h-full w-full items-center justify-center text-brand-muted/20">
                  <svg
                    width={56}
                    height={56}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="m21 15-5-5L5 21" />
                  </svg>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-6 p-8">
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold tracking-wide text-brand-dark">
                    {topic.tag}
                  </span>
                  <h3 className="font-heading text-2xl font-bold leading-tight tracking-tight text-brand-dark">
                    {topic.title}
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-brand-muted">
                    {topic.description}
                  </p>
                </div>

                <button
                  type="button"
                  className="group/btn mt-auto inline-flex w-fit items-center gap-1 text-sm font-medium text-brand-dark"
                >
                  <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
