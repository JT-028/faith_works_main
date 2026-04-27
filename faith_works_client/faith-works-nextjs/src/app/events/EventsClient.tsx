"use client"

import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

/* ─── TYPES ───────────────────────────────────────────────────────────────── */

export type ContentCategory = "All" | "Events" | "Podcasts" | "News" | "Upgrades"

export interface ContentItem {
  id: string
  category: "Events" | "Podcasts" | "News" | "Upgrades"
  title: string
  date: string
  description: string
  imageUrl: string
  linkUrl: string
  author?: string
  
  // Event Specific
  location?: string
  isVirtual?: boolean
  
  // Podcast Specific
  duration?: string
  episodeNumber?: number
}

/* ─── DUMMY DATA ──────────────────────────────────────────────────────────── */

const FEED_DATA: ContentItem[] = [
  {
    id: "e-1",
    category: "Events",
    title: "Founder's Clarity Workshop 2026",
    date: "May 12, 2026",
    description: "Join Faith for an intensive 2-day workshop focused on aligning your business strategy with deep personal conviction. Expect actionable frameworks and hot-seat coaching.",
    imageUrl: "/images/hero.png",
    linkUrl: "/programs",
    location: "Metro Manila, Philippines",
    isVirtual: false,
  },
  {
    id: "p-1",
    category: "Podcasts",
    title: "Episode 42: Building Brands Over Noise",
    date: "April 20, 2026",
    description: "Faith breaks down the difference between shouting into the void and building a brand that resonates with unshakeable conviction. Stop competing on volume, start leading with truth.",
    imageUrl: "/images/faith-about-img.jpg",
    linkUrl: "#",
    duration: "45 min",
    episodeNumber: 42,
  },
  {
    id: "n-1",
    category: "News",
    title: "Faith Works selected for Top 100 Asian Strategy Firms",
    date: "April 15, 2026",
    description: "We are thrilled to announce that Faith Works has been officially recognized by the Global Brand Alliance. Read the full press release.",
    imageUrl: "/images/hero.png",
    linkUrl: "#",
  },
  {
    id: "u-1",
    category: "Upgrades",
    title: "The Ultimate Conviction Blueprint (Free PDF)",
    date: "April 10, 2026",
    description: "Download the exact 5-step framework we use to help 8-figure founders lock in their messaging and eliminate market confusion. Free for a limited time.",
    imageUrl: "/images/faith-about-img.jpg",
    linkUrl: "/programs", // Linked to dedicated LP as requested
  },
  {
    id: "e-2",
    category: "Events",
    title: "Virtual Masterclass: Strategy Meets Faith",
    date: "May 25, 2026",
    description: "A free online gathering for Filipino entrepreneurs to discuss modern marketing strategies while staying true to core values.",
    imageUrl: "/images/hero.png",
    linkUrl: "#",
    location: "Zoom",
    isVirtual: true,
  },
]

const TABS: ContentCategory[] = ["All", "Events", "Podcasts", "News", "Upgrades"]

/* ─── MAIN COMPONENT ──────────────────────────────────────────────────────── */

export default function EventsClient() {
  const [activeTab, setActiveTab] = useState<ContentCategory>("All")

  // Filter out podcasts manually so we can group them in a carousel
  const nonPodcastFeed = FEED_DATA.filter((item) => item.category !== "Podcasts")
  const podcastFeed = FEED_DATA.filter((item) => item.category === "Podcasts")

  // Compute what to show in the standard grid
  // If activeTab is "Podcasts", the main grid is empty.
  const filteredGridFeed = nonPodcastFeed.filter(
    (item) => activeTab === "All" || item.category === activeTab
  )

  const showPodcasts = activeTab === "All" || activeTab === "Podcasts"

  return (
    <main className="min-h-screen bg-white pt-32 pb-[112px] text-[#0c090a] overflow-x-hidden">
      {/* ── HEADER SECTION ── */}
      <section className="mx-auto flex flex-col items-center px-6 lg:px-16 pt-[112px] pb-[112px] max-w-[1280px]">
        <div className="flex flex-col gap-4 items-center w-full max-w-[768px]">
          <div className="flex items-center w-full justify-center">
            <span className="font-semibold text-base text-[#0c090a]">
              Insights
            </span>
          </div>
          <div className="flex flex-col gap-6 items-center text-center w-full">
            <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-[72px] leading-[1.2] tracking-[-0.72px] text-[#0c090a]">
              Strategy and stories
            </h1>
            <p className="font-sans text-[18px] leading-[1.5] text-[#0c090a] max-w-xl">
              Real advice for Filipino business owners building brands that matter
            </p>
          </div>
          <div className="flex flex-wrap gap-4 items-start w-full justify-center mt-6">
            <Link
              href="/programs"
              className="flex items-center justify-center px-6 py-2.5 rounded-xl font-medium text-[#0c090a] text-base transition-transform hover:scale-[1.02]"
              style={{
                backgroundImage: "linear-gradient(126.45deg, #F3B7BE 0%, #FDE92F 100%)"
              }}
            >
              Get Free Resources
            </Link>
            <button
              onClick={() => setActiveTab("All")}
              className="flex items-center justify-center px-6 py-2.5 rounded-xl font-medium text-[#0c090a] text-base bg-[#0c090a]/5 hover:bg-[#0c090a]/10 transition-colors"
            >
              Explore Events
            </button>
          </div>
        </div>
      </section>

      {/* ── FILTER TABS ── */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-16">
        <div className="flex flex-wrap gap-3 border-b border-[#0c090a]/10 pb-6 mb-[80px]">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300",
                activeTab === tab
                  ? "bg-[#0c090a] text-white shadow-md scale-105"
                  : "bg-transparent text-[#0c090a]/70 hover:bg-[#0c090a]/5 hover:text-[#0c090a]"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      {/* ── FEED GRID (Events, News, Upgrades) ── */}
      {(filteredGridFeed.length > 0) && (
        <section className="mx-auto max-w-[1280px] px-6 lg:px-16 flex flex-col gap-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 lg:gap-x-8">
            {filteredGridFeed.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* ── PODCAST VIDEO CAROUSEL SECTION ── */}
      {showPodcasts && (
        <section className={cn("mx-auto max-w-[1280px] px-6 lg:px-16 flex flex-col gap-10", filteredGridFeed.length > 0 ? "mt-24" : "mt-0")}>
          <div className="flex flex-col gap-2">
            <h2 className="font-heading font-bold text-4xl text-[#0c090a]">Listen In</h2>
            <p className="font-sans text-lg text-[#0c090a]/70">Watch the latest episodes of the podcast.</p>
          </div>
          
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar">
            {podcastFeed.map((item) => (
              <PodcastVideoCard key={item.id} item={item} />
            ))}
            {/* Duplicate for strictly visual flow mapping since it's dummy data */}
            {podcastFeed.map((item, i) => (
              <PodcastVideoCard key={`${item.id}-dup-${i}`} item={{...item, id: `${item.id}-dup-${i}`}} />
            ))}
            {podcastFeed.map((item, i) => (
              <PodcastVideoCard key={`${item.id}-dup2-${i}`} item={{...item, id: `${item.id}-dup2-${i}`}} />
            ))}
          </div>
        </section>
      )}

      {/* ── FALLBACK FOR EMPTY TABS ── */}
      {filteredGridFeed.length === 0 && !showPodcasts && (
        <div className="text-center py-24 text-[#0c090a]/50">
          <p className="text-xl">No content available for this category yet.</p>
        </div>
      )}

    </main>
  )
}

/* ─── CARD COMPONENT (Exact Wireframe Styling restored) ──────────────────────────────────────────────────────── */

function ContentCard({ item }: { item: ContentItem }) {
  // Enforcing the strict exact wireframe layout/look from Node 10250:63348
  // Generic un-colored tag
  const tagClass = "bg-[#0c090a]/5 px-[10px] py-1 rounded-md shrink-0 font-semibold text-sm text-[#0c090a] border border-transparent"
  
  return (
    <article className="group flex flex-col items-start gap-6 w-full">
      {/* CARD IMAGE */}
      <div className="relative aspect-[4/3] md:aspect-[405/270] w-full rounded-[40px] overflow-hidden shrink-0">
        <Link href={`/events/${item.id}`} className="block w-full h-full">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 transition-colors duration-300 group-hover:bg-black/10" />
        </Link>
        
        {/* Floating Badge overlay for context */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {item.isVirtual && (
            <span className="px-3 py-1 rounded-full border border-white/20 text-xs font-semibold backdrop-blur-md bg-black/40 text-white shadow-sm">
              Virtual
            </span>
          )}
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="flex flex-col gap-4 items-start w-full">
        {/* INFO ROW */}
        <div className="flex items-center gap-4 w-full">
          <div className={tagClass}>
            {item.category}
          </div>
          <p className="font-semibold text-sm text-[#0c090a] whitespace-nowrap">
            {item.duration || item.date}
          </p>
        </div>

        {/* TITLE & DESC */}
        <div className="flex flex-col gap-2 items-start w-full">
          <Link href={`/events/${item.id}`} className="group/title block">
            <h3 className="font-heading font-bold text-[28px] leading-[1.4] tracking-[-0.28px] text-[#0c090a] line-clamp-3 group-hover/title:underline decoration-2 underline-offset-4">
              {item.title}
            </h3>
          </Link>
          <p className="font-sans text-base leading-[1.5] text-[#0c090a] line-clamp-3">
            {item.description}
          </p>
        </div>
      </div>

      {/* ACTION BUTTON (Unified Wireframe Style: "Read now" / "Register") */}
      <div className="flex items-center justify-start rounded-xl mt-auto pt-2 w-full">
         <Link 
            href={`/events/${item.id}`}
            className="flex items-center justify-center px-4 py-2 rounded-xl font-medium text-base text-[#0c090a] bg-transparent transition-all border border-transparent hover:bg-[#0c090a]/5"
          >
            {item.category === "Events" ? "Register now" : "Read now"}
            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </Link>
      </div>
    </article>
  )
}

/* ─── PODCAST VIDEO CAROUSEL CARD ────────────────────────────────────────── */

function PodcastVideoCard({ item }: { item: ContentItem }) {
  return (
    <article className="group flex flex-col items-start gap-4 w-[300px] md:w-[400px] shrink-0 snap-start">
      {/* VIDEO THUMBNAIL CONTAINER */}
      <div className="relative aspect-[16/9] w-full rounded-[32px] overflow-hidden bg-[#0c090a]/5">
        <Link href={`/events/${item.id}`} className="block w-full h-full">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
            {/* Play Button Icon overlay */}
            <div className="w-16 h-16 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
              <svg className="w-8 h-8 text-white ml-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      <div className="flex flex-col gap-2 p-2">
        <div className="flex gap-3 text-sm font-semibold text-[#0c090a]/60">
          <span>{item.date}</span>
          <span>•</span>
          <span>{item.duration}</span>
        </div>
        <Link href={`/events/${item.id}`} className="block group-hover:underline underline-offset-4 decoration-2">
          <h3 className="font-heading font-bold text-[24px] leading-[1.3] text-[#0c090a] line-clamp-2">
            {item.title}
          </h3>
        </Link>
      </div>
    </article>
  )
}
