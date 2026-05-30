import {
  EnvelopeIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/composables/Icons";
import {
  type Club,
  type NavItem,
  PhoneFormats,
  type Question,
  QuestionType,
  type SocialCardProps,
} from "@/types/navbar";

export const domain: string = "perebarcelopsicologo.com";
export const phone: string = "+34 636 67 47 59";
export const email: string = "pere@perebarcelopsicologo.com";
export const wordpressBlogsJson = `https://blog.${domain}/wp-json/wp/v2/posts`;
export const baseUrl: string = "";
export const wordpressUrl: string = `https://blog.${domain}`;

export const navbarLinks: NavItem[] = [
  { label: "Inicio", url: "/" },
  { label: "Sobre mí", url: "/about" },
  { label: "Servicios", url: "/servicios" },
  { label: "Contacto", url: "/contact" },
];

export const socialMediaLinks: SocialCardProps[] = [
  {
    name: "Email",
    Icon: EnvelopeIcon,
    link: "mailto:pere@perebarcelopsicologo.com",
    username: "pere@perebarcelopsicologo.com",
  },
  {
    name: "LinkedIn",
    Icon: LinkedinIcon,
    link: "https://www.linkedin.com/in/pere-barcel%C3%B3-lambea-6b5255192/",
    username: "Pere Barceló",
  },
  {
    name: "Instagram",
    Icon: InstagramIcon,
    link: "https://www.instagram.com/perebarcelopsico/",
    username: "@perebarcelopsico",
  },
  // Easy to add more social media here
];

export const socialMediaLinksFooter: SocialCardProps[] = [
  {
    name: "LinkedIn",
    Icon: LinkedinIcon,
    link: "https://www.linkedin.com/in/pere-barcel%C3%B3-lambea-6b5255192/",
    username: "Pere Barceló",
  },
  {
    name: "Instagram",
    Icon: InstagramIcon,
    link: "https://www.instagram.com/perebarcelopsico/",
    username: "@perebarcelopsico",
  },
  {
    name: "Twitter",
    Icon: TwitterIcon,
    link: "https://x.com/PBarceloPsico",
    username: "@PBarceloPsico",
  },
  // Easy to add more social media here
];

export const questions: Question[] = [
  {
    id: "1",
    question: "¿Cuál es tu nombre?",
    type: QuestionType.TEXT,
  },
  {
    id: "2",
    question: "¿Cuál es tu email?",
    type: QuestionType.EMAIL,
  },
  {
    id: "3",
    question: "¿Cuál es tu número de teléfono?",
    type: QuestionType.PHONE,
    phoneFormat: Object.entries(PhoneFormats).map(([, value]) => value),
  },
  {
    id: "4",
    question: "¿Por qué medio prefieres recibir una respuesta?",
    type: QuestionType.SELECT,
    options: ["Correo electrónico", "WhatsApp", "Llamada telefónica"],
  },
  {
    id: "5",
    question: "¿En qué estás interesado?",
    type: QuestionType.SELECT,
    options: ["Sesiones online", "Taller grupal", "Asesoramiento psicológico"],
  },
  {
    id: "6",
    question: "¿Hay algo más que quieras comentarme?",
    type: QuestionType.TEXTAREA,
  },
  {
    id: "7",
    question: "¡Gracias por contactar conmigo! Me pondré en contacto contigo lo antes posible.",
    type: QuestionType.SUCCESS,
  },
];

export const clubs: Club[] = [
  {
    name: "CE Constància",
    imgUrl: `/clubs/CE-Constancia.webp`,
  },
  {
    name: "CDC Moscardó",
    imgUrl: `/clubs/CDC-Moscardo.webp`,
  },
  {
    name: "CF Fuenlabrada",
    imgUrl: `/clubs/CF-Fuenlabrada.webp`,
  },
  {
    name: "CF Playa de Palma",
    imgUrl: `/clubs/Playa-de-Palma.webp`,
  },
  {
    name: "UE Petra",
    imgUrl: `/clubs/UE-Petra.webp`,
  },
  {
    name: "CE Sineu",
    imgUrl: `/clubs/CE-Sineu.webp`,
  },
  {
    name: "Joventut Mariana",
    imgUrl: `/clubs/Joventut-Mariana.webp`,
  },
  {
    name: "Entreculturas Montesión",
    imgUrl: `/clubs/Montesion.webp`,
  },
  {
    name: "CB Colonya Pollença",
    imgUrl: `/clubs/CB-Pollenca.webp`,
  },
  {
    name: "CG Alcúdia",
    imgUrl: `/clubs/GC-Alcudia.webp`,
  },
  {
    name: "Federación de Golf de las Islas Baleares",
    imgUrl: `/clubs/FBG.webp`,
  },
  {
    name: "Federación de Baloncesto de las Islas Baleares",
    imgUrl: `/clubs/FBIB.webp`,
  },
  {
    name: "Palmer Basket",
    imgUrl: `/clubs/Palmer-Basket.webp`,
  },
];
