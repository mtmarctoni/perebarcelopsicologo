import type { SocialCardProps } from "@/types/navbar";
import { IconCardContainer } from "./IconContainer";

const SocialCard = ({ name, Icon, link, username }: SocialCardProps) => {
  return (
    <a
      href={link}
      target={link.startsWith("mailto") ? undefined : "_blank"}
      rel={link.startsWith("mailto") ? undefined : "noopener noreferrer"}
      className="group bg-background flex flex-col py-8 rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-500 ease-smooth hover:-translate-y-2 text-center border border-transparent hover:border-secondary/20"
    >
      <IconCardContainer className="bg-secondary/10 group-hover:bg-secondary/15 transition-colors duration-500">
        <Icon className="w-7 h-7 text-secondary transition-colors duration-300" />
      </IconCardContainer>
      <h3 className="text-text-dark font-bold text-lg mb-1">{name}</h3>
      <span className="text-text-light group-hover:text-secondary transition-colors duration-300 text-sm">
        {username}
      </span>
    </a>
  );
};

export default SocialCard;
