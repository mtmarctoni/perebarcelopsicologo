"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-background font-sans antialiased flex flex-col items-center justify-center px-5 text-center">
        <div className="rounded-full bg-error/10 p-6 mb-8">
          <svg
            className="size-12 text-error"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-text-dark tracking-tight mb-4">
          Algo salio mal
        </h1>
        <p className="text-text-light text-lg max-w-md mb-8">
          Ha ocurrido un error inesperado. Por favor, intentalo de nuevo.
        </p>
        <button
          type="button"
          onClick={reset}
          className="bg-secondary text-text-dark dark:text-[#0f172a] font-bold rounded-full px-8 py-4 hover:shadow-glow transition-all"
        >
          Intentar de nuevo
        </button>
      </body>
    </html>
  );
}
