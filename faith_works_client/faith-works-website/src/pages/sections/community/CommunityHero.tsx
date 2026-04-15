import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { AnimatedMosaicHero } from "@/components/AnimatedMosaicHero"

export function CommunityHero() {
  const contentRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" }, delay: 0.3 })

    tl.from("[data-ch-heading] .word", {
      y: 80,
      opacity: 0,
      rotateX: 30,
      stagger: 0.06,
      duration: 0.7,
    })
      .from("[data-ch-sub]", {
        y: 20,
        opacity: 0,
        duration: 0.5,
      }, "-=0.3")
      .fromTo("[data-ch-cta]",
        { y: 16, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, stagger: 0.1, duration: 0.5, clearProps: "all" },
        "-=0.2"
      )
  }, { scope: contentRef })

  const headingWords = "Build your business with people who get it".split(" ")

  return (
    <AnimatedMosaicHero>
      <div ref={contentRef}>
        <h1
          data-ch-heading
          className="font-heading text-[2.5rem] leading-[1.08] font-bold tracking-tight text-white md:text-6xl lg:text-7xl"
          style={{ perspective: "600px" }}
        >
          {headingWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h1>

        <p
          data-ch-sub
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg"
        >
          Where faith meets strategy. Join Filipino entrepreneurs who are building
          real brands, making real money, and doing it with conviction. This is
          where you belong.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#join"
            data-ch-cta
            className="gradient-pink-gold inline-flex items-center rounded-[var(--radius-md)] px-8 py-3.5 text-sm font-semibold text-brand-dark shadow-button transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
          >
            Join
          </a>
          <a
            href="#benefits"
            data-ch-cta
            className="inline-flex items-center rounded-[var(--radius-md)] border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10"
          >
            Explore
          </a>
        </div>
      </div>
    </AnimatedMosaicHero>
  )
}
