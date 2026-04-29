"use client"

import { Star, Quote, TrendingUp } from "lucide-react"

const testimonials = [
  {
    rating: 5,
    quote:
      "Faith Works changed the trajectory of my business. I finally have a brand strategy that makes sense and a community that keeps me accountable.",
    result: "3x revenue in 6 months",
    name: "Ana Reyes",
    role: "CEO, Bloom Studio",
    program: "Accelerator",
    avatar: "AR",
  },
  {
    rating: 5,
    quote:
      "The accelerator gave me clarity I'd been looking for for years. Faith doesn't just motivate — she gives you the exact steps to win.",
    result: "Launched 2 new products",
    name: "Carlos Mendoza",
    role: "Founder, Mendoza Corp",
    program: "Accelerator",
    avatar: "CM",
  },
  {
    rating: 5,
    quote:
      "I joined the AI workshop and it completely shifted how my team operates. Real tools, real results. No tech jargon, just practical value.",
    result: "40% time saved on ops",
    name: "Maria Santos",
    role: "Operations Director, TechPH",
    program: "AI Workshop",
    avatar: "MS",
  },
]

export function TestimonialsSection() {
  return (
    <section className="bg-white py-[var(--section-padding-mobile)] lg:py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16">
        {/* Section Header */}
        <div className="mb-12 text-center lg:mb-16">
          <p className="mb-3 text-sm font-medium tracking-wide text-brand-pink">
            Testimonials
          </p>
          <h2 className="font-heading text-3xl font-bold text-brand-dark lg:text-4xl">
            What they&apos;re saying
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-brand-muted">
            Real words from real entrepreneurs who took action.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              data-testimonial-card
              className="group relative flex flex-col overflow-hidden rounded-[var(--radius-xl)] border border-brand-card bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] hover:-translate-y-1 lg:p-8"
            >
              {/* Quote icon — faded background */}
              <Quote
                size={48}
                className="absolute top-4 right-4 text-brand-pink/10 transition-colors duration-300 group-hover:text-brand-pink/20"
              />

              {/* Program badge */}
              <span className="mb-4 w-fit rounded-full bg-brand-pink-light px-3 py-1 text-[10px] font-semibold tracking-wider uppercase text-brand-pink">
                {testimonial.program}
              </span>

              {/* Stars */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-brand-gold text-brand-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-5 flex-1 text-sm leading-relaxed text-brand-dark">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Key Result — hover-reveal emphasis */}
              <div className="mb-5 flex items-center gap-2 rounded-[var(--radius-md)] bg-brand-offwhite p-3 transition-all duration-300 group-hover:bg-brand-pink-light">
                <TrendingUp
                  size={16}
                  className="shrink-0 text-brand-pink"
                />
                <span className="text-xs font-semibold text-brand-dark">
                  {testimonial.result}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-pink to-brand-gold text-xs font-bold text-brand-dark shadow-sm transition-transform duration-300 group-hover:scale-110">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-dark">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-brand-muted">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
