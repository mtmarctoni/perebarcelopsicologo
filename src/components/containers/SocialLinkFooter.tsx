import type { SocialCardProps } from "@/types/navbar";

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
      className="w-10 h-10 rounded-full bg-white/10 border border-white/10 text-white flex items-center justify-center
                hover:bg-white/20 hover:text-white transition-all duration-300 transform hover:scale-110"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit ${social.name}`}
    >
      <IconFooterContainer>
        <Icon className="w-5 h-5 text-white" />
      </IconFooterContainer>
    </a>
  );
};

export default SocialLinkFooter;
