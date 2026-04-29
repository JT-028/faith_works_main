"use client"

import { useEffect, useState } from "react"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    quote: "Faith Works changed the trajectory of my business. I finally have a brand strategy that makes sense and a community that keeps me accountable.",
    name: "Ana Reyes",
    role: "CEO, Bloom Studio"
  },
  {
    quote: "The accelerator gave me clarity I'd been looking for for years. Faith doesn't just motivate — she gives you the exact steps to win.",
    name: "Carlos Mendoza",
    role: "Founder, Mendoza Corp"
  },
  {
    quote: "I joined the AI workshop and it completely shifted how my team operates. Real tools, real results. No tech jargon, just practical value.",
    name: "Maria Santos",
    role: "Operations Director, TechPH"
  },
  {
    quote: "The network alone is worth it. Being surrounded by other driven Filipino entrepreneurs forces you to level up every single day.",
    name: "Miguel Ocampo",
    role: "Founder, ScaleX"
  },
  {
    quote: "No fluff, just actionable strategies. Implement what Faith teaches, and you literally cannot fail. It's that simple.",
    name: "Elena Diaz",
    role: "E-commerce Owner"
  }
]

export function CommunityTestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  // Switch testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const CARDS = 10;
  // Radius of the rotating circle
  const RADIUS = 750; 

  return (
    <section className="relative overflow-hidden bg-[#f9f9f9] pt-24 pb-0 text-[#202020]">
      {/* Dynamic Keyframes to ensure simple constant rotation */}
      <style>{`
        @keyframes carousel-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-carousel-spin {
          animation: carousel-spin 40s linear infinite;
        }
      `}</style>

      {/* Faint vertical line down the center matching Dev Toolkit setup */}
      <div className="pointer-events-none absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 border-l border-black/5" />

      <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
        
        {/* Top Header */}
        <h2 className="font-heading mx-auto max-w-4xl text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-[#202020]">
          Community <span className="text-brand-pink">*</span><br />Built to Elevate
        </h2>
        
        {/* Pill Subtitle */}
        <p className="mx-auto max-w-3xl text-lg md:text-xl text-black/70 leading-relaxed font-medium mb-12">
          A network packed with <span className="bg-white px-2 py-0.5 rounded-md border border-black/10 text-black shadow-sm mx-1 inline-block">CEOs</span> &{" "}
          <span className="bg-white px-2 py-0.5 rounded-md border border-black/10 text-black shadow-sm mx-1 inline-block">Founders</span>, proven{" "}
          <span className="bg-white px-2 py-0.5 rounded-md border border-black/10 text-black shadow-sm mx-1 inline-block">strategies</span> and a supportive{" "}
          <span className="bg-white px-2 py-0.5 rounded-md border border-black/10 text-black shadow-sm mx-1 inline-block">community</span>
        </p>

      </div>

      {/* Radial Carousel Area */}
      {/* 
        Container must be tall enough to fit the top half of the circle. 
        Radius = 650px, Card half-height = 140px. 800px+ height is ideal. 
      */}
      <div className="relative mx-auto w-full h-[700px] md:h-[850px] mt-8 overflow-hidden select-none">
        
        {/* Center point of rotation at the exact bottom of the container (pushed down slightly) */}
        <div className="absolute left-1/2 bottom-[-50px] w-0 h-0 z-10">
          
          {/* Rotating Wrapper */}
          <div className="absolute inset-0 animate-carousel-spin">
            {Array.from({ length: CARDS }).map((_, i) => (
              <div
                key={i}
                className="absolute shadow-[0_10px_40px_rgba(0,0,0,0.15)] border border-white/5"
                style={{
                  width: "360px", 
                  height: "260px",
                  borderRadius: "1rem", 
                  background: "linear-gradient(180deg, #1f1f1f 0%, #111 100%)", // Dark gray/black rectangles
                  // Center the element directly at the pivot (0,0) before transforming
                  left: "-180px", 
                  top: "-130px", 
                  // Rotate to its slot, then translate away from the pivot, so its bottom points to the center
                  transform: `rotate(${i * (360 / CARDS)}deg) translateY(-${RADIUS}px)`,
                }}
              >
                {/* Decorative dark aesthetic card content */}
                <div className="flex h-full flex-col justify-between p-6 overflow-hidden relative">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-pink/10 rounded-full blur-2xl" />
                  
                  <div className="flex items-center gap-2 text-brand-gold/80 relative z-10">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  
                  <div className="space-y-2 relative z-10 mt-auto mb-4">
                    <div className="h-2 w-3/4 rounded-full bg-white/20" />
                    <div className="h-2 w-1/2 rounded-full bg-white/10" />
                  </div>
                  
                  <div className="flex items-center gap-3 relative z-10">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-pink to-brand-gold opacity-80" />
                    <div className="space-y-1">
                      <div className="h-1.5 w-16 rounded-full bg-white/30" />
                      <div className="h-1.5 w-10 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Center Element: Testimonial Box */}
        {/* Placed slightly above the center pivot point */}
        <div className="absolute left-1/2 bottom-[100px] md:bottom-[180px] -translate-x-1/2 w-[90%] max-w-[500px] md:max-w-[700px] p-8 z-20 flex flex-col justify-center text-center">
          
          <div className="relative w-full h-[220px] md:h-[200px] flex items-center justify-center">
            {testimonials.map((test, i) => (
              <div
                key={i}
                className={`absolute inset-x-0 top-0 flex w-full flex-col transition-all duration-1000 ${
                  i === activeIndex
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 translate-y-4 pointer-events-none"
                }`}
              >
                <p className="text-xl md:text-3xl font-semibold leading-relaxed text-[#202020] mb-4">
                  <span className="text-brand-pink text-3xl md:text-4xl">&ldquo;</span>
                  {test.quote}
                  <span className="text-brand-pink text-3xl md:text-4xl">&rdquo;</span>
                  <span className="ml-3 text-lg md:text-xl font-bold whitespace-nowrap">— {test.name}</span>
                </p>
                <div>
                  <p className="text-sm md:text-base font-medium text-[#202020]/60 mt-1">{test.role}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
        
      </div>
    </section>
  )
}

