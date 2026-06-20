"use client";

import { ThemeProvider } from "@/components/core/ThemeProvider";

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
