import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { navRoutes } from "@/config/routes";
import { email, phone, socialMediaLinksFooter } from "@/utils/data";
import { EnvelopeIcon, WhatsappIcon } from "../composables/Icons";

const navItems = navRoutes;

const Footer = async () => {
  const locale = await getLocale();
  const [t, tn, tc] = await Promise.all([
    getTranslations({ locale, namespace: "Footer" }),
    getTranslations({ locale, namespace: "NavBar" }),
    getTranslations({ locale, namespace: "Common" }),
  ]);

  return (
    <footer className="relative bg-background-footer overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,_rgba(185,216,235,0.04)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="inline-block text-text-inverse font-bold text-xl tracking-tight hover:text-primary transition-colors duration-300"
            >
              {tc("siteNameShort")}
              <span className="font-normal text-text-inverse opacity-40 ml-1.5 text-lg">
                {tc("siteSubtext")}
              </span>
            </Link>
            <p className="mt-4 text-text-inverse opacity-40 leading-relaxed max-w-sm">
              {t("description")}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-text-inverse opacity-40 hover:opacity-100 hover:text-primary transition-all duration-300 text-sm"
              >
                <EnvelopeIcon className="w-4 h-4" />
                <span>{email}</span>
              </a>
            </div>
            <div className="mt-2 flex items-center gap-4">
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 text-text-inverse opacity-40 hover:opacity-100 hover:text-primary transition-all duration-300 text-sm"
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
                    className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center
                             hover:bg-secondary/10 hover:border-secondary/20 hover:text-primary
                             text-text-dark opacity-40 hover:opacity-100 transition-all duration-300"
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
              {t("navHeading")}
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => {
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-text-inverse opacity-40 hover:opacity-100 hover:text-primary text-sm transition-all duration-300"
                    >
                      {tn(item.labelKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="lg:col-span-4">
            <h3 className="text-xs font-bold text-secondary uppercase tracking-[0.2em] mb-5">
              {t("ctaHeading")}
            </h3>
            <p className="text-text-inverse opacity-40 text-sm leading-relaxed mb-6">
              {t("ctaText")}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-center bg-secondary text-text-dark dark:text-[#0f172a] text-sm font-bold px-6 py-3 rounded-full hover:bg-secondary-light hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
            >
              {t("ctaButton")}
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-text-inverse opacity-25 text-xs">
              {tc("copyright", { year: new Date().getFullYear() })}
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-text-inverse opacity-25 hover:opacity-50 text-xs transition-all duration-300"
              >
                {t("privacyLink")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
