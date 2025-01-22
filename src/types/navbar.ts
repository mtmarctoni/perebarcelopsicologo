export type Label = string;
export type Url = string;
export type Path = string;
export type Name = string;
export type Description = string;
export type Username = string;
export type Id = string;
export type QuestionSentence = string;
export type Icon = React.FC<React.SVGProps<SVGSVGElement>>;
export enum QuestionType {
  TEXT = 'text',
  EMAIL = 'email',
  SELECT = 'select',
  SUCCESS = 'success',
  PHONE = 'phone'
}
export type QuestionOption = string;

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

export interface BaseCardProps {
  image: Path;
  Icon: Icon;
  name: Name;
  description: Description;
  link?: Url;
}

export interface Question {
  id: Id;
  question: QuestionSentence;
  type: QuestionType;
  options?: QuestionOption[];
}