// components/Footer.tsx
import Link from "next/link";

import { IconFooterContainer } from "../containers/IconContainer";
import { EnvelopeIcon, WhatsappIcon } from "../composables/Icons";

import { socialMediaLinksFooter, navbarLinks } from "@/utils/data";
import SocialLinkFooter from "../containers/SocialLinkFooter";
import QuickLinkFooter from "../containers/QuickLinkFooter";

const Footer = () => {
  //const date = '2024'
  return (
    <footer className="bg-background-footer text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Pere Barceló</h3>
            <p className="text-gray-light text-xs leading-relaxed">
              Psicólogo deportivo especializado en mejorar el rendimiento y la
              salud mental de deportistas.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2 text-xs">
              {navbarLinks.map((link) => (
                <li key={link.url}>
                  <QuickLinkFooter link={link} />
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center space-x-3">
                <IconFooterContainer>
                  <EnvelopeIcon />
                </IconFooterContainer>
                <a
                  href="mailto:pere@perebarcelpsicologo.com"
                  className="text-gray-light hover:text-white transition-colors duration-200"
                >
                  pere@perebarcelpsicologo.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <IconFooterContainer>
                  <WhatsappIcon />
                </IconFooterContainer>
                <a
                  href="tel:+34600000000"
                  className="text-gray-light hover:text-white transition-colors duration-200"
                >
                  +34 600 000 000
                </a>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Sígueme</h3>
            <div className="flex space-x-4">
              {socialMediaLinksFooter.map((social) => (
                <SocialLinkFooter key={social.name} social={social} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-2 border-t border-bg text-xs">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-light">
              © {new Date().getFullYear()} Pere Barceló Psicólogo. Todos los
              derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacidad"
                className="text-gray-light hover:text-white transition-colors duration-200"
              >
                Política de Privacidad
              </Link>
              <Link
                href="/cookies"
                className="text-gray-light hover:text-white transition-colors duration-200"
              >
                Política de Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
