"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

export function ProgramsCTA() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" })
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="relative overflow-hidden bg-brand-dark">
      {/* Large background watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 select-none overflow-hidden leading-none"
      >
        <p className="font-heading whitespace-nowrap text-[22vw] font-black uppercase leading-none tracking-tight text-white/[0.04]">
          FAITH [ai]
        </p>
      </div>

      <div className="relative mx-auto max-w-[var(--container-max)] px-6 py-24 lg:px-16 lg:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

          {/* Left — Heading + subtext */}
          <div>
            <h2 className="font-heading text-[clamp(3.5rem,8vw,6rem)] font-black uppercase leading-[0.92] tracking-tight text-white">
              READY TO
              <br />
              <span className="text-brand-gold">EVOLVE?</span>
            </h2>
            <p className="mt-8 max-w-sm text-sm leading-relaxed text-white/50">
              Join the circle. Real stories of struggle, strategy, and
              AI&#8209;powered resilience delivered to your inbox.
            </p>
          </div>

          {/* Right — Form */}
          <div>
            {submitted ? (
              <p className="text-lg font-semibold text-brand-gold">
                You&apos;re in. We&apos;ll be in touch soon.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-9">
                {/* Full Name */}
                <div className="border-b border-white/20 pb-2.5">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full bg-transparent text-sm text-white/70 placeholder:text-white/30 focus:outline-none"
                  />
                </div>

                {/* Phone Number */}
                <div className="border-b border-white/20 pb-2.5">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-transparent text-sm text-white/70 placeholder:text-white/30 focus:outline-none"
                  />
                </div>

                {/* Email + submit arrow */}
                <div className="flex items-center border-b border-white/20 pb-2.5">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    className="flex-1 bg-transparent text-sm text-white/70 placeholder:text-white/30 focus:outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Submit"
                    className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-brand-gold transition-colors hover:border-brand-gold/60 hover:bg-brand-gold/10"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>

                <p className="text-xs tracking-[0.18em] text-brand-gold/60">
                  * FAIL FORWARD FAST.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
