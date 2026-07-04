"use client";

import Button from "@/components/ui/Button";
import { usePathname } from "@/i18n/routing";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  mobile?: boolean;
  location?: string;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
};

export default function NavLink({
  href,
  children,
  mobile = false,
  location = "navbar",
  onClick,
  className = "",
  style,
}: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));

  const activeClasses = isActive
    ? "bg-card-hover text-text-dark font-medium"
    : "text-text-light hover:text-text-dark hover:bg-card-hover";

  return (
    <Button
      href={href}
      variant="ghost"
      size={mobile ? "md" : "sm"}
      shape="rounded"
      track="nav"
      trackLocation={mobile ? "mobile-nav" : location}
      trackLabel={typeof children === "string" ? children : undefined}
      className={`${activeClasses} ${mobile ? "w-full text-center text-2xl font-bold opacity-80 hover:opacity-100" : ""} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </Button>
  );
}
