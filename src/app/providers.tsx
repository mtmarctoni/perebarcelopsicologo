"use client";

import { ThemeProvider } from "@/components/core/ThemeProvider";

export function Providers({
  children,
  initialTheme,
}: {
  children: React.ReactNode;
  initialTheme: "light" | "dark";
}) {
  return <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>;
}
