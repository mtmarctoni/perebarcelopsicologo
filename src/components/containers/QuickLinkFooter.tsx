import Link from "next/link";
import type { NavItem } from "@/types/navbar";

interface Props {
  link: NavItem;
}

const QuickLinkFooter = ({ link }: Props) => (
  <Link
    href={link.url}
    className="text-white/80 hover:text-white transition-colors duration-300 text-sm"
  >
    {link.label}
  </Link>
);

export default QuickLinkFooter;
