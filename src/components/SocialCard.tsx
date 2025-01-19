import { SocialCardProps } from "@/types/navbar";


const SocialCard = ({ name, Icon, link, username }: SocialCardProps) => {
    // Dynamically get the icon component from react-icons
    // const IconComponent = ReactIcons[icon as keyof typeof ReactIcons] as IconType;
  
    return (
      <div className="bg-white py-6 rounded-lg shadow-md text-center">
        <div className="w-12 h-12 bg-primary-dark/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-6 h-6"/>
        </div>
        <h3 className="font-semibold mb-2">{name}</h3>
        <a 
          href={link}
          target={link.startsWith('mailto') ? undefined : '_blank'}
          rel={link.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          className="text-gray-dark hover:text-secondary-dark transition-colors text-sm"
        >
          {username}
        </a>
      </div>
    );
  };
  
  export default SocialCard;