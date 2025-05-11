import { MetadataRoute } from 'next';

const siteUrl = 'https://perebarcelopsicologo.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/services', '/blog', '/contact'].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes];
}
