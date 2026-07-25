"use client";

import {
  Children,
  type CSSProperties,
  isValidElement,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "fade-scale" | "fade";

const animationClass: Record<AnimationType, string> = {
  "fade-up": "animate-fade-in-up",
  "fade-left": "animate-fade-in-left",
  "fade-right": "animate-fade-in-right",
  "fade-scale": "animate-fade-in-scale",
  fade: "animate-fade-in",
};

interface RevealProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  stagger?: number;
  trigger?: "scroll" | "load";
}

export default function Reveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  stagger = 0,
  trigger = "scroll",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (trigger === "load") {
      requestAnimationFrame(() => setVisible(true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          requestAnimationFrame(() => setVisible(true));
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "-60px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [trigger]);

  const animClass = animationClass[animation];

  if (stagger > 0) {
    const items = Children.toArray(children);
    return (
      <div ref={ref} className={className}>
        {items.map((child, i) => {
          const childKey = isValidElement(child) ? child.key : undefined;
          return (
            <div
              key={childKey ?? `${id}-${i}`}
              className={visible ? animClass : "opacity-0 -translate-y-3"}
              style={{ animationDelay: `${delay + i * stagger}s` } as CSSProperties}
            >
              {child}
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`${className} ${visible ? animClass : "opacity-0 -translate-y-3"}`}
      style={{ animationDelay: `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
