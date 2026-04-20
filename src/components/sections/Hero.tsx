// src/components/sections/Hero.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';

const ROTATING_WORDS = [
  'EAT', 'CODE', 'SLEEP', 'REPEAT',
  'BUILD', 'CREATE', 'DEPLOY', 'INNOVATE',
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState<number>(0);
  const [lettersVisible, setLettersVisible] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Letter-by-letter fade in on mount
  useEffect(() => {
    const t = setTimeout(() => setLettersVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Rotating words every 2.5s
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Mouse pressure on heading
  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const el = heroRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = ((e.clientX - cx) / rect.width) * 8;
      const dy = ((e.clientY - cy) / rect.height) * 8;
      setMouseOffset({ x: dx, y: dy });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  const BRAND = 'YAAR.world';

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '38.2fr 61.8fr',
        alignItems: 'center',
        padding: '116px 80px',
        maxWidth: '1280px',
        margin: '0 auto',
        gap: '40px',
      }}
    >
      {/* Left 38.2% — decorative */}
      <div
        style={{
          position: 'relative',
          height: '100%',
          minHeight: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Large faint V */}
        <span
          style={{
            position: 'absolute',
            fontFamily: 'Teko, sans-serif',
            fontSize: 'clamp(200px, 25vw, 320px)',
            fontWeight: 700,
            color: 'rgba(255,106,0,0.06)',
            lineHeight: 1,
            userSelect: 'none',
            pointerEvents: 'none',
            letterSpacing: '-0.02em',
          }}
        >
          V
        </span>

        {/* Orange diagonal accent top */}
        <div
          style={{
            position: 'absolute',
            top: '60px',
            right: '20px',
            width: '3px',
            height: '80px',
            background: 'var(--orange)',
            transform: 'rotate(20deg)',
            opacity: 0.5,
          }}
        />

        {/* Cyan accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '30px',
            width: '40px',
            height: '1.5px',
            background: 'var(--cyan)',
            opacity: 0.6,
          }}
        />

        {/* Small dot grid */}
        <div
          style={{
            position: 'absolute',
            top: '100px',
            left: '20px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 8px)',
            gap: '8px',
          }}
        >
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '3px',
                height: '3px',
                borderRadius: '50%',
                background: 'rgba(255,106,0,0.2)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Right 61.8% — all content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

        {/* Availability badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            border: '1px solid var(--orange)',
            borderRadius: '2px',
            width: 'fit-content',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: 'var(--green)',
              animation: 'pulse 2s ease infinite',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              color: 'var(--orange)',
              letterSpacing: '0.08em',
            }}
          >
            Available · Hyderabad, India
          </span>
        </div>

        {/* YAAR.world heading — letter by letter */}
        <h1
          style={{
            fontFamily: 'Teko, sans-serif',
            fontSize: 'clamp(64px, 9vw, 120px)',
            fontWeight: 600,
            lineHeight: 0.9,
            margin: 0,
            whiteSpace: 'nowrap',
            letterSpacing: '0.01em',
            transform: `translate(${mouseOffset.x}px, ${mouseOffset.y}px)`,
            transition: 'transform 0.1s ease',
          }}
        >
          {BRAND.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                color: char === '.' ? 'var(--orange)' : 'var(--black)',
                opacity: lettersVisible ? 1 : 0,
                transform: lettersVisible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.5s ease ${i * 80}ms, transform 0.5s ease ${i * 80}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </h1>

        {/* Founder signature */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <span
            style={{
              fontFamily: 'Caveat, cursive',
              fontSize: '36px',
              color: 'var(--orange)',
              lineHeight: 1,
            }}
          >
            Vinayak Tiwari
          </span>
          <span
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '11px',
              color: 'var(--gray)',
              letterSpacing: '0.08em',
            }}
          >
            — Founder, YAAR
          </span>
        </div>

        {/* Rotating word */}
        <div
          style={{
            height: '64px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <span
            key={wordIndex}
            style={{
              fontFamily: 'Teko, sans-serif',
              fontSize: '52px',
              fontWeight: 500,
              color: 'var(--gray)',
              lineHeight: 1,
              display: 'block',
              animation: 'rotateWord 0.4s ease forwards',
            }}
          >
            {ROTATING_WORDS[wordIndex]}
          </span>
        </div>

        {/* Bio */}
        <p
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '15px',
            color: 'var(--gray)',
            lineHeight: 1.75,
            maxWidth: '460px',
            margin: 0,
          }}
        >
          BCA student from Hyderabad building AI systems, voice interfaces,
          and smart automation tools. Founder of YAAR — where AI meets
          human interaction.
        </p>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginTop: '8px' }}>
          <button
            onClick={() =>
              document.getElementById('hire')?.scrollIntoView({ behavior: 'smooth' })
            }
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '13px 32px',
              background: 'var(--orange)',
              color: '#fff',
              border: 'none',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Why Hire Me?
          </button>

          <button
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
            style={{
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '16px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              padding: '13px 32px',
              background: 'transparent',
              color: 'var(--black)',
              border: '1.5px solid var(--black)',
              borderRadius: '2px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
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
            View Projects
          </button>
        </div>
      </div>
    </section>
  );
}