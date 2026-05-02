import { clientEnv } from "@/config/client-env.config";

const calendlyUrl = clientEnv.NEXT_PUBLIC_CALENDLY_URL;

const CalendlyBookingCard = () => {
  const hasCalendly = Boolean(calendlyUrl);

  return (
    <div className="bg-background rounded-3xl shadow-card p-8 sm:p-10 h-full flex flex-col">
      <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
        Reserva directa
      </span>
      <h2 className="text-3xl font-bold text-text-dark mt-3 tracking-tight">Reserva una llamada</h2>
      <p className="text-text mt-4 leading-relaxed">
        Si prefieres elegir hora directamente, puedes reservar una cita desde el calendario.
      </p>

      {hasCalendly ? (
        <div className="mt-8 rounded-2xl overflow-hidden border border-secondary/20 bg-background-alt/60 min-h-[720px]">
          <iframe
            src={calendlyUrl}
            title="Calendly booking"
            className="w-full h-[720px]"
            loading="lazy"
            allow="camera; microphone; autoplay; fullscreen; display-capture"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : (
        <div className="mt-8 rounded-2xl border border-dashed border-secondary/30 bg-background-alt/60 p-8 flex flex-col justify-center items-start gap-4 min-h-[320px]">
          <p className="text-text leading-relaxed">
            El bloque de reserva estara disponible en cuanto se configure la URL publica de
            Calendly.
          </p>
          <p className="text-text-light text-sm leading-relaxed">
            Configuracion requerida: <code>NEXT_PUBLIC_CALENDLY_URL</code>
          </p>
        </div>
      )}
    </div>
  );
};

export default CalendlyBookingCard;
