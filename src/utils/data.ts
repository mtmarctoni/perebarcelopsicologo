import { EnvelopeIcon, InstagramIcon, LinkedinIcon } from "@/components/composables/Icons";
import type { Club, SocialCardProps } from "@/types/navbar";

export const phone: string = "+34 636 67 47 59";
export const email: string = "pere@perebarcelopsicologo.com";

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
  // Easy to add more social media here
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
