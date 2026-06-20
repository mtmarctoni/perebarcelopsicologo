import {
  EnvelopeIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/components/composables/Icons";
import type { SocialCardProps } from "@/types/navbar";

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
];
