import type { Metadata } from "next"
import SpeakingClient from "./SpeakingClient"

export const metadata: Metadata = {
  title: "Book Faith Natividad — Keynote Speaker",
  description:
    "Book Faith Natividad for your next event, conference, or workshop. Where faith meets strategy — a keynote speaker who moves audiences and drives real change.",
  openGraph: {
    title: "Book Faith Natividad — Keynote Speaker | Faith Works",
    description:
      "A keynote speaker who moves audiences and drives real change for your organization.",
  },
}

export default function SpeakingPage() {
  return <SpeakingClient />
}
