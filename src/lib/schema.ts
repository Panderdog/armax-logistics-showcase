// Schema.org structured data for Armax Logistics

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Armax Logistics",
  "alternateName": "Армакс Логистика",
  "url": "https://armax-logistics.com",
  "logo": "https://armax-logistics.com/armax-logo.svg",
  "description": "Международная логистическая компания специализирующаяся на перевозках грузов по Европе и Азии",
  "telephone": "+7-812-644-02-91",
  "email": "info@armaxstp.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Горское шоссе, 4",
    "addressLocality": "Санкт-Петербург",
    "postalCode": "197110",
    "addressCountry": "RU"
  },
  "sameAs": [
    "https://t.me/armaxlogistics",
    "https://wa.me/78126440291"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-812-644-02-91",
    "contactType": "customer service",
    "areaServed": ["RU", "EU", "AS"],
    "availableLanguage": ["Russian", "English"]
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Armax Logistics",
  "image": "https://armax-logistics.com/armax-logo.svg",
  "@id": "https://armax-logistics.com",
  "url": "https://armax-logistics.com",
  "telephone": "+7-812-644-02-91",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Горское шоссе, 4",
    "addressLocality": "Санкт-Петербург",
    "postalCode": "197110",
    "addressCountry": "RU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 60.102126,
    "longitude": 30.244684
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday"
    ],
    "opens": "09:00",
    "closes": "18:00"
  }
};

export const serviceSchema = (serviceName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": serviceName,
  "provider": {
    "@type": "Organization",
    "name": "Armax Logistics"
  },
  "areaServed": {
    "@type": "Place",
    "name": "Европа и Азия"
  },
  "description": description
});

export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://armax-logistics.com${item.url}`
  }))
});

