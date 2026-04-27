"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft } from "lucide-react"

export default function EventPostClient() {
  const [timeLeft, setTimeLeft] = useState({ d: "45", h: "12", m: "44", s: "29" })

  return (
    <main className="min-h-screen bg-white pt-24 overflow-x-hidden text-[#0c090a]">
      {/* ── EVENT ITEM HEADER (Node 4174:87310) ── */}
      <section className="bg-white flex flex-col items-center py-[112px] px-6 lg:px-16 max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-20 items-center w-full max-w-[1280px]">
          
          {/* LEFT: CONTENT */}
          <div className="flex flex-[1_0_0] flex-col gap-8 w-full max-w-2xl">
            {/* BACK BTN */}
            <Link 
              href="/events"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0c090a]/5 hover:bg-[#0c090a]/10 transition-colors w-max rounded-xl font-medium text-base text-[#0c090a]"
            >
              <ChevronLeft className="w-5 h-5" />
              All events
            </Link>

            {/* DETAILS */}
            <div className="flex flex-col gap-6 w-full">
              <div className="flex flex-col gap-6">
                <h1 className="font-heading font-bold text-5xl md:text-[52px] leading-[1.2] tracking-[-0.52px] text-[#0c090a]">
                  Event title heading
                </h1>
                <p className="font-sans text-[18px] leading-[1.5] text-[#0c090a]/80">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
                </p>
              </div>

              {/* DATE & SPOTS */}
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4">
                  <p className="font-semibold text-[18px] text-[#0c090a]">
                    Sat 10 Feb
                  </p>
                  <div className="bg-[#0c090a]/5 px-[10px] py-[4px] rounded-md border border-transparent">
                    <p className="font-semibold text-sm text-[#0c090a]">
                      10 Spots left!
                    </p>
                  </div>
                </div>

                {/* COUNTDOWN TIMER */}
                <div className="flex flex-row items-center gap-4 bg-[#f2f2f2] border border-[#0c090a]/15 rounded-[32px] px-6 py-4 w-max">
                  {/* Days */}
                  <div className="flex flex-col items-center justify-center w-16">
                    <p className="font-bold text-[44px] leading-[1.2] tracking-[-0.44px]">{timeLeft.d}</p>
                    <p className="text-base">Days</p>
                  </div>
                  <div className="w-[1px] h-10 bg-black/10"></div>
                  {/* Hours */}
                  <div className="flex flex-col items-center justify-center w-16">
                    <p className="font-bold text-[44px] leading-[1.2] tracking-[-0.44px]">{timeLeft.h}</p>
                    <p className="text-base">Hours</p>
                  </div>
                  <div className="w-[1px] h-10 bg-black/10"></div>
                  {/* Mins */}
                  <div className="flex flex-col items-center justify-center w-16">
                    <p className="font-bold text-[44px] leading-[1.2] tracking-[-0.44px]">{timeLeft.m}</p>
                    <p className="text-base">Min</p>
                  </div>
                  <div className="w-[1px] h-10 bg-black/10"></div>
                  {/* Secs */}
                  <div className="flex flex-col items-center justify-center w-16">
                    <p className="font-bold text-[44px] leading-[1.2] tracking-[-0.44px]">{timeLeft.s}</p>
                    <p className="text-base">Secs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIONS / FORM */}
            <div className="flex flex-col gap-4 w-full md:w-[480px]">
              <form className="flex flex-col md:flex-row gap-4 w-full" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-[1] bg-[#0c090a]/5 border border-[#0c090a] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-brand-pink/50 text-base"
                />
                <button 
                  className="flex items-center justify-center px-6 py-3 rounded-xl font-medium text-base text-[#0c090a] whitespace-nowrap transition-transform hover:scale-[1.02]"
                  style={{
                    backgroundImage: "linear-gradient(131.73deg, #F3B7BE 0%, #FDE92F 100%)"
                  }}
                >
                  Save my spot
                </button>
              </form>
              <p className="text-[12px] text-[#0c090a]/70">
                By clicking Save my spot you're confirming that you agree with our <Link href="#" className="underline">Terms and Conditions</Link>.
              </p>
            </div>

          </div>

          {/* RIGHT: IMAGE */}
          <div className="flex-[1_0_0] relative w-full aspect-square rounded-[40px] overflow-hidden bg-gray-100">
            <Image 
              src="/images/hero.png" 
              alt="Event placeholder" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── EVENT DETAILS SECTION (Placeholder to match typical event pages) ── */}
      <section className="bg-[#fafafa] py-24 px-6 lg:px-16">
        <div className="max-w-[768px] mx-auto flex flex-col gap-10">
          <h2 className="font-heading font-bold text-[36px] leading-[1.2]">About this event</h2>
          <div className="prose prose-lg text-[#0c090a]/80 max-w-none">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <br/>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <ul>
              <li>Key takeaway number one</li>
              <li>Understanding the core concepts</li>
              <li>Networking with industry leaders</li>
            </ul>
          </div>
        </div>
      </section>

    </main>
  )
}