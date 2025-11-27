import { useParams, Link, Navigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft, Tag, ArrowRight, Newspaper } from 'lucide-react';
import SEO from '@/components/SEO';

// Simple markdown-like parser for content
function parseContent(content: string): string {
  if (!content) return '';
  
  let html = content
    // Escape HTML
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    // Headers
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-bold mt-10 mb-4 text-foreground">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold mt-12 mb-5 text-foreground">$1</h2>')
    .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold mt-12 mb-6 text-foreground">$1</h1>')
    // Bold and italic
    .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Lists
    .replace(/^- (.+)$/gm, '<li class="ml-6 list-disc text-muted-foreground">$1</li>')
    // Paragraphs (lines that aren't headers or list items)
    .replace(/^(?!<[hl]|<li)(.+)$/gm, '<p class="mb-6 leading-relaxed text-muted-foreground text-lg">$1</p>')
    // Wrap consecutive list items
    .replace(/(<li[^>]*>.*<\/li>\n?)+/g, '<ul class="my-6 space-y-3">$&</ul>')
    // Clean up empty paragraphs
    .replace(/<p class="[^"]*"><\/p>/g, '')
    // Line breaks
    .replace(/\n\n/g, '');

  return html;
}

const NewsArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getNewsBySlug, getPublishedNews } = useAdmin();
  
  const article = slug ? getNewsBySlug(slug) : undefined;
  const allNews = getPublishedNews();
  
  // Get other news (exclude current)
  const otherNews = allNews
    .filter(item => item.slug !== slug)
    .slice(0, 3);

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

  return (
    <>
      <SEO 
        title={`${article.title} — Новости Armax`}
        description={article.previewText}
        image={article.previewImage}
      />
      
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative py-24 lg:py-32 bg-primary overflow-hidden">
          {/* Background effects */}
          {article.previewImage && (
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-20"
              style={{ backgroundImage: `url(${article.previewImage})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/95 to-primary/80" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />
          
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            {/* Back Link */}
            <Link 
              to="/news"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8 animate-fade-in"
            >
              <ArrowLeft className="h-4 w-4" />
              Все новости
            </Link>

            <div className="max-w-4xl">
              {/* Date */}
              <div className="flex items-center gap-3 mb-6 animate-fade-in">
                <div className="flex items-center gap-2 text-white/70">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={article.createdAt}>{formatDate(article.createdAt)}</time>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 animate-fade-in leading-[1.1] tracking-tight">
                {article.title}
              </h1>

              {/* Preview Text */}
              <p className="text-xl lg:text-2xl text-white/80 font-light animate-fade-in leading-relaxed max-w-3xl" style={{ animationDelay: '0.1s' }}>
                {article.previewText}
              </p>

              {/* Tags */}
              {article.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mt-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <Tag className="h-4 w-4 text-white/50" />
                  {article.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 text-sm font-medium text-white/90 bg-white/10 rounded-full border border-white/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Article Image */}
        {article.previewImage && (
          <section className="relative -mt-16 z-10 pb-8 lg:pb-12">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-large border border-border/50">
                  <img
                    src={article.previewImage}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Article Content */}
        <section className="py-16 lg:py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <article className="max-w-3xl mx-auto">
              <div 
                className="prose-custom"
                dangerouslySetInnerHTML={{ __html: parseContent(article.content) }}
              />
            </article>
          </div>
        </section>

        {/* Share / CTA */}
        <section className="py-12 lg:py-16 bg-secondary/30 border-y border-border">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <p className="text-lg font-medium mb-1">Нужна консультация по грузоперевозкам?</p>
                <p className="text-muted-foreground">
                  Свяжитесь с нами для расчёта стоимости доставки
                </p>
              </div>
              <Button asChild size="lg" className="group">
                <Link to="/contacts">
                  Связаться
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Other News */}
        {otherNews.length > 0 && (
          <section className="py-20 lg:py-28 bg-background">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium text-accent bg-accent/10 rounded-full border border-accent/20">
                  Читайте также
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                  Другие новости
                </h2>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                {otherNews.map((item, index) => (
                  <article 
                    key={item.id}
                    className="group relative rounded-3xl bg-card border border-border/50 overflow-hidden hover:border-accent/30 hover:shadow-large hover:-translate-y-2 transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.previewImage && (
                      <Link to={`/news/${item.slug}`} className="block">
                        <div className="aspect-[16/10] overflow-hidden bg-secondary">
                          <img
                            src={item.previewImage}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </Link>
                    )}
                    <div className="p-6 lg:p-8 space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <time dateTime={item.createdAt}>{formatDate(item.createdAt)}</time>
                      </div>
                      <h3 className="text-xl font-bold line-clamp-2 group-hover:text-accent transition-colors">
                        <Link to={`/news/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {item.previewText}
                      </p>
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

              <div className="text-center mt-12">
                <Button variant="outline" size="lg" asChild className="group">
                  <Link to="/news">
                    Все новости
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default NewsArticle;
