import { useRef, useEffect } from "react"
import { Link } from "react-router-dom"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ArrowRight, Sparkles } from "lucide-react"

gsap.registerPlugin(ScrollToPlugin)

export function AboutHero({ ready = false }: { ready?: boolean }) {
  const heroRef = useRef<HTMLElement>(null)

  // Snap to Timeline on the first downward scroll from the hero
  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    let snapping = false

    function snapToTimeline() {
      if (snapping) return
      const timelineEl = document.getElementById("timeline")
      if (!timelineEl) return
      snapping = true
      gsap.to(window, {
        scrollTo: { y: timelineEl, offsetY: 0 },
        duration: 0.9,
        ease: "power3.inOut",
        onComplete: () => {
          snapping = false
          window.dispatchEvent(new CustomEvent("faithworks:timeline-snap"))
        },
      })
    }

    function onWheel(e: WheelEvent) {
      // Only intercept when still inside the hero
      if (window.scrollY > hero!.offsetHeight * 0.6) return
      if (e.deltaY <= 0) return
      e.preventDefault()
      snapToTimeline()
    }

    let touchStartY = 0
    function onTouchStart(e: TouchEvent) {
      touchStartY = e.touches[0].clientY
    }
    function onTouchEnd(e: TouchEvent) {
      if (window.scrollY > hero!.offsetHeight * 0.6) return
      const delta = touchStartY - e.changedTouches[0].clientY
      if (delta > 40) snapToTimeline()
    }

    window.addEventListener("wheel", onWheel, { passive: false })
    window.addEventListener("touchstart", onTouchStart, { passive: true })
    window.addEventListener("touchend", onTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("wheel", onWheel)
      window.removeEventListener("touchstart", onTouchStart)
      window.removeEventListener("touchend", onTouchEnd)
    }
  }, [])

  useGSAP(() => {
    if (!ready) return

    // Set initial states synchronously before any paint
    gsap.set("[data-about-tagline]", { opacity: 0, y: 20 })
    gsap.set("[data-about-heading] .word", { opacity: 0, y: 80, rotateX: 30 })
    gsap.set("[data-about-sub]", { opacity: 0, y: 20 })
    gsap.set("[data-about-cta]", { opacity: 0, y: 16, scale: 0.97 })

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    tl.to("[data-about-tagline]", {
      y: 0,
      opacity: 1,
      duration: 0.5,
    })
      .to("[data-about-heading] .word", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        stagger: 0.06,
        duration: 0.7,
      }, "-=0.2")
      .to("[data-about-sub]", {
        y: 0,
        opacity: 1,
        duration: 0.5,
      }, "-=0.3")
      .to("[data-about-cta]", {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.5,
      }, "-=0.2")
  }, { scope: heroRef, dependencies: [ready] })

  const headingWords = "Where faith meets strategy".split(" ")

  return (
    <section
      ref={heroRef}
      data-about-hero
      className="relative flex min-h-screen items-center overflow-hidden bg-brand-offwhite px-6 lg:px-16"
    >
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] translate-x-1/3 -translate-y-1/3 rounded-full bg-brand-pink/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] -translate-x-1/3 translate-y-1/3 rounded-full bg-brand-gold/10 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-[var(--container-max)] flex-col items-center py-32 text-center lg:py-40" style={ready ? undefined : { visibility: 'hidden' }}>
        {/* Tagline */}
        <div
          data-about-tagline
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-brand-pink-light px-4 py-1.5"
        >
          <Sparkles className="h-4 w-4 text-brand-pink-dark" />
          <span className="text-sm font-semibold tracking-wide text-brand-dark">
            About Faith
          </span>
        </div>

        {/* Heading with split words */}
        <h1
          data-about-heading
          className="font-heading text-5xl leading-[1.1] font-bold tracking-tight text-brand-dark md:text-6xl lg:text-7xl"
          style={{ perspective: "600px" }}
        >
          {headingWords.map((word, i) => (
            <span
              key={i}
              className="word mr-[0.25em] inline-block last:mr-0"
              style={{ transformStyle: "preserve-3d" }}
            >
              {word === "faith" || word === "strategy" ? (
                <span className="bg-gradient-to-r from-brand-pink-dark to-brand-gold bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          data-about-sub
          className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-muted md:text-xl"
        >
          From zero capital to building a community of 500+ Filipino entrepreneurs.
          This is Faith Natividad&apos;s story of grit, strategy, and unwavering conviction.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="#timeline"
            data-about-cta
            className="gradient-pink-gold inline-flex items-center gap-2 rounded-[var(--radius-md)] px-7 py-3 text-sm font-semibold text-brand-dark shadow-button transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            Explore her journey
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/community"
            data-about-cta
            className="inline-flex items-center gap-2 rounded-[var(--radius-md)] bg-brand-dark/5 px-7 py-3 text-sm font-semibold text-brand-dark transition-all duration-300 hover:bg-brand-dark/10"
          >
            Connect with Faith
          </Link>
        </div>
      </div>
    </section>
  )
}
