import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowDown, BookOpen, Sparkles, ChevronDown } from "lucide-react"
import { AnimatedMosaicHero } from "@/components/AnimatedMosaicHero"

export function ProgramsHero({ ready = false }: { ready?: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!ready) return

    gsap.set("[data-ph-badge]", { opacity: 0, y: 16, scale: 0.95 })
    gsap.set("[data-ph-heading] .word", { opacity: 0, y: 80, rotateX: 30 })
    gsap.set("[data-ph-sub]", { opacity: 0, y: 20 })
    gsap.set("[data-ph-cta]", { opacity: 0, y: 16, scale: 0.97 })
    gsap.set("[data-ph-scroll]", { opacity: 0, y: -8 })

    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 })

    tl.to("[data-ph-badge]", {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.5,
    })
      .to("[data-ph-heading] .word", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.06,
        duration: 0.7,
      }, "-=0.2")
      .to("[data-ph-sub]", {
        y: 0,
        opacity: 1,
        duration: 0.5,
      }, "-=0.3")
      .to("[data-ph-cta]", {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.5,
      }, "-=0.2")
      .to("[data-ph-scroll]", {
        y: 0,
        opacity: 1,
        duration: 0.6,
      }, "-=0.1")
  }, { scope: contentRef, dependencies: [ready] })

  const line1 = "Programs built for".split(" ")
  const line2 = "Filipino CEOs".split(" ")

  return (
    <AnimatedMosaicHero overlayOpacity="bg-brand-dark/70">
      <div ref={contentRef} style={ready ? undefined : { visibility: "hidden" }} className="flex flex-col items-center">

        {/* Eyebrow badge */}
        <div
          data-ph-badge
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/75 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#EFACBA]" />
          3 Signature Programs
          <Sparkles className="h-3.5 w-3.5 text-[#FCE82A]" />
        </div>

        {/* Heading — two lines, gradient on line 2 */}
        <h1
          data-ph-heading
          className="font-heading text-[2.75rem] leading-[1.08] font-bold tracking-tight md:text-6xl lg:text-[4.75rem]"
          style={{ perspective: "600px" }}
        >
          <span className="block text-white">
            {line1.map((word, i) => (
              <span key={`l1-${i}`} className="word inline-block mr-[0.28em]">
                {word}
              </span>
            ))}
          </span>
          <span className="block">
            {line2.map((word, i) => (
              <span
                key={`l2-${i}`}
                className="word inline-block mr-[0.28em] bg-gradient-to-r from-[#EFACBA] to-[#FCE82A] bg-clip-text text-transparent"
              >
                {word}
              </span>
            ))}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          data-ph-sub
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/60 md:text-[1.0625rem]"
        >
          Where faith meets business strategy. Choose the program aligned with
          your vision, your stage, and your calling.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#programs"
            data-ph-cta
            className="gradient-pink-gold inline-flex items-center gap-2 rounded-[var(--radius-md)] px-8 py-3.5 text-sm font-semibold text-brand-dark shadow-button transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            Explore Programs
            <ArrowDown className="h-4 w-4" />
          </a>
          <a
            href="#featured"
            data-ph-cta
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10"
          >
            <BookOpen className="h-4 w-4" />
            See Featured
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          data-ph-scroll
          className="mt-16 flex flex-col items-center gap-1.5"
        >
          <span className="text-[0.6875rem] font-medium uppercase tracking-widest text-white/30">
            Scroll
          </span>
          <ChevronDown
            className="h-4 w-4 text-white/30"
            style={{ animation: "bounce 1.8s ease-in-out infinite" }}
          />
        </div>

      </div>
    </AnimatedMosaicHero>
  )
}
