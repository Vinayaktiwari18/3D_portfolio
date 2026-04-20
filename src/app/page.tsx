import { AvatarCanvas } from '@/components/avatar/AvatarCanvas'
import { ChatPanel } from '@/components/chat/ChatPanel'

export default function Home() {
  return (
    <main>
      {/* Avatar — always on screen */}
      <AvatarCanvas />

      {/* Chat panel — opens when avatar clicked */}
      <ChatPanel />

      {/* Portfolio sections — Phase 5 */}
      <section
        id="hero"
        style={{ minHeight: '100vh', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'sans-serif', fontSize: '24px',
          color: '#8A8A8A'
        }}
      >
        Click the avatar bottom-right → chat opens 👇
      </section>

      <section id="projects" style={{ minHeight: '100vh',
        background: '#F4F2ED' }}
      />
      <section id="skills" style={{ minHeight: '100vh' }} />
      <section id="about" style={{ minHeight: '100vh',
        background: '#F4F2ED' }}
      />
      <section id="status" style={{ minHeight: '100vh' }} />
      <section id="stats" style={{ minHeight: '100vh',
        background: '#0D0D0D' }}
      />
      <section id="hire" style={{ minHeight: '100vh' }} />
      <section id="contact" style={{ minHeight: '100vh',
        background: '#F4F2ED' }}
      />
    </main>
  )
}
