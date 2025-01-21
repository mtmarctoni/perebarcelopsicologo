import { SocialCardProps } from "@/types/navbar";
import { IconCardContainer } from "./IconContainer";


const SocialCard = ({ name, Icon, link, username }: SocialCardProps) => {
  
    return (
      <div className="bg-background-alt flex flex-col py-6 rounded-lg shadow-md text-center">
        <IconCardContainer className={`bg-primary-light`}>
          <Icon className="text-text"/>
        </IconCardContainer>
        <h3 className="text-text font-semibold mb-2">{name}</h3>
        <a 
          href={link}
          target={link.startsWith('mailto') ? undefined : '_blank'}
          rel={link.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          className="text-text-light hover:text-secondary-dark transition-colors text-sm"
        >
          {username}
        </a>
      </div>
    );
  };
  
export default SocialCard;
  
{/* <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mx-auto mb-4">
          </div> */}