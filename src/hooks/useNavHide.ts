// src/hooks/useNavHide.ts
'use client';

import { useEffect, useState } from 'react';

export function useNavHide(): boolean {
  const [hidden, setHidden] = useState<boolean>(false);

  useEffect(() => {
    let lastY = window.scrollY;

    const handleScroll = () => {
      const currentY = window.scrollY;
      setHidden(currentY > lastY && currentY > 80);
      lastY = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return hidden;
}