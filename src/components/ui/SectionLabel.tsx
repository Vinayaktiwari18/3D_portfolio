// src/components/ui/SectionLabel.tsx
'use client';

type Props = {
  text: string;
  color?: 'orange' | 'cyan' | 'gray';
};

export default function SectionLabel({ text, color = 'orange' }: Props) {
  const colorMap: Record<string, string> = {
    orange: 'var(--orange)',
    cyan: 'var(--cyan)',
    gray: 'var(--gray)',
  };

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        marginBottom: '12px',
      }}
    >
      <span
        style={{
          display: 'block',
          width: '20px',
          height: '1.5px',
          background: colorMap[color],
        }}
      />
      <span
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '11px',
          letterSpacing: '0.12em',
          color: colorMap[color],
          textTransform: 'uppercase',
        }}
      >
        {text}
      </span>
    </div>
  );
}