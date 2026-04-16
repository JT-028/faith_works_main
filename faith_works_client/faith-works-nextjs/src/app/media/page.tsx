import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Media & Press",
  description:
    "Faith Natividad in the media — press coverage, features, and press kit for journalists and event organizers.",
}

export default function MediaPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-20 lg:px-16">
        <h1 className="font-heading text-4xl font-bold text-brand-dark">Media &amp; Press</h1>
        <p className="mt-4 text-brand-muted">Coming soon.</p>
      </div>
    </div>
  )
}
