// src/hooks/useTheme.ts
'use client';

import { useEffect, useState } from 'react';

type Theme = 'day' | 'night';

function getInitialTheme(): Theme {
  // This function only runs on client
  if (typeof window === 'undefined') return 'day';
  return (localStorage.getItem('yaar-theme') as Theme) ?? 'day';
}

export function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>('day');

  useEffect(() => {
    // Read saved theme on mount — runs once, client only
    const saved = getInitialTheme();
    if (saved !== 'day') setTheme(saved);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (theme === 'night') {
      document.documentElement.setAttribute('data-theme', 'night');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('yaar-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((p) => (p === 'day' ? 'night' : 'day'));

  return { theme, toggleTheme };
}