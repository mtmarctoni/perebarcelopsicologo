import { Children, type CSSProperties, type ReactNode } from "react";

type AnimationType = "fade-up" | "fade-left" | "fade-right" | "fade-scale" | "fade";

interface RevealProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  stagger?: number;
  trigger?: "scroll" | "load";
}

// Only markup and stagger values are generated here; CSS owns all motion.
export default function Reveal({
  children,
  className = "",
  animation = "fade-up",
  delay = 0,
  stagger = 0,
  trigger = "scroll",
}: RevealProps) {
  function motionProps(seconds: number) {
    const time = Math.max(0, Math.round(seconds * 1000) / 1000);
    return {
      "data-reveal": trigger,
      "data-reveal-variant": animation,
      style: {
        "--reveal-delay": `${time}s`,
        "--reveal-start": `${Math.min(20, Math.round(time * 20))}%`,
      } as CSSProperties,
    };
  }

  if (stagger > 0) {
    return (
      <div className={className}>
        {Children.map(Children.toArray(children), (child, index) => (
          <div className="reveal" {...motionProps(delay + index * stagger)}>
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${className} reveal`} {...motionProps(delay)}>
      {children}
    </div>
  );
}
