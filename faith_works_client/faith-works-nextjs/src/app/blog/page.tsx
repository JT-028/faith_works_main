import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Real strategy and no fluff — insights, frameworks, and stories from Faith Natividad and the Faith Works community.",
}

export default function BlogPage() {
  return (
    <div className="pt-24">
      <div className="mx-auto max-w-[var(--container-max)] px-6 py-20 lg:px-16">
        <h1 className="font-heading text-4xl font-bold text-brand-dark">Blog</h1>
        <p className="mt-4 text-brand-muted">Coming soon.</p>
      </div>
    </div>
  )
}
