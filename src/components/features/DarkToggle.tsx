'use client';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

import { SunIcon, MoonIcon } from '../composables/Icons';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    document.documentElement.classList.add('transition-colors', 'duration-500');
    return () => {
      document.documentElement.classList.remove('transition-colors', 'duration-500');
    };
  });

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-gray-dark transition-colors duration-500 hover:animate-spin"
    >
      {theme === 'dark' ? (
        <SunIcon className="text-text w-5 h-5" />
      ) : (
        <MoonIcon className="text-white w-5 h-5" />
      )}
    </button>
  );
};