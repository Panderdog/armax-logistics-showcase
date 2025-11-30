import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { useAdmin } from '@/contexts/AdminContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';

const NewsCarousel = () => {
  const { getPublishedNews } = useAdmin();
  const news = getPublishedNews().slice(0, 6); // Max 6 news items
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });
  
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Don't render if no news
  if (news.length === 0) return null;

  return (
    <section className="py-20 lg:py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 lg:mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
              Новости
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
              Актуальное от Armax
            </h2>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Navigation buttons */}
            <div className="flex gap-2">
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="p-3 rounded-xl border border-border bg-card hover:bg-secondary hover:border-accent/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Предыдущий слайд"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="p-3 rounded-xl border border-border bg-card hover:bg-secondary hover:border-accent/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                aria-label="Следующий слайд"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            
            {/* View all link */}
            <Button variant="outline" asChild className="hidden sm:flex group">
              <Link to="/news">
                Все новости
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6 lg:gap-8">
            {news.map((item) => (
              <article 
                key={item.id}
                className="flex-shrink-0 w-[85%] sm:w-[45%] lg:w-[32%] group"
              >
                <div className="h-full rounded-3xl bg-card border border-border/50 overflow-hidden hover:border-accent/30 hover:shadow-large transition-all duration-500">
                  {/* Image */}
                  <Link to={`/news/${item.slug}`} className="block">
                    <div className="aspect-[16/10] overflow-hidden bg-secondary relative">
                      {item.previewImage ? (
                        <img
                          src={item.previewImage}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center">
                          <Newspaper className="h-12 w-12 text-muted-foreground/30" />
                        </div>
                      )}
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6 lg:p-8 space-y-4">
                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold leading-tight line-clamp-2 group-hover:text-accent transition-colors">
                      <Link to={`/news/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h3>

                    {/* Preview Text */}
                    <p className="text-muted-foreground line-clamp-2">
                      {item.previewText}
                    </p>

                    {/* Tags */}
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
                        {item.tags.slice(0, 2).map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Read More */}
                    <Link 
                      to={`/news/${item.slug}`}
                      className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors pt-2"
                    >
                      Читать
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Mobile view all button */}
        <div className="mt-10 text-center sm:hidden">
          <Button variant="outline" asChild className="group">
            <Link to="/news">
              Все новости
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;

