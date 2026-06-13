export default function NestedLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] px-5 gap-4">
      <div className="size-10 rounded-full bg-text-light/10 animate-pulse" />
      <div className="h-6 w-48 rounded-full bg-text-light/10 animate-pulse" />
      <div className="h-4 w-64 rounded-full bg-text-light/10 animate-pulse" />
    </div>
  );
}
