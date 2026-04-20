// src/components/ui/Navbar.tsx
'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';
import { useNavHide } from '@/hooks/useNavHide';
import { useTheme } from '@/hooks/useTheme';
import ThemeToggle from './ThemeToggle';

const NAV_LINKS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Status',   href: '#status'   },
  { label: 'Hire Me',  href: '#hire'     },
  { label: 'Contact',  href: '#contact'  },
];

export default function Navbar() {
  const hidden = useNavHide();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const onLinkEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--orange)';
  };
  const onLinkLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--gray)';
  };
  const onMobileLinkEnter = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--orange)';
  };
  const onMobileLinkLeave = (e: MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--black)';
  };

  return (
    <nav
      style={{
        transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.3s ease',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(244,242,237,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <a href="#"
          style={{
            fontFamily: 'Teko, sans-serif',
            fontSize: '28px',
            fontWeight: 600,
            color: 'var(--black)',
            textDecoration: 'none',
            letterSpacing: '0.02em',
          }}
        >
          YAAR<span style={{ color: 'var(--orange)' }}>.</span>world
        </a>

        {/* Desktop Links */}
        <div
          className="desktop-nav"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a key={link.label}
              href={link.href}
              onMouseEnter={onLinkEnter}
              onMouseLeave={onLinkLeave}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '15px',
                fontWeight: 500,
                color: 'var(--gray)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          {/* AI Enhanced Badge */}
          <span
            className="ai-badge"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '10px',
              padding: '4px 10px',
              border: '1px solid var(--cyan)',
              color: 'var(--cyan)',
              borderRadius: '2px',
              letterSpacing: '0.06em',
              display: 'none',
            }}
          >
            AI ENHANCED
          </span>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen((p) => !p)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
            }}
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  background: 'var(--black)',
                  transition: 'all 0.3s ease',
                  transformOrigin: 'center',
                  transform:
                    menuOpen
                      ? i === 0
                        ? 'translateY(7px) rotate(45deg)'
                        : i === 2
                        ? 'translateY(-7px) rotate(-45deg)'
                        : 'scaleX(0)'
                      : 'none',
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          style={{
            background: 'rgba(244,242,237,0.98)',
            borderTop: '1px solid rgba(0,0,0,0.06)',
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              onMouseEnter={onMobileLinkEnter}
              onMouseLeave={onMobileLinkLeave}
              style={{
                fontFamily: 'Barlow Condensed, sans-serif',
                fontSize: '18px',
                fontWeight: 500,
                color: 'var(--black)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}