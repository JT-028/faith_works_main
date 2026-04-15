import { useRef, useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

const eventTypes = [
  "Corporate event",
  "Conference",
  "Workshop",
  "Retreat",
  "Other event",
  "Other",
]

export function SpeakingInquiry() {
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      id="inquiry"
      className="bg-white px-6 py-[var(--section-padding)] lg:px-16"
    >
      <div className="mx-auto grid max-w-[var(--container-max)] grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
        {/* About / Contact info */}
        <div data-animate>
          <span className="text-sm font-semibold tracking-wide text-brand-dark">
            About
          </span>
          <h2 className="mt-3 font-heading text-3xl font-bold tracking-tight text-brand-dark md:text-4xl lg:text-[44px] lg:leading-[1.1]">
            Who is Faith
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-brand-muted">
            Faith Natividad is an entrepreneur, brand strategist, and AI
            advocate empowering Filipino business owners to build with
            conviction. Her talks have reached 30,000+ CEOs, founders, and
            women leaders across the Philippines. Her signature: fearless,
            practical, and always real.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            <a
              href="mailto:faith@faithworks.ph"
              className="inline-flex items-center gap-3 text-sm text-brand-dark transition-colors hover:text-brand-dark/70"
            >
              <Mail className="h-5 w-5 text-brand-muted" />
              faith@faithworks.ph
            </a>
            <a
              href="tel:+639171234567"
              className="inline-flex items-center gap-3 text-sm text-brand-dark transition-colors hover:text-brand-dark/70"
            >
              <Phone className="h-5 w-5 text-brand-muted" />
              +63 917 123 4567
            </a>
            <span className="inline-flex items-center gap-3 text-sm text-brand-dark">
              <MapPin className="h-5 w-5 text-brand-muted" />
              Manila, Philippines
            </span>
          </div>
        </div>

        {/* Form */}
        <div data-animate>
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center rounded-[var(--radius-xl)] bg-brand-card p-12 text-center">
              <h3 className="font-heading text-2xl font-bold text-brand-dark">
                Thank you!
              </h3>
              <p className="mt-3 text-brand-muted">
                We&apos;ll get back to you within 48 hours.
              </p>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col gap-5"
            >
              {/* Name row */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-brand-dark">
                    First name
                  </span>
                  <input
                    type="text"
                    required
                    className="rounded-[var(--radius-md)] border border-brand-dark/10 bg-brand-card px-4 py-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-dark/30 focus:ring-1 focus:ring-brand-dark/10"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-brand-dark">
                    Last name
                  </span>
                  <input
                    type="text"
                    required
                    className="rounded-[var(--radius-md)] border border-brand-dark/10 bg-brand-card px-4 py-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-dark/30 focus:ring-1 focus:ring-brand-dark/10"
                  />
                </label>
              </div>

              {/* Email */}
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-brand-dark">
                  Email
                </span>
                <input
                  type="email"
                  required
                  className="rounded-[var(--radius-md)] border border-brand-dark/10 bg-brand-card px-4 py-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-dark/30 focus:ring-1 focus:ring-brand-dark/10"
                />
              </label>

              {/* Phone */}
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-brand-dark">
                  Phone number
                </span>
                <input
                  type="tel"
                  className="rounded-[var(--radius-md)] border border-brand-dark/10 bg-brand-card px-4 py-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-dark/30 focus:ring-1 focus:ring-brand-dark/10"
                />
              </label>

              {/* Speaking topic */}
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-brand-dark">
                  Speaking topic
                </span>
                <select
                  defaultValue=""
                  className="rounded-[var(--radius-md)] border border-brand-dark/10 bg-brand-card px-4 py-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-dark/30 focus:ring-1 focus:ring-brand-dark/10"
                >
                  <option value="" disabled>
                    Select topic
                  </option>
                  <option>AI for entrepreneurs</option>
                  <option>Brand strategy</option>
                  <option>Faith-driven leadership</option>
                  <option>Custom topic</option>
                </select>
              </label>

              {/* Event type radios */}
              <fieldset className="flex flex-col gap-3">
                <legend className="text-sm font-medium text-brand-dark">
                  Event type
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {eventTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2 text-sm text-brand-dark"
                    >
                      <input
                        type="radio"
                        name="eventType"
                        value={type}
                        className="h-4 w-4 accent-brand-dark"
                      />
                      {type}
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Message */}
              <label className="flex flex-col gap-1.5">
                <span className="text-sm font-medium text-brand-dark">
                  Message
                </span>
                <textarea
                  rows={5}
                  placeholder="Tell us about your event"
                  className="resize-y rounded-[var(--radius-md)] border border-brand-dark/10 bg-brand-card px-4 py-3 text-sm text-brand-dark outline-none transition-colors focus:border-brand-dark/30 focus:ring-1 focus:ring-brand-dark/10"
                />
              </label>

              {/* Terms */}
              <label className="flex items-start gap-2 text-sm text-brand-muted">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 accent-brand-dark"
                />
                I agree to the terms
              </label>

              {/* Submit */}
              <button
                type="submit"
                className="gradient-pink-gold w-fit rounded-[var(--radius-md)] px-7 py-3 text-sm font-semibold text-brand-dark shadow-button transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
