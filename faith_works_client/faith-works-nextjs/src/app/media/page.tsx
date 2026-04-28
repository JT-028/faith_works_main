import type { Metadata } from "next"
import MediaHero from "@/sections/media/MediaHero"
import MediaLogoWall from "@/sections/media/MediaLogoWall"
import PressKitDownloads from "@/sections/media/PressKitDownloads"
import SpeakingInquiry from "@/sections/media/SpeakingInquiry"

export const metadata: Metadata = {
  title: "Media Kit & Press | FaithWorks",
  description:
    "Faith Natividad in the media — press coverage, featured appearances, and the official press kit for journalists and event organizers.",
}

export default function MediaPage() {
  return (
    <>
      <MediaHero />
      <MediaLogoWall />
      <PressKitDownloads />
      <SpeakingInquiry />
    </>
  )
}

