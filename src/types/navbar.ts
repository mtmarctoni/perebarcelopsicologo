export type Name = string;
export type Email = string;
export type Phone = string;
export type Url = string;
export type Username = string;
export type Icon = React.FC<React.SVGProps<SVGSVGElement>>;

export enum QuestionOptionMediaResponse {
  EMAIL = "Correo electrónico",
  WHATSAPP = "WhatsApp",
  PHONE = "Llamada telefónica",
}
export enum QuestionOptionInterestedIn {
  ONLINE_SESSIONS = "Sesiones online",
  GROUP_WORKSHOP = "Taller grupal",
  CONSULTING = "Asesoramiento psicológico",
}

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
