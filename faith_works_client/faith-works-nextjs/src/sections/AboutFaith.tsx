"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { GradientTextReveal } from "@/components/GradientTextReveal"

export function AboutFaithSection() {
  return (
    <section className="bg-white py-[var(--section-padding-mobile)] lg:py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div
            data-about-image
            className="aspect-[4/5] overflow-hidden rounded-[var(--radius-2xl)] bg-brand-card"
          >
            <img
              src="/images/faith-about-img.jpg"
              alt="Faith Natividad"
              className="h-full w-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>

          {/* Text */}
          <div data-about-text>
            <p className="mb-3 text-sm font-medium tracking-wide text-brand-pink">
              Meet the Founder
            </p>
            <h2 className="font-heading text-3xl font-bold text-brand-dark lg:text-4xl">
              Who is Faith Natividad
            </h2>
            <GradientTextReveal
              activeColor="rgb(26, 26, 26)"
              inactiveColor="rgb(185, 185, 185)"
              className="mt-5 text-base leading-relaxed"
            >
              Faith Natividad is an entrepreneur, brand strategist, AI advocate, and keynote speaker who helps Filipino business owners build brands that actually work. Her approach combines sharp strategy with real conviction — no fluff, no hype.
            </GradientTextReveal>
            <p className="mt-4 text-base leading-relaxed text-brand-muted">
              Through Faith Works, she&apos;s building a community where ambitious
              Filipino CEOs get the structure, clarity, and support they need to
              grow — with strategy and faith as the foundation.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-[var(--radius-md)] gradient-pink-gold px-6 py-3 text-sm font-semibold text-brand-dark shadow-[var(--shadow-button)] transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)]"
              >
                Our Story
                <ArrowRight size={14} />
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-dark transition-colors hover:text-brand-pink"
              >
                Community
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
