interface Props {
  className?: string;
}

export default function CheckIcon({ className = "" }: Props) {
  return (
    <svg
      role="img"
      aria-label="Checkmark"
      className={`shrink-0 ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={3}
    >
      <title>Checkmark</title>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}
