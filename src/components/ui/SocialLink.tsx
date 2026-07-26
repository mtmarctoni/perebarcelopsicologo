import type { ReactNode } from "react";

type SocialLinkProps = {
  href: string;
  label: string;
  children: ReactNode;
  className?: string;
  location?: string;
};

export default function SocialLink({
  href,
  label,
  children,
  className = "",
  location = "footer",
}: SocialLinkProps) {
  const isExternal = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");

  const classes = [
    "w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center",
    "hover:bg-secondary/10 hover:border-secondary/20 hover:text-primary",
    "text-text-dark opacity-40 hover:opacity-100 transition-[opacity,color,border-color,background-color] duration-300",
    className,
  ].join(" ");

  const dataAttrs: Record<string, string> = {
    "data-track": "social",
    "data-track-location": location,
    "data-track-label": label,
  };

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={label}
        {...dataAttrs}
      >
        {children}
      </a>
    );
  }

  return (
    <a href={href} className={classes} aria-label={label} {...dataAttrs}>
      {children}
    </a>
  );
}
