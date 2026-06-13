export default function LocaleLoading() {
  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] px-5">
      <div className="flex flex-col items-center gap-6 w-full max-w-md">
        <div className="size-16 rounded-full bg-text-light/10 animate-pulse" />
        <div className="h-8 w-64 rounded-full bg-text-light/10 animate-pulse" />
        <div className="h-4 w-80 rounded-full bg-text-light/10 animate-pulse" />
        <div className="h-4 w-72 rounded-full bg-text-light/10 animate-pulse" />
        <div className="h-12 w-40 rounded-full bg-text-light/10 animate-pulse mt-4" />
      </div>
    </main>
  );
}
