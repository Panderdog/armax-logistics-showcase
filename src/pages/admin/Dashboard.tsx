import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Newspaper, CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { applications, news } = useAdmin();

  const stats = {
    totalApplications: applications.length,
    newApplications: applications.filter(a => a.status === 'new').length,
    inProgressApplications: applications.filter(a => a.status === 'in_progress').length,
    completedApplications: applications.filter(a => a.status === 'completed').length,
    totalNews: news.length,
    publishedNews: news.filter(n => n.published).length
  };

  const recentApplications = applications.slice(0, 5);
  const recentNews = news.slice(0, 3);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-500';
      case 'in_progress': return 'bg-amber-500/10 text-amber-500';
      case 'completed': return 'bg-emerald-500/10 text-emerald-500';
      case 'cancelled': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'in_progress': return 'В работе';
      case 'completed': return 'Завершена';
      case 'cancelled': return 'Отменена';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Панель управления</h1>
        <p className="text-muted-foreground mt-1">
          Добро пожаловать в административную панель Armax
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Всего заявок
            </CardTitle>
            <FileText className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalApplications}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">+{stats.newApplications}</span> новых
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Новые заявки
            </CardTitle>
            <AlertCircle className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-500">{stats.newApplications}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Требуют внимания
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              В работе
            </CardTitle>
            <Clock className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-500">{stats.inProgressApplications}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Активных заявок
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-medium transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Публикаций
            </CardTitle>
            <Newspaper className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalNews}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-emerald-500 font-medium">{stats.publishedNews}</span> опубликовано
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Последние заявки</CardTitle>
              <CardDescription>Недавно поступившие обращения клиентов</CardDescription>
            </div>
            <Link 
              to="/admin/applications"
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              Все заявки →
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentApplications.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Заявок пока нет
                </p>
              ) : (
                recentApplications.map((app) => (
                  <div 
                    key={app.id} 
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{app.name}</p>
                      <p className="text-xs text-muted-foreground">{app.service}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(app.status)}`}>
                        {getStatusText(app.status)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(app.createdAt)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent News */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg">Последние новости</CardTitle>
              <CardDescription>Недавно добавленные публикации</CardDescription>
            </div>
            <Link 
              to="/admin/news"
              className="text-sm font-medium text-accent hover:text-accent/80 transition-colors"
            >
              Все новости →
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentNews.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  Новостей пока нет
                </p>
              ) : (
                recentNews.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-start justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                  >
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground line-clamp-1">{item.excerpt}</p>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        item.published 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : 'bg-gray-500/10 text-gray-500'
                      }`}>
                        {item.published ? 'Опубл.' : 'Черновик'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link 
              to="/admin/applications"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-secondary/50 transition-all group"
            >
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Обработать заявки</p>
                <p className="text-sm text-muted-foreground">
                  {stats.newApplications} новых заявок
                </p>
              </div>
            </Link>

            <Link 
              to="/admin/news?action=create"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-secondary/50 transition-all group"
            >
              <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                <Newspaper className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Добавить новость</p>
                <p className="text-sm text-muted-foreground">
                  Создать публикацию
                </p>
              </div>
            </Link>

            <Link 
              to="/"
              target="_blank"
              className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-secondary/50 transition-all group"
            >
              <div className="p-3 rounded-lg bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium">Открыть сайт</p>
                <p className="text-sm text-muted-foreground">
                  Предпросмотр сайта
                </p>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
