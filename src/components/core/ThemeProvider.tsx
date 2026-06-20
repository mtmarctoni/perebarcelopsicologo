"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function persistTheme(theme: Theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API not yet widely supported (Safari, Firefox)
  document.cookie = `theme=${theme};path=/;max-age=31536000;SameSite=Lax`;
}

function getSystemTheme(): Theme {
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

export function ThemeProvider({
  children,
  initialTheme,
}: {
  children: ReactNode;
  initialTheme: Theme;
}) {
  const [theme, setThemeState] = useState<Theme>(initialTheme);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    persistTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    const target: Theme = saved === "light" || saved === "dark" ? saved : getSystemTheme();
    if (target !== initialTheme) {
      setTheme(target);
    }
  }, [initialTheme, setTheme]);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
