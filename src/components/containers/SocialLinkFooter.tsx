import { SocialCardProps } from "@/types/navbar";

import { IconFooterContainer } from "./IconContainer";

interface Props {
  social: SocialCardProps;
}

const SocialLinkFooter = ({ social }: Props) => {
  const Icon = social.Icon;
  return (
    <a
      key={social.name}
      href={social.link}
      className={`w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center
                hover:bg-primary transition-all duration-300 transform hover:scale-110`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${social.name}`}
    >
      <IconFooterContainer>
        <Icon />
      </IconFooterContainer>
    </a>
  );
};

export default SocialLinkFooter;
