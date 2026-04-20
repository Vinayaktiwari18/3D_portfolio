// src/components/sections/Stats.tsx
'use client';

import { useRef, useEffect, useState } from 'react';

function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

function useCountUp(target: number, duration: number = 1500, trigger: boolean = false): number {
  const [count, setCount] = useState<number>(0);
  const hasRun = useRef<boolean>(false);

  useEffect(() => {
    if (!trigger || hasRun.current) return;
    hasRun.current = true;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.round(easeOutQuart(progress) * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [trigger, target, duration]);

  return count;
}

type StatProps = {
  target: number;
  suffix: string;
  label: string;
  trigger: boolean;
  index: number;
};

function StatItem({ target, suffix, label, trigger, index }: StatProps) {
  const count = useCountUp(target, 1500, trigger);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 24px',
        position: 'relative',
        opacity: trigger ? 1 : 0,
        transform: trigger ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 120}ms, transform 0.6s ease ${index * 120}ms`,
      }}
    >
      {/* Divider — not on first */}
      {index > 0 && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            width: '1px',
            height: '60px',
            background: 'rgba(244,242,237,0.1)',
          }}
        />
      )}

      {/* Number */}
      <span
        style={{
          fontFamily: 'Teko, sans-serif',
          fontSize: '80px',
          fontWeight: 600,
          color: 'var(--orange)',
          lineHeight: 0.9,
          letterSpacing: '-0.02em',
        }}
      >
        {count}
        <span style={{ fontSize: '48px' }}>{suffix}</span>
      </span>

      {/* Label */}
      <span
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '12px',
          color: 'rgba(244,242,237,0.4)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginTop: '12px',
          textAlign: 'center',
        }}
      >
        {label}
      </span>
    </div>
  );
}

const STATS = [
  { target: 7,   suffix: '+', label: 'Projects Built' },
  { target: 8,   suffix: '',  label: 'GitHub Repos'   },
  { target: 15,  suffix: '+', label: 'Tools Mastered' },
  { target: 365, suffix: '',  label: 'Days Coding'    },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const [triggered, setTriggered] = useState<boolean>(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            setTriggered(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  return (
    <section
      ref={sectionRef}
      id="stats"
      style={{
        background: '#0D0D0D',
        padding: '116px 80px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            marginBottom: '64px',
          }}
          className="stats-grid"
        >
          {STATS.map((stat, i) => (
            <StatItem
              key={stat.label}
              target={stat.target}
              suffix={stat.suffix}
              label={stat.label}
              trigger={triggered}
              index={i}
            />
          ))}
        </div>

        {/* Divider */}
        <div
          style={{
            width: '100%',
            height: '1px',
            background: 'rgba(244,242,237,0.08)',
            marginBottom: '48px',
          }}
        />

        {/* Quote */}
        <p
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '16px',
            fontStyle: 'italic',
            color: 'rgba(244,242,237,0.45)',
            textAlign: 'center',
            maxWidth: '560px',
            margin: '0 auto',
            lineHeight: 1.8,
            opacity: triggered ? 1 : 0,
            transition: 'opacity 0.8s ease 0.6s',
          }}
        >
          &ldquo;Every number above started at zero.
          <br />
          Every day I make sure it doesn&apos;t stay there.&rdquo;
        </p>
      </div>
    </section>
  );
}