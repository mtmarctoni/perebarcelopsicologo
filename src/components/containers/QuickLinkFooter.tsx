import Link from "next/link";
import { NavItem } from "@/types/navbar";

interface Props {
    link: NavItem;
}

const QuickLinkFooter = ({ link }: Props) => (

        <Link
            href={link.url}
            className="text-gray-light hover:text-white transition-colors duration-200"
        >
            {link.label}
        </Link>
)
    
export default QuickLinkFooter;