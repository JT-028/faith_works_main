"use client"

import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight, Mail, Calendar, Mic } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export default function SpeakingInquiry() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    gsap.from("[data-speak-content] > *", {
      immediateRender: false,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power3.out",
    })
  }, { scope: sectionRef })

  return (
    <section
      id="speaking-inquiry"
      ref={sectionRef}
      className="relative overflow-hidden py-24 lg:py-32"
      style={{
        background: "linear-gradient(135deg, var(--color-gradient-pink) 0%, var(--color-brand-pink-light) 100%)",
      }}
    >
      {/* Decorative Elements */}
      <div className="pointer-events-none absolute -top-40 -left-40 h-80 w-80 rounded-full bg-brand-gold/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-brand-pink/30 blur-3xl" />

      <div
        data-speak-content
        className="relative mx-auto max-w-[var(--container-max)] px-6 text-center lg:px-16"
      >
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-brand-pink-dark shadow-sm">
          <Mic className="h-6 w-6" />
        </div>

        <h2 className="font-heading text-4xl font-bold text-brand-dark lg:text-5xl">
          Book Faith for Your Event
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-dark/80">
          Faith Natividad brings actionable insights, founder-led growth strategies, 
          and inspiring stories to stages across the globe. Perfect for keynotes, 
          panels, and private masterclasses.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-2 md:grid-cols-3">
           <div className="flex flex-col items-center p-4 rounded-xl bg-white/50 backdrop-blur-md">
             <Calendar className="h-6 w-6 text-brand-dark mb-3" />
             <span className="font-semibold text-brand-dark">Check Availability</span>
             <span className="text-sm text-brand-dark/60 mt-1">Booking for 2026/2027</span>
           </div>
           <div className="flex flex-col items-center p-4 rounded-xl bg-white/50 backdrop-blur-md">
             <Mic className="h-6 w-6 text-brand-dark mb-3" />
             <span className="font-semibold text-brand-dark">Keynotes &amp; Panels</span>
             <span className="text-sm text-brand-dark/60 mt-1">Tailored for your audience</span>
           </div>
           <div className="flex flex-col items-center p-4 rounded-xl bg-white/50 backdrop-blur-md sm:col-span-2 md:col-span-1">
             <Mail className="h-6 w-6 text-brand-dark mb-3" />
             <span className="font-semibold text-brand-dark">Direct Inquiry</span>
             <span className="text-sm text-brand-dark/60 mt-1">Fast response time</span>
           </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="mailto:hello@faithworks.com?subject=Speaking Inquiry"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-dark px-8 py-4 font-semibold text-white shadow-lg transition-all duration-normal hover:-translate-y-1 hover:bg-brand-navy hover:shadow-card-hover"
          >
            Submit an Inquiry
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>
    </section>
  )
}
