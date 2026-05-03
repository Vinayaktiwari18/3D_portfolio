// src/components/ui/ThemeToggle.tsx
'use client';

import { useSyncExternalStore } from 'react';

type Props = {
  theme: 'day' | 'night';
  onToggle: () => void;
};

// Empty subscribe — we only need client/server detection
const subscribe = () => () => {};

export default function ThemeToggle({ theme, onToggle }: Props) {
  const isClient = useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );

  const isNight = theme === 'night';

  return (
    <button
      onClick={onToggle}
      aria-label="Toggle theme"
      style={{
        background: 'none',
        border: '1px solid rgba(0,0,0,0.12)',
        borderRadius: '20px',
        padding: '4px 12px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        minWidth: '82px',
        height: '30px',
        transition: 'all 0.2s ease',
      }}
    >
      {isClient && (
        <>
          <span style={{ fontSize: '14px' }}>
            {isNight ? '☀️' : '🌙'}
          </span>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            color: 'var(--gray)',
            letterSpacing: '0.04em',
          }}>
            {isNight ? 'DAY' : 'NIGHT'}
          </span>
        </>
      )}
    </button>
  );
}