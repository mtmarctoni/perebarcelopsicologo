import Button from "@/components/ui/Button";

type CTAButtonProps = {
  href: string;
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
  location: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

export default function CTAButton({
  href,
  size = "md",
  variant = "primary",
  location,
  label,
  className = "",
  children,
  onClick,
}: CTAButtonProps) {
  return (
    <Button
      href={href}
      variant={variant}
      size={size}
      shape="pill"
      track="cta"
      trackLocation={location}
      trackLabel={label}
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
