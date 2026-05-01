"use client"

import { useRef } from "react"
import Link from "next/link"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Mic, Lightbulb, Rocket } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

/* ─── Scoped CSS for sticky stacking cards ─────────────────────────────── */
const CSS = `
  .pcs-section {
    --card-height: 440px;
    --card-margin: 36px;
    --card-top-offset: 8px;
    background: #FAFAF7;
    padding-bottom: calc(3 * var(--card-margin) + 6rem);
  }

  .pcs-header {
    text-align: center;
    padding-top: var(--section-padding, 5rem);
    padding-bottom: 4rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    max-width: var(--container-max, 1200px);
    margin: 0 auto;
  }

  /* ── Stack container: flex column allows sticky items to overlap ── */
  .pcs-list {
    list-style: none;
    padding: 0 5%;
    margin: 0 auto;
    max-width: var(--container-max, 1200px);
    display: flex;
    flex-direction: column;
    gap: var(--card-margin);
    padding-bottom: calc(3 * var(--card-margin));
    box-sizing: border-box;
  }

  /* ── Each card is sticky; they visually stack as you scroll ── */
  .pcs-card {
    position: sticky;
    top: 6rem;
    height: var(--card-height);
    padding-top: calc(var(--index) * var(--card-top-offset));
    perspective: 1500px;
  }
  .pcs-card:nth-child(1) { --index: 1; --reverse-index: 2; z-index: 1; }
  .pcs-card:nth-child(2) { --index: 2; --reverse-index: 1; z-index: 2; }
  .pcs-card:nth-child(3) { --index: 3; --reverse-index: 0; z-index: 3; }

  /* ── Card Entrance Wrapper (Managed by GSAP) ── */
  .pcs-card-entrance-wrapper {
    height: 100%;
    /* We let GSAP handle opacity and transform */
  }

  /* ── Card inner: CSS scroll-driven scale + darken on exit ── */
  .pcs-card__inner {
    box-sizing: border-box;
    padding: clamp(2rem, 3.5vw, 3.5rem);
    width: 100%;
    height: 100%;
    border-radius: 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    position: relative;
    transform-origin: 50% 0%;
    /* Optional: fallback native CSS scroll animation, but GSAP handles entrance.
       If browser supports animation-timeline, it applies this exit animation. */
    will-change: transform, filter;
  }

  @supports (animation-timeline: view()) {
    .pcs-card__inner {
      animation: pcs-scale-card linear forwards;
      animation-timeline: view();
      animation-range: exit-crossing 0% exit-crossing 100%;
    }
  }

  /* ── Brand-palette card backgrounds ── */
  .pcs-card:nth-child(1) .pcs-card__inner {
    background: #FFF0F5;
    color: #0c090a;
    border: 1px solid rgba(239,172,186,0.35);
    --pcs-shadow: rgba(239,172,186,0.55);
  }
  .pcs-card:nth-child(2) .pcs-card__inner {
    background: #FFFCE3;
    color: #0c090a;
    border: 1px solid rgba(252,232,42,0.4);
    --pcs-shadow: rgba(220,200,0,0.45);
  }
  .pcs-card:nth-child(3) .pcs-card__inner {
    background: #0D1B40;
    color: #ffffff;
    border: 1px solid rgba(255,255,255,0.07);
    --pcs-shadow: rgba(13,27,64,0.65);
  }

  /* ── Scale + slight push back as each card exits the viewport top ── */
  @keyframes pcs-scale-card {
    to {
      transform: scale(calc(1 - 0.05 * var(--reverse-index))) translateY(calc(-8px * var(--reverse-index)));
      filter: brightness(0.72);
      border-radius: 20px;
      box-shadow: 0 40px 80px -20px var(--pcs-shadow);
    }
  }

  /* ── Tag pill ── */
  .pcs-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.68rem;
    font-weight: 700;
    letter-spacing: 0.13em;
    text-transform: uppercase;
    padding: 6px 14px;
    border-radius: 100px;
    margin-bottom: 1.25rem;
    width: fit-content;
  }
  .pcs-card:nth-child(1) .pcs-tag { background: rgba(239,172,186,0.22); color: #b83050; }
  .pcs-card:nth-child(2) .pcs-tag { background: rgba(252,232,42,0.3);  color: #6b5800; }
  .pcs-card:nth-child(3) .pcs-tag { background: rgba(255,255,255,0.1);  color: rgba(255,255,255,0.75); }

  /* ── Card title ── */
  .pcs-title {
    font-size: clamp(1.6rem, 3vw, 2.8rem);
    font-weight: 700;
    line-height: 1.08;
    margin: 0 0 1rem;
    letter-spacing: -0.02em;
  }

  /* ── Card description ── */
  .pcs-desc {
    font-size: clamp(0.9rem, 1.4vw, 1.05rem);
    line-height: 1.65;
    max-width: 560px;
    opacity: 0.72;
    margin: 0;
  }

  /* ── CTA button ── */
  .pcs-cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.88rem;
    font-weight: 600;
    text-decoration: none;
    padding: 13px 26px;
    border-radius: 100px;
    width: fit-content;
    transition: gap 0.2s ease, opacity 0.2s ease;
  }
  .pcs-cta:hover { gap: 13px; opacity: 0.88; }
  .pcs-card:nth-child(1) .pcs-cta { background: #EFACBA; color: #fff; }
  .pcs-card:nth-child(2) .pcs-cta { background: #FCE82A; color: #0c090a; }
  .pcs-card:nth-child(3) .pcs-cta { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.18); }

  /* ── Ghost number watermark ── */
  .pcs-num {
    position: absolute;
    right: 2rem;
    top: -0.75rem;
    font-size: clamp(5rem, 14vw, 11rem);
    font-weight: 700;
    line-height: 1;
    opacity: 0.07;
    user-select: none;
    pointer-events: none;
  }
`

interface ProgramCard {
  num: string
  tag: string
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
  icon: React.ReactNode
}

const programs: ProgramCard[] = [
  {
    num: "01",
    tag: "Workshop",
    title: "Master AI for your business",
    description:
      "Learn to use AI without the hype. Solo or bring your team. Both tracks work.",
    ctaLabel: "Register",
    ctaHref: "/programs/workshop",
    icon: <Lightbulb className="h-4 w-4" />,
  },
  {
    num: "02",
    tag: "Speaking",
    title: "Bring Faith to your event",
    description:
      "Corporate events, conferences, retreats. Faith speaks on strategy, AI, and building with conviction.",
    ctaLabel: "Inquire",
    ctaHref: "/speaking",
    icon: <Mic className="h-4 w-4" />,
  },
  {
    num: "03",
    tag: "Accelerator",
    title: "Six weeks. Real mentorship. Real growth.",
    description:
      "For CEOs and founders serious about building a brand that lasts and scales fast.",
    ctaLabel: "Enroll",
    ctaHref: "/programs/accelerator",
    icon: <Rocket className="h-4 w-4" />,
  },
]

export function ProgramCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLLIElement | null)[]>([])
  const wrapperRefs = useRef<(HTMLDivElement | null)[]>([])

  useGSAP(() => {
    gsap.from(headingRef.current, {
      scrollTrigger: {
        trigger: headingRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })

    // Entrance animation for the program cards
    const wrappers = gsap.utils.toArray('.pcs-card-entrance-wrapper')
    const cards = gsap.utils.toArray('.pcs-card')

    wrappers.forEach((wrapper: any, index) => {
      const card = cards[index] as HTMLElement
      if (!card || !wrapper) return
      
      gsap.fromTo(wrapper,
        { opacity: 0, y: 100 },
        {
          scrollTrigger: {
            trigger: card,
            start: "top 90%", // Trigger slightly earlier so it catches as soon as it enters 
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out", // Regular ease just to be safe
        }
      )
    })
  }, { scope: containerRef, dependencies: [] })

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <section id="programs" ref={containerRef} className="pcs-section">
        {/* Section header */}
        <div ref={headingRef} className="pcs-header">
          <h2 className="font-heading text-[1.75rem] font-bold tracking-tight text-brand-dark md:text-3xl">
            Choose your path
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-brand-muted">
            Three programs designed for different stages of your journey.
          </p>
        </div>

        {/* Sticky stacking cards */}
        <ul className="pcs-list">
          {programs.map((program, index) => (
            <li 
              key={program.num} 
              className="pcs-card"
            >
              <div 
                className="pcs-card-entrance-wrapper" 
                style={{ height: '100%', willChange: 'opacity, transform' }}
              >
                <div className="pcs-card__inner">
                  <span className="pcs-num" aria-hidden="true">{program.num}</span>

                  <div>
                    <span className="pcs-tag">
                      {program.icon}
                      {program.tag}
                    </span>
                    <h3 className="pcs-title">{program.title}</h3>
                    <p className="pcs-desc">{program.description}</p>
                  </div>

                  <Link href={program.ctaHref} className="pcs-cta">
                    {program.ctaLabel}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
