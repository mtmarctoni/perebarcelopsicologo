'use client';

import { useTheme } from 'next-themes';

import SunIcon from '@/icons/sun.svg';
import MoonIcon from '@/icons/moon.svg';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-bg transition-colors"
    >
      {theme === 'dark' ? (
        <SunIcon className="text-text w-5 h-5" />
      ) : (
        <MoonIcon className="text-white w-5 h-5" />
      )}
    </button>
  );
};