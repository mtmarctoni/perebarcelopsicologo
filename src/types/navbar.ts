export type Label = string;
export type Url = string;
export type Name = string;
export type Username = string;
// export type Icon = string;
export type Icon = React.FC<React.SVGProps<SVGSVGElement>>;


export type SubLink = {
    label: Label;
    url: Url;
  };
  
export interface NavItem {
  label: Label;
  url: Url;
  subLinks?: SubLink[];
};

export interface SocialCardProps {
  name: Name;
  Icon: Icon;
  link: Url;
  username: Username;
}