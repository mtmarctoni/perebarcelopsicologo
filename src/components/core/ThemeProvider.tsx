"use client";

import { createContext, type ReactNode, use, useCallback, useSyncExternalStore } from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

function getStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme") as Theme | null;
  if (saved === "light" || saved === "dark") return saved;
  return getSystemTheme();
}

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API not yet widely supported (Safari, Firefox)
  document.cookie = `theme=${theme};path=/;max-age=31536000;SameSite=Lax`;
}

let currentTheme = getStoredTheme();
const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

const themeStore = {
  subscribe(callback: () => void) {
    listeners.add(callback);
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "theme") {
        currentTheme = getStoredTheme();
        callback();
      }
    };
    const handleMediaChange = () => {
      currentTheme = getStoredTheme();
      callback();
    };
    window.addEventListener("storage", handleStorage);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", handleMediaChange);
    return () => {
      listeners.delete(callback);
      window.removeEventListener("storage", handleStorage);
      mq.removeEventListener("change", handleMediaChange);
    };
  },
  getSnapshot() {
    return currentTheme;
  },
  setTheme(theme: Theme) {
    if (theme === currentTheme) return;
    currentTheme = theme;
    persistTheme(theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
    emitChange();
  },
};

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: Theme;
}) {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    () => initialTheme,
  );

  const setTheme = useCallback((newTheme: Theme) => {
    themeStore.setTheme(newTheme);
  }, []);

  const value = { theme, setTheme };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = use(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
