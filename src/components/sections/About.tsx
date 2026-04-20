// src/components/sections/About.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';

const LINES = [
  "I'm Vinayak — a 20-something from UP who",
  'moved to Hyderabad with one goal: build',
  'things that matter.',
  '',
  'I started with curiosity, built with',
  'stubbornness, and somewhere along the way',
  '— created YAAR.',
  '',
  'Not just a project. A vision. An AI that',
  'feels human. That\'s what I\'m working',
  'toward, every single day.',
];

export default function About() {
  const [visibleLines, setVisibleLines] = useState<boolean[]>(
    new Array(LINES.length).fill(false)
  );
  const sectionRef = useRef<HTMLElement>(null);
  const hasRun = useRef<boolean>(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            LINES.forEach((_, i) => {
              setTimeout(() => {
                setVisibleLines((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, i * 200);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{
        background: '#fff',
        padding: '116px 80px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '38.2fr 61.8fr',
          gap: '80px',
          alignItems: 'center',
        }}
      >
        {/* Left — decorative */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
          }}
        >
          {/* Large faint text */}
          <span
            style={{
              fontFamily: 'Teko, sans-serif',
              fontSize: 'clamp(80px, 12vw, 140px)',
              fontWeight: 700,
              color: 'rgba(0,0,0,0.04)',
              lineHeight: 0.9,
              userSelect: 'none',
              pointerEvents: 'none',
              letterSpacing: '-0.02em',
            }}
          >
            WHO
            <br />I AM
          </span>

          {/* Accent line */}
          <div
            style={{
              width: '48px',
              height: '3px',
              background: 'var(--orange)',
            }}
          />

          {/* Info pills */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { key: 'name', value: 'Vinayak Tiwari' },
              { key: 'age', value: '20-something' },
              { key: 'from', value: 'UP → Hyderabad' },
              { key: 'role', value: 'Founder, YAAR' },
              { key: 'edu', value: 'BCA Student' },
            ].map((item) => (
              <div
                key={item.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '10px',
                    color: 'var(--cyan)',
                    letterSpacing: '0.08em',
                    minWidth: '48px',
                    textTransform: 'lowercase',
                  }}
                >
                  {item.key}
                </span>
                <span
                  style={{
                    width: '16px',
                    height: '1px',
                    background: 'rgba(0,0,0,0.15)',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: '13px',
                    color: 'var(--black)',
                  }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — text lines */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <SectionLabel text="// Who I Am" color="orange" />

          <h2
            style={{
              fontFamily: 'Teko, sans-serif',
              fontSize: 'clamp(42px, 5vw, 63px)',
              color: 'var(--black)',
              margin: '0 0 40px',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            ABOUT
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
              maxWidth: '680px',
            }}
          >
            {LINES.map((line, i) =>
              line === '' ? (
                <div key={i} style={{ height: '20px' }} />
              ) : (
                <p
                  key={i}
                  style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: '18px',
                    color: 'var(--black)',
                    lineHeight: 1.9,
                    margin: 0,
                    opacity: visibleLines[i] ? 1 : 0,
                    transform: visibleLines[i]
                      ? 'translateY(0)'
                      : 'translateY(12px)',
                    transition: 'opacity 0.5s ease, transform 0.5s ease',
                  }}
                >
                  {line}
                </p>
              )
            )}
          </div>

          {/* Signature */}
          <div
            style={{
              marginTop: '48px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span
              style={{
                fontFamily: 'Caveat, cursive',
                fontSize: '32px',
                color: 'var(--orange)',
              }}
            >
              Vinayak
            </span>
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                color: 'var(--gray)',
                letterSpacing: '0.08em',
              }}
            >
              — YAAR.world · Hyderabad
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}