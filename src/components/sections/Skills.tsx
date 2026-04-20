// src/components/sections/Skills.tsx
'use client';

import { useEffect } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import MarqueeRow from '@/components/ui/MarqueeRow';
import { useMarqueeVelocity } from '@/hooks/useMarqueeVelocity';

const ROW1_ITEMS = [
  'OpenRouter AI', 'Google Speech API', 'Edge-TTS',
  'NLP', 'Emotion Detection', 'LLM Integration',
  'Voice AI', 'Prompt Engineering', 'AI APIs',
];

const ROW2_ITEMS = [
  'HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind',
  'Responsive Design', 'CSS Animations', 'Web APIs',
  'DOM Manipulation', 'Git',
];

const ROW3_ITEMS = [
  'Python', 'Node.js', 'REST APIs', 'GitHub',
  'Android Studio', 'Termux', 'VS Code', 'JSON',
];

const SKILL_CATEGORIES = [
  {
    label: 'AI / ML',
    color: 'var(--orange)',
    skills: ['OpenRouter', 'Groq', 'NLP', 'Voice AI', 'Prompt Eng.', 'LLM'],
  },
  {
    label: 'Frontend',
    color: 'var(--cyan)',
    skills: ['React', 'HTML5', 'CSS3', 'JavaScript', 'Tailwind', 'GSAP'],
  },
  {
    label: 'Backend + Tools',
    color: 'var(--black)',
    skills: ['Python', 'Node.js', 'REST APIs', 'GitHub', 'VS Code', 'JSON'],
  },
];

export default function Skills() {
  useMarqueeVelocity('.marquee-track');

  return (
    <section
      id="skills"
      style={{
        padding: '116px 0',
        overflow: 'hidden',
      }}
    >
      {/* Header — padded */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 80px',
          marginBottom: '56px',
        }}
      >
        <SectionLabel text="// 03 — Craft" color="cyan" />

        <h2
          className="reveal"
          style={{
            fontFamily: 'Teko, sans-serif',
            fontSize: 'clamp(42px, 6vw, 63px)',
            color: 'var(--black)',
            margin: '0 0 8px',
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}
        >
          SKILLS
        </h2>

        <p
          className="reveal"
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '16px',
            color: 'var(--gray)',
            margin: 0,
          }}
        >
          Tools I reach for. Systems I think in.
        </p>
      </div>

      {/* Marquee rows — full bleed */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '72px',
        }}
      >
        <MarqueeRow
          items={ROW1_ITEMS}
          direction="left"
          duration={20}
          dotColor="orange"
        />
        <MarqueeRow
          items={ROW2_ITEMS}
          direction="right"
          duration={28}
          dotColor="cyan"
        />
        <MarqueeRow
          items={ROW3_ITEMS}
          direction="left"
          duration={38}
          dotColor="black"
        />
      </div>

      {/* Skill category cards */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 80px',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
        }}
        className="skills-grid"
      >
        {SKILL_CATEGORIES.map((cat, ci) => (
          <div
            key={cat.label}
            className="reveal"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: '4px',
              padding: '28px',
              transitionDelay: `${ci * 100}ms`,
            }}
          >
            {/* Category label */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: cat.color,
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  color: cat.color,
                  textTransform: 'uppercase',
                }}
              >
                {cat.label}
              </span>
            </div>

            {/* Skill pills */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {cat.skills.map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontFamily: 'Barlow Condensed, sans-serif',
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    padding: '5px 12px',
                    borderRadius: '2px',
                    background: 'rgba(0,0,0,0.04)',
                    color: 'var(--black)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    textTransform: 'uppercase',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}