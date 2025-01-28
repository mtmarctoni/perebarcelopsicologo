// app/blog/loading.tsx
export default function Loading() {
    return (
      <div className="grid grid-cols-1 gap-8">
        {[...Array(3)].map((_, index) => (
          <article 
            key={index}
            className="bg-background-alt rounded-lg shadow-md overflow-hidden animate-pulse"
          >
            {/* Image skeleton */}
            <div className="w-full h-48 bg-background" />
            
            <div className="p-6 space-y-4">
              {/* Title skeleton */}
              <div className="space-y-2">
                <div className="h-6 bg-background rounded w-3/4" />
                <div className="h-6 bg-background rounded w-1/2" />
              </div>
  
              {/* Content skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-background rounded w-full" />
                <div className="h-4 bg-background rounded w-5/6" />
                <div className="h-4 bg-background rounded w-4/6" />
              </div>
  
              {/* Button skeleton */}
              <div className="h-10 w-24 bg-background rounded-lg" />
            </div>
          </article>
        ))}
      </div>
    );
  }
  