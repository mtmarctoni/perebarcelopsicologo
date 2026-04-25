// components/Footer.tsx
import Link from "next/link";

import { IconFooterContainer } from "../containers/IconContainer";
import { EnvelopeIcon, WhatsappIcon } from "../composables/Icons";

import { socialMediaLinksFooter, navbarLinks, phone, email } from "@/utils/data";
import SocialLinkFooter from "../containers/SocialLinkFooter";
import QuickLinkFooter from "../containers/QuickLinkFooter";

const Footer = () => {
  return (
    <footer className="bg-background-footer border-t border-white/5">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Section */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Pere Barceló
              <span className="text-secondary">.</span>
            </h3>
            <p className="text-text-light text-sm leading-relaxed">
              Psicólogo deportivo especializado en mejorar el rendimiento y la
              salud mental de deportistas a través de sesiones online, talleres y asesoramiento.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Enlaces rápidos
            </h3>
            <ul className="space-y-3 text-sm">
              {navbarLinks.map((link) => (
                <li key={link.url}>
                  <QuickLinkFooter link={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Contacto
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center space-x-3 group">
                <IconFooterContainer>
                  <EnvelopeIcon />
                </IconFooterContainer>
                <a
                  href={`mailto:${email}`}
                  className="text-text-light hover:text-secondary transition-colors duration-300"
                >
                  {email}
                </a>
              </div>
              <div className="flex items-center space-x-3 group">
                <IconFooterContainer>
                  <WhatsappIcon />
                </IconFooterContainer>
                <a
                  href={`tel:${phone}`}
                  className="text-text-light hover:text-secondary transition-colors duration-300"
                >
                  {phone}
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
              Sígueme
            </h3>
            <div className="flex space-x-3">
              {socialMediaLinksFooter.map((social) => (
                <SocialLinkFooter key={social.name} social={social} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-light text-sm">
              &copy; {new Date().getFullYear()} Pere Barceló Psicólogo. Todos los
              derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                href="https://perebarcelopsicologo.com/privacy-policy/"
                className="text-text-light hover:text-secondary text-sm transition-colors duration-300"
              >
                Política de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
