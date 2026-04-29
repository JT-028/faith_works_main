import React from "react"
import LogoLoop from "@/components/LogoLoop"

const logos = [
  { src: "/images/social-proof-bar-logos/2xyou.png", alt: "2xYou" },
  { src: "/images/social-proof-bar-logos/40 women.png", alt: "40 Women" },
  { src: "/images/social-proof-bar-logos/accounting business expo.png", alt: "Accounting Business Expo" },
  { src: "/images/social-proof-bar-logos/bilyonaryo.png", alt: "Bilyonaryo News Channel" },
  { src: "/images/social-proof-bar-logos/businessmirror.png", alt: "Business Mirror" },
  { src: "/images/social-proof-bar-logos/daos.png", alt: "DAOS" },
  { src: "/images/social-proof-bar-logos/energy fm.png", alt: "Energy FM 106.7" },
  { src: "/images/social-proof-bar-logos/nas daily.png", alt: "NAS Daily" },
  { src: "/images/social-proof-bar-logos/nas summit.png", alt: "NAS Summit" },
  { src: "/images/social-proof-bar-logos/newsline.png", alt: "Newsline Central Luzon" },
  { src: "/images/social-proof-bar-logos/sydney.png", alt: "Sydney Build 2025 Expo" },
  { src: "/images/social-proof-bar-logos/tnc.png", alt: "TNC" },
  { src: "/images/social-proof-bar-logos/pr_station.png", alt: "PR" },
]

export default function MediaLogoWall() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16 text-center">
        <h2 className="font-heading text-xl font-bold uppercase tracking-widest text-brand-muted/70 mb-12">
          As Featured In
        </h2>
      </div>
      <div className="w-full opacity-80 mix-blend-multiply grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
        <LogoLoop 
          logos={logos}
          speed={60}
          direction="left"
          logoHeight={56}
          gap={64}
          width="100%"
          ariaLabel="Media partners"
        />
      </div>
    </section>
  )
}

