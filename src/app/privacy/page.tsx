import type { Metadata } from "next";
import { createPageMetadata } from "@/app/metadata";
import MainLayout from "@/components/core/MainLayout";

export const metadata: Metadata = createPageMetadata({
  title: "Política de Privacidad | Pere Barceló Psicólogo",
  description:
    "Información sobre el tratamiento de datos personales, cookies y derechos de los usuarios en el sitio web de Pere Barceló Psicólogo.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-text-dark mb-8 tracking-tight">
          Política de Privacidad
        </h1>

        <div className="prose prose-lg text-text space-y-8">
          <section>
            <h2 className="text-xl font-bold text-text-dark mt-8 mb-4">
              1. Responsable del tratamiento
            </h2>
            <p className="mb-4">
              El responsable del tratamiento de los datos personales recogidos a través de este
              sitio web es:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Nombre:</strong> Pere Barceló Lambea
              </li>
              <li>
                <strong>Correo electrónico:</strong> pere@perebarcelopsicologo.com
              </li>
              <li>
                <strong>Teléfono:</strong> +34 636 67 47 59
              </li>
              <li>
                <strong>Sitio web:</strong> perebarcelopsicologo.com
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-dark mt-8 mb-4">2. Datos que recogemos</h2>
            <p className="mb-4">
              A través de este sitio web podemos recoger los siguientes datos personales:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Datos de contacto:</strong> nombre, correo electrónico y teléfono, que nos
                proporcionas al rellenar el formulario de contacto.
              </li>
              <li>
                <strong>Datos de navegación:</strong> dirección IP, tipo de navegador, páginas
                visitadas y tiempo de navegación, recogidos mediante cookies y herramientas de
                análisis.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-dark mt-8 mb-4">
              3. Finalidad y base legal del tratamiento
            </h2>
            <p className="mb-4">
              Tratamos tus datos personales con las siguientes finalidades y bases legales:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Gestionar solicitudes de contacto:</strong> para responder a tus consultas y
                coordinar sesiones o asesoramientos. Base legal: ejecución de medidas
                precontractuales (art. 6.1.b RGPD).
              </li>
              <li>
                <strong>Comunicaciones comerciales:</strong> solo si nos has dado tu consentimiento
                expreso. Base legal: consentimiento (art. 6.1.a RGPD).
              </li>
              <li>
                <strong>Análisis y mejora del sitio web:</strong> mediante herramientas como Google
                Analytics para entender el uso del sitio y mejorar la experiencia. Base legal:
                consentimiento (art. 6.1.a RGPD).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-dark mt-8 mb-4">
              4. Conservación de los datos
            </h2>
            <p className="mb-4">
              Conservamos tus datos personales durante el tiempo necesario para cumplir con la
              finalidad para la que fueron recogidos y para cumplir con las obligaciones legales
              aplicables. Los datos de contacto se conservan mientras dure la relación profesional
              y, una vez finalizada, durante el plazo legalmente establecido para posibles
              responsabilidades.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-dark mt-8 mb-4">
              5. Destinatarios de los datos
            </h2>
            <p className="mb-4">
              Tus datos personales no se cederán a terceros, salvo obligación legal o cuando sea
              necesario para la prestación del servicio. Contamos con los siguientes encargados del
              tratamiento:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Vercel, Inc.</strong> (alojamiento web)
              </li>
              <li>
                <strong>Resend, Inc.</strong> (envío de correos electrónicos)
              </li>
              <li>
                <strong>Google LLC</strong> (análisis web y publicidad, solo con tu consentimiento)
              </li>
              <li>
                <strong>Cookiebot by Usercentrics</strong> (gestión de consentimiento de cookies)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-dark mt-8 mb-4">6. Cookies</h2>
            <p className="mb-4">
              Este sitio web utiliza cookies propias y de terceros para mejorar la experiencia de
              navegación, analizar el tráfico y personalizar la publicidad. La gestión de cookies se
              realiza a través de Cookiebot, una plataforma que te permite aceptar, rechazar o
              configurar el uso de cookies de forma granular.
            </p>
            <p className="mb-4">
              Puedes modificar tu configuración de cookies en cualquier momento haciendo clic en el
              banner de consentimiento o en el icono de configuración de cookies que aparece en la
              parte inferior del sitio.
            </p>
            <p className="mb-4">
              Para más información sobre las cookies que utilizamos, consulta nuestra{" "}
              <a href="/privacy" className="text-secondary hover:underline">
                política de cookies
              </a>{" "}
              (incluida en esta misma página).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-dark mt-8 mb-4">
              7. Derechos de los usuarios
            </h2>
            <p className="mb-4">
              De acuerdo con el Reglamento General de Protección de Datos (RGPD), tienes los
              siguientes derechos respecto a tus datos personales:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Derecho de acceso:</strong> a saber qué datos personales tenemos sobre ti.
              </li>
              <li>
                <strong>Derecho de rectificación:</strong> a corregir datos inexactos o incompletos.
              </li>
              <li>
                <strong>Derecho de supresión ("derecho al olvido"):</strong> a solicitar la
                eliminación de tus datos.
              </li>
              <li>
                <strong>Derecho de oposición:</strong> a oponerte al tratamiento de tus datos.
              </li>
              <li>
                <strong>Derecho de limitación del tratamiento:</strong> a solicitar la restricción
                del uso de tus datos.
              </li>
              <li>
                <strong>Derecho de portabilidad:</strong> a recibir tus datos en un formato
                estructurado.
              </li>
            </ul>
            <p className="mt-4 mb-4">
              Para ejercer cualquiera de estos derechos, puedes contactarnos enviando un correo
              electrónico a{" "}
              <a
                href="mailto:pere@perebarcelopsicologo.com"
                className="text-secondary hover:underline"
              >
                pere@perebarcelopsicologo.com
              </a>{" "}
              indicando claramente el derecho que deseas ejercer y adjuntando una copia de tu
              documento de identidad.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-dark mt-8 mb-4">
              8. Seguridad de la información
            </h2>
            <p className="mb-4">
              Implementamos medidas técnicas y organizativas apropiadas para proteger tus datos
              personales contra accesos no autorizados, pérdida, alteración o destrucción. Estas
              medidas incluyen el uso de conexiones HTTPS, almacenamiento seguro en servidores de
              Vercel y limitación del acceso a los datos personales únicamente al personal
              autorizado.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-dark mt-8 mb-4">
              9. Modificaciones de esta política
            </h2>
            <p className="mb-4">
              Nos reservamos el derecho a modificar esta Política de Privacidad para adaptarla a
              novedades legislativas o cambios en nuestros servicios. Cualquier modificación será
              publicada en esta página con la fecha de actualización correspondiente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-text-dark mt-8 mb-4">10. Contacto</h2>
            <p className="mb-4">
              Si tienes cualquier duda o consulta sobre esta Política de Privacidad o sobre el
              tratamiento de tus datos personales, puedes contactarnos a través de:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong>Correo electrónico:</strong>{" "}
                <a
                  href="mailto:pere@perebarcelopsicologo.com"
                  className="text-secondary hover:underline"
                >
                  pere@perebarcelopsicologo.com
                </a>
              </li>
              <li>
                <strong>Teléfono:</strong> +34 636 67 47 59
              </li>
            </ul>
          </section>

          <p className="text-sm text-text-light mt-12 pt-8 border-t border-gray-200">
            Última actualización:{" "}
            {new Date().toLocaleDateString("es-ES", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            .
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
