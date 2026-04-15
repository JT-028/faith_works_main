import { useState, useEffect, useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import HomePage from '@/pages/Home'

function ScrollToTop() {
  const { pathname } = useLocation()
  useLayoutEffect(() => {
    // Override smooth-scroll so the reset is truly instant
    const html = document.documentElement
    html.style.scrollBehavior = 'auto'
    html.scrollTop = 0
    document.body.scrollTop = 0
    // Restore smooth-scroll after reset
    requestAnimationFrame(() => {
      html.style.scrollBehavior = ''
    })
  }, [pathname])
  return null
}
import AboutPage from '@/pages/About'
import ProgramsPage from '@/pages/Programs'
import SpeakingLPPage from '@/pages/SpeakingLP'
import CommunityPage from '@/pages/Community'
import BlogPage from '@/pages/Blog'
import MediaPage from '@/pages/Media'
import IntroLoader from '@/components/IntroLoader'

function App() {
  const location = useLocation()
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    if (showLoader) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showLoader])

  return (
    <>
      <ScrollToTop />
      {showLoader && <IntroLoader onComplete={() => setShowLoader(false)} />}
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage ready={!showLoader} />} />
          <Route path="about" element={<AboutPage ready={!showLoader} />} />
          <Route path="programs" element={<ProgramsPage ready={!showLoader} />} />
          <Route path="speaking" element={<SpeakingLPPage />} />
          <Route path="community" element={<CommunityPage ready={!showLoader} />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="media" element={<MediaPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App