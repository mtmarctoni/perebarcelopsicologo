interface JsonLdProps {
  code: Record<string, unknown>;
  id?: string;
}

export default function JsonLd({ code, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(code).replace(/</g, "\\u003c").replace(/>/g, "\\u003e"),
      }}
    />
  );
}
