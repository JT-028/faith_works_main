import { Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/layouts/MainLayout'
import HomePage from '@/pages/Home'
import AboutPage from '@/pages/About'
import ProgramsPage from '@/pages/Programs'
import CommunityPage from '@/pages/Community'
import BlogPage from '@/pages/Blog'
import MediaPage from '@/pages/Media'

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="community" element={<CommunityPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="media" element={<MediaPage />} />
      </Route>
    </Routes>
  )
}

export default App