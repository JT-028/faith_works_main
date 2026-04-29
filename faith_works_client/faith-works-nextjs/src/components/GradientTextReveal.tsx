"use client"

import type { CSSProperties, ReactNode } from "react"
import { Children, isValidElement, useMemo, useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

type RevealToken =
  | {
      type: "word"
      text: string
      className?: string
      style?: CSSProperties
      highlighted: boolean
      key: string
    }
  | {
      type: "break"
      gap: boolean
      key: string
    }

interface TokenFormatting {
  className?: string
  style?: CSSProperties
  highlighted: boolean
}

function mergeFormatting(base: TokenFormatting, next: Partial<TokenFormatting>): TokenFormatting {
  return {
    className: [base.className, next.className].filter(Boolean).join(" ") || undefined,
    style: next.style ? { ...(base.style ?? {}), ...next.style } : base.style,
    highlighted: next.highlighted ?? base.highlighted,
  }
}

function collectTokens(
  node: ReactNode,
  formatting: TokenFormatting,
  tokens: RevealToken[],
  keyPrefix = "token"
): void {
  if (node == null || typeof node === "boolean") return

  if (typeof node === "string" || typeof node === "number") {
    const words = String(node).trim().split(/\s+/).filter(Boolean)

    words.forEach((word, index) => {
      tokens.push({
        type: "word",
        text: word,
        className: formatting.className,
        style: formatting.style,
        highlighted: formatting.highlighted,
        key: `${keyPrefix}-word-${tokens.length}-${index}`,
      })
    })

    return
  }

  if (Array.isArray(node)) {
    node.forEach((child, index) => {
      collectTokens(child, formatting, tokens, `${keyPrefix}-${index}`)
    })
    return
  }

  if (!isValidElement(node)) return

  if (node.type === "br") {
    tokens.push({
      type: "break",
      gap: false,
      key: `${keyPrefix}-break-${tokens.length}`,
    })
    return
  }

  const props = node.props as {
    children?: ReactNode
    className?: string
    style?: CSSProperties
    [key: string]: unknown
  }

  if (props["data-reveal-gap-before"]) {
    tokens.push({
      type: "break",
      gap: true,
      key: `${keyPrefix}-gap-${tokens.length}`,
    })
    return
  }

  const nextFormatting = mergeFormatting(formatting, {
    className: props.className,
    style: props.style,
    highlighted:
      formatting.highlighted ||
      Boolean(props.className) ||
      Boolean(props.style?.color) ||
      Boolean(props.style?.WebkitTextFillColor),
  })

  collectTokens(props.children, nextFormatting, tokens, `${keyPrefix}-${tokens.length}`)
}

interface GradientTextRevealProps {
  children: ReactNode
  className?: string
  activeColor?: string
  inactiveColor?: string
  start?: string
  end?: string
}

export function GradientTextReveal({
  children,
  className = "",
  activeColor = "rgb(255, 255, 255)",
  inactiveColor = "rgb(55, 55, 55)",
  start = "top 78%",
  end = "top 10%",
}: GradientTextRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tokens = useMemo(() => {
    const nextTokens: RevealToken[] = []

    collectTokens(
      Children.toArray(children),
      {
        highlighted: false,
      },
      nextTokens
    )

    return nextTokens
  }, [children])
  const wordCount = useMemo(() => tokens.filter((token) => token.type === "word").length, [tokens])

  useGSAP(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const words = gsap.utils.toArray<HTMLElement>("[data-reveal-word]", wrapper)
    if (!words.length) return
    const staggerEach = wordCount > 28 ? 0.11 : 0.14
    const tweenDuration = 0.16

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: start,
        end: end,
        scrub: 0.7,
        // Recalculate trigger bounds AND reset animation start-values on every
        // ScrollTrigger.refresh() call (e.g. after the intro loader exits and
        // layout is fully real).  Without this the progress can be stale after
        // the loader-hidden phase and words jump to fully-revealed.
        invalidateOnRefresh: true,
      },
    })

    // fromTo() stamps the FROM state immediately (immediateRender:true by default
    // for the first tween in a timeline), so words are always dim when the
    // component mounts, regardless of any previous scroll position measurement.
    timeline.fromTo(
      words,
      {
        opacity: (_index, element) => parseFloat(element.dataset.initialOpacity || "0.18"),
        color: (_index, element) => element.dataset.initialColor || inactiveColor,
      },
      {
        opacity: (_index, element) => parseFloat(element.dataset.finalOpacity || "1"),
        color: (_index, element) => element.dataset.finalColor || activeColor,
        ease: "none",
        duration: tweenDuration,
        stagger: {
          each: staggerEach,
        },
      }
    )

    return () => {
      timeline.scrollTrigger?.kill()
      timeline.kill()
    }
  }, { scope: wrapperRef, dependencies: [activeColor, end, inactiveColor, start, tokens, wordCount] })

  return (
    <div ref={wrapperRef}>
      <p className={`flex flex-wrap ${className}`}>
        {tokens.map((token) => {
          if (token.type === "break") {
            return token.gap ? (
              <span key={token.key} aria-hidden="true" className="basis-full h-6 lg:h-8" />
            ) : (
              <span key={token.key} aria-hidden="true" className="basis-full" />
            )
          }

          const inlineColor = token.style?.color as string | undefined
          const inlineFill = token.style?.WebkitTextFillColor as string | undefined
          const finalColor = inlineColor ?? inlineFill ?? activeColor
          const initialColor = token.highlighted ? finalColor : inactiveColor
          const initialOpacity = token.highlighted ? 0.35 : 0.18

          return (
            <span key={token.key} className="mr-2 lg:mr-3">
              <span
                data-reveal-word
                data-final-color={finalColor}
                data-initial-color={initialColor}
                data-final-opacity="1"
                data-initial-opacity={String(initialOpacity)}
                data-final-fill={inlineFill}
                data-initial-fill={inlineFill}
                className={token.className}
                style={{
                  ...token.style,
                  opacity: initialOpacity,
                  color: initialColor,
                  WebkitTextFillColor: inlineFill,
                }}
              >
                {token.text}
              </span>
            </span>
          )
        })}
      </p>
    </div>
  )
}
