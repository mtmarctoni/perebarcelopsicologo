export function staggerDelay(index: number, baseDelay = 0.1, stagger = 0.12): number {
  return (baseDelay + index * stagger) * 1000;
}
