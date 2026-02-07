import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Newspaper, Sparkles, X } from 'lucide-react';
import SEO from '@/components/SEO';
import { useApplicationModal } from '@/contexts/ApplicationModalContext';
import CTABlock from '@/components/CTABlock';
import { useInView } from '@/hooks/useInView';

const NewsList = () => {
  const { getPublishedNews, newsLoading } = useAdmin();
  const { openApplicationModal } = useApplicationModal();
  const news = getPublishedNews();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Animation refs
  const heroRef = useInView({ threshold: 0.1 });
  const featuredRef = useInView({ threshold: 0.15 });
  const gridRef = useInView({ threshold: 0.1 });
  const ctaRef = useInView({ threshold: 0.2 });

  // Ref for scrolling to news section
  const newsSectionRef = useRef<HTMLElement>(null);

  // Handle filter selection with smooth scroll
  const handleTagSelect = (tag: string | null) => {
    // Toggle filter: if clicking the same tag, deselect it
    setSelectedTag(selectedTag === tag ? null : tag);
    if (newsSectionRef.current) {
      const headerHeight = 80; // Approximate header height
      const offsetTop = newsSectionRef.current.offsetTop - headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Main category tags to show
  const mainTags = ['Новости', 'ВЭД', 'Китай', 'Логистика', 'Таможня'];
  
  // Filter news by tag
  const filteredNews = news.filter(item => {
    const matchesTag = selectedTag ? item.tags.includes(selectedTag) : true;
    return matchesTag;
  });

  // Featured news (first one)
  const featuredNews = filteredNews[0];
  const otherNews = filteredNews.slice(1);

  return (
    <>
      <SEO 
        title="Новости — Armax Logistics"
        description="Актуальные новости компании Armax: новые маршруты, услуги, события в сфере международной логистики и грузоперевозок из Азии."
        canonicalUrl="/news/"
      />
      
      {/* Loading State */}
      {newsLoading ? (
        <div className="min-h-screen bg-[#0B0F18] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-accent/30 border-t-accent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-zinc-400 text-lg">Загрузка новостей...</p>
          </div>
        </div>
      ) : (
      <div className="min-h-screen bg-[#0B0F18] overflow-hidden">
        {/* Hero Section */}
        <section 
          ref={heroRef.ref as React.RefObject<HTMLElement>}
          className="relative py-28 lg:py-40 overflow-hidden"
        >
          {/* Layered background effects */}
          <div className="absolute inset-0">
            {/* Base gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F18] via-[#0F1520] to-[#0B0F18]" />
            
            {/* Subtle image overlay */}
            <div className="absolute inset-0 bg-[url('/images/news-hero.webp')] bg-cover bg-center opacity-[0.2]" />
            
            {/* Noise texture */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
              }}
            />
            
            {/* Grid pattern */}
            <div 
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
              }}
            />

            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F18] via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18]/80 via-transparent to-[#0B0F18]/60" />
          </div>
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div 
              className="max-w-5xl"
              style={{
                opacity: heroRef.isInView ? 1 : 0,
                transform: heroRef.isInView ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              {/* Badge */}
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] animate-fade-in"
              >
                <Newspaper className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-300">Новости</span>
              </div>

              {/* Title */}
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.05] tracking-tight"
                style={{
                  opacity: heroRef.isInView ? 1 : 0,
                  transform: heroRef.isInView ? 'translateY(0)' : 'translateY(30px)',
                  transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
                }}
              >
                Новости
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent bg-[length:200%_100%] animate-[shimmer_3s_linear_infinite]">
                    от Armax
                  </span>
                </span>
              </h1>

              {/* Subtitle */}
              <p 
                className="text-xl lg:text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl"
                style={{
                  opacity: heroRef.isInView ? 1 : 0,
                  transform: heroRef.isInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.35s'
                }}
              >
                Следите за последними событиями в мировой логистике и&nbsp;развитием компании
              </p>

              {/* Category Tags */}
              <div 
                className="mt-10"
                style={{
                  opacity: heroRef.isInView ? 1 : 0,
                  transform: heroRef.isInView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.5s'
                }}
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-medium text-zinc-400">Категории:</span>
                  
                  {mainTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagSelect(tag)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedTag === tag 
                          ? 'bg-accent text-white shadow-lg shadow-accent/25' 
                          : 'bg-white/[0.06] hover:bg-white/[0.10] text-zinc-300 hover:text-white border border-white/[0.08] hover:border-white/[0.15]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}

                  {/* Clear Filter */}
                  {selectedTag && (
                    <button
                      onClick={() => setSelectedTag(null)}
                      className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-zinc-400 hover:text-white flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Сбросить
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom transition wave */}
          <div className="absolute bottom-0 left-0 right-0 h-32">
            <svg className="absolute bottom-0 w-full h-32" viewBox="0 0 1440 128" fill="none" preserveAspectRatio="none">
              <path 
                d="M0 128L48 122.7C96 117 192 107 288 101.3C384 96 480 96 576 106.7C672 117 768 139 864 144C960 149 1056 139 1152 122.7C1248 107 1344 85 1392 74.7L1440 64V192H1392C1344 192 1248 192 1152 192C1056 192 960 192 864 192C768 192 672 192 576 192C480 192 384 192 288 192C192 192 96 192 48 192H0V128Z" 
                fill="#0a0f1a"
              />
            </svg>
          </div>
        </section>

        {news.length === 0 ? (
          /* Empty State */
          <section className="py-24 lg:py-32 bg-[#0a0f1a]">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="text-center py-20">
                <div className="w-32 h-32 mx-auto mb-10 rounded-[2rem] bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center border border-accent/10">
                  <Newspaper className="h-16 w-16 text-zinc-500" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">Новостей пока нет</h2>
                <p className="text-xl text-zinc-400 mb-10 max-w-lg mx-auto">
                  Скоро здесь появятся актуальные публикации о нашей работе и новых услугах
                </p>
                <Button onClick={openApplicationModal} size="lg" className="group">
                  Связаться с нами
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Featured News */}
            {featuredNews && (
              <section 
                ref={(el) => {
                  (featuredRef.ref as React.MutableRefObject<HTMLElement | null>).current = el;
                  (newsSectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
                }}
                className="py-20 lg:py-28 bg-[#0a0f1a] relative overflow-hidden"
              >
                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                  <div 
                    className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center"
                    style={{
                      opacity: featuredRef.isInView ? 1 : 0,
                      transform: featuredRef.isInView ? 'translateY(0)' : 'translateY(50px)',
                      transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    {/* Image - Large Featured */}
                    <Link 
                      to={`/news/${featuredNews.slug}`} 
                      className="lg:col-span-7 group relative"
                      onMouseEnter={() => setHoveredCard(featuredNews.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl shadow-black/20">
                        {/* Glow effect on hover */}
                        <div 
                          className="absolute -inset-4 bg-accent/20 rounded-[2.5rem] blur-3xl transition-opacity duration-700"
                          style={{ opacity: hoveredCard === featuredNews.id ? 0.5 : 0 }}
                        />
                        
                        <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                          {featuredNews.previewImage ? (
                            <img
                              src={featuredNews.previewImage}
                              alt={featuredNews.title}
                              className="w-full h-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-accent/20 via-primary/30 to-primary/20 flex items-center justify-center">
                              <Newspaper className="h-24 w-24 text-muted-foreground/20" />
                            </div>
                          )}
                          
                          {/* Overlay gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                          
                          {/* Featured badge */}
                          <div className="absolute top-6 left-6 px-4 py-2 bg-accent text-white text-sm font-semibold rounded-full shadow-lg">
                            <span className="flex items-center gap-2">
                              <Sparkles className="w-3.5 h-3.5" />
                              Главная новость
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    {/* Content */}
                    <div 
                      className="lg:col-span-5 space-y-6"
                      style={{
                        opacity: featuredRef.isInView ? 1 : 0,
                        transform: featuredRef.isInView ? 'translateX(0)' : 'translateX(30px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
                      }}
                    >
                      {/* Date and read time */}
                      <div className="flex items-center gap-4 text-zinc-400">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-accent" />
                          <span className="text-sm">{formatDate(featuredNews.createdAt)}</span>
                        </div>
                        <div className="w-1 h-1 rounded-full bg-zinc-500" />
                        <span className="text-sm">5 мин чтения</span>
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight leading-[1.1] text-white">
                        <Link 
                          to={`/news/${featuredNews.slug}`}
                          className="hover:text-accent transition-colors duration-300"
                        >
                          {featuredNews.title}
                        </Link>
                      </h2>

                      {/* Preview text */}
                      <p className="text-lg lg:text-xl text-zinc-400 leading-relaxed">
                        {featuredNews.previewText}
                      </p>

                      {/* Tags */}
                      {featuredNews.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 overflow-hidden">
                          {featuredNews.tags.map((tag, i) => (
                            <span
                              key={i} 
                              className="text-sm px-4 py-1.5 rounded-full bg-white/[0.06] text-zinc-300 border border-white/[0.08] hover:bg-accent/20 hover:text-accent hover:border-accent/30 cursor-pointer transition-colors whitespace-nowrap"
                              onClick={() => handleTagSelect(tag)}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* CTA Button */}
                      <Button asChild size="lg" className="group mt-4 h-14 px-8 text-base rounded-2xl">
                        <Link to={`/news/${featuredNews.slug}`}>
                          Читать полностью
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Section transition - diagonal cut */}
                <div className="absolute -bottom-1 left-0 right-0 h-20 bg-[#0d1219]" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }} />
              </section>
            )}

            {/* News Grid */}
            {otherNews.length > 0 && (
              <section 
                ref={gridRef.ref as React.RefObject<HTMLElement>}
                className="py-24 lg:py-32 bg-[#0d1219] relative"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-[0.02]">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: '32px 32px'
                  }} />
                </div>

                <div className="container mx-auto px-6 lg:px-8 relative z-10">
                  {/* Section header */}
                  <div 
                    className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
                    style={{
                      opacity: gridRef.isInView ? 1 : 0,
                      transform: gridRef.isInView ? 'translateY(0)' : 'translateY(30px)',
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <span className="inline-flex items-center gap-2 px-5 py-2 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                      <Newspaper className="w-4 h-4" />
                      Архив публикаций
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                      Все новости
                    </h2>
                    <p className="text-lg lg:text-xl text-zinc-400 font-light">
                      События, обновления и полезная информация о логистике
                    </p>
                  </div>

                  {/* Masonry-style grid */}
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {otherNews.map((item, index) => (
                      <article 
                        key={item.id}
                        className="group relative"
                        style={{
                          opacity: gridRef.isInView ? 1 : 0,
                          transform: gridRef.isInView ? 'translateY(0)' : 'translateY(40px)',
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
                          
                          {/* Image */}
                          <Link to={`/news/${item.slug}`} className="block relative overflow-hidden">
                            <div className="aspect-[16/10] overflow-hidden bg-secondary">
                              {item.previewImage ? (
                                <img
                                  src={item.previewImage}
                                  alt={item.title}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                                  <Newspaper className="h-12 w-12 text-muted-foreground/20" />
                                </div>
                              )}
                              
                              {/* Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                          </Link>

                          {/* Content */}
                          <div className="relative p-6 lg:p-8 space-y-4">
                            {/* Date */}
                            <div className="flex items-center gap-2 text-sm text-zinc-500">
                              <Calendar className="h-4 w-4 text-accent/70" />
                              <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl lg:text-2xl font-bold leading-tight text-white transition-colors duration-300 group-hover:text-accent">
                              <Link to={`/news/${item.slug}`}>
                                {item.title}
                              </Link>
                            </h3>

                            {/* Preview Text */}
                            <p className="text-zinc-400 line-clamp-2 leading-relaxed">
                              {item.previewText}
                            </p>

                            {/* Tags */}
                            {item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-2 overflow-hidden">
                                {item.tags.slice(0, 2).map((tag, i) => (
                                  <Badge 
                                    key={i} 
                                    className="text-xs px-3 py-1 rounded-full bg-white/[0.06] text-zinc-300 border border-white/[0.08] transition-colors hover:bg-accent/10 hover:text-accent hover:border-accent/20 cursor-pointer whitespace-nowrap"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      handleTagSelect(tag);
                                    }}
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                                {item.tags.length > 2 && (
                                  <Badge className="text-xs px-3 py-1 rounded-full bg-white/[0.06] text-zinc-300 border border-white/[0.08] whitespace-nowrap">
                                    +{item.tags.length - 2}
                                  </Badge>
                                )}
                              </div>
                            )}

                            {/* Read More */}
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
                </div>

                {/* Section transition - curved */}
                <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 1440 60" fill="none" preserveAspectRatio="none">
                  <path d="M0 60L1440 60L1440 0C1200 40 960 60 720 60C480 60 240 40 0 0L0 60Z" fill="#0a0f1a" />
                </svg>
              </section>
            )}

            {/* CTA Section */}
            <section 
              ref={ctaRef.ref as React.RefObject<HTMLElement>}
              className="py-24 lg:py-32 bg-[#0a0f1a] relative overflow-hidden"
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
                  <CTABlock
                    icon={Sparkles}
                    title={
                      <>
                        <span className="text-white">Нужна консультация </span>
                        <span className="text-accent">по логистике?</span>
                      </>
                    }
                    subtitle="Расскажите о вашей задаче — мы предложим оптимальное решение по доставке груза"
                    buttons={[
                      {
                        text: "Связаться с нами",
                        variant: "primary",
                      },
                    ]}
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </div>
      )}
    </>
  );
};

export default NewsList;
