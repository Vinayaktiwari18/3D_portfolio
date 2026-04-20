// src/hooks/useMarqueeVelocity.ts
'use client';

import { useEffect } from 'react';

export function useMarqueeVelocity(selector: string = '.marquee-track'): void {
  useEffect(() => {
    let lastY = window.scrollY;
    let lastTime = performance.now();
    let rafId: number;
    let easeRafId: number;
    let currentSpeed = 1;
    const BASE = 1;
    const MAX = 4;

    const ease = () => {
      if (currentSpeed <= BASE + 0.05) {
        currentSpeed = BASE;
        applySpeed(BASE);
        return;
      }
      currentSpeed = currentSpeed * 0.92;
      applySpeed(currentSpeed);
      easeRafId = requestAnimationFrame(ease);
    };

    const applySpeed = (speed: number) => {
      document
        .querySelectorAll<HTMLElement>(selector)
        .forEach((el) => {
          el.style.setProperty('--marquee-speed', String(speed));
        });
    };

    const handleScroll = () => {
      cancelAnimationFrame(easeRafId);

      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastY);
      const dt = now - lastTime || 1;
      const velocity = dy / dt;

      currentSpeed = Math.min(BASE + velocity * 12, MAX);
      applySpeed(currentSpeed);

      lastY = window.scrollY;
      lastTime = now;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(ease);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(easeRafId);
    };
  }, [selector]);
}