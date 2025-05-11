import { JsonLd } from 'next-seo';

const siteUrl = 'https://perebarcelopsicologo.com';

export const WebsiteSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Pere Barceló - Psicólogo Deportivo',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return <JsonLd {...schema} />;
};

export const LocalBusinessSchema = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Pere Barceló - Psicólogo Deportivo',
    image: `${siteUrl}/images/og-image.jpg`,
    '@id': siteUrl,
    url: siteUrl,
    telephone: '+34636674759',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Carrer de la Indústria, 12',
      addressLocality: 'Palma',
      postalCode: '07013',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 39.5742,
      longitude: 2.6549,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
      ],
      opens: '09:00',
      closes: '20:00',
    },
    sameAs: [
      'https://www.linkedin.com/in/pere-barcelo-lambea/',
      'https://www.instagram.com/perebarcelpsicologo/',
    ],
  };

  return <JsonLd {...schema} />;
};

export const BreadcrumbSchema = ({ items }: { items: Array<{ name: string; item: string }> }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };

  return <JsonLd {...schema} />;
};