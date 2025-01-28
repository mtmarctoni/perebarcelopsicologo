export interface Post {
    id: number;
    slug: string;
    title: { rendered: string };
    content: { rendered: string };
    excerpt: { rendered: string };
    date: string;
    link: string;
    _embedded?: {
      'wp:featuredmedia'?: Array<{
        source_url: string;
      }>;
    };
  }