// src/components/sections/Dashboard.tsx
'use client';

import SectionLabel from '@/components/ui/SectionLabel';

const PANEL_ROWS = [
  { key: 'current_project', value: 'YAAR — AI Voice Companion v2' },
  { key: 'status',          value: '🟢 Building...' },
  { key: 'github',          value: 'github.com/Vinayaktiwari18' },
  { key: 'domain',          value: 'yaar.world (GoDaddy)' },
  { key: 'stack',           value: 'Python · JS · AI APIs · Voice' },
  { key: 'open_to',         value: 'Internship · Freelance · Collab' },
  { key: 'location',        value: 'Ameerpet, Hyderabad, India' },
  { key: 'contact',         value: 'vinayakt9639@gmail.com' },
];

const PILLS = [
  { icon: '⭐', label: '8 Repos' },
  { icon: '🔥', label: 'Active' },
  { icon: '📍', label: 'Hyderabad' },
];

export default function Dashboard() {
  return (
    <section
      id="status"
      style={{
        padding: '116px 80px',
        background: 'var(--off-white)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <SectionLabel text="// 04 — Live" color="cyan" />

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
          STATUS
        </h2>

        <p
          className="reveal"
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: '16px',
            color: 'var(--gray)',
            margin: '0 0 56px',
          }}
        >
          What I&apos;m building. Where I&apos;m at. Right now.
        </p>

        {/* Two column layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '60fr 40fr',
            gap: '24px',
            alignItems: 'start',
          }}
          className="dashboard-grid"
        >
          {/* Left — electric border panel */}
          <div
            className="dashboard-panel reveal"
            style={{
              position: 'relative',
              background: 'var(--card-bg)',
              borderRadius: '4px',
              padding: '32px',
            }}
          >
            {/* Terminal header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '28px',
              }}
            >
              {['#FF5F57', '#FFBD2E', '#28CA41'].map((color) => (
                <div
                  key={color}
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    background: color,
                  }}
                />
              ))}
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  color: 'var(--gray)',
                  marginLeft: '8px',
                  letterSpacing: '0.08em',
                }}
              >
                vinayak@yaar ~ status.json
              </span>
            </div>

            {/* Rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {PANEL_ROWS.map((row) => (
                <div
                  key={row.key}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr',
                    gap: '16px',
                    alignItems: 'baseline',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '11px',
                      color: 'var(--cyan)',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {row.key}
                  </span>
                  <span
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: '12px',
                      color: 'var(--black)',
                      fontWeight: 700,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — indicators */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {/* Open to work */}
            <div
              className="reveal"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '4px',
                padding: '28px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  marginBottom: '8px',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: 'var(--green)',
                    animation: 'pulse 2s ease infinite',
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: 'Teko, sans-serif',
                    fontSize: '32px',
                    color: 'var(--orange)',
                    letterSpacing: '0.02em',
                    lineHeight: 1,
                  }}
                >
                  OPEN TO WORK
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  color: 'var(--gray)',
                  letterSpacing: '0.08em',
                  margin: 0,
                }}
              >
                Internship · Freelance · Collab
              </p>
            </div>

            {/* Currently building card */}
            <div
              className="reveal"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid rgba(0,0,0,0.08)',
                borderLeft: '3px solid var(--orange)',
                borderRadius: '4px',
                padding: '24px 24px 24px 21px',
              }}
            >
              <span
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  color: 'var(--gray)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                currently building
              </span>
              <span
                style={{
                  fontFamily: 'Teko, sans-serif',
                  fontSize: '24px',
                  color: 'var(--black)',
                  letterSpacing: '0.02em',
                  display: 'block',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                YAAR v2
              </span>
              <span
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: '12px',
                  color: 'var(--gray)',
                }}
              >
                AI Voice Companion
              </span>
            </div>

            {/* Pills */}
            <div
              className="reveal"
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              {PILLS.map((pill) => (
                <span
                  key={pill.label}
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '11px',
                    padding: '6px 14px',
                    background: 'var(--card-bg)',
                    border: '1px solid rgba(0,0,0,0.1)',
                    borderRadius: '20px',
                    color: 'var(--black)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  {pill.icon} {pill.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}