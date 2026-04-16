import type { Metadata } from "next"
import ProgramsClient from "./ProgramsClient"

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Three paths forward — Accelerator, AI Workshop, and Keynote Speaking. Find the program that fits where you are in your entrepreneurial journey.",
  openGraph: {
    title: "Programs | Faith Works",
    description:
      "Accelerator, AI Workshop, and Keynote Speaking programs for Filipino entrepreneurs.",
  },
}

export default function ProgramsPage() {
  return <ProgramsClient />
}
