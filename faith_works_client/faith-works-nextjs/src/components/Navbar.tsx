"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/about", label: "About Faith" },
  { href: "/programs", label: "Programs" },
  { href: "/community", label: "Community" },
  { href: "/blog", label: "Blog" },
  { href: "/media", label: "Media" },
]

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all",
        isScrolled
          ? "bg-white/60 backdrop-blur-2xl shadow-[0_1px_24px_rgba(239,172,186,0.12)] border-b border-white/40 py-3"
          : "bg-transparent py-5"
      )}
      style={{
        transitionDuration: "var(--duration-normal)",
        ...(isScrolled ? { backdropFilter: "blur(20px) saturate(1.8)" } : {}),
      }}
    >
      <nav className="mx-auto flex max-w-[var(--container-max)] items-center justify-between px-6 lg:px-16">
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label="Faith Works Home">
          <img
            src={isScrolled ? "/images/faithworks.png" : "/images/faithworks-black.png"}
            alt="Faith Works"
            className="h-10 w-auto object-contain transition-all"
            draggable={false}
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand-pink",
                  pathname === link.href ? "text-brand-pink" : "text-brand-dark"
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <Link
          href="/programs"
          className="hidden rounded-[var(--radius-md)] gradient-pink-gold px-6 py-2.5 text-sm font-semibold text-brand-dark shadow-[var(--shadow-button)] transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-card-hover)] lg:inline-flex"
        >
          Join the Accelerator
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          type="button"
          className="cursor-pointer rounded-lg p-2 text-brand-dark transition-colors hover:bg-brand-card lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out lg:hidden",
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="mx-6 mt-2 flex flex-col gap-1 rounded-[var(--radius-xl)] bg-white p-4 shadow-[var(--shadow-card)]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "rounded-[var(--radius-md)] px-4 py-3 text-sm font-medium transition-colors hover:bg-brand-pink-light",
                pathname === link.href ? "bg-brand-pink-light text-brand-pink" : "text-brand-dark"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/programs"
            onClick={() => setIsOpen(false)}
            className="mt-2 rounded-[var(--radius-md)] gradient-pink-gold px-6 py-3 text-center text-sm font-semibold text-brand-dark"
          >
            Join the Accelerator
          </Link>
        </div>
      </div>
    </header>
  )
}
