import { AvatarCanvas } from '@/components/avatar/AvatarCanvas'
import { ChatPanel } from '@/components/chat/ChatPanel'
import Navbar from '@/components/ui/Navbar'
import LoadingScreen from '@/components/ui/LoadingScreen'
import CursorDot from '@/components/ui/CursorDot'
import MobileTabBar from '@/components/ui/MobileTabBar'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import About from '@/components/sections/About'
import Dashboard from '@/components/sections/Dashboard'
import Stats from '@/components/sections/Stats'
import HireMe from '@/components/sections/HireMe'
import CTA from '@/components/sections/CTA'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CursorDot />
      <Navbar />
      <AvatarCanvas />
      <ChatPanel />

      <main style={{ paddingTop: '64px' }}>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Dashboard />
        <Stats />
        <HireMe />
        <CTA />
        <Footer />
      </main>

      <MobileTabBar />
    </>
  )
}