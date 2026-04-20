// src/components/ui/MobileTabBar.tsx
'use client';

import { useState } from 'react';
import type { MouseEvent } from 'react';

type Tab = {
  label: string;
  href: string;
  icon: string;
};

const TABS: Tab[] = [
  { label: 'Home',     href: '#',         icon: '⌂' },
  { label: 'Projects', href: '#projects', icon: '◈' },
  { label: 'Skills',   href: '#skills',   icon: '◎' },
  { label: 'Status',   href: '#status',   icon: '◉' },
  { label: 'Contact',  href: '#contact',  icon: '◇' },
];

export default function MobileTabBar() {
  const [active, setActive] = useState<string>('Home');

  return (
    <nav
      className="mobile-tab-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(244,242,237,0.96)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(0,0,0,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '60px',
        padding: '0 8px',
      }}
    >
      {TABS.map((tab) => {
        const isActive = active === tab.label;
        return (
          <a key={tab.label}
            href={tab.href}
            onClick={() => setActive(tab.label)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '3px',
              textDecoration: 'none',
              padding: '6px 12px',
              borderRadius: '8px',
              background: isActive ? 'rgba(255,106,0,0.08)' : 'transparent',
              transition: 'all 0.2s ease',
              flex: 1,
            }}
          >
            <span
              style={{
                fontSize: '18px',
                color: isActive ? 'var(--orange)' : 'var(--gray)',
                transition: 'color 0.2s ease',
                lineHeight: 1,
              }}
            >
              {tab.icon}
            </span>
            <span
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '9px',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--orange)' : 'var(--gray)',
                transition: 'color 0.2s ease',
              }}
            >
              {tab.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}