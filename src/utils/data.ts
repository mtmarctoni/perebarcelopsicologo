import type { NavItem, SocialCardProps } from "@/types/navbar";

import { EnvelopeIcon, LinkedinIcon, InstagramIcon, TwitterIcon } from "@/components/composables/Icons";

export const navbarLinks: NavItem[] = [
    { label: 'Inicio', url: '/' },
    { label: 'Conociendo a Pere Barceló', url: '/about' },
    {
        label: 'Mi Modo de trabajo', url: '/methodology', subLinks:
            [
                { label: 'Mejora tu rendimiento', url: '/performance' },
                { label: 'Mejora tu salud', url: '/mental' },
            ]
    },
    { label: 'Contacto', url: '/contact' },
];

export const socialMediaLinks: SocialCardProps[] = [
    {
      name: 'Email',
      Icon: EnvelopeIcon,
      link: 'mailto:pere@perebarcelpsicologo.com',
      username: 'pere@perebarcelpsicologo.com'
    },
    {
      name: 'LinkedIn',
      Icon: LinkedinIcon,
      link: 'https://linkedin.com/in/perebarcelo',
      username: 'Pere Barceló'
    },
    {
      name: 'Instagram',
      Icon: InstagramIcon,
      link: 'https://instagram.com/perebarcelo',
      username: '@perebarcelo'
    },
    // Easy to add more social media here
];
  
export const socialMediaLinksFooter: SocialCardProps[] = [
  {
    name: 'LinkedIn',
    Icon: LinkedinIcon,
    link: 'https://www.linkedin.com/in/pere-barcel%C3%B3-lambea-6b5255192/',
    username: 'Pere Barceló'
  },
  {
    name: 'Instagram',
    Icon: InstagramIcon,
    link: 'https://www.instagram.com/perebarcelopsico/',
    username: '@perebarcelopsico'
  },
  {
    name: 'Twitter',
    Icon: TwitterIcon,
    link: 'https://x.com/PBarceloPsico',
    username: '@PBarceloPsico'
  },
  // Easy to add more social media here
];