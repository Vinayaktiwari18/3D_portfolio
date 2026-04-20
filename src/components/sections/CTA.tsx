// src/components/sections/CTA.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import MarqueeRow from '@/components/ui/MarqueeRow';
import WhatsAppModal from '@/components/ui/WhatsAppModal';

const TECH_ITEMS = [
  'REACT', 'PYTHON', 'AI', 'VOICE', 'HTML',
  'CSS', 'NODE', 'NLP', 'EDGE-TTS', 'OPENROUTER',
];

const FINAL_TEXT = 'BUILDING HUMAN-LIKE AI SYSTEMS';
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

const CONTACT_LINKS = [
  { label: 'GitHub',    href: 'https://github.com/Vinayaktiwari18' },
  { label: 'LinkedIn',  href: 'https://linkedin.com/in/vinayak-tiwari1809' },
  { label: 'Email',     href: 'mailto:vinayakt9639@gmail.com' },
  { label: 'Instagram', href: '#' },
  { label: 'Twitter',   href: '#' },
];

export default function CTA() {
  const [display, setDisplay] = useState<string>('');
  const [whatsappOpen, setWhatsappOpen] = useState<boolean>(false);
  const hasRun = useRef<boolean>(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            let resolved = 0;
            const total = FINAL_TEXT.length;
            const interval = setInterval(() => {
              resolved = Math.min(resolved + 0.5, total);
              const resolvedCount = Math.floor(resolved);
              const scrambled = FINAL_TEXT.split('')
                .map((char, i) => {
                  if (char === ' ') return ' ';
                  if (i < resolvedCount) return FINAL_TEXT[i];
                  return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join('');
              setDisplay(scrambled);
              if (resolvedCount >= total) clearInterval(interval);
            }, 40);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const onResumeEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'var(--black)';
    e.currentTarget.style.color = '#fff';
  };
  const onResumeLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.background = 'transparent';
    e.currentTarget.style.color = 'var(--black)';
  };
  const onTalkEnter = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.opacity = '0.85';
  };
  const onTalkLeave = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.opacity = '1';
  };
  const onSocialEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--orange)';
  };
  const onSocialLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--gray)';
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="contact"
        style={{ background: 'var(--off-white)', padding: '116px 80px', overflow: 'hidden' }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '48px',
          }}
        >
          <div style={{ width: '100vw', marginLeft: 'calc(-50vw + 50%)' }}>
            <MarqueeRow
              items={TECH_ITEMS}
              direction="left"
              duration={12}
              dotColor="orange"
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <h2
              className="cta-heading"
              style={{
                fontFamily: 'Teko, sans-serif',
                fontSize: 'clamp(28px, 4vw, 65px)',
                fontWeight: 600,
                color: 'var(--black)',
                letterSpacing: '0.04em',
                lineHeight: 1,
                margin: '0 0 8px',
                minHeight: '1.1em',
                whiteSpace: 'nowrap',
              }}
            >
              {display || '\u00A0'}
            </h2>
            <p
              style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: '16px',
                color: 'var(--gray)',
                margin: '16px 0 0',
                lineHeight: 1.7,
                maxWidth: '480px',
              }}
            >
              From idea to shipped product. Let&apos;s build something that feels alive.
            </p>
          </div>

          <div style={{ width: '48px', height: '1.5px', background: 'var(--orange)' }} />

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a id="resumeBtn"
              href="#"
              onMouseEnter={onResumeEnter}
              onMouseLeave={onResumeLeave}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '14px 36px',
                background: 'transparent',
                color: 'var(--black)',
                border: '1.5px solid var(--black)',
                borderRadius: '2px',
                textDecoration: 'none',
                display: 'inline-block',
                transition: 'all 0.2s ease',
              }}
            >
              Download Resume
            </a>
            <button
              onClick={() => setWhatsappOpen(true)}
              onMouseEnter={onTalkEnter}
              onMouseLeave={onTalkLeave}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '16px',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '14px 36px',
                background: 'var(--orange)',
                color: '#fff',
                border: 'none',
                borderRadius: '2px',
                cursor: 'pointer',
                transition: 'opacity 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              Let&apos;s Talk 💬
            </button>
          </div>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {CONTACT_LINKS.map((link) => (
              <a key={link.label}
                href={link.href}
                target={link.href !== '#' ? '_blank' : undefined}
                rel={link.href !== '#' ? 'noopener noreferrer' : undefined}
                onMouseEnter={onSocialEnter}
                onMouseLeave={onSocialLeave}
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  color: 'var(--gray)',
                  letterSpacing: '0.08em',
                  textDecoration: 'none',
                  textTransform: 'uppercase',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      <WhatsAppModal isOpen={whatsappOpen} onClose={() => setWhatsappOpen(false)} />
    </>
  );
}