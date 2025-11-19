import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

const SEO = ({
  title,
  description,
  keywords,
  ogImage = "/og-image.jpg",
  ogType = "website",
  canonicalUrl,
  structuredData,
}: SEOProps) => {
  const fullTitle = `${title} | Armax Logistics`;
  const baseUrl = "https://armax-logistics.com"; // Замените на реальный URL при деплое

  useEffect(() => {
    // Update document title
    document.title = fullTitle;

    // Function to update or create meta tag
    const updateMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute.split("=")[0], attribute.split("=")[1]);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Function to update or create link tag
    const updateLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`);
      if (!element) {
        element = document.createElement("link");
        element.setAttribute("rel", rel);
        document.head.appendChild(element);
      }
      element.setAttribute("href", href);
    };

    // Basic Meta Tags
    updateMetaTag('meta[name="description"]', "name=description", description);
    updateMetaTag('meta[name="author"]', "name=author", "Armax Logistics");
    if (keywords) {
      updateMetaTag('meta[name="keywords"]', "name=keywords", keywords);
    }

    // Canonical URL
    if (canonicalUrl) {
      updateLinkTag("canonical", `${baseUrl}${canonicalUrl}`);
    }

    // Open Graph / Facebook
    updateMetaTag('meta[property="og:type"]', "property=og:type", ogType);
    updateMetaTag('meta[property="og:title"]', "property=og:title", fullTitle);
    updateMetaTag('meta[property="og:description"]', "property=og:description", description);
    updateMetaTag('meta[property="og:image"]', "property=og:image", `${baseUrl}${ogImage}`);
    updateMetaTag('meta[property="og:site_name"]', "property=og:site_name", "Armax Logistics");
    updateMetaTag('meta[property="og:locale"]', "property=og:locale", "ru_RU");
    if (canonicalUrl) {
      updateMetaTag('meta[property="og:url"]', "property=og:url", `${baseUrl}${canonicalUrl}`);
    }

    // Twitter Card
    updateMetaTag('meta[name="twitter:card"]', "name=twitter:card", "summary_large_image");
    updateMetaTag('meta[name="twitter:title"]', "name=twitter:title", fullTitle);
    updateMetaTag('meta[name="twitter:description"]', "name=twitter:description", description);
    updateMetaTag('meta[name="twitter:image"]', "name=twitter:image", `${baseUrl}${ogImage}`);

    // Additional Meta Tags
    updateMetaTag('meta[name="robots"]', "name=robots", "index, follow");
    updateMetaTag('meta[name="googlebot"]', "name=googlebot", "index, follow");
    updateMetaTag('meta[name="format-detection"]', "name=format-detection", "telephone=yes");
    updateMetaTag('meta[name="theme-color"]', "name=theme-color", "#3b82f6");

    // Structured Data (JSON-LD)
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]');
      if (!script) {
        script = document.createElement("script");
        script.setAttribute("type", "application/ld+json");
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }
  }, [title, description, keywords, ogImage, ogType, canonicalUrl, structuredData, fullTitle, baseUrl]);

  return null; // This component doesn't render anything
};

export default SEO;

