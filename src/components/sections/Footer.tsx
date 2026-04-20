// src/components/sections/Footer.tsx
'use client';

import type { MouseEvent } from 'react';

const SOCIAL_LINKS: Record<string, string> = {
  GitHub:    'https://github.com/Vinayaktiwari18',
  LinkedIn:  'https://linkedin.com/in/vinayak-tiwari1809',
  Instagram: '#',
  Twitter:   '#',
  Email:     'mailto:vinayakt9639@gmail.com',
  WhatsApp:  'https://wa.me/919639731624',
};

const SOCIAL_ITEMS = [
  ...Object.keys(SOCIAL_LINKS),
  ...Object.keys(SOCIAL_LINKS),
  ...Object.keys(SOCIAL_LINKS),
];

const QUICK_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Status',   href: '#status'   },
  { label: 'Hire Me',  href: '#hire'     },
  { label: 'Contact',  href: '#contact'  },
];

export default function Footer() {
  const onQuickEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--orange)';
  };
  const onQuickLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'rgba(244,242,237,0.35)';
  };
  const onSocialEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--orange)';
  };
  const onSocialLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'rgba(244,242,237,0.25)';
  };

  return (
    <footer style={{ background: '#0D0D0D', paddingTop: '80px', overflow: 'hidden' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 80px',
          marginBottom: '48px',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '32px',
        }}
      >
        {/* Logo */}
        <div>
          <h2
            style={{
              fontFamily: 'Teko, sans-serif',
              fontSize: '52px',
              fontWeight: 600,
              color: '#F4F2ED',
              margin: '0 0 8px',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            YAAR<span style={{ color: 'var(--orange)' }}>.</span>world
          </h2>
          <p
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: '13px',
              color: 'rgba(244,242,237,0.35)',
              margin: 0,
              lineHeight: 1.6,
              maxWidth: '320px',
            }}
          >
            Building AI that feels human. One line of code at a time.
          </p>
        </div>

        {/* Quick links */}
        <div
          className="footer-links"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            alignItems: 'flex-end',
          }}
        >
          {QUICK_LINKS.map((link) => (
            <a key={link.label}
              href={link.href}
              onMouseEnter={onQuickEnter}
              onMouseLeave={onQuickLeave}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'rgba(244,242,237,0.35)',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: '100%', height: '1px', background: 'rgba(244,242,237,0.06)', marginBottom: '32px' }} />

      {/* Social marquee */}
      <div style={{ marginBottom: '40px', overflow: 'hidden' }}>
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: 'scrollLeft 18s linear infinite',
          }}
        >
          {SOCIAL_ITEMS.map((item, i) => {
            const href = SOCIAL_LINKS[item] ?? '#';
            return (
              <a key={i}
                href={href}
                target={href !== '#' ? '_blank' : undefined}
                rel={href !== '#' ? 'noopener noreferrer' : undefined}
                onMouseEnter={onSocialEnter}
                onMouseLeave={onSocialLeave}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '0 28px',
                  fontFamily: 'Barlow Condensed, sans-serif',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(244,242,237,0.25)',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                }}
              >
                <span
                  style={{
                    width: '4px', height: '4px',
                    borderRadius: '50%',
                    background: 'rgba(255,106,0,0.4)',
                    flexShrink: 0,
                  }}
                />
                {item}
              </a>
            );
          })}
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '20px 80px',
          borderTop: '1px solid rgba(244,242,237,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '11px',
            color: 'rgba(244,242,237,0.2)',
            letterSpacing: '0.06em',
          }}
        >
          © 2025 Vinayak Tiwari · yaar.world · Built with 🔥 in Hyderabad
        </span>

        <span
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            color: 'rgba(244,242,237,0.12)',
            letterSpacing: '0.06em',
          }}
        >
          YAAR v2 · AI ENHANCED
        </span>
      </div>
    </footer>
  );
}