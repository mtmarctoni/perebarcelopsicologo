import Link from "next/link";

import { email, navbarLinks, phone, socialMediaLinksFooter } from "@/utils/data";
import { EnvelopeIcon, WhatsappIcon } from "../composables/Icons";

const Footer = () => {
  return (
    <footer className="relative bg-[#050810] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(245,158,11,0.04)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-block text-white font-bold text-xl tracking-tight hover:text-secondary transition-colors duration-300"
            >
              Pere Barcelo
              <span className="font-normal text-white/40 ml-1.5 text-lg">Psicologo</span>
            </Link>
            <p className="mt-4 text-white/40 leading-relaxed max-w-sm">
              Psicologo deportivo especializado en mejorar el rendimiento y la salud mental de
              deportistas a traves de sesiones online, talleres y asesoramiento.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-white/40 hover:text-secondary transition-colors duration-300 text-sm"
              >
                <EnvelopeIcon className="w-4 h-4" />
                <span>{email}</span>
              </a>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-white/40 hover:text-secondary transition-colors duration-300 text-sm"
              >
                <WhatsappIcon className="w-4 h-4" />
                <span>{phone}</span>
              </a>
            </div>

            <div className="mt-6 flex items-center gap-3">
              {socialMediaLinksFooter.map((social) => {
                const Icon = social.Icon;
                return (
                  <a
                    key={social.name}
                    href={social.link}
                    target={social.link.startsWith("mailto") ? undefined : "_blank"}
                    rel={social.link.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center
                             hover:bg-secondary/10 hover:border-secondary/20 hover:text-secondary
                             text-white/40 transition-all duration-300"
                    aria-label={social.name}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold text-secondary uppercase tracking-[0.2em] mb-5">
              Navegacion
            </h3>
            <ul className="space-y-3">
              {navbarLinks.map((link) => (
                <li key={link.url}>
                  <Link
                    href={link.url}
                    className="text-white/40 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold text-secondary uppercase tracking-[0.2em] mb-5">
              Empieza hoy
            </h3>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              La primera sesion es gratuita. Si sabes que puedes rendir mas, hablemos.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center bg-secondary text-[#0f172a] text-sm font-bold px-6 py-3 rounded-full hover:bg-secondary-light hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 transition-all duration-300"
            >
              Reserva tu sesion gratuita
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/25 text-xs">
              &copy; {new Date().getFullYear()} Pere Barcelo Psicologo. Todos los derechos
              reservados.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-white/25 hover:text-white/50 text-xs transition-colors duration-300"
              >
                Politica de Privacidad
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
