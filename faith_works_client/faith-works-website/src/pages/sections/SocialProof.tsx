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
import LogoLoop from "../../components/LogoLoop"

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
