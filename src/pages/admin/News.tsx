import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAdmin, generateSlug } from '@/contexts/AdminContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Plus,
  Pencil,
  Trash2,
  Eye,
  CheckCircle,
  FileText,
  Calendar,
  ArrowLeft,
  RefreshCw,
  Image as ImageIcon,
  Tag,
  Link as LinkIcon
} from 'lucide-react';

interface NewsFormData {
  title: string;
  slug: string;
  previewText: string;
  previewImage: string;
  content: string;
  tags: string;
  published: boolean;
  meta_title: string;
  meta_description: string;
  og_image: string;
  noindex: boolean;
}

const emptyFormData: NewsFormData = {
  title: '',
  slug: '',
  previewText: '',
  previewImage: '',
  content: '',
  tags: '',
  published: false,
  meta_title: '',
  meta_description: '',
  og_image: '',
  noindex: false
};

const News = () => {
  const { news, newsLoading, addNews, updateNews, deleteNews, refreshNews } = useAdmin();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [isEditorMode, setIsEditorMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<NewsFormData>(emptyFormData);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [newsToDelete, setNewsToDelete] = useState<{ id: string; title: string } | null>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Check URL for create action
  useEffect(() => {
    if (searchParams.get('action') === 'create') {
      handleCreateNew();
      setSearchParams({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const filteredNews = news
    .filter(item => {
      return item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.previewText.toLowerCase().includes(searchQuery.toLowerCase()) ||
             item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const formatDateShort = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData(emptyFormData);
    setSlugManuallyEdited(false);
    setIsEditorMode(true);
  };

  const handleEdit = (id: string) => {
    const item = news.find(n => n.id === id);
    if (item) {
      setEditingId(id);
      setFormData({
        title: item.title,
        slug: item.slug,
        previewText: item.previewText,
        previewImage: item.previewImage || '',
        content: item.content,
        tags: item.tags.join(', '),
        published: item.published,
        meta_title: item.meta_title || '',
        meta_description: item.meta_description || '',
        og_image: item.og_image || '',
        noindex: item.noindex || false
      });
      setSlugManuallyEdited(true);
      setIsEditorMode(true);
    }
  };

  const handleDeleteClick = (id: string, title: string) => {
    setNewsToDelete({ id, title });
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (newsToDelete) {
      setIsSaving(true);
      try {
        await deleteNews(newsToDelete.id);
        toast({
          description: 'Новость удалена',
        });
      } catch (error) {
        toast({
          variant: 'destructive',
          description: 'Ошибка при удалении новости',
        });
      } finally {
        setIsSaving(false);
        setIsDeleteDialogOpen(false);
        setNewsToDelete(null);
      }
    }
  };

  const handleTitleChange = (value: string) => {
    setFormData(prev => ({ ...prev, title: value }));
    if (!slugManuallyEdited) {
      setFormData(prev => ({ ...prev, slug: generateSlug(value) }));
    }
  };

  const handleSlugChange = (value: string) => {
    setSlugManuallyEdited(true);
    setFormData(prev => ({ ...prev, slug: value }));
  };

  const regenerateSlug = () => {
    setFormData(prev => ({ ...prev, slug: generateSlug(prev.title) }));
    setSlugManuallyEdited(false);
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast({
        variant: 'destructive',
        description: 'Введите заголовок новости',
      });
      return;
    }

    if (!formData.previewText.trim()) {
      toast({
        variant: 'destructive',
        description: 'Введите текст превью',
      });
      return;
    }

    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newsData = {
      title: formData.title.trim(),
      slug: formData.slug || generateSlug(formData.title),
      previewText: formData.previewText.trim(),
      previewImage: formData.previewImage.trim() || undefined,
      content: formData.content.trim(),
      tags: tagsArray,
      published: formData.published,
      meta_title: formData.meta_title.trim() || undefined,
      meta_description: formData.meta_description.trim() || undefined,
      og_image: formData.og_image.trim() || undefined,
      noindex: formData.noindex
    };

    setIsSaving(true);
    try {
      if (editingId) {
        await updateNews(editingId, newsData);
        toast({
          description: 'Новость обновлена',
        });
      } else {
        await addNews(newsData);
        toast({
          description: 'Новость создана',
        });
      }

      setIsEditorMode(false);
      setEditingId(null);
      setFormData(emptyFormData);
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Ошибка при сохранении новости',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditorMode(false);
    setEditingId(null);
    setFormData(emptyFormData);
  };

  const stats = {
    total: news.length,
    published: news.filter(n => n.published).length,
    drafts: news.filter(n => !n.published).length
  };

  // Editor Mode
  if (isEditorMode) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleCancel}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {editingId ? 'Редактирование новости' : 'Новая новость'}
            </h1>
            <p className="text-muted-foreground text-sm">
              {editingId ? 'Внесите изменения и сохраните' : 'Заполните форму для создания публикации'}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Editor Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <Label htmlFor="title">Заголовок *</Label>
                  <Input
                    id="title"
                    placeholder="Введите заголовок новости"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                  />
                </div>

                {/* Slug */}
                <div className="space-y-2">
                  <Label htmlFor="slug">URL (slug)</Label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="slug"
                        placeholder="url-novosti"
                        value={formData.slug}
                        onChange={(e) => handleSlugChange(e.target.value)}
                        className="pl-9 font-mono text-sm"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={regenerateSlug}
                      title="Сгенерировать из заголовка"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    /news/{formData.slug || 'url-novosti'}
                  </p>
                </div>

                {/* Preview Text */}
                <div className="space-y-2">
                  <Label htmlFor="previewText">Текст превью *</Label>
                  <Textarea
                    id="previewText"
                    placeholder="Краткое описание для карточки новости (1-2 предложения)"
                    value={formData.previewText}
                    onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
                    rows={3}
                  />
                </div>

                {/* Preview Image */}
                <div className="space-y-2">
                  <Label htmlFor="previewImage">Изображение (URL)</Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="previewImage"
                      placeholder="/images/news-image.jpg или https://..."
                      value={formData.previewImage}
                      onChange={(e) => setFormData({ ...formData, previewImage: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Tags */}
                <div className="space-y-2">
                  <Label htmlFor="tags">Теги</Label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="tags"
                      placeholder="логистика, перевозки, новости (через запятую)"
                      value={formData.tags}
                      onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">SEO и метаданные</CardTitle>
                <CardDescription>
                  Опциональные поля для оптимизации в поисковиках. Если пусто — используются основные поля.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Meta Title */}
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title (SEO заголовок)</Label>
                  <Input
                    id="meta_title"
                    placeholder="Если пусто — будет использован основной заголовок"
                    value={formData.meta_title}
                    onChange={(e) => setFormData({ ...formData, meta_title: e.target.value })}
                    maxLength={70}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.meta_title.length}/70 символов (рекомендуется до 60-70)
                  </p>
                </div>

                {/* Meta Description */}
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description (SEO описание)</Label>
                  <Textarea
                    id="meta_description"
                    placeholder="Если пусто — будет использован текст превью"
                    value={formData.meta_description}
                    onChange={(e) => setFormData({ ...formData, meta_description: e.target.value })}
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.meta_description.length}/160 символов (оптимально ~150-160)
                  </p>
                </div>

                {/* OG Image */}
                <div className="space-y-2">
                  <Label htmlFor="og_image">Open Graph изображение (для соцсетей)</Label>
                  <div className="relative">
                    <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="og_image"
                      placeholder="Если пусто — будет использовано основное изображение"
                      value={formData.og_image}
                      onChange={(e) => setFormData({ ...formData, og_image: e.target.value })}
                      className="pl-9"
                    />
                  </div>
                </div>

                {/* Noindex */}
                <div className="flex items-center gap-3 pt-2">
                  <Switch
                    id="noindex"
                    checked={formData.noindex}
                    onCheckedChange={(checked) => setFormData({ ...formData, noindex: checked })}
                  />
                  <Label htmlFor="noindex" className="cursor-pointer">
                    <span className="font-medium">Запретить индексацию (noindex)</span>
                    <p className="text-xs text-muted-foreground font-normal mt-0.5">
                      Страница не будет индексироваться поисковиками
                    </p>
                  </Label>
                </div>
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Содержимое</CardTitle>
                <CardDescription>
                  Поддерживается Markdown: # заголовки, **жирный**, *курсив*, - списки
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Напишите текст новости...&#10;&#10;# Заголовок&#10;&#10;Текст статьи с **выделением** и *курсивом*.&#10;&#10;## Подзаголовок&#10;&#10;- Пункт списка&#10;- Ещё пункт"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={16}
                  className="font-mono text-sm"
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published" className="cursor-pointer">
                  {formData.published ? 'Опубликовано' : 'Черновик'}
                </Label>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                  Отмена
                </Button>
                <Button onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Сохранение...
                    </>
                  ) : (
                    editingId ? 'Сохранить изменения' : 'Создать новость'
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Предпросмотр
                </CardTitle>
                <CardDescription>Как будет выглядеть карточка</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border bg-card overflow-hidden">
                  {formData.previewImage && (
                    <div className="aspect-video bg-secondary overflow-hidden">
                      <img
                        src={formData.previewImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  )}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {formatDate(new Date().toISOString())}
                    </div>
                    <h3 className="font-semibold line-clamp-2">
                      {formData.title || 'Заголовок новости'}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3">
                      {formData.previewText || 'Текст превью будет отображаться здесь...'}
                    </p>
                    {formData.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {formData.tags.split(',').slice(0, 3).map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag.trim()}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">Статус</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {formData.published ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">Будет опубликовано</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <span className="text-muted-foreground">Черновик</span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // List Mode
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Новости</h1>
          <p className="text-muted-foreground mt-1">
            Управление публикациями
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshNews} disabled={newsLoading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${newsLoading ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
          <Button onClick={handleCreateNew}>
            <Plus className="h-4 w-4 mr-2" />
            Создать новость
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-secondary/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-600">Опубликовано</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.published}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500/50" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-600">Черновики</p>
                <p className="text-2xl font-bold text-amber-600">{stats.drafts}</p>
              </div>
              <Pencil className="h-8 w-8 text-amber-500/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по заголовку, тексту или тегам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Список новостей</CardTitle>
          <CardDescription>
            {filteredNews.length} из {news.length} публикаций
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'Новостей не найдено' : 'Новостей пока нет'}
              </p>
              {!searchQuery && (
                <Button onClick={handleCreateNew} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Создать первую новость
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[45%]">Заголовок</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Теги</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.map((item) => (
                  <TableRow key={item.id} className="group">
                    <TableCell>
                      <div className="flex items-start gap-3">
                        {item.previewImage && (
                          <div className="w-16 h-12 rounded bg-secondary overflow-hidden flex-shrink-0">
                            <img
                              src={item.previewImage}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <p className="font-medium line-clamp-1">{item.title}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                            /news/{item.slug}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={item.published
                          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                        }
                      >
                        {item.published ? 'Опубликовано' : 'Черновик'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
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
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">
                        {formatDateShort(item.createdAt)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEdit(item.id)}
                        >
                          <Pencil className="h-4 w-4 mr-1" />
                          Редактировать
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteClick(item.id, item.title)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить новость?</DialogTitle>
            <DialogDescription>
              Это действие нельзя отменить. Новость «{newsToDelete?.title}» будет удалена навсегда.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isSaving}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isSaving}>
              {isSaving ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Удаление...
                </>
              ) : (
                'Удалить'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default News;
