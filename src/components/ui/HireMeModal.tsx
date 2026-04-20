// src/components/ui/HireMeModal.tsx
'use client';

import { useEffect } from 'react';
import type { MouseEvent } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const BULLETS = [
  { icon: '✦', text: 'AI-first mindset — intelligence in everything I build' },
  { icon: '✦', text: 'Product thinker — systems not just features' },
  { icon: '✦', text: 'Voice + AI experience rare for my level' },
  { icon: '✦', text: 'I ship fast and learn faster' },
  { icon: '✦', text: 'Still in BCA — honest, growing every day' },
  { icon: '✦', text: 'Energy and commitment to every project' },
];

export default function HireMeModal({ isOpen, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const onTalkEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.opacity = '0.85';
  };
  const onTalkLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.opacity = '1';
  };
  const onEmailEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'var(--black)';
    e.currentTarget.style.color = '#fff';
  };
  const onEmailLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.color = 'var(--black)';
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(13,13,13,0.65)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
        style={{
          background: 'var(--card-bg)',
          borderRadius: '4px',
          padding: '48px',
          maxWidth: '520px',
          width: '100%',
          border: '1px solid rgba(0,0,0,0.08)',
          position: 'relative',
        }}
      >
        {/* Orange top accent */}
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, var(--orange), var(--cyan))',
            borderRadius: '4px 4px 0 0',
          }}
        />

        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: '16px', right: '16px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '22px',
            color: 'var(--gray)',
            lineHeight: 1,
          }}
        >
          ×
        </button>

        {/* Label */}
        <span
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.12em',
            color: 'var(--orange)',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px',
          }}
        >
          // Why Hire Me?
        </span>

        {/* Title */}
        <h2
          style={{
            fontFamily: 'Teko, sans-serif',
            fontSize: '42px',
            color: 'var(--black)',
            margin: '0 0 6px',
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}
        >
          THE CASE FOR VINAYAK
        </h2>

        <p
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '13px',
            color: 'var(--gray)',
            margin: '0 0 32px',
            lineHeight: 1.6,
          }}
        >
          Not just a developer. A builder with a vision.
        </p>

        {/* Bullets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {BULLETS.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span
                style={{
                  color: 'var(--orange)',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '14px',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              >
                {b.icon}
              </span>
              <span
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '14px',
                  color: 'var(--black)',
                  lineHeight: 1.6,
                }}
              >
                {b.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: '36px',
            paddingTop: '28px',
            borderTop: '1px solid rgba(0,0,0,0.08)',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <a href="https://wa.me/919639731624?text=Hey%20Vinayak!%20I%20want%20to%20hire%20you."
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={onTalkEnter}
            onMouseLeave={onTalkLeave}
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '12px 28px',
              background: 'var(--orange)',
              color: '#fff',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'opacity 0.2s ease',
            }}
          >
            Let&apos;s Talk 💬
          </a>
          <a href="mailto:vinayakt9639@gmail.com"
            onMouseEnter={onEmailEnter}
            onMouseLeave={onEmailLeave}
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '12px 28px',
              background: 'transparent',
              color: 'var(--black)',
              border: '1.5px solid var(--black)',
              borderRadius: '2px',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block',
              transition: 'all 0.2s ease',
            }}
          >
            Email Me
          </a>
        </div>
      </div>
    </div>
  );
}