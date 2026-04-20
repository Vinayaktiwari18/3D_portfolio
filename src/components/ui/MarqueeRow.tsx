// src/components/ui/MarqueeRow.tsx
'use client';

type Props = {
  items: string[];
  direction?: 'left' | 'right';
  duration?: number;
  dotColor?: 'orange' | 'cyan' | 'black';
};

export default function MarqueeRow({
  items,
  direction = 'left',
  duration = 20,
  dotColor = 'orange',
}: Props) {
  const dotColorMap: Record<string, string> = {
    orange: 'var(--orange)',
    cyan: 'var(--cyan)',
    black: 'var(--black)',
  };

  const repeated = [...items, ...items, ...items];

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        maskImage:
          'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)',
      }}
    >
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0px',
          width: 'max-content',
          animation: `${direction === 'left' ? 'scrollLeft' : 'scrollRight'} calc(${duration}s / var(--marquee-speed, 1)) linear infinite`,
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '0 20px',
              fontFamily: 'Barlow Condensed, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--black)',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: dotColorMap[dotColor],
                flexShrink: 0,
              }}
            />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}