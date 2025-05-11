declare module 'next-seo' {
  import { MetaProps } from 'next/head';
  
  export interface NextSeoProps {
    title?: string;
    description?: string;
    canonical?: string;
    noindex?: boolean;
    nofollow?: boolean;
    openGraph?: {
      type?: string;
      url?: string;
      title?: string;
      description?: string;
      images?: Array<{
        url: string;
        width?: number;
        height?: number;
        alt?: string;
      }>;
      site_name?: string;
      article?: {
        publishedTime?: string;
        modifiedTime?: string;
        section?: string;
        tags?: string[];
      };
    };
    twitter?: {
      handle?: string;
      site?: string;
      cardType?: string;
    };
    additionalMetaTags?: MetaProps[];
  }

  export const NextSeo: React.FC<NextSeoProps>;
  
  export interface JsonLdProps {
    [key: string]: any;
  }
  
  export const JsonLd: React.FC<JsonLdProps>;
}
