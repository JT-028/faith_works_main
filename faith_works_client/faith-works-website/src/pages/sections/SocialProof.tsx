import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import logo2xyou from "../../assets/social-proof-bar-logos/2xyou.png"
import logo40women from "../../assets/social-proof-bar-logos/40 women.png"
import logoAccountingExpo from "../../assets/social-proof-bar-logos/accounting business expo.png"
import logoBilyonaryo from "../../assets/social-proof-bar-logos/bilyonaryo.png"
import logoBusinessMirror from "../../assets/social-proof-bar-logos/businessmirror.png"
import logoDaos from "../../assets/social-proof-bar-logos/daos.png"
import logoEnergyFm from "../../assets/social-proof-bar-logos/energy fm.png"
import logoNasDaily from "../../assets/social-proof-bar-logos/nas daily.png"
import logoNasSummit from "../../assets/social-proof-bar-logos/nas summit.png"
import logoNewsline from "../../assets/social-proof-bar-logos/newsline.png"
import logoSydney from "../../assets/social-proof-bar-logos/sydney.png"
import logoTnc from "../../assets/social-proof-bar-logos/tnc.png"
import logoPR from "../../assets/social-proof-bar-logos/pr_station.png"


const logos = [
  { src: logo2xyou, alt: "2xYou" },
  { src: logo40women, alt: "40 Women" },
  { src: logoAccountingExpo, alt: "Accounting Business Expo" },
  { src: logoBilyonaryo, alt: "Bilyonaryo News Channel" },
  { src: logoBusinessMirror, alt: "Business Mirror" },
  { src: logoDaos, alt: "DAOS" },
  { src: logoEnergyFm, alt: "Energy FM 106.7" },
  { src: logoNasDaily, alt: "NAS Daily" },
  { src: logoNasSummit, alt: "NAS Summit" },
  { src: logoNewsline, alt: "Newsline Central Luzon" },
  { src: logoSydney, alt: "Sydney Build 2025 Expo" },
  { src: logoTnc, alt: "TNC" },
  { src: logoPR, alt: "PR" },
]

// Duplicate for seamless infinite loop
const allLogos = [...logos, ...logos]

export function SocialProofBar() {
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return

    // Half the track = one full set of logos
    const totalWidth = track.scrollWidth / 2

    // Animate from 0 → -totalWidth, then snap back to 0 instantly.
    // Because both halves are identical, the snap is visually seamless.
    gsap.fromTo(
      track,
      { x: 0 },
      {
        x: -totalWidth,
        duration: 40,
        ease: "none",
        repeat: -1,
      }
    )
  }, { scope: trackRef })

  return (
    <section className="overflow-hidden bg-brand-gold-light py-5">
      <p className="mb-4 text-center text-xs font-medium tracking-widest text-brand-dark/50 uppercase">
        As seen in
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-brand-gold-light to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-brand-gold-light to-transparent" />
        <div ref={trackRef} className="flex items-center gap-16 whitespace-nowrap px-10">
          {allLogos.map((logo, i) => (
            <div key={i} className="flex h-40 shrink-0 items-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-64 w-auto max-w-[160px] object-contain opacity-100 mix-blend-multiply"
                style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.12))" }}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
