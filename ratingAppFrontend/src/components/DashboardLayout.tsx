import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Store, 
  LayoutDashboard, 
  Users, 
  Building2, 
  Star, 
  Key, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavItems = () => {
    const baseItems = [
      { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    ];

    if (user?.role === 'ADMIN') {
      return [
        ...baseItems,
        { label: 'Users', path: '/dashboard/users', icon: Users },
        { label: 'Stores', path: '/dashboard/stores', icon: Building2 },
      ];
    }

    if (user?.role === 'USER') {
      return [
        ...baseItems,
        { label: 'Stores', path: '/dashboard/stores', icon: Building2 },
      ];
    }

    if (user?.role === 'STORE_OWNER') {
      return [
        ...baseItems,
        { label: 'Ratings', path: '/dashboard/ratings', icon: Star },
      ];
    }

    return baseItems;
  };

  const navItems = getNavItems();

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-sidebar-border">
        <Store className="w-8 h-8 text-sidebar-primary" />
        <span className="font-bold text-lg text-sidebar-foreground">StoreRate</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-sm',
                isActive
                  ? 'sidebar-item-active'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-4 py-4 border-t border-sidebar-border space-y-1">
        <Link
          to="/change-password"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
        >
          <Key className="w-5 h-5" />
          Change Password
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>

      {/* User info */}
      <div className="px-6 py-4 border-t border-sidebar-border">
        <p className="text-sm font-medium text-sidebar-foreground truncate">{user?.name}</p>
        <p className="text-xs text-sidebar-foreground/60 capitalize">{user?.role?.toLowerCase().replace('_', ' ')}</p>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col bg-sidebar fixed inset-y-0 left-0 z-50">
        <NavContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-primary">
          <Store className="w-6 h-6" />
          <span className="font-bold">StoreRate</span>
        </div>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-sidebar border-sidebar-border">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="pt-16 lg:pt-0">
          {children}
        </div>
      </main>
    </div>
  );
}
