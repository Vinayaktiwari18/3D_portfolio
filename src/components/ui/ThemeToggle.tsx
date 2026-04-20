// src/components/ui/ThemeToggle.tsx
'use client';

type Props = {
  theme: 'day' | 'night';
  onToggle: () => void;
};

export default function ThemeToggle({ theme, onToggle }: Props) {
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
        transition: 'all 0.2s ease',
      }}
    >
      <span style={{ fontSize: '14px' }}>{isNight ? '☀️' : '🌙'}</span>
      <span
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          color: 'var(--gray)',
          letterSpacing: '0.04em',
        }}
      >
        {isNight ? 'DAY' : 'NIGHT'}
      </span>
    </button>
  );
}