export type Label = string;
export type Url = string;
export type Path = string;
export type Name = string;
export type Email = string;
export type Phone = string;
export type Description = string;
export type Username = string;
export type Id = string;
export type QuestionSentence = string;
export type Icon = React.FC<React.SVGProps<SVGSVGElement>>;
export enum QuestionType {
  TEXT = 'text',
  EMAIL = 'email',
  PHONE = 'phone',
  SELECT = 'select',
  TEXTAREA = 'textarea',
  SUCCESS = 'success',
}
export type QuestionOption = string;
export enum QuestionOptionMediaResponse {
  EMAIL = 'Correo electrónico',
  WHATSAPP = 'WhatsApp',
  PHONE = 'Llamada Telefónica',
}
export enum QuestionOptionInterestedIn {
  ONLINE_SESSIONS = 'Sesiones Online',
  GROUP_WORKSHOP = 'Taller grupal',
  CONSULTING = 'Asesoramiento psicológico',
}
export enum PhoneFormats {
  ES = 'ES',
  OTHER = 'Otro',
}

export interface ContactFormData {
  '1': Name;
  '2': Email;
  '3': Phone;
  '4': QuestionOptionMediaResponse;
  '5': QuestionOptionInterestedIn;
  '6': Description;
}

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
  phoneFormat?: PhoneFormats[];
}