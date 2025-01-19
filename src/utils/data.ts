import type { NavItem, SocialCardProps } from "@/types/navbar";
import EnvelopeIcon from "@/icons/envelope.svg";
import LinkedinIcon from "@/icons/linkedin.svg";
import InstagramIcon from "@/icons/instagram.svg";

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