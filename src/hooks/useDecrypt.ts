// src/hooks/useDecrypt.ts
'use client';

import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%';

export function useDecrypt(finalText: string): string {
  const [display, setDisplay] = useState<string>('');
  const hasRun = useRef<boolean>(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasRun.current) {
            hasRun.current = true;
            let resolved = 0;
            const total = finalText.length;

            const interval = setInterval(() => {
              resolved = Math.min(resolved + 0.5, total);
              const resolvedCount = Math.floor(resolved);

              const scrambled = finalText
                .split('')
                .map((char, i) => {
                  if (char === ' ') return ' ';
                  if (i < resolvedCount) return finalText[i];
                  return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join('');

              setDisplay(scrambled);
              if (resolvedCount >= total) clearInterval(interval);
            }, 40);

            return () => clearInterval(interval);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [finalText]);

  return display;
}