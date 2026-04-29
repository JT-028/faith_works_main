"use client"

import { GradientTextReveal } from "@/components/GradientTextReveal"

export function StrategicConsultancySection() {
  return (
    <section className="bg-brand-light py-[var(--section-padding-mobile)] lg:py-[var(--section-padding)]">
      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
          {/* Left Column */}
          <div data-strategy-heading className="flex flex-col justify-start pt-2">
            <p className="mb-8 text-xs font-semibold tracking-widest text-[#a3a3a3] uppercase">
              ABOUT FAITH [AI]
            </p>
            <h2 className="font-heading text-4xl font-bold leading-[1.05] tracking-tight text-[#202020] md:text-5xl lg:text-7xl">
              STRATEGY.<br />
              RESILIENCE.<br />
              <span className="text-brand-gold">SCALE.</span>
            </h2>
          </div>

          {/* Right Column */}
          <div className="flex flex-col justify-center">
            {/* Paragraphs — combined for a single continuous scroll reveal timeline */}
            <GradientTextReveal
              activeColor="rgb(45, 45, 45)"
              inactiveColor="rgb(20, 20, 20)"
              className="text-2xl font-medium leading-relaxed tracking-wide md:text-3xl lg:text-[2rem]"
              start="top 82%"
              end="top 18%"
            >
              <span style={{ WebkitTextFillColor: "var(--color-brand-gold)", color: "var(--color-brand-gold)" }}>FAITH [ai]</span>
              {" "}
              is a strategic consultancy that bridges the gap between human purpose and artificial intelligence.
              <br />
              <span data-reveal-gap-before aria-hidden="true"></span>
              We don&apos;t just motivate; we
              operationalize. In our framework, failure isn&apos;t fatal—it&apos;s just{" "}
              <span style={{ WebkitTextFillColor: "var(--color-brand-gold)", color: "var(--color-brand-gold)" }}>data</span>.
              {" "}
              It is the essential feedback loop required to build a business that cannot be stopped.
            </GradientTextReveal>

            {/* Bottom Footer Text */}
            <div data-strategy-footer className="mt-16 flex items-start gap-4">
              <div className="h-10 w-0.5 shrink-0 bg-brand-gold"></div>
              <p className="text-sm font-medium leading-relaxed tracking-wide text-[#a3a3a3] max-w-sm">
                We guide founders through{" "}
                <span className="text-brand-gold underline decoration-[#5e5e00] underline-offset-4">Consulting</span>,{" "}
                <span className="text-brand-gold underline decoration-[#5e5e00] underline-offset-4">AI Implementation</span>, and{" "}
                <span className="text-brand-gold underline decoration-[#5e5e00] underline-offset-4">Community Support</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
