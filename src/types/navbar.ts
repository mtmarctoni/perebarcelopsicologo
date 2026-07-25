export type Name = string;
export type Url = string;
export type Username = string;
export type Icon = React.FC<React.SVGProps<SVGSVGElement>>;

export interface SocialCardProps {
  name: Name;
  Icon: Icon;
  link: Url;
  username: Username;
}

export interface Club {
  name: Name;
  imgUrl: string;
}
