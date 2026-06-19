"use client";

import { useInView } from "@/hooks/useInView";

type AnimationVariant = "fade-in-up" | "scale-in" | "fade-in" | "slide-in-left" | "slide-in-right";

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: AnimationVariant;
  delay?: number;
}

export default function AnimatedSection({
  children,
  className = "",
  variant = "fade-in-up",
  delay = 0,
}: Props) {
  const { ref, isInView } = useInView({ rootMargin: "-80px" });

  return (
    <div
      ref={ref}
      className={`${className} ${isInView ? `animate-${variant}` : "opacity-0"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
