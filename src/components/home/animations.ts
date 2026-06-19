export type AnimationVariant =
  | "fade-in-up"
  | "scale-in"
  | "fade-in"
  | "slide-in-left"
  | "slide-in-right";

export function staggerDelay(index: number, baseDelay = 0.1, stagger = 0.12): number {
  return (baseDelay + index * stagger) * 1000;
}
