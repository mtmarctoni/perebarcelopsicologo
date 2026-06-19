"use client";

import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/composables/AnimatedSection";
import { EnvelopeIcon, InstagramIcon, LinkedinIcon } from "@/components/composables/Icons";
import SectionLabel from "@/components/composables/SectionLabel";
import { staggerDelay } from "@/components/home/animations";
import { socialMediaLinks } from "@/utils/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Email: EnvelopeIcon,
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
};

export default function ContactSocialSection() {
  const t = useTranslations("ContactSocialSection");
  return (
    <section className="relative bg-background overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,_rgba(185,216,235,0.04)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel text={t("sectionLabel")} />
          <h2 className="text-4xl sm:text-5xl font-bold text-text-dark tracking-tight mt-2">
            {t("heading")}
          </h2>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {socialMediaLinks.map((social, i) => {
            const IconComponent = iconMap[social.name];
            return (
              <a
                key={social.name}
                href={social.link}
                target={social.link.startsWith("mailto") ? undefined : "_blank"}
                rel={social.link.startsWith("mailto") ? undefined : "noopener noreferrer"}
                className="opacity-0 animate-fade-in-up group bg-background-alt border border-border rounded-2xl p-8 text-center hover:border-secondary/30 hover:-translate-y-2 hover:shadow-glow transition-all duration-500"
                style={{ animationDelay: `${staggerDelay(i, 0.1, 0.12)}ms` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/15 transition-colors duration-300">
                  {IconComponent && (
                    <IconComponent className="w-7 h-7 text-primary transition-colors duration-300" />
                  )}
                </div>
                <h3 className="text-text-dark font-bold text-lg">{social.name}</h3>
                <span className="text-text-light group-hover:text-primary transition-colors duration-300 text-sm mt-1 block">
                  {social.username}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
