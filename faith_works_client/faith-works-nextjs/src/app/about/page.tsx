import type { Metadata } from "next"
import AboutClient from "./AboutClient"

export const metadata: Metadata = {
  title: "About Faith Natividad",
  description:
    "From zero capital to building a community of 500+ Filipino entrepreneurs. Discover Faith Natividad's story of grit, strategy, and unwavering conviction.",
  openGraph: {
    title: "About Faith Natividad | Faith Works",
    description:
      "From zero capital to building a community of 500+ Filipino entrepreneurs.",
  },
}

export default function AboutPage() {
  return <AboutClient />
}
