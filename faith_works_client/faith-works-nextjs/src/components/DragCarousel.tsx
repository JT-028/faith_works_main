"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import gsap from "gsap"

export interface DragCarouselItem {
  id: number
  title: string
  brand: string
  description: string
  tags: string[]
  imageUrl: string
  link: string
}

interface DragCarouselProps {
  items: DragCarouselItem[]
  cardHeight?: number
}

/* ── Fan spread positions (0 = front card, 1 = right-back, 2 = left-back)
   Cards are spread like a hand of playing cards — diagonal + rotated.
   `spread` is responsive: full on desktop, tight on mobile to prevent overflow. */
type FanCfg = { x: number; y: number; rotation: number; scale: number; opacity: number; zIndex: number }

function getFanCfg(pos: number, spread: number): FanCfg {
  if (pos === 0) return { x: 0,       y: 0,  rotation: 0,   scale: 1,    opacity: 1, zIndex: 40 }
  if (pos === 1) return { x: spread,  y: 28, rotation: 10,  scale: 0.90, opacity: 1, zIndex: 30 }
  if (pos === 2) return { x: -spread, y: 28, rotation: -10, scale: 0.90, opacity: 1, zIndex: 20 }
  return { x: 0, y: 60, rotation: 0, scale: 0.82, opacity: 0, zIndex: 1 }
}

export default function DragCarousel({ items, cardHeight = 500 }: DragCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const cursorRef    = useRef<HTMLDivElement>(null)
  const cardEls      = useRef<(HTMLDivElement | null)[]>([])
  const borderEls    = useRef<(HTMLDivElement | null)[]>([])

  /* order[fanPos] = item index at that position (0 = front) */
  const orderRef = useRef<number[]>(items.map((_, i) => i))
  const [topIdx, setTopIdx] = useState(0)

  /* drag tracking */
  const isDragging    = useRef(false)
  const hasDragged    = useRef(false)
  const isFlicking    = useRef(false)
  const inCardZone    = useRef(false)   // true only when cursor is over the card stack
  const interactiveHover = useRef(false) // true when pointer is over an interactive element (link/button)
  const startX        = useRef(0)
  const startY        = useRef(0)
  const lastClientX   = useRef(0)
  const lastVelX      = useRef(0)

  /* portrait card width + fan spread — both derived from container width */
  const [cardWidth, setCardWidth] = useState(340)
  const [fanSpread, setFanSpread] = useState(258)
  const fanSpreadRef = useRef(258)
  useEffect(() => {
    const update = () => {
      const cw = containerRef.current?.clientWidth ?? 800
      const w = cw < 640
        ? Math.round(cw * 0.82)
        : Math.min(Math.round(cardHeight * 0.84), 440)
      setCardWidth(w)
      /* On mobile keep side-cards just barely peeking (≤ 6.5% of viewport width)
         so they never cause horizontal overflow. Desktop keeps the full 258px spread. */
      const spread = cw < 640 ? Math.round(cw * 0.065) : 258
      fanSpreadRef.current = spread
      setFanSpread(spread)
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [cardHeight])

  /* ── Inject glow border CSS ─────────────────────────────────────────── */
  useEffect(() => {
    const id = "fw-drag-card-styles"
    if (document.getElementById(id)) return
    const style = document.createElement("style")
    style.id = id
    style.textContent = `
      @keyframes fw-border-pulse {
        0%, 100% { box-shadow: 0 0 0 0px rgba(239,172,186,0), 0 0 18px rgba(239,172,186,0.85), 0 0 48px rgba(239,172,186,0.45), 0 0 90px rgba(239,172,186,0.18); }
        50%       { box-shadow: 0 0 0 0px rgba(239,172,186,0), 0 0 28px rgba(239,172,186,1),    0 0 72px rgba(239,172,186,0.60), 0 0 120px rgba(239,172,186,0.28); }
      }
      .fw-card-border-active {
        animation: fw-border-pulse 2.4s ease-in-out infinite;
      }
    `
    document.head.appendChild(style)
    return () => { document.getElementById(id)?.remove() }
  }, [])

  /* ── Place all cards at their fan positions ──────────────────────────── */
  const initFan = useCallback(() => {
    orderRef.current.forEach((itemIdx, fanPos) => {
      const el = cardEls.current[itemIdx]
      if (!el) return
      const cfg = getFanCfg(fanPos, fanSpreadRef.current)
      gsap.set(el, {
        x: cfg.x, y: cfg.y, rotation: cfg.rotation,
        scale: cfg.scale, opacity: cfg.opacity, zIndex: cfg.zIndex,
      })
      /* Show border only on front card */
      const bEl = borderEls.current[itemIdx]
      if (bEl) {
        if (fanPos === 0) { bEl.style.opacity = "1"; bEl.classList.add("fw-card-border-active") }
        else              { bEl.style.opacity = "0"; bEl.classList.remove("fw-card-border-active") }
      }
    })
  // fanSpread state dep ensures initFan re-runs whenever the spread changes on resize
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fanSpread])

  useEffect(() => { initFan() }, [initFan])

  /* ── Flick front card underneath the deck, promote rest ──────────────── */
  const flick = useCallback((direction: "left" | "right") => {
    if (isFlicking.current) return
    isFlicking.current = true

    const order      = [...orderRef.current]
    const topItemIdx = order[0]
    const topEl      = cardEls.current[topItemIdx]
    if (!topEl) { isFlicking.current = false; return }

    /* Drag right → left card comes to front; drag left → right card comes to front.
       Fan slots: 0=front, 1=right(+210px), 2=left(-190px)
       drag right: [front,right,left] → [left,front,right]  (order[2] promoted)
       drag left:  [front,right,left] → [right,left,front]  (order[1] promoted) */
    const newOrder = direction === "right"
      ? [order[2], order[0], order[1]]
      : [order[1], order[2], order[0]]
    orderRef.current = newOrder
    setTopIdx(newOrder[0])

    const destPos = newOrder.indexOf(topItemIdx)  // last fan slot
    const destCfg = getFanCfg(destPos, fanSpreadRef.current)

    /* ① Snap ALL z-indexes immediately before any motion — prevents overlap during transitions */
    newOrder.forEach((itemIdx, fanPos) => {
      const el = cardEls.current[itemIdx]
      if (el) gsap.set(el, { zIndex: getFanCfg(fanPos, fanSpreadRef.current).zIndex })
    })

    /* ① b — Animate borders: outgoing front fades out, incoming front fades in */
    const outBorder = borderEls.current[topItemIdx]
    if (outBorder) {
      gsap.to(outBorder, { opacity: 0, duration: 0.22, ease: "power2.in",
        onComplete: () => outBorder.classList.remove("fw-card-border-active") })
    }
    const inBorder = borderEls.current[newOrder[0]]
    if (inBorder) {
      gsap.to(inBorder, { opacity: 1, duration: 0.38, delay: 0.28, ease: "power2.out",
        onStart: () => inBorder.classList.add("fw-card-border-active") })
    }

    /* ② Animate the flicked card to its new fan position */
    gsap.to(topEl, {
      x: destCfg.x, y: destCfg.y,
      rotation: destCfg.rotation, scale: destCfg.scale, opacity: destCfg.opacity,
      duration: 0.55, ease: "power3.inOut",
      onComplete: () => { isFlicking.current = false },
    })

    /* ③ Remaining cards glide to their new positions (no zIndex — already set above) */
    newOrder.forEach((itemIdx, fanPos) => {
      if (itemIdx === topItemIdx) return
      const el  = cardEls.current[itemIdx]
      if (!el) return
      const cfg = getFanCfg(fanPos, fanSpreadRef.current)
      gsap.to(el, {
        x: cfg.x, y: cfg.y, rotation: cfg.rotation,
        scale: cfg.scale, opacity: cfg.opacity,
        duration: 0.48, ease: "power2.out",
      })
    })
  }, [])

  /* ── Pointer drag ────────────────────────────────────────────────────── */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const getTopEl = () => cardEls.current[orderRef.current[0]]

    const onDown = (e: PointerEvent) => {
      if (isFlicking.current) return
      if (!inCardZone.current || interactiveHover.current) return  // only drag when cursor is over the cards and not over interactive elements
      isDragging.current  = true
      hasDragged.current  = false
      startX.current      = e.clientX
      startY.current      = e.clientY
      lastClientX.current = e.clientX
      lastVelX.current    = 0
      container.setPointerCapture(e.pointerId)
      const top = getTopEl()
      if (top) gsap.killTweensOf(top)
      gsap.to(cursorRef.current, { scale: 0.78, duration: 0.15 })
    }

    const onMove = (e: PointerEvent) => {
      if (!isDragging.current) return
      const dx = e.clientX - startX.current
      const dy = e.clientY - startY.current
      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) hasDragged.current = true

      /* Track velocity for flick detection */
      lastVelX.current    = e.clientX - lastClientX.current
      lastClientX.current = e.clientX

      const top = getTopEl()
      if (!top) return

      /* Rubber-band damping — exponential resistance, soft ceiling ~110px.
         Feels like stretching a rubber band: easy at first, hard to pull further. */
      const MAX_DRAG = 110
      const dampedX  = Math.sign(dx) * MAX_DRAG * (1 - Math.exp(-Math.abs(dx) / 72))
      const dampedY  = dy * 0.05

      gsap.set(top, { x: dampedX, y: dampedY, rotation: dampedX * 0.07 })
    }

    const onUp = (e: PointerEvent) => {
      if (!isDragging.current) return
      isDragging.current = false
      gsap.to(cursorRef.current, { scale: 1, duration: 0.2 })
      if (!hasDragged.current) return

      const dx  = e.clientX - startX.current
      const vel = lastVelX.current

      /* Flick if dragged past ~50px (raw intent) OR released with a quick snap velocity.
         Threshold is lower because drag is already damped — user feels the resistance. */
      const shouldFlick = Math.abs(dx) > 50 || Math.abs(vel) > 10

      if (shouldFlick) {
        flick(dx < 0 || vel < 0 ? "left" : "right")
      } else {
        /* Spring back — rubber band snaps home */
        const top = getTopEl()
        if (top) gsap.to(top, { x: 0, y: 0, rotation: 0, duration: 0.55, ease: "elastic.out(1, 0.6)" })
      }

      setTimeout(() => { hasDragged.current = false }, 100)
    }

    container.addEventListener("pointerdown",   onDown)
    container.addEventListener("pointermove",   onMove)
    container.addEventListener("pointerup",     onUp)
    container.addEventListener("pointercancel", onUp)
    return () => {
      container.removeEventListener("pointerdown",   onDown)
      container.removeEventListener("pointermove",   onMove)
      container.removeEventListener("pointerup",     onUp)
      container.removeEventListener("pointercancel", onUp)
    }
  }, [flick])

  /* ── Custom DRAG cursor (scoped to card stack area only) ───────────────── */
  useEffect(() => {
    const cursor    = cursorRef.current
    const container = containerRef.current
    if (!cursor || !container) return

    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0, opacity: 0 })
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.32, ease: "power3" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.32, ease: "power3" })
    let cursorVisible = false

    const onMove = (e: MouseEvent) => {
      const r       = container.getBoundingClientRect()
      const localX  = e.clientX - r.left
      const localY  = e.clientY - r.top
      xTo(localX)
      yTo(localY)

      /* Only show cursor when pointer is over the card stack area (center ± cardWidth/2 + small buffer) */
      const cx        = r.width / 2
      const hitHalf   = cardWidth / 2 + 40
      const overCards = Math.abs(localX - cx) < hitHalf && localY >= 0 && localY <= cardHeight

      /* Detect interactive element (link/button) under the pointer. If so, show native pointer and hide custom cursor. */
      const node = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      const isInteractive = !!(node && (node.closest('a,button,[role="button"],[tabindex]') || window.getComputedStyle(node).cursor === 'pointer'))

      if (isInteractive) {
        interactiveHover.current = true
        inCardZone.current = overCards
        container.style.cursor = 'pointer'
        if (cursorVisible) {
          cursorVisible = false
          gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.12, ease: 'power2.in' })
        }
        return
      }

      interactiveHover.current = false
      inCardZone.current = overCards
      /* Native cursor: none over cards, default elsewhere */
      container.style.cursor = overCards ? 'none' : ''

      if (overCards && !cursorVisible) {
        cursorVisible = true
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' })
      } else if (!overCards && cursorVisible) {
        cursorVisible = false
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2, ease: 'power2.in' })
      }
    }
    const onLeave = () => {
      cursorVisible = false
      inCardZone.current = false
      container.style.cursor = ""
      gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2, ease: "power2.in" })
    }

    container.addEventListener("mousemove",  onMove)
    container.addEventListener("mouseleave", onLeave)
    // pointerover/out to detect interactive elements (links/buttons) so we can hide/show custom cursor immediately
    const onPointerOverInteractive = (ev: PointerEvent) => {
      const tgt = ev.target as HTMLElement | null
      const interactive = !!(tgt && tgt.closest && tgt.closest('a,button,[role="button"],[tabindex]'))
      if (interactive) {
        interactiveHover.current = true
        container.style.cursor = 'pointer'
        if (cursorVisible) {
          cursorVisible = false
          gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.12, ease: 'power2.in' })
        }
      }
    }

    const onPointerOutInteractive = (ev: PointerEvent) => {
      const related = (ev as any).relatedTarget as HTMLElement | null
      const stillInteractive = !!(related && related.closest && related.closest('a,button,[role="button"],[tabindex]'))
      if (stillInteractive) return
      interactiveHover.current = false
      // restore custom cursor if still within card area
      if (inCardZone.current) {
        container.style.cursor = 'none'
        if (!cursorVisible) {
          cursorVisible = true
          gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2, ease: 'back.out(1.7)' })
        }
      } else {
        container.style.cursor = ''
        if (cursorVisible) {
          cursorVisible = false
          gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.12, ease: 'power2.in' })
        }
      }
    }

    container.addEventListener('pointerover', onPointerOverInteractive)
    container.addEventListener('pointerout', onPointerOutInteractive)
    return () => {
      container.removeEventListener("mousemove",  onMove)
      container.removeEventListener("mouseleave", onLeave)
      container.removeEventListener('pointerover', onPointerOverInteractive)
      container.removeEventListener('pointerout', onPointerOutInteractive)
    }
  }, [cardWidth, cardHeight])

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ height: cardHeight + 60 }}
    >
      {/* ── DRAG cursor ─────────────────────────────────────────────────── */}
      <div
        ref={cursorRef}
        className="absolute z-50 pointer-events-none"
        style={{ top: 0, left: 0 }}
        aria-hidden="true"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Left arrow — outside the circle */}
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M10 2L4 7L10 12" stroke="#0c090a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 2L8 7L14 12" stroke="#0c090a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>

          {/* Circle */}
          <div style={{
            width: 88, height: 88, borderRadius: "50%", background: "#EFACBA",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 32px rgba(12,9,10,0.18)",
          }}>
            <span style={{ color: "#202020", fontSize: 9, fontWeight: 800, letterSpacing: "0.22em", textTransform: "uppercase" }}>
              Drag
            </span>
          </div>

          {/* Right arrow — outside the circle */}
          <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
            <path d="M6 2L12 7L6 12" stroke="#0c090a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2 2L8 7L2 12" stroke="#0c090a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      {/* ── Fan stack — overflow visible so angled side cards peek out ───── */}
      <div className="absolute inset-0 flex items-start justify-center" style={{ overflow: "visible" }}>
        {items.map((item, i) => (
          /* Outer wrapper — GSAP moves this; no overflow clip so border can show outside */
          <div
            key={item.id}
            ref={(el) => { cardEls.current[i] = el }}
            className="absolute"
            style={{ width: cardWidth, height: cardHeight, willChange: "transform, opacity" }}
          >
            {/* Glow border overlay — sits outside overflow:hidden inner card */}
            <div
              ref={(el) => { borderEls.current[i] = el }}
              style={{
                position: "absolute", inset: -3, borderRadius: 24,
                border: "2.5px solid #EFACBA",
                boxShadow: "0 0 18px rgba(239,172,186,0.85), 0 0 48px rgba(239,172,186,0.45), 0 0 90px rgba(239,172,186,0.18)",
                pointerEvents: "none", opacity: 0,
              }}
            />

            {/* Inner card — overflow hidden for image clip */}
            <div
              className="bg-white overflow-hidden flex flex-col"
              style={{
                width: "100%", height: "100%",
                borderRadius: 20,
                boxShadow: "0 12px 48px rgba(12,9,10,0.16)",
                border: "1px solid rgba(12,9,10,0.06)",
              }}
            >
            {/* Image — takes ~58% of card height */}
            <div
              className="relative flex-shrink-0 overflow-hidden"
              style={{
                height: "58%",
                backgroundImage: `url(${item.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 to-black/35" />
              {/* Brand pill */}
              <div className="absolute top-4 left-4">
                <span style={{
                  display: "inline-block", padding: "5px 14px", borderRadius: 999,
                  background: "rgba(255,255,255,0.18)", backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.32)", color: "#fff",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
                }}>
                  {item.brand}
                </span>
              </div>
            </div>

            {/* Text content */}
            <div className="p-5 flex flex-col flex-grow overflow-hidden">
              <h3
                className="font-bold leading-snug mb-1.5"
                style={{ fontSize: "clamp(14px, 1.8vw, 17px)", color: "#0c090a" }}
              >
                {item.title}
              </h3>
              <p
                className="leading-relaxed flex-grow"
                style={{ fontSize: "clamp(11px, 1.2vw, 13px)", color: "#6b7280" }}
              >
                {item.description}
              </p>

              {/* Tags — only first 3 */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.slice(0, 3).map((tag, ti) => (
                  <span key={ti} style={{
                    fontSize: 10, padding: "3px 9px", borderRadius: 999,
                    background: "#f9fafb", color: "#6b7280", border: "1px solid #f3f4f6",
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={item.link}
                className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-pink group"
                style={{ fontSize: 12, cursor: "pointer" }}
                onClick={(e) => { if (hasDragged.current) e.preventDefault() }}
              >
                Learn more
                <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Dot indicators ──────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 right-0 flex justify-center items-center gap-2"
        style={{ height: 24 }}
      >
        {items.map((_, i) => (
          <div
            key={i}
            className="rounded-full transition-all duration-300"
            style={{
              height: 6,
              width: i === topIdx ? 28 : 6,
              background: i === topIdx ? "#0c090a" : "#d1d5db",
            }}
          />
        ))}
      </div>
    </div>
  )
}