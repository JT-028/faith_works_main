import { useRef } from "react"
import { Link } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  ArrowRight,
  Rocket,
  Bot,
  Mic,
  CheckCircle2,
  Clock,
  Users,
  Calendar,
} from "lucide-react"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

const programs = [
  {
    icon: Rocket,
    tag: "Accelerator",
    title: "The accelerator program.",
    description:
      "A 12-week intensive for Filipino entrepreneurs ready to scale with strategy, structure, and accountability.",
    features: [
      "Weekly strategy sessions",
      "1-on-1 mentorship",
      "Community access",
      "Business audit & roadmap",
    ],
    meta: { duration: "12 weeks", cohort: "Next: July 2026", seats: "15 spots left" },
    cta: "Enroll Now",
    to: "/programs",
    accent: "from-brand-pink to-brand-gold",
    featured: true,
  },
  {
    icon: Bot,
    tag: "Workshop",
    title: "AI workshop for your team.",
    description:
      "Practical AI integration workshops designed for business owners who want to stay ahead without the overwhelm.",
    features: [
      "Hands-on AI tools training",
      "Custom workflow automation",
      "Team implementation plan",
      "Post-workshop support",
    ],
    meta: { duration: "2-day intensive", cohort: "Monthly sessions", seats: "20 per class" },
    cta: "Register Now",
    to: "/programs",
    accent: "from-brand-gold to-brand-pink",
    featured: false,
  },
  {
    icon: Mic,
    tag: "Keynote",
    title: "Speaking and keynotes.",
    description:
      "Faith delivers keynotes at conferences, corporate events, and communities across the Philippines and beyond.",
    features: [
      "Customized presentations",
      "Interactive Q&A sessions",
      "Virtual & in-person",
      "Media-ready content",
    ],
    meta: { duration: "60-90 min", cohort: "By request", seats: "Open booking" },
    cta: "Inquire Now",
    to: "/media",
    accent: "from-brand-pink to-brand-gold",
    featured: false,
  },
]

export function ProgramsSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from("[data-program-card]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 60,
      opacity: 0,
      stagger: 0.15,
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
            Programs
          </p>
          <h2 className="font-heading text-3xl font-bold text-brand-dark lg:text-4xl">
            Three paths forward
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-brand-muted">
            Find the path that fits where you are.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.tag}
              data-program-card
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] bg-brand-navy p-6 transition-all duration-300 hover:-translate-y-1.5 lg:p-8",
                program.featured
                  ? "shadow-[0_8px_40px_rgba(239,172,186,0.2)] hover:shadow-[0_12px_48px_rgba(239,172,186,0.3)]"
                  : "shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-hover)]"
              )}
            >
              {/* Gradient accent bar */}
              <div
                className={cn(
                  "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r transition-all duration-300 group-hover:h-1.5",
                  program.accent
                )}
              />

              {/* Subtle background glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-brand-pink/5 blur-3xl transition-all duration-500 group-hover:bg-brand-pink/10" />

              {/* Featured badge */}
              {program.featured && (
                <div className="absolute top-4 right-4 rounded-full bg-brand-gold/20 px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-brand-gold">
                  Popular
                </div>
              )}

              {/* Icon */}
              <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] gradient-pink-gold transition-transform duration-300 group-hover:scale-110">
                <program.icon size={22} className="text-brand-dark" />
              </div>

              {/* Tag */}
              <span className="relative mb-2 text-xs font-semibold tracking-wide uppercase text-brand-pink">
                {program.tag}
              </span>

              {/* Title */}
              <h3 className="relative mb-3 font-heading text-xl font-semibold text-white">
                {program.title}
              </h3>

              {/* Description */}
              <p className="relative mb-5 text-sm leading-relaxed text-white/60">
                {program.description}
              </p>

              {/* Meta info — reveals on hover */}
              <div className="relative mb-4 grid grid-cols-3 gap-2 overflow-hidden rounded-[var(--radius-md)] bg-white/5 p-3 transition-all duration-300 group-hover:bg-white/10">
                <div className="flex flex-col items-center gap-1 text-center">
                  <Clock size={12} className="text-brand-pink" />
                  <span className="text-[10px] leading-tight text-white/50">
                    {program.meta.duration}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 border-x border-white/10 text-center">
                  <Calendar size={12} className="text-brand-pink" />
                  <span className="text-[10px] leading-tight text-white/50">
                    {program.meta.cohort}
                  </span>
                </div>
                <div className="flex flex-col items-center gap-1 text-center">
                  <Users size={12} className="text-brand-pink" />
                  <span className="text-[10px] leading-tight text-white/50">
                    {program.meta.seats}
                  </span>
                </div>
              </div>

              {/* Feature List */}
              <ul className="relative mb-6 flex-1 space-y-2.5">
                {program.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2.5 text-sm text-white/70"
                  >
                    <CheckCircle2
                      size={14}
                      className="shrink-0 text-brand-pink"
                    />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to={program.to}
                className={cn(
                  "relative inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] px-6 py-3 text-sm font-semibold transition-all duration-300",
                  program.featured
                    ? "gradient-pink-gold text-brand-dark hover:scale-[1.02] hover:shadow-[var(--shadow-button)]"
                    : "border border-white/20 text-white hover:border-brand-pink hover:text-brand-pink"
                )}
              >
                {program.cta}
                <ArrowRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          ))}
        </div>

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
