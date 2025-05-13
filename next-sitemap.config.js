/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://perebarcelopsicologo.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml', '/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    additionalSitemaps: [
      'https://perebarcelopsicologo.com/sitemap.xml',
      'https://perebarcelopsicologo.com/server-sitemap.xml',
    ],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
  outDir: 'public',
};
