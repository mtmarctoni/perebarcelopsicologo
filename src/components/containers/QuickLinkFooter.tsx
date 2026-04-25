import Link from "next/link";
import { NavItem } from "@/types/navbar";

interface Props {
    link: NavItem;
}

const QuickLinkFooter = ({ link }: Props) => (
    <Link
        href={link.url}
        className="text-text-light hover:text-secondary transition-colors duration-300 text-sm"
    >
        {link.label}
    </Link>
)

export default QuickLinkFooter;
