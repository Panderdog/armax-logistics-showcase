import { Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import SEO from '@/components/SEO';
import { useApplicationModal } from '@/contexts/ApplicationModalContext';

const NewsList = () => {
  const { getPublishedNews } = useAdmin();
  const { openApplicationModal } = useApplicationModal();
  const news = getPublishedNews();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Featured news (first one)
  const featuredNews = news[0];
  const otherNews = news.slice(1);

  return (
    <>
      <SEO 
        title="Новости — Armax Logistics"
        description="Актуальные новости компании Armax: новые маршруты, услуги, события в сфере международной логистики и грузоперевозок из Азии."
      />
      
      <div className="min-h-screen bg-[#0B0F18]">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-[url('/images/ship.jpg')] bg-cover bg-center opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F18] via-[#0B0F18]/80 to-transparent" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#F34D1B]/15 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#F34D1B]/10 rounded-full blur-[150px]" />
          
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }}
          />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium bg-white/[0.04] backdrop-blur-sm rounded-xl border border-white/[0.06] animate-fade-in">
                <Newspaper className="w-4 h-4 text-[#F34D1B]" />
                <span className="text-zinc-300">Новости</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 animate-fade-in leading-[1.05] tracking-tight">
                Актуальное
                <br />
                <span className="bg-gradient-to-r from-[#F34D1B] via-orange-400 to-[#F34D1B] bg-clip-text text-transparent">от Armax</span>
              </h1>
              <p className="text-xl lg:text-2xl text-zinc-400 font-light animate-fade-in leading-relaxed max-w-2xl" style={{ animationDelay: '0.15s' }}>
                Следите за последними событиями, новыми маршрутами<br />и развитием компании
              </p>
            </div>
          </div>
        </section>

        {news.length === 0 ? (
          /* Empty State */
          <section className="py-20 lg:py-20 bg-background">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-secondary flex items-center justify-center">
                  <Newspaper className="h-12 w-12 text-muted-foreground/50" />
                </div>
                <h2 className="text-2xl font-bold mb-4">Новостей пока нет</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Скоро здесь появятся актуальные публикации о нашей работе и новых услугах
                </p>
                <Button onClick={openApplicationModal}>
                  Связаться с нами
                </Button>
              </div>
            </div>
          </section>
        ) : (
          <>
            {/* Featured News */}
            {featuredNews && (
              <section className="py-20 lg:py-20 bg-background">
                <div className="container mx-auto px-6 lg:px-8">
                  <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Image */}
                    <Link to={`/news/${featuredNews.slug}`} className="group relative">
                      <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-large">
                        {featuredNews.previewImage ? (
                          <img
                            src={featuredNews.previewImage}
                            alt={featuredNews.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                            <Newspaper className="h-20 w-20 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <span className="inline-block px-4 py-1.5 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                          Последняя новость
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(featuredNews.createdAt)}
                        </span>
                      </div>
                      <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
                        <Link 
                          to={`/news/${featuredNews.slug}`}
                          className="hover:text-accent transition-colors"
                        >
                          {featuredNews.title}
                        </Link>
                      </h2>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        {featuredNews.previewText}
                      </p>
                      {featuredNews.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {featuredNews.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <Button asChild size="lg" className="group mt-4">
                        <Link to={`/news/${featuredNews.slug}`}>
                          Читать полностью
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Other News Grid */}
            {otherNews.length > 0 && (
              <section className="py-20 lg:py-20 bg-secondary/30">
                <div className="container mx-auto px-6 lg:px-8">
                  <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                      Архив
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
                      Все публикации
                    </h2>
                    <p className="text-lg text-muted-foreground font-light">
                      События, обновления и полезная информация
                    </p>
                  </div>

                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {otherNews.map((item, index) => (
                      <article 
                        key={item.id}
                        className="group relative rounded-3xl bg-card border border-border/50 overflow-hidden hover:border-accent/30 hover:shadow-large hover:-translate-y-2 transition-all duration-500 animate-fade-in"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {/* Image */}
                        <Link to={`/news/${item.slug}`} className="block">
                          <div className="aspect-[16/10] overflow-hidden bg-secondary">
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
                          <h3 className="text-xl font-bold leading-tight group-hover:text-accent transition-colors">
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
                              {item.tags.length > 2 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{item.tags.length - 2}
                                </Badge>
                              )}
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
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* CTA Section */}
            <section className="py-20 lg:py-20 bg-background">
              <div className="container mx-auto px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                  <div className="relative p-12 lg:p-16 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary-dark overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
                    
                    <div className="relative text-center">
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
                        Нужна консультация?
                      </h2>
                      <p className="text-xl text-white/80 font-light mb-10 max-w-2xl mx-auto">
                        Расскажите о вашей задаче — мы предложим оптимальное решение по доставке груза
                      </p>
                      <Button
                        size="lg"
                        className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-7 h-auto group"
                        onClick={openApplicationModal}
                      >
                        Связаться с нами
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
};

export default NewsList;
