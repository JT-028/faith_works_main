import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function JoinCTA() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from("[data-jc-heading]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })

    gsap.from("[data-jc-sub]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 78%",
        toggleActions: "play none none none",
      },
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.1,
    })

    gsap.from("[data-jc-cta]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      },
      y: 16,
      opacity: 0,
      scale: 0.97,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.2,
    })
  }, { scope: sectionRef })

  return (
    <section
      id="join"
      ref={sectionRef}
      className="bg-brand-offwhite px-6 pb-[var(--section-padding)] pt-8 lg:px-16"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        <div className="relative overflow-hidden rounded-[var(--radius-2xl)] bg-brand-dark px-8 py-16 text-center md:px-16 md:py-20">
          {/* Subtle gradient accents */}
          <div className="pointer-events-none absolute -left-20 -top-20 h-60 w-60 rounded-full bg-brand-pink/10 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-brand-gold/10 blur-[80px]" />

          <h2
            data-jc-heading
            className="relative font-heading text-[1.75rem] font-bold tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Join the free community
          </h2>

          <p
            data-jc-sub
            className="relative mx-auto mt-4 max-w-lg text-base text-white/60 md:text-lg"
          >
            No pitch. No gatekeeping. Just real entrepreneurs helping each other
            win.
          </p>

          <div className="relative mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              data-jc-cta
              className="gradient-pink-gold inline-flex items-center rounded-[var(--radius-md)] px-8 py-3.5 text-sm font-semibold text-brand-dark shadow-button transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              Join
            </a>
            <a
              href="#benefits"
              data-jc-cta
              className="inline-flex items-center rounded-[var(--radius-md)] border border-white/20 bg-white/5 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/30 hover:bg-white/10"
            >
              Learn
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
