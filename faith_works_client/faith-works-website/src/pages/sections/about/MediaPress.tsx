import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import logo2xyou from "../../../assets/social-proof-bar-logos/2xyou.png"
import logo40women from "../../../assets/social-proof-bar-logos/40 women.png"
import logoAccountingExpo from "../../../assets/social-proof-bar-logos/accounting business expo.png"
import logoBilyonaryo from "../../../assets/social-proof-bar-logos/bilyonaryo.png"
import logoBusinessMirror from "../../../assets/social-proof-bar-logos/businessmirror.png"
import logoDaos from "../../../assets/social-proof-bar-logos/daos.png"
import logoEnergyFm from "../../../assets/social-proof-bar-logos/energy fm.png"
import logoNasDaily from "../../../assets/social-proof-bar-logos/nas daily.png"
import logoNasSummit from "../../../assets/social-proof-bar-logos/nas summit.png"
import logoNewsline from "../../../assets/social-proof-bar-logos/newsline.png"
import logoSydney from "../../../assets/social-proof-bar-logos/sydney.png"
import logoTnc from "../../../assets/social-proof-bar-logos/tnc.png"
import logoPR from "../../../assets/social-proof-bar-logos/pr_station.png"

gsap.registerPlugin(ScrollTrigger)

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
  { src: logoPR, alt: "PR Station" },
]

const allLogos = [...logos, ...logos]

export function MediaPress() {
  const trackRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from("[data-media-heading]", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    })
  }, { scope: sectionRef })

  useGSAP(() => {
    const track = trackRef.current
    if (!track) return

    const totalWidth = track.scrollWidth / 2

    gsap.fromTo(
      track,
      { x: 0 },
      {
        x: -totalWidth,
        duration: 35,
        ease: "none",
        repeat: -1,
      }
    )
  }, { scope: trackRef })

  return (
    <section
      ref={sectionRef}
      className="overflow-hidden bg-brand-gold-light px-6 py-[var(--section-padding)] lg:px-16"
    >
      {/* Heading */}
      <p
        data-media-heading
        className="mx-auto mb-12 max-w-xl text-center text-lg font-bold text-brand-dark"
      >
        Featured in major Philippine media outlets
      </p>

      {/* Logo marquee */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-brand-gold-light to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-brand-gold-light to-transparent" />
        <div ref={trackRef} className="flex items-center gap-16 whitespace-nowrap">
          {allLogos.map((logo, i) => (
            <div key={i} className="flex h-14 shrink-0 items-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-14 w-auto max-w-[160px] object-contain mix-blend-multiply"
                style={{ filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.08))" }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
