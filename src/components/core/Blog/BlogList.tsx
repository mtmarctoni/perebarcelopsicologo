import { useBlogList } from '@/hooks/useBlogList';
import Loading from './BlogListSkeleton';
import BlogCard from './BlogCard';

  const BlogList = () => {
    const { posts, loading } = useBlogList();
  
    if (loading) return <Loading />;
  
      return (
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"></div>
      <div className="grid grid-cols-1 gap-8">
        {posts.map(post => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    );
  };

export default BlogList;
