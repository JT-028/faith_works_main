const logos = Array.from({ length: 11 }, (_, i) => `Partner ${i + 1}`)

export function TrustedBy() {
  return (
    <section className="bg-brand-gold px-6 py-[var(--section-padding)] lg:px-16">
      <div className="mx-auto max-w-[var(--container-max)]">
        <p
          data-animate
          className="text-center font-heading text-sm font-bold tracking-wide text-brand-dark md:text-base"
        >
          Trusted by leading Philippine organizations
        </p>

        {/* Logo grid */}
        <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5 lg:gap-8">
          {logos.map((name) => (
            <div
              key={name}
              data-animate
              className="flex h-16 items-center justify-center"
            >
              {/* Placeholder logo */}
              <div className="flex items-center gap-2 text-brand-dark/70">
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span className="text-sm font-bold tracking-wide">
                  {name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
