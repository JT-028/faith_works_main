"use client"

import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Star } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  quote: string
  name: string
  role: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The community pushed me to stop playing small. I doubled my revenue in six months because people here held me accountable.",
    name: "Maria Santos",
    role: "Founder, Santos Co.",
    rating: 5,
  },
  {
    quote:
      "Faith doesn't just give advice. She shows up. The group is full of people who actually understand what it takes to build something real.",
    name: "Carlos Reyes",
    role: "CTO, Reyes Digital",
    rating: 5,
  },
  {
    quote:
      "I came in lost. Now I have a strategy, a network, and the confidence to execute. This is the best investment I've made in my business.",
    name: "Ana Mercado",
    role: "Owner, Mercado Brands",
    rating: 5,
  },
]

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          className="h-4 w-4 fill-brand-gold text-brand-gold"
        />
      ))}
    </div>
  )
}

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from("[data-tm-heading]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 82%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })

    gsap.from("[data-tm-card]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: "[data-tm-card]",
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: "power3.out",
    })
  }, { scope: sectionRef })

  return (
    <section
      ref={sectionRef}
      className="bg-brand-offwhite px-6 py-[var(--section-padding)] lg:px-16"
    >
      <div className="mx-auto max-w-[var(--container-max)]">
        {/* Section header */}
        <div data-tm-heading className="mb-14 text-center lg:mb-16">
          <h2 className="font-heading text-[2rem] font-bold tracking-tight text-brand-dark md:text-4xl lg:text-5xl">
            Real voices
          </h2>
          <p className="mx-auto mt-3 max-w-md text-base text-brand-muted">
            What members are building
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              data-tm-card
              className="flex flex-col rounded-[var(--radius-xl)] bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-card-hover lg:p-8"
            >
              <StarRating count={testimonial.rating} />

              <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-brand-dark/80">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-brand-dark/5 pt-5">
                {/* Avatar placeholder */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-card text-sm font-bold text-brand-muted">
                  {testimonial.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-dark">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-brand-muted">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
