import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Newspaper, 
  Package, 
  DollarSign, 
  Files,
  LogOut,
  ChevronRight
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: number;
  disabled?: boolean;
}

const AdminSidebar = () => {
  const location = useLocation();
  const { logout, applications } = useAdmin();

  const newApplicationsCount = applications.filter(app => app.status === 'new').length;

  const navigation: NavItem[] = [
    { name: 'Обзор', href: '/admin', icon: LayoutDashboard },
    { name: 'Заявки', href: '/admin/applications', icon: FileText, badge: newApplicationsCount },
    { name: 'Новости', href: '/admin/news', icon: Newspaper },
    { name: 'Услуги', href: '/admin/services', icon: Package, disabled: true },
    { name: 'Тарифы', href: '/admin/pricing', icon: DollarSign, disabled: true },
    { name: 'Страницы', href: '/admin/pages', icon: Files, disabled: true },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between border-b border-border px-6">
        <Link to="/admin" className="flex items-center">
          <img src="/logo.svg" alt="Armax" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col h-[calc(100vh-4rem)] justify-between p-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                to={item.disabled ? '#' : item.href}
                className={cn(
                  "group flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
                  active 
                    ? "bg-accent text-accent-foreground shadow-sm" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  item.disabled && "opacity-50 cursor-not-allowed pointer-events-none"
                )}
                onClick={(e) => item.disabled && e.preventDefault()}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={cn(
                    "h-5 w-5 transition-colors",
                    active ? "text-accent-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )} />
                  <span>{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && item.badge > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent text-[11px] font-semibold text-accent-foreground px-1.5">
                      {item.badge}
                    </span>
                  )}
                  {item.disabled && (
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
                      Скоро
                    </span>
                  )}
                  {active && !item.disabled && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom section */}
        <div className="space-y-2 border-t border-border pt-4">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
            <span>На сайт</span>
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span>Выйти</span>
          </button>
        </div>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
