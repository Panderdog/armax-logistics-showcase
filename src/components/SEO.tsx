import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  image?: string;
  ogType?: string;
  canonicalUrl?: string;
  structuredData?: object;
  noindex?: boolean;
}

const SEO = ({
  title,
  description,
  keywords,
  ogImage,
  image,
  ogType = "website",
  canonicalUrl,
  structuredData,
  noindex = false,
}: SEOProps) => {
  const fullTitle = `${title} | Armax Logistics`;
  const baseUrl = import.meta.env.VITE_SITE_URL || "https://armaxstp.com";
  const finalImage = image || ogImage || "/og-image.jpg";

  // Нормализация URL: добавляем trailing slash если его нет
  const normalizeUrl = (path: string) => {
    if (!path) return "";
    // Если путь уже заканчивается на /, оставляем как есть
    if (path.endsWith("/")) return path;
    // Если это корень, добавляем /
    if (path === "") return "/";
    // Иначе добавляем / в конец
    return `${path}/`;
  };

  // Преобразование в абсолютный URL для изображений
  const toAbsoluteUrl = (input: string | undefined, origin: string): string => {
    if (!input) return `${origin}/og-image.jpg`;

    const s = input.trim();
    if (!s) return `${origin}/og-image.jpg`;

    // Already absolute
    if (/^https?:\/\//i.test(s)) return s;

    // Protocol-relative //example.com/img
    if (s.startsWith("//")) return `https:${s}`;

    // Relative path
    const cleanOrigin = origin.replace(/\/+$/, "");
    const path = s.startsWith("/") ? s : `/${s}`;
    return `${cleanOrigin}${path}`;
  };

  const normalizedCanonical = canonicalUrl ? normalizeUrl(canonicalUrl) : null;
  const fullCanonicalUrl = normalizedCanonical ? `${baseUrl}${normalizedCanonical}` : null;
  const fullImageUrl = toAbsoluteUrl(finalImage, baseUrl);

  return (
    <Helmet>
      {/* Title */}
      <title>{fullTitle}</title>

      {/* Basic Meta Tags */}
      <meta name="description" content={description} />
      <meta name="author" content="Armax Logistics" />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical URL */}
      {fullCanonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:site_name" content="Armax Logistics" />
      <meta property="og:locale" content="ru_RU" />
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Additional Meta Tags */}
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="googlebot" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="theme-color" content="#3b82f6" />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;

