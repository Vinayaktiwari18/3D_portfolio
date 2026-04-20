// src/hooks/useTheme.ts
'use client';

import { useEffect, useState } from 'react';

type Theme = 'day' | 'night';

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'day';
    return (localStorage.getItem('yaar-theme') as Theme) || 'day';
  });

  useEffect(() => {
    if (theme === 'night') {
      document.documentElement.setAttribute('data-theme', 'night');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('yaar-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'day' ? 'night' : 'day'));
  };

  return { theme, toggleTheme };
}