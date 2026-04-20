// src/components/ui/CursorDot.tsx
'use client';

import { useEffect, useRef } from 'react';

export default function CursorDot() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const ring = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    // Hide on mobile
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onEnterLink = () => {
      dotRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(2.5)');
      ringRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1.6)');
      ringRef.current?.style.setProperty('border-color', 'var(--orange)');
    };

    const onLeaveLink = () => {
      dotRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1)');
      ringRef.current?.style.setProperty('transform', 'translate(-50%,-50%) scale(1)');
      ringRef.current?.style.setProperty('border-color', 'rgba(255,106,0,0.5)');
    };

    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top = `${mouse.current.y}px`;
      }

      // Ring lerps behind
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;

      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    const addLinkListeners = () => {
      document.querySelectorAll('a, button').forEach((el) => {
        el.addEventListener('mouseenter', onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    };

    window.addEventListener('mousemove', onMove);
    rafId.current = requestAnimationFrame(animate);
    addLinkListeners();

    // Re-scan links on DOM change
    const observer = new MutationObserver(addLinkListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Inner dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          background: 'var(--orange)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease',
        }}
      />
      {/* Outer ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '32px',
          height: '32px',
          border: '1.5px solid rgba(255,106,0,0.5)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.2s ease, border-color 0.2s ease',
        }}
      />
    </>
  );
}