import { useParams, Link, Navigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { useApplicationModal } from '@/contexts/ApplicationModalContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Tag, ArrowRight, Newspaper, Clock, Share2, Sparkles } from 'lucide-react';
import SEO from '@/components/SEO';
import { useEffect, useState, useRef } from 'react';

// Hook for intersection observer animation
const useInView = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
};

// Simple markdown-like parser for content
function parseContent(content: string): string {
  if (!content) return '';
  
  let html = content
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-xl lg:text-2xl font-bold mt-12 mb-5 text-white">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl lg:text-3xl font-bold mt-14 mb-6 text-white">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl lg:text-4xl font-bold mt-16 mb-8 text-white">$1</h1>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^- (.+)$/gm, '<li class="ml-6 list-disc text-zinc-300 leading-relaxed">$1</li>')
    // Paragraphs (lines that aren't headers or list items)
    .replace(/^(?!<[hl]|<li)(.+)$/gm, '<p class="mb-7 leading-[1.8] text-zinc-300 text-lg lg:text-xl">$1</p>')
    // Wrap consecutive list items
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-8 space-y-4">$&</ul>')
    // Clean up empty paragraphs
    .replace(/<p class="[^"]*"><\/p>/g, '')
    // Line breaks
    .replace(/\n\n/g, '');

  return html;
}

const NewsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getNewsBySlug, getPublishedNews } = useAdmin();
  const { openApplicationModal } = useApplicationModal();
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const article = slug ? getNewsBySlug(slug) : undefined;
  const allNews = getPublishedNews();
  
  // Animation refs
  const contentRef = useInView(0.1);
  const relatedRef = useInView(0.1);
  const ctaRef = useInView(0.15);
  
  // Get other news (exclude current)
  const otherNews = allNews
    .filter(item => item.slug !== slug)
    .slice(0, 3);

  // Estimate reading time
  const readingTime = article ? Math.max(1, Math.ceil(article.content.split(/\s+/).length / 200)) : 0;

  if (!article) {
    return <Navigate to="/news" replace />;
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.previewText,
          url: window.location.href,
        });
      } catch {
        // User cancelled or share failed
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <SEO 
        title={`${article.title} — Новости Armax`}
        description={article.previewText}
        image={article.previewImage}
      />
      
      <div className="min-h-screen overflow-hidden">
        {/* Hero Section */}
        <section className="relative py-28 lg:py-36 bg-[#0B0F18] overflow-hidden">
          {/* Layered background effects */}
          <div className="absolute inset-0">
            {/* Image background */}
            {article.previewImage && (
              <div 
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                style={{ 
                  backgroundImage: `url(${article.previewImage})`,
                  opacity: imageLoaded ? 0.15 : 0
                }}
              />
            )}
            
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/95 to-[#0B0F18]/80" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18] via-transparent to-transparent" />
            
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '60px 60px'
              }}
            />
          </div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            {/* Back Link */}
            <Link 
              to="/news"
              className="inline-flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all duration-300 mb-10 animate-fade-in group"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Все новости
            </Link>

            <div className="max-w-4xl">
              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <Calendar className="h-4 w-4 text-accent" />
                  <time dateTime={article.createdAt} className="text-sm text-white/80">{formatDate(article.createdAt)}</time>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <Clock className="h-4 w-4 text-accent" />
                  <span className="text-sm text-white/80">{readingTime} мин чтения</span>
                </div>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-colors"
                >
                  <Share2 className="h-4 w-4 text-accent" />
                  <span className="text-sm text-white/80">Поделиться</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight" style={{ animationDelay: '0.15s' }}>
                {article.title}
              </h1>

              {/* Preview Text */}
              <p className="text-xl lg:text-2xl text-white/70 font-light animate-fade-in leading-relaxed max-w-3xl" style={{ animationDelay: '0.25s' }}>
                {article.previewText}
              </p>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-3 mt-10 animate-fade-in" style={{ animationDelay: '0.35s' }}>
                  <Tag className="h-4 w-4 text-white/40" />
                  {article.tags.map((tag, i) => (
                    <Link 
                      key={i}
                      to={`/news?tag=${encodeURIComponent(tag)}`}
                      className="px-4 py-1.5 text-sm font-medium text-white/90 bg-accent/20 hover:bg-accent/30 rounded-full border border-accent/30 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hero image preloader */}
          {article.previewImage && (
            <img 
              src={article.previewImage} 
              alt="" 
              className="hidden"
              onLoad={() => setImageLoaded(true)}
            />
          )}

          {/* Bottom transition wave */}
          <div className="absolute bottom-0 left-0 right-0 h-24">
            <svg className="absolute bottom-0 w-full h-24" viewBox="0 0 1440 96" fill="none" preserveAspectRatio="none">
              <path 
                d="M0 96L60 90.7C120 85 240 75 360 69.3C480 64 600 64 720 74.7C840 85 960 107 1080 112C1200 117 1320 107 1380 101.3L1440 96V128H0V96Z" 
                fill="hsl(var(--background))"
              />
            </svg>
          </div>
        </section>

        {/* Article Image */}
        {article.previewImage && (
          <section className="relative -mt-12 z-10 pb-8 lg:pb-16">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <div className="aspect-[21/9] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/20 border border-border/30">
                  <img
                    src={article.previewImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoaded(true)}
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section 
          ref={contentRef.ref as React.RefObject<HTMLElement>}
          className="py-16 lg:py-24 bg-[#0a0f1a] relative"
        >
          {/* Subtle side decoration */}
          <div className="absolute left-0 top-1/4 w-1 h-48 bg-gradient-to-b from-transparent via-accent/30 to-transparent hidden lg:block" />
          
          <div className="container mx-auto px-6 lg:px-8">
            <article 
              className="max-w-3xl mx-auto"
              style={{
                opacity: contentRef.isInView ? 1 : 0,
                transform: contentRef.isInView ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div 
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: parseContent(article.content) }}
              />
            </article>
          </div>
        </section>

        {/* Share / CTA Bar */}
        <section className="py-12 lg:py-16 bg-[#0d1219] border-y border-white/[0.06] relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '24px 24px'
            }} />
          </div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <p className="text-xl lg:text-2xl font-bold mb-2 text-white">Нужна консультация по грузоперевозкам?</p>
                <p className="text-zinc-400 lg:text-lg">
                  Свяжитесь с нами для расчёта стоимости доставки
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleShare}
                  className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-accent/30 hover:bg-white/[0.08] transition-all duration-300"
                  aria-label="Поделиться статьёй"
                >
                  <Share2 className="h-5 w-5 text-zinc-300" />
                </button>
                <Button size="lg" className="group h-14 px-8 rounded-2xl" onClick={openApplicationModal}>
                  Связаться
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Other News */}
        {otherNews.length > 0 && (
          <section 
            ref={relatedRef.ref as React.RefObject<HTMLElement>}
            className="py-24 lg:py-32 bg-[#0a0f1a] relative overflow-hidden"
          >
            <div className="container mx-auto px-6 lg:px-8 relative z-10">
              <div 
                className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
                style={{
                  opacity: relatedRef.isInView ? 1 : 0,
                  transform: relatedRef.isInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <span className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                  <Newspaper className="w-4 h-4" />
                  Читайте также
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  Другие новости
                </h2>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {otherNews.map((item, index) => (
                  <article 
                    key={item.id}
                    className="group relative"
                    style={{
                      opacity: relatedRef.isInView ? 1 : 0,
                      transform: relatedRef.isInView ? 'translateY(0)' : 'translateY(40px)',
                      transition: `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                    }}
                    onMouseEnter={() => setHoveredCard(item.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className={`relative h-full rounded-[1.5rem] bg-white/[0.03] border border-white/[0.08] overflow-hidden transition-all duration-500 ${
                      hoveredCard === item.id 
                        ? 'border-accent/40 shadow-2xl shadow-accent/10 -translate-y-3 bg-white/[0.06]' 
                        : 'hover:shadow-xl hover:bg-white/[0.05]'
                    }`}>
                      {/* Card glow effect */}
                      <div 
                        className="absolute -inset-px rounded-[1.5rem] bg-gradient-to-br from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      />
                      
                      {item.previewImage && (
                        <Link to={`/news/${item.slug}`} className="block relative overflow-hidden">
                          <div className="aspect-[16/10] overflow-hidden bg-secondary">
                            <img
                              src={item.previewImage}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                        </Link>
                      )}
                      
                      <div className="relative p-6 lg:p-8 space-y-4">
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
                          <Calendar className="h-4 w-4 text-accent/70" />
                          <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
                        </div>
                        <h3 className="text-xl font-bold line-clamp-2 text-white group-hover:text-accent transition-colors duration-300">
                          <Link to={`/news/${item.slug}`}>
                            {item.title}
                          </Link>
                        </h3>
                        <p className="text-zinc-400 line-clamp-2 leading-relaxed">
                          {item.previewText}
                        </p>
                        <Link 
                          to={`/news/${item.slug}`}
                          className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent/80 transition-colors pt-2 group/link"
                        >
                          <span>Читать статью</span>
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-2" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div 
                className="text-center mt-14"
                style={{
                  opacity: relatedRef.isInView ? 1 : 0,
                  transform: relatedRef.isInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s'
                }}
              >
                <Button variant="outline" size="lg" asChild className="group h-14 px-8 rounded-2xl">
                  <Link to="/news">
                    Все новости
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

                {/* Section transition */}
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
                  <path d="M0 60L1440 60L1440 0C1200 40 960 60 720 60C480 60 240 40 0 0L0 60Z" fill="#0d1219" />
                </svg>
          </section>
        )}

        {/* CTA Section */}
        <section 
          ref={ctaRef.ref as React.RefObject<HTMLElement>}
          className="py-24 lg:py-32 bg-[#0d1219] relative overflow-hidden"
        >
          <div className="container mx-auto px-6 lg:px-8">
            <div 
              className="max-w-5xl mx-auto"
              style={{
                opacity: ctaRef.isInView ? 1 : 0,
                transform: ctaRef.isInView ? 'scale(1)' : 'scale(0.95)',
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="relative p-12 lg:p-20 rounded-[2.5rem] overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#1a1f2e] to-primary" />
                
                {/* Grid pattern */}
                <div 
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                  }}
                />
                
                <div className="relative text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/10 backdrop-blur-sm rounded-full border border-white/10">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-white/80">Бесплатный расчёт</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
                    Готовы начать
                    <br />
                    <span className="text-accent">сотрудничество?</span>
                  </h2>
                  
                  <p className="text-xl lg:text-2xl text-white/70 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                    Оставьте заявку и получите расчёт стоимости доставки в течение часа
                  </p>
                  
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 text-lg px-12 py-8 h-auto rounded-2xl group shadow-2xl shadow-black/20 hover:shadow-white/20 transition-all duration-500"
                    onClick={openApplicationModal}
                  >
                    Оставить заявку
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NewsArticle;
