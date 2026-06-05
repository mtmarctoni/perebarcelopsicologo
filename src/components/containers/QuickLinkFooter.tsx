import Link from "next/link";
import type { NavItem } from "@/types/navbar";

interface Props {
  link: NavItem;
}

const QuickLinkFooter = ({ link }: Props) => (
  <Link
    href={link.url}
    className="text-text-dark opacity-80 hover:opacity-100 transition-all duration-300 text-sm"
  >
    {link.label}
  </Link>
);

export default QuickLinkFooter;
