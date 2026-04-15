import { Link } from "react-router-dom"

export function InspireCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-dark px-6 py-[var(--section-padding)] lg:px-16">
      {/* Background image placeholder */}
      <div className="absolute inset-0 flex items-center justify-center text-white/5">
        <svg width={120} height={120} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>

      <div
        data-animate
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <h2 className="font-heading text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[48px] lg:leading-[1.1]">
          Ready to inspire your audience?
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
          Submit your inquiry and let&apos;s talk about bringing Faith to
          your event.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="#inquiry"
            className="gradient-pink-gold inline-flex items-center rounded-[var(--radius-md)] px-7 py-3 text-sm font-semibold text-brand-dark shadow-button transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
          >
            Book now
          </Link>
          <Link
            to="#inquiry"
            className="inline-flex items-center rounded-[var(--radius-md)] border border-white/20 px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5"
          >
            Inquire
          </Link>
        </div>
      </div>
    </section>
  )
}
