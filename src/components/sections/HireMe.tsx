// src/components/sections/HireMe.tsx
'use client';

import { useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import WhatsAppModal from '@/components/ui/WhatsAppModal';
import HireMeModal from '@/components/ui/HireMeModal';

export default function HireMe() {
  const [whatsappOpen, setWhatsappOpen] = useState<boolean>(false);
  const [hireMeOpen, setHireMeOpen] = useState<boolean>(false);

  return (
    <>
      <section
        id="hire"
        style={{
          background: '#fff',
          padding: '80px',
          borderTop: '1px solid rgba(0,0,0,0.06)',
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '40px',
            flexWrap: 'wrap',
          }}
          className="hireme-inner"
        >
          {/* Left */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <SectionLabel text="// Available Now" color="orange" />
            <h2
              className="reveal"
              style={{
                fontFamily: 'Teko, sans-serif',
                fontSize: 'clamp(32px, 4vw, 42px)',
                color: 'var(--black)',
                margin: '0 0 10px',
                letterSpacing: '0.02em',
                lineHeight: 1.1,
              }}
            >
              Ready to build something real?
            </h2>
            <p
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '15px',
                color: 'var(--gray)',
                margin: 0,
                maxWidth: '420px',
                lineHeight: 1.7,
              }}
            >
              I&apos;m open to internships, freelance projects, and
              collaborations. Let&apos;s make something that matters.
            </p>
          </div>

          {/* Right — buttons */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexShrink: 0,
              flexWrap: 'wrap',
            }}
          >
            <button
              onClick={() => setHireMeOpen(true)}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '14px 32px',
                background: 'var(--orange)',
                color: '#fff',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Why Hire Me?
            </button>

            <button
              onClick={() => setWhatsappOpen(true)}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '14px 32px',
                background: 'transparent',
                color: 'var(--black)',
                border: '1.5px solid var(--black)',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--black)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--black)';
              }}
            >
              Let&apos;s Talk 💬
            </button>
          </div>
        </div>
      </section>

      <WhatsAppModal
        isOpen={whatsappOpen}
        onClose={() => setWhatsappOpen(false)}
      />
      <HireMeModal
        isOpen={hireMeOpen}
        onClose={() => setHireMeOpen(false)}
      />
    </>
  );
}