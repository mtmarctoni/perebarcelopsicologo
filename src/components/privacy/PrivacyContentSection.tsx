"use client";

import { domAnimation, LazyMotion, m } from "framer-motion";
import { useTranslations } from "next-intl";

import AnimatedSection from "@/components/composables/AnimatedSection";
import { fadeInUp, staggerContainer } from "@/components/home/animations";

interface PrivacyItemProps {
  icon: string;
  label: string;
}

function PrivacyItem({ icon, label }: PrivacyItemProps) {
  return (
    <LazyMotion features={domAnimation}>
      <div className="flex items-center gap-3 text-text-light text-sm">
        <span className="text-primary">{icon}</span>
        <span>{label}</span>
      </div>
    </LazyMotion>
  );
}

export default function PrivacyContentSection() {
  const t = useTranslations("PrivacyContentSection");
  const sections = [
    {
      title: t("section1Title"),
      icon: "\uD83D\uDCCB",
      content: [
        "El responsable del tratamiento de los datos personales recogidos a traves de este sitio web es:",
      ],
      list: [
        { term: "Nombre:", detail: "Pere Barcelo Lambea" },
        { term: "Correo electronico:", detail: "pere@perebarcelopsicologo.com" },
        { term: "Telefono:", detail: "+34 636 67 47 59" },
        { term: "Sitio web:", detail: "perebarcelopsicologo.com" },
      ],
    },
    {
      title: t("section2Title"),
      icon: "\uD83D\uDD10",
      content: ["A traves de este sitio web podemos recoger los siguientes datos personales:"],
      list: [
        {
          term: "Datos de contacto:",
          detail:
            "nombre, correo electronico y telefono, que nos proporcionas al rellenar el formulario de contacto.",
        },
        {
          term: "Datos de navegacion:",
          detail:
            "direccion IP, tipo de navegador, paginas visitadas y tiempo de navegacion, recogidos mediante cookies y herramientas de analisis.",
        },
      ],
    },
    {
      title: t("section3Title"),
      icon: "\u2696\uFE0F",
      content: ["Tratamos tus datos personales con las siguientes finalidades y bases legales:"],
      list: [
        {
          term: "Gestionar solicitudes de contacto:",
          detail:
            "para responder a tus consultas y coordinar sesiones o asesoramientos. Base legal: ejecucion de medidas precontractuales (art. 6.1.b RGPD).",
        },
        {
          term: "Comunicaciones comerciales:",
          detail:
            "solo si nos has dado tu consentimiento expreso. Base legal: consentimiento (art. 6.1.a RGPD).",
        },
        {
          term: "Analisis y mejora del sitio web:",
          detail:
            "mediante herramientas como Google Analytics para entender el uso del sitio y mejorar la experiencia. Base legal: consentimiento (art. 6.1.a RGPD).",
        },
      ],
    },
    {
      title: t("section4Title"),
      icon: "\uD83D\uDDC4\uFE0F",
      content: [
        "Conservamos tus datos personales durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos y para cumplir con las obligaciones legales aplicables. Los datos de contacto se conservan mientras dure la relacion profesional y, una vez finalizada, durante el plazo legalmente establecido para posibles responsabilidades.",
      ],
    },
    {
      title: t("section5Title"),
      icon: "\uD83D\uDCE4",
      content: [
        "Tus datos personales no se cederan a terceros, salvo obligacion legal o cuando sea necesario para la prestacion del servicio. Contamos con los siguientes encargados del tratamiento:",
      ],
      list: [
        { term: "Vercel, Inc.", detail: "(alojamiento web)" },
        { term: "Resend, Inc.", detail: "(envio de correos electronicos)" },
        { term: "Google LLC", detail: "(analisis web y publicidad, solo con tu consentimiento)" },
        { term: "Cookiebot by Usercentrics", detail: "(gestion de consentimiento de cookies)" },
      ],
    },
    {
      title: t("section6Title"),
      icon: "\uD83C\uDF6A",
      content: [
        "Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de navegacion, analizar el trafico y personalizar la publicidad. La gestion de cookies se realiza a traves de Cookiebot, una plataforma que te permite aceptar, rechazar o configurar el uso de cookies de forma granular.",
        "Puedes modificar tu configuracion de cookies en cualquier momento haciendo clic en el banner de consentimiento o en el icono de configuracion de cookies que aparece en la parte inferior del sitio.",
      ],
    },
    {
      title: t("section7Title"),
      icon: "\uD83D\uDEE1\uFE0F",
      content: [
        "De acuerdo con el Reglamento General de Proteccion de Datos (RGPD), tienes los siguientes derechos respecto a tus datos personales:",
      ],
      list: [
        { term: "Derecho de acceso:", detail: "a saber que datos personales tenemos sobre ti." },
        { term: "Derecho de rectificacion:", detail: "a corregir datos inexactos o incompletos." },
        {
          term: 'Derecho de supresion ("derecho al olvido"):',
          detail: "a solicitar la eliminacion de tus datos.",
        },
        {
          term: "Derecho de oposicion:",
          detail: "a oponerte al tratamiento de tus datos.",
        },
        {
          term: "Derecho de limitacion del tratamiento:",
          detail: "a solicitar la restriccion del uso de tus datos.",
        },
        {
          term: "Derecho de portabilidad:",
          detail: "a recibir tus datos en un formato estructurado.",
        },
      ],
      closing:
        "Para ejercer cualquiera de estos derechos, puedes contactarnos enviando un correo electronico a pere@perebarcelopsicologo.com indicando claramente el derecho que deseas ejercer y adjuntando una copia de tu documento de identidad.",
    },
    {
      title: t("section8Title"),
      icon: "\uD83D\uDD12",
      content: [
        "Implementamos medidas tecnicas y organizativas apropiadas para proteger tus datos personales contra accesos no autorizados, perdida, alteracion o destruccion. Estas medidas incluyen el uso de conexiones HTTPS, almacenamiento seguro en servidores de Vercel y limitacion del acceso a los datos personales unicamente al personal autorizado.",
      ],
    },
    {
      title: t("section9Title"),
      icon: "\uD83D\uDCDD",
      content: [
        "Nos reservamos el derecho a modificar esta Politica de Privacidad para adaptarla a novedades legislativas o cambios en nuestros servicios. Cualquier modificacion sera publicada en esta pagina con la fecha de actualizacion correspondiente.",
      ],
    },
    {
      title: t("section10Title"),
      icon: "\u2709\uFE0F",
      content: [
        "Si tienes cualquier duda o consulta sobre esta Politica de Privacidad o sobre el tratamiento de tus datos personales, puedes contactarnos a traves de:",
      ],
      list: [
        { term: "Correo electronico:", detail: "pere@perebarcelopsicologo.com" },
        { term: "Telefono:", detail: "+34 636 67 47 59" },
      ],
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative bg-background-alt overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(185,216,235,0.03)_0%,_transparent_50%)]" />

        <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
          <m.div
            className="space-y-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={staggerContainer}
          >
            {sections.map((section) => (
              <m.div
                key={section.title}
                variants={fadeInUp}
                className="bg-background-alt border border-border rounded-2xl p-8 sm:p-10"
              >
                <h2 className="text-xl sm:text-2xl font-bold text-text-dark tracking-tight">
                  {section.title}
                </h2>

                {section.content?.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="text-text-light mt-4 leading-relaxed">
                    {paragraph}
                  </p>
                ))}

                {section.list && (
                  <ul className="mt-4 space-y-3">
                    {section.list.map((item) => (
                      <li key={item.term} className="text-text-light leading-relaxed">
                        <strong className="text-text-dark opacity-80">{item.term}</strong>{" "}
                        <span>{item.detail}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.closing && (
                  <p className="text-text-light mt-4 leading-relaxed">{section.closing}</p>
                )}
              </m.div>
            ))}
          </m.div>

          <AnimatedSection className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 justify-center">
              <PrivacyItem icon="\u2713" label={t("badgeProtected")} />
              <PrivacyItem icon="\u2713" label={t("badgeHttps")} />
              <PrivacyItem icon="\u2713" label={t("badgeRgpd")} />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </LazyMotion>
  );
}
