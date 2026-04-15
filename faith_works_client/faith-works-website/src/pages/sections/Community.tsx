import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Users,
  Lightbulb,
  MessageCircle,
  ArrowRight,
  TrendingUp,
  Globe,
  Heart,
} from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: "500+", label: "Active Members", icon: Users },
  { value: "12", label: "Countries", icon: Globe },
  { value: "95%", label: "Satisfaction", icon: Heart },
  { value: "3x", label: "Avg Growth", icon: TrendingUp },
]

const benefits = [
  {
    icon: Users,
    title: "Direct access to Faith",
    description:
      "Get personal guidance and feedback from Faith inside an exclusive community of driven Filipino entrepreneurs.",
    hoverDetails: [
      "Live monthly Q&A sessions",
      "DM access for quick questions",
      "Priority feedback on your strategy",
    ],
    gradient: "from-brand-pink/20 to-brand-gold/20",
  },
  {
    icon: Lightbulb,
    title: "Weekly strategy drops",
    description:
      "Practical, no-fluff strategy content every week — frameworks, templates, and real examples you can use right away.",
    hoverDetails: [
      "Downloadable templates & SOPs",
      "Video walkthroughs every Friday",
      "Members-only resource vault",
    ],
    gradient: "from-brand-gold/20 to-brand-pink/20",
  },
  {
    icon: MessageCircle,
    title: "Network with your peers",
    description:
      "Connect with fellow Filipino CEOs who understand your challenges, celebrate your wins, and keep you accountable.",
    hoverDetails: [
      "Private mastermind circles",
      "Regional meetup events",
      "Accountability partner matching",
    ],
    gradient: "from-brand-pink/20 to-brand-gold/20",
  },
]

export function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from("[data-stat]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      stagger: 0.08,
      duration: 0.5,
      ease: "power3.out",
    })

    gsap.from("[data-community-card]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 50,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: "power3.out",
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="py-[var(--section-padding-mobile)] lg:py-[var(--section-padding)]"
    >
      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <p className="mb-3 text-sm font-medium tracking-wide text-brand-pink">
            Community
          </p>
          <h2 className="font-heading text-3xl font-bold text-brand-dark lg:text-4xl">
            Join the movement
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-brand-muted">
            Connect with other Filipino entrepreneurs building real businesses.
          </p>
        </div>

        {/* Stats Row */}
        <div className="mb-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              data-stat
              className="flex flex-col items-center rounded-[var(--radius-lg)] bg-white p-5 text-center shadow-sm transition-all duration-300 hover:shadow-[var(--shadow-card)] hover:-translate-y-0.5"
            >
              <stat.icon size={18} className="mb-2 text-brand-pink" />
              <span className="font-heading text-2xl font-bold text-brand-dark">
                {stat.value}
              </span>
              <span className="mt-1 text-xs text-brand-muted">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Benefit Cards — flip-reveal on hover */}
        <div className="grid gap-6 md:grid-cols-3">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              data-community-card
              className="group relative h-[320px] [perspective:1000px]"
            >
              {/* Card inner — flips on hover */}
              <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front face */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[var(--radius-xl)] bg-white p-8 text-center shadow-[var(--shadow-card)] [backface-visibility:hidden]">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-brand-pink-light transition-transform duration-300 group-hover:scale-110">
                    <benefit.icon size={24} className="text-brand-pink" />
                  </div>
                  <h3 className="mb-3 font-heading text-lg font-semibold text-brand-dark">
                    {benefit.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-muted">
                    {benefit.description}
                  </p>
                  <span className="mt-4 text-xs font-medium text-brand-pink">
                    Hover for details
                  </span>
                </div>

                {/* Back face — revealed on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-[var(--radius-xl)] bg-brand-navy p-8 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                  <benefit.icon size={28} className="mb-4 text-brand-pink" />
                  <h4 className="mb-4 font-heading text-lg font-semibold text-white">
                    What you get
                  </h4>
                  <ul className="space-y-3">
                    {benefit.hoverDetails.map((detail) => (
                      <li
                        key={detail}
                        className="flex items-center gap-2 text-sm text-white/70"
                      >
                        <ArrowRight size={12} className="shrink-0 text-brand-pink" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://facebook.com/groups/faithworks"
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn inline-flex items-center gap-2 rounded-[var(--radius-md)] border-2 border-brand-dark px-8 py-3.5 text-sm font-semibold text-brand-dark transition-all hover:bg-brand-dark hover:text-white"
          >
            Join the Free Community
            <ArrowRight
              size={14}
              className="transition-transform group-hover/btn:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
