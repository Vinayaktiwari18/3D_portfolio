// src/components/ui/LoadingScreen.tsx
'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const steps = [20, 45, 70, 90, 100];
    let i = 0;

    const interval = setInterval(() => {
      if (i < steps.length) {
        setProgress(steps[i]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => setVisible(false), 400);
      }
    }, 320);

    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#0D0D0D',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '32px',
        opacity: progress === 100 ? 0 : 1,
        transition: 'opacity 0.4s ease',
        pointerEvents: progress === 100 ? 'none' : 'all',
      }}
    >
      {/* Logo */}
      <div
        style={{
          fontFamily: 'Teko, sans-serif',
          fontSize: '64px',
          fontWeight: 600,
          color: '#F4F2ED',
          letterSpacing: '0.02em',
          lineHeight: 1,
        }}
      >
        YAAR<span style={{ color: '#FF6A00' }}>.</span>world
      </div>

      {/* Progress bar track */}
      <div
        style={{
          width: '240px',
          height: '2px',
          background: 'rgba(244,242,237,0.1)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #FF6A00, #00C9C8)',
            borderRadius: '2px',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Progress label */}
      <span
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '11px',
          color: 'rgba(244,242,237,0.3)',
          letterSpacing: '0.08em',
        }}
      >
        LOADING {progress}%
      </span>

      {/* Sub label */}
      <span
        style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          color: 'rgba(244,242,237,0.15)',
          letterSpacing: '0.1em',
          marginTop: '-20px',
        }}
      >
        INITIALIZING YAAR AI
      </span>
    </div>
  );
}