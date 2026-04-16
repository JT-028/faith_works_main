import type { Metadata } from "next"
import CommunityClient from "./CommunityClient"

export const metadata: Metadata = {
  title: "Community",
  description:
    "Join 500+ Filipino entrepreneurs building real businesses. Get direct access to Faith, weekly strategy drops, and a network of driven peers.",
  openGraph: {
    title: "Community | Faith Works",
    description:
      "Join 500+ Filipino entrepreneurs building real businesses with strategy and faith.",
  },
}

export default function CommunityPage() {
  return <CommunityClient />
}
