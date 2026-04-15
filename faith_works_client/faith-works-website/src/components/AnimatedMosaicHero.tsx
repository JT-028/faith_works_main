import { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

function ImageTile({ height }: { height: string }) {
  return (
    <div
      className="w-full shrink-0 overflow-hidden rounded-[var(--radius-xl)] bg-[#4a4a4a]"
      style={{ height }}
    >
      <div className="flex h-full w-full items-center justify-center text-white/10">
        <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="m21 15-5-5L5 21" />
        </svg>
      </div>
    </div>
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
              <ImageTile key={`c1-${i}`} height={h} />
            ))}
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div data-col="up" className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            {[...COL_2, ...COL_2].map((h, i) => (
              <ImageTile key={`c2-${i}`} height={h} />
            ))}
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden">
          <div data-col="down" className="flex flex-col gap-3 md:gap-4 lg:gap-5">
            {[...COL_3, ...COL_3].map((h, i) => (
              <ImageTile key={`c3-${i}`} height={h} />
            ))}
          </div>
        </div>
      </div>

      {/* Dark overlay */}
      <div className={`pointer-events-none absolute inset-0 ${overlayOpacity}`} />

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[var(--container-max)] flex-col items-center px-6 text-center">
        {children}
      </div>
    </section>
  )
}
