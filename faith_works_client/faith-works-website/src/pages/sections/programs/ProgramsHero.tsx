import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { AnimatedMosaicHero } from "@/components/AnimatedMosaicHero"

export function ProgramsHero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 })

    tl.from("[data-ph-heading] .word", {
      y: 80,
      opacity: 0,
      rotateX: 30,
      stagger: 0.06,
      duration: 0.7,
    })
      .from("[data-ph-sub]", {
        y: 20,
        opacity: 0,
        duration: 0.5,
      }, "-=0.3")
      .from("[data-ph-cta]", {
        y: 16,
        opacity: 0,
        scale: 0.97,
        stagger: 0.1,
        duration: 0.5,
      }, "-=0.2")
  }, { scope: contentRef })

  const headingWords = "Programs built for Filipino CEOs".split(" ")

  return (
    <AnimatedMosaicHero>
      <div ref={contentRef}>
        <h1
          data-ph-heading
          className="font-heading text-[2.75rem] leading-[1.05] font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
          style={{ perspective: "600px" }}
        >
          {headingWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h1>

        <p
          data-ph-sub
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-white/70 md:text-lg"
        >
          Where faith meets strategy. Choose the program that fits your business
          stage and ambition.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#programs"
            data-ph-cta
            className="gradient-pink-gold inline-flex items-center rounded-[var(--radius-md)] px-8 py-3.5 text-sm font-semibold text-brand-dark shadow-button transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            Explore
          </a>
          <a
            href="#featured"
            data-ph-cta
            className="inline-flex items-center rounded-[var(--radius-md)] border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10"
          >
            Learn
          </a>
        </div>
      </div>
    </AnimatedMosaicHero>
  )
}
