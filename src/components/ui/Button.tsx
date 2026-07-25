import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "xs" | "sm" | "md" | "lg";
type ButtonShape = "pill" | "rounded";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  shape?: ButtonShape;
  href?: string;
  track?: string;
  trackLocation?: string;
  trackLabel?: string;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  "aria-label"?: string;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-secondary text-text-dark dark:text-[#0f172a] font-bold hover:bg-secondary-light hover:shadow-glow hover:-translate-y-0.5",
  secondary:
    "bg-primary-dark text-text-inverse font-bold hover:bg-secondary hover:text-text-dark dark:hover:text-[#0f172a] hover:shadow-glow",
  ghost: "text-text-light font-medium tracking-wide hover:text-text-dark hover:bg-card-hover",
  outline:
    "border border-border text-text-light font-semibold uppercase tracking-widest hover:text-primary hover:bg-card-hover",
};

const sizeStyles: Record<ButtonSize, string> = {
  xs: "px-3 py-2 text-xs",
  sm: "px-5 py-2.5 text-sm",
  md: "px-8 py-4 text-base",
  lg: "px-10 py-5 text-lg",
};

const shapeStyles: Record<ButtonShape, string> = {
  pill: "rounded-full",
  rounded: "rounded-lg",
};

const baseStyles =
  "inline-flex items-center justify-center text-center transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none";

export function buildDataAttrs(track?: string, trackLocation?: string, trackLabel?: string) {
  const attrs: Record<string, string | undefined> = {};
  if (track) attrs["data-track"] = track;
  if (trackLocation) attrs["data-track-location"] = trackLocation;
  if (trackLabel) attrs["data-track-label"] = trackLabel;
  return attrs as Record<string, string>;
}

export default function Button({
  variant = "primary",
  size = "md",
  shape = "pill",
  href,
  track,
  trackLocation,
  trackLabel,
  className = "",
  children,
  type = "button",
  disabled,
  target,
  rel,
  onClick,
  style,
  ...rest
}: ButtonProps & Record<string, unknown>) {
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    shapeStyles[shape],
    className,
  ].join(" ");

  const dataAttrs = buildDataAttrs(track, trackLocation, trackLabel);

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link
          href={href}
          className={classes}
          onClick={onClick}
          style={style}
          {...dataAttrs}
          {...rest}
        >
          {children}
        </Link>
      );
    }
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        onClick={onClick}
        style={style}
        {...dataAttrs}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={classes}
      onClick={onClick}
      style={style}
      {...dataAttrs}
      {...rest}
    >
      {children}
    </button>
  );
}
