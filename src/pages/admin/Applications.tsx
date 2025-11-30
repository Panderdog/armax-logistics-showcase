import { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { 
  Search, 
  MoreHorizontal, 
  Eye, 
  Trash2, 
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Mail,
  Phone,
  Building2,
  Package,
  RefreshCw
} from 'lucide-react';

type ApplicationStatus = 'new' | 'in_progress' | 'completed' | 'cancelled';

interface Application {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  company?: string;
  service?: string;
  message: string;
  status: ApplicationStatus;
  createdAt: string;
}

const Applications = () => {
  const { applications, applicationsLoading, refreshApplications, updateApplicationStatus, deleteApplication } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState<Application | null>(null);

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      app.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (app.service?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: ApplicationStatus) => {
    const variants: Record<ApplicationStatus, { className: string; icon: React.ReactNode; label: string }> = {
      new: { 
        className: 'bg-blue-500/10 text-blue-500 border-blue-500/20', 
        icon: <AlertCircle className="h-3 w-3" />,
        label: 'Новая' 
      },
      in_progress: { 
        className: 'bg-amber-500/10 text-amber-500 border-amber-500/20', 
        icon: <Clock className="h-3 w-3" />,
        label: 'В работе' 
      },
      completed: { 
        className: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20', 
        icon: <CheckCircle className="h-3 w-3" />,
        label: 'Завершена' 
      },
      cancelled: { 
        className: 'bg-red-500/10 text-red-500 border-red-500/20', 
        icon: <XCircle className="h-3 w-3" />,
        label: 'Отменена' 
      },
    };
    
    const variant = variants[status];
    return (
      <Badge variant="outline" className={`${variant.className} flex items-center gap-1`}>
        {variant.icon}
        {variant.label}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewApplication = (application: Application) => {
    setSelectedApplication(application);
    setIsViewDialogOpen(true);
  };

  const handleDeleteClick = (application: Application) => {
    setApplicationToDelete(application);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (applicationToDelete) {
      await deleteApplication(applicationToDelete.id);
      setIsDeleteDialogOpen(false);
      setApplicationToDelete(null);
    }
  };

  const handleStatusChange = async (id: string, status: ApplicationStatus) => {
    await updateApplicationStatus(id, status);
  };

  const stats = {
    total: applications.length,
    new: applications.filter(a => a.status === 'new').length,
    inProgress: applications.filter(a => a.status === 'in_progress').length,
    completed: applications.filter(a => a.status === 'completed').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Заявки</h1>
          <p className="text-muted-foreground mt-1">
            Управление заявками клиентов
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refreshApplications()}
          disabled={applicationsLoading}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${applicationsLoading ? 'animate-spin' : ''}`} />
          Обновить
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-secondary/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Всего</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
              <div className="p-2 rounded-lg bg-muted">
                <Package className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-blue-500/5 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-500/80">Новые</p>
                <p className="text-2xl font-bold text-blue-500">{stats.new}</p>
              </div>
              <div className="p-2 rounded-lg bg-blue-500/10">
                <AlertCircle className="h-5 w-5 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-amber-500/80">В работе</p>
                <p className="text-2xl font-bold text-amber-500">{stats.inProgress}</p>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-500/5 border-emerald-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-emerald-500/80">Завершены</p>
                <p className="text-2xl font-bold text-emerald-500">{stats.completed}</p>
              </div>
              <div className="p-2 rounded-lg bg-emerald-500/10">
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по имени, email, компании..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="new">Новые</SelectItem>
                <SelectItem value="in_progress">В работе</SelectItem>
                <SelectItem value="completed">Завершены</SelectItem>
                <SelectItem value="cancelled">Отменены</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Список заявок</CardTitle>
          <CardDescription>
            {filteredApplications.length} из {applications.length} заявок
          </CardDescription>
        </CardHeader>
        <CardContent>
          {applicationsLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-[200px]" />
                    <Skeleton className="h-4 w-[150px]" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Заявок не найдено</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Сообщение</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Дата</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApplications.map((application) => (
                  <TableRow 
                    key={application.id} 
                    className="group cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleViewApplication(application)}
                  >
                    <TableCell>
                      <div className="space-y-1">
                        <p className="font-medium">{application.name}</p>
                        <p className="text-xs text-muted-foreground">{application.email || application.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm line-clamp-1 max-w-[200px]">{application.message}</p>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(application.status)}
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-muted-foreground">
                        {formatDate(application.createdAt)}
                      </p>
                    </TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Действия</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleViewApplication(application)}>
                            <Eye className="h-4 w-4 mr-2" />
                            Просмотреть
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel className="text-xs text-muted-foreground font-normal">
                            Изменить статус
                          </DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => handleStatusChange(application.id, 'new')}>
                            <AlertCircle className="h-4 w-4 mr-2 text-blue-500" />
                            Новая
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(application.id, 'in_progress')}>
                            <Clock className="h-4 w-4 mr-2 text-amber-500" />
                            В работе
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(application.id, 'completed')}>
                            <CheckCircle className="h-4 w-4 mr-2 text-emerald-500" />
                            Завершена
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(application.id, 'cancelled')}>
                            <XCircle className="h-4 w-4 mr-2 text-red-500" />
                            Отменена
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteClick(application)}
                            className="text-destructive focus:text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Удалить
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* View Application Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Детали заявки</DialogTitle>
            <DialogDescription>
              Информация о заявке от {selectedApplication?.createdAt && formatDate(selectedApplication.createdAt)}
            </DialogDescription>
          </DialogHeader>
          {selectedApplication && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Клиент</p>
                    <p className="font-medium">{selectedApplication.name}</p>
                    {selectedApplication.company && (
                      <p className="text-sm text-muted-foreground">{selectedApplication.company}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Телефон</p>
                    <a href={`tel:${selectedApplication.phone}`} className="font-medium text-accent hover:underline">
                      {selectedApplication.phone}
                    </a>
                  </div>
                </div>

                {selectedApplication.email && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a href={`mailto:${selectedApplication.email}`} className="font-medium text-accent hover:underline">
                        {selectedApplication.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Сообщение</p>
                <div className="p-4 rounded-lg bg-secondary/50 text-sm">
                  {selectedApplication.message}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Статус:</span>
                  {getStatusBadge(selectedApplication.status)}
                </div>
                <Select 
                  value={selectedApplication.status} 
                  onValueChange={(value) => {
                    handleStatusChange(selectedApplication.id, value as ApplicationStatus);
                    setSelectedApplication({ ...selectedApplication, status: value as ApplicationStatus });
                  }}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">Новая</SelectItem>
                    <SelectItem value="in_progress">В работе</SelectItem>
                    <SelectItem value="completed">Завершена</SelectItem>
                    <SelectItem value="cancelled">Отменена</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Удалить заявку?</DialogTitle>
            <DialogDescription>
              Это действие нельзя отменить. Заявка от {applicationToDelete?.name} будет удалена навсегда.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Отмена
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Удалить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Applications;
