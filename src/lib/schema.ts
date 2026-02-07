// Schema.org structured data for Armax Logistics

// Получаем базовый URL из env или используем по умолчанию
const SITE_URL = typeof import.meta.env.VITE_SITE_URL !== 'undefined' 
  ? import.meta.env.VITE_SITE_URL 
  : "https://armaxstp.com";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Armax Logistics",
  "alternateName": "Армакс Логистика",
  "url": SITE_URL,
  "logo": `${SITE_URL}/armax-logo.svg`,
  "description": "Международная логистическая компания специализирующаяся на перевозках грузов по Европе и Азии",
  "telephone": "+7-981-997-66-36",
  "email": "request@armaxstp.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Горское шоссе, 4",
    "addressLocality": "Санкт-Петербург",
    "postalCode": "197110",
    "addressCountry": "RU"
  },
  "sameAs": [
    "https://t.me/armaxlogistics"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+7-981-997-66-36",
    "contactType": "customer service",
    "areaServed": ["RU", "EU", "AS"],
    "availableLanguage": ["Russian", "English"]
  }
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Armax Logistics",
  "image": `${SITE_URL}/armax-logo.svg`,
  "@id": SITE_URL,
  "url": SITE_URL,
  "telephone": "+7-981-997-66-36",
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
    "item": `${SITE_URL}${item.url}`
  }))
});

export const faqPageSchema = (faqs: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

