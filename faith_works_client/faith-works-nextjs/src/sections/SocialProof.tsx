"use client"

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

export function SocialProofBar() {
  return (
    <section className="overflow-hidden bg-brand-gold-light py-5">
      <p className="mb-4 text-center text-xs font-medium tracking-widest text-brand-dark/50 uppercase">
        As seen in
      </p>
      <div style={{ height: "80px", position: "relative" }}>
        <LogoLoop
          logos={logos}
          speed={80}
          direction="left"
          logoHeight={56}
          gap={64}
          hoverSpeed={0}
          scaleOnHover
          fadeOut
          fadeOutColor="#fdef6d"
          ariaLabel="As seen in — media partners"
        />
      </div>
    </section>
  )
}
