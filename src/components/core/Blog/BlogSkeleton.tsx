import SectionContainer from "@/components/containers/SectionContainer";
import MainLayout from "../MainLayout";

const BlogSkeleton = () => {
    return (
      <MainLayout>
        <SectionContainer className="bg-primary-light">
          <article>
            {/* Image skeleton */}
            <div className="w-full h-96 bg-gray-200 rounded-lg mb-8 animate-pulse" />
            
            {/* Title skeleton */}
            <div className="space-y-4 mb-6">
              <div className="h-10 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
            </div>
            
            {/* Content skeleton */}
            <div className="space-y-6">
              {/* Paragraph blocks */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
              </div>
              
              {/* Another paragraph block */}
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse" />
              </div>
            </div>
          </article>
        </SectionContainer>
      </MainLayout>
    );
};
  
export default BlogSkeleton;
  
  