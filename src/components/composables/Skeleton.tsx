interface SkeletonProps {
  className?: string;
}

const SkeletonCircle = ({ className = "" }: SkeletonProps) => (
  <div className={`rounded-full bg-text-light/10 animate-pulse ${className}`} />
);

const SkeletonLine = ({ className = "" }: SkeletonProps) => (
  <div className={`rounded-full bg-text-light/10 animate-pulse ${className}`} />
);

interface PageSkeletonProps {
  lines?: number;
  circleSize?: string;
  button?: boolean;
}

function SkeletonLines({ count }: { count: number }) {
  const items: React.ReactNode[] = [];
  for (let i = 0; i < count; i++) {
    // react-doctor-disable-next-line react-doctor/no-array-index-as-key
    items.push(
      <SkeletonLine
        key={`line-${i}`}
        className={`h-4 ${i === 0 ? "w-64" : "w-48"} rounded-full`}
      />,
    );
  }
  return items;
}

export const PageSkeleton = ({
  lines = 2,
  circleSize = "size-16",
  button = false,
}: PageSkeletonProps) => (
  <main className="flex flex-col items-center justify-center min-h-[60vh] px-5">
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <SkeletonCircle className={circleSize} />
      <SkeletonLines count={lines} />
      {button && <SkeletonLine className="h-12 w-40 rounded-full mt-2" />}
    </div>
  </main>
);

export const NestedSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-[40vh] px-5 gap-4">
    <SkeletonCircle className="size-10" />
    <SkeletonLine className="h-6 w-48" />
    <SkeletonLine className="h-4 w-64" />
  </div>
);
