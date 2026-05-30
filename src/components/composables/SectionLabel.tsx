interface Props {
  text: string;
}

export default function SectionLabel({ text }: Props) {
  return (
    <span className="inline-block text-secondary text-xs font-bold uppercase tracking-[0.2em] mb-4">
      {text}
    </span>
  );
}
