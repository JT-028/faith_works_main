import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

const TILE_VARIANTS = [
  "bg-[#0d1b40]",   // brand navy
  "bg-[#1a2340]",   // medium navy
  "bg-[#1e1a2e]",   // dark plum
  "bg-[#0f1c2e]",   // deep ocean
  "bg-[#1a1430]",   // deep violet
  "bg-[#14202e]",   // midnight
]

function ImageTile({ height, variant = 0 }: { height: string; variant?: number }) {
  return (
    <div
      className={`w-full shrink-0 rounded-[var(--radius-xl)] ${TILE_VARIANTS[variant % TILE_VARIANTS.length]}`}
      style={{ height }}
    />
  )
}

const COL_1 = ["220px", "180px", "260px", "200px", "240px", "190px", "250px", "210px"]
const COL_2 = ["260px", "200px", "220px", "250px", "190px", "240px", "210px", "230px"]
const COL_3 = ["200px", "240px", "190px", "260px", "220px", "230px", "200px", "250px"]

interface AnimatedMosaicProps {
  children: React.ReactNode
  overlayOpacity?: string
}

export function AnimatedMosaicHero({ children, overlayOpacity = "bg-brand-dark/65" }: AnimatedMosaicProps) {
  const heroRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const cols = heroRef.current?.querySelectorAll<HTMLElement>("[data-col]")
    if (!cols) return

    cols.forEach((col) => {
      const direction = col.dataset.col === "up" ? "-50%" : "0%"
      const directionFrom = col.dataset.col === "up" ? "0%" : "-50%"

      gsap.fromTo(col, {
        yPercent: parseFloat(directionFrom),
      }, {
        yPercent: parseFloat(direction),
        duration: 30,
        ease: "none",
        repeat: -1,
      })
    })
  }, { scope: heroRef })

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-dark"
    >
      {/* Animated image mosaic background */}
      <div className="pointer-events-none absolute inset-0 flex items-stretch justify-center gap-3 px-3 md:gap-4 md:px-6 lg:gap-5">
        <div className="relative flex-1 overflow-hidden">
          <div data-col="down" className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            {[...COL_1, ...COL_1].map((h, i) => (
              <ImageTile key={`c1-${i}`} height={h} variant={i % 6} />
            ))}
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div data-col="up" className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            {[...COL_2, ...COL_2].map((h, i) => (
              <ImageTile key={`c2-${i}`} height={h} variant={(i + 2) % 6} />
            ))}
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div data-col="down" className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            {[...COL_3, ...COL_3].map((h, i) => (
              <ImageTile key={`c3-${i}`} height={h} variant={(i + 4) % 6} />
            ))}
          </div>
        </div>
      </div>

      {/* Dark overlay */}
      <div className={`pointer-events-none absolute inset-0 ${overlayOpacity}`} />

      {/* Radial glow — centers behind content */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[90px]"
        style={{ background: "radial-gradient(circle, #EFACBA 0%, #FCE82A 50%, transparent 75%)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[var(--container-max)] flex-col items-center px-6 text-center">
        {children}
      </div>
    </section>
  )
}
