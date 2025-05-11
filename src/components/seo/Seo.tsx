import { NextSeo, NextSeoProps } from 'next-seo';
import { WebsiteSchema, LocalBusinessSchema, BreadcrumbSchema } from './SchemaMarkup';

interface SeoProps extends NextSeoProps {
  title: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; item: string }>;
  noindex?: boolean;
  nofollow?: boolean;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  images?: Array<{
    url: string;
    width: number;
    height: number;
    alt: string;
  }>;
}

export default function Seo({
  title,
  description,
  url,
  breadcrumbs = [],
  noindex = false,
  nofollow = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  images = [{
    url: 'https://perebarcelopsicologo.com/images/og-image.jpg',
    width: 1200,
    height: 630,
    alt: 'Pere Barceló - Psicólogo Deportivo',
  }],
  ...props
}: SeoProps) {
  const siteUrl = 'https://perebarcelopsicologo.com';
  const canonical = url ? `${siteUrl}${url}` : siteUrl;
  
  const breadcrumbItems = [
    { name: 'Inicio', item: siteUrl },
    ...breadcrumbs,
  ];

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={canonical}
        noindex={noindex}
        nofollow={nofollow}
        openGraph={{
          type,
          url: canonical,
          title,
          description,
          images,
          article: type === 'article' ? {
            publishedTime,
            modifiedTime,
            section,
            tags,
          } : undefined,
        }}
        additionalMetaTags={[
          {
            name: 'keywords',
            content: 'psicología deportiva, psicólogo deportivo mallorca, rendimiento deportivo, psicología del deporte, entrenamiento mental, deporte mallorca, psicología deportiva baleares',
          },
          {
            name: 'author',
            content: 'Pere Barceló Lambea',
          },
          {
            name: 'twitter:card',
            content: 'summary_large_image',
          },
          {
            name: 'twitter:creator',
            content: '@perebarcelpsico',
          },
        ]}
        {...props}
      />
      
      {/* Schema.org Markup */}
      <WebsiteSchema />
      <LocalBusinessSchema />
      {breadcrumbItems.length > 0 && <BreadcrumbSchema items={breadcrumbItems} />}
    </>
  );
}
