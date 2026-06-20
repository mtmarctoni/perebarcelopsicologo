import type { NavItem } from "@/types/navbar";

export const navbarLinks: NavItem[] = [
  { label: "Conociendo a Pere Barceló", url: "/about" },
  {
    label: "Mi Modo de trabajo",
    url: "/methodology",
    subLinks: [
      { label: "Mejora tu rendimiento", url: "/performance" },
      { label: "Mejora tu salud", url: "/mental" },
    ],
  },
  { label: "Blog", url: "/blog" },
  { label: "Contacto", url: "/contact" },
];
