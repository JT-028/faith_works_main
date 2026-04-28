import type { Metadata, Viewport } from "next"
import { AppProvider } from "@/context/AppContext"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ScrollToTop } from "@/components/ScrollToTop"
import PageTransition from "@/components/PageTransition"
import SmoothScroll from "@/components/SmoothScroll"
import { ChatSupport } from "@/components/ChatSupport"
import "./globals.css"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: {
    default: "Faith Works — Build Your Brand with Strategy and Conviction",
    template: "%s | Faith Works",
  },
  description:
    "Where faith meets strategy. Join Filipino entrepreneurs who are building businesses that matter — with strategy and conviction as the foundation.",
  openGraph: {
    type: "website",
    siteName: "Faith Works",
    locale: "en_US",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <AppProvider>
            <ScrollToTop />
            <PageTransition />
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ChatSupport />
          </AppProvider>
        </SmoothScroll>
      </body>
    </html>
  )
}

