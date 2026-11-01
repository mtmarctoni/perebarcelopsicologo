interface SkeletonProps {
  className?: string;
}

const SkeletonCircle = ({ className = "" }: SkeletonProps) => (
  <div className={`rounded-full bg-text-light/10 animate-pulse ${className}`} />
);

const SkeletonLine = ({ className = "" }: SkeletonProps) => (
  <div className={`rounded-full bg-text-light/10 animate-pulse ${className}`} />
);

export const NestedSkeleton = () => (
  <div className="flex flex-col items-center justify-center min-h-[40vh] px-5 gap-4">
    <SkeletonCircle className="size-10" />
    <SkeletonLine className="h-6 w-48" />
    <SkeletonLine className="h-4 w-64" />
  </div>
);
