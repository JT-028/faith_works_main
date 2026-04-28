import React from "react"
import { DownloadCloud, Image as ImageIcon, FileText, FileBadge } from "lucide-react"
import { Card, CardContent } from "@/components/card"

const downloads = [
  {
    id: "headshots-high-res",
    title: "High-Res Headshots",
    description: "Print-ready photos (.JPG + .PNG, 300dpi)",
    icon: ImageIcon,
    fileSize: "24 MB",
    downloadUrl: "/assets/media/headshots.zip"
  },
  {
    id: "bios",
    title: "Official Bios",
    description: "Short, medium, and long formats (.PDF + .DOCX)",
    icon: FileText,
    fileSize: "1.2 MB",
    downloadUrl: "/assets/media/bios.zip"
  },
  {
    id: "brand-assets",
    title: "Brand Assets",
    description: "Logos, brand colors, and guidelines (.SVG + .PNG)",
    icon: FileBadge,
    fileSize: "5 MB",
    downloadUrl: "/assets/media/brand-assets.zip"
  }
]

export default function PressKitDownloads() {
  return (
    <section id="downloads" className="py-24 lg:py-32 bg-brand-offwhite">
      <div className="mx-auto max-w-[var(--container-max)] px-6 lg:px-16">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-brand-dark sm:text-5xl">
            Press Kit Downloads
          </h2>
          <p className="mt-4 text-lg text-brand-muted sm:text-xl">
            Get instant access to curated assets for your publication or event materials.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {downloads.map((item) => {
            const Icon = item.icon
            return (
              <Card 
                key={item.id} 
                className="group relative overflow-hidden transition-all duration-normal hover:-translate-y-2 hover:shadow-card-hover border-transparent hover:border-brand-pink/20"
              >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand-pink/5 via-transparent to-brand-gold/5 opacity-0 transition-opacity duration-normal group-hover:opacity-100" />
                <CardContent className="relative z-10 flex flex-col p-8 h-full">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-pink/10 text-brand-pink-dark">
                    <Icon className="h-7 w-7" />
                  </div>
                  
                  <h3 className="font-heading text-2xl font-bold text-brand-dark mb-2">
                    {item.title}
                  </h3>
                  <p className="mt-1 flex-1 text-brand-muted leading-relaxed">
                    {item.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-brand-dark/10 pt-6">
                    <span className="text-sm font-medium text-brand-muted/70">
                      ZIP • {item.fileSize}
                    </span>
                    <a
                      href={item.downloadUrl}
                      download
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-dark/5 text-brand-dark transition-colors duration-normal hover:bg-brand-pink hover:text-white"
                      aria-label={`Download ${item.title}`}
                    >
                      <DownloadCloud className="h-5 w-5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="mt-16 flex justify-center">
          <a
             href="/assets/media/full-press-kit.zip"
             download
             className="group inline-flex h-16 items-center justify-center gap-3 rounded-full bg-brand-dark px-10 font-bold text-white transition-all duration-normal hover:bg-brand-dark/90 hover:scale-105"
          >
            Download Full Press Kit
            <span className="text-sm font-normal opacity-70">(30 MB)</span>
            <DownloadCloud className="h-5 w-5 transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>
    </section>
  )
}
