"use client";

import { motion } from "framer-motion";

import AnimatedSection from "@/components/composables/AnimatedSection";
import { EnvelopeIcon, InstagramIcon, LinkedinIcon } from "@/components/composables/Icons";
import SectionLabel from "@/components/composables/SectionLabel";
import { fadeInUp, staggerContainer } from "@/components/home/animations";
import { socialMediaLinks } from "@/utils/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Email: EnvelopeIcon,
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
};

export default function ContactSocialSection() {
  return (
    <section className="relative bg-[#070b14] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,_rgba(245,158,11,0.04)_0%,_transparent_50%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <AnimatedSection className="text-center mb-16">
          <SectionLabel text="Redes" />
          <h2 className="text-4xl sm:text-5xl font-bold text-white tracking-tight mt-2">
            Tambien puedes encontrarme en
          </h2>
        </AnimatedSection>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
        >
          {socialMediaLinks.map((social) => {
            const IconComponent = iconMap[social.name];
            return (
              <motion.a
                key={social.name}
                href={social.link}
                target={social.link.startsWith("mailto") ? undefined : "_blank"}
                rel={social.link.startsWith("mailto") ? undefined : "noopener noreferrer"}
                variants={fadeInUp}
                className="group bg-[#0f172a] border border-white/[0.06] rounded-2xl p-8 text-center hover:border-secondary/30 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary/15 transition-colors duration-300">
                  {IconComponent && (
                    <IconComponent className="w-7 h-7 text-secondary transition-colors duration-300" />
                  )}
                </div>
                <h3 className="text-white font-bold text-lg">{social.name}</h3>
                <span className="text-white/40 group-hover:text-secondary transition-colors duration-300 text-sm mt-1 block">
                  {social.username}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
