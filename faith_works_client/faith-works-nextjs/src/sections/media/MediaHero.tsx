import React from "react"
import { ArrowDown } from "lucide-react"

export default function MediaHero() {
  return (
    <section className="relative overflow-x-hidden overflow-y-visible pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Background Elements */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 aspect-square w-[800px] -translate-x-1/2 rounded-full bg-brand-pink/20 blur-[120px]" />
        <div className="absolute top-1/4 right-[10%] aspect-square w-[600px] rounded-full bg-brand-gold/10 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-5xl font-bold tracking-tight text-brand-dark sm:text-6xl md:text-7xl lg:text-[5.5rem] lg:leading-[1.1]">
            Media &amp; <span className="text-brand-pink-dark">Press Kit</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-muted sm:text-xl lg:mt-8 lg:text-2xl">
            Everything you need for features, interviews, and event promotions. 
            Download official headshots, brand assets, and bios.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:mt-12">
            <a
              href="#downloads"
              className="group inline-flex h-14 items-center justify-center gap-2 rounded-full gradient-pink-gold px-8 font-semibold text-brand-dark shadow-button transition-all duration-normal hover:scale-105 hover:shadow-card-hover"
            >
              Get Press Kit
              <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href="#speaking-inquiry"
              className="inline-flex h-14 items-center justify-center rounded-full border-2 border-brand-dark/10 bg-transparent px-8 font-semibold text-brand-dark transition-all duration-normal hover:border-brand-dark/30 hover:bg-brand-dark/5"
            >
              Speaking Inquiry
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
