import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  Building2,
  FileText,
  Users,
  Package,
  ClipboardList,
  Leaf,
  UserCircle,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  FolderKanban,
  Receipt,
  Wrench,
  Store,
  FileSpreadsheet,
  FileQuestion,
  Gavel,
  Calculator,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const navigationItems = {
  organization_admin: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Building2, label: 'Buildings', path: '/buildings' },
    { icon: FileText, label: 'Contracts', path: '/contracts' },
    { icon: Wrench, label: 'Work Orders', path: '/work-orders' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: UserCircle, label: 'Tenants', path: '/tenants' },
    { icon: Receipt, label: 'Invoices', path: '/invoices' },
    { icon: Store, label: 'Vendors', path: '/vendors' },
    { icon: Leaf, label: 'Green Projects', path: '/certifications' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: FileSpreadsheet, label: 'BOQs', path: '/boqs' },
    { icon: FileQuestion, label: 'RFQs', path: '/rfqs' },
    { icon: Gavel, label: 'Bids', path: '/bids' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ],
  facility_manager: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Building2, label: 'Buildings', path: '/buildings' },
    { icon: FileText, label: 'Contracts', path: '/contracts' },
    { icon: Wrench, label: 'Work Orders', path: '/work-orders' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: UserCircle, label: 'Tenants', path: '/tenants' },
    { icon: Store, label: 'Vendors', path: '/vendors' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: FileSpreadsheet, label: 'BOQs', path: '/boqs' },
  ],
  green_building_consultant: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: Leaf, label: 'Green Projects', path: '/certifications' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Calculator, label: 'Calculations', path: '/calculations' },
    { icon: Package, label: 'Products', path: '/products' },
  ],
  interior_designer: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: FileSpreadsheet, label: 'BOQs', path: '/boqs' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Package, label: 'Products', path: '/products' },
  ],
  vendor: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Wrench, label: 'Work Orders', path: '/work-orders' },
    { icon: Receipt, label: 'Invoices', path: '/invoices' },
    { icon: FileQuestion, label: 'RFQs', path: '/rfqs' },
    { icon: Gavel, label: 'Bids', path: '/bids' },
    { icon: Package, label: 'Products', path: '/products' },
  ],
  finance_manager: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Receipt, label: 'Invoices', path: '/invoices' },
    { icon: FileText, label: 'Contracts', path: '/contracts' },
    { icon: UserCircle, label: 'Tenants', path: '/tenants' },
    { icon: Building2, label: 'Buildings', path: '/buildings' },
    { icon: FileSpreadsheet, label: 'BOQs', path: '/boqs' },
    { icon: Gavel, label: 'Bids', path: '/bids' },
  ],
  field_technician: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Wrench, label: 'Work Orders', path: '/work-orders' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: FileText, label: 'Documents', path: '/documents' },
  ],
  super_admin: [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Building2, label: 'Buildings', path: '/buildings' },
    { icon: FileText, label: 'Contracts', path: '/contracts' },
    { icon: Wrench, label: 'Work Orders', path: '/work-orders' },
    { icon: Package, label: 'Inventory', path: '/inventory' },
    { icon: FolderKanban, label: 'Projects', path: '/projects' },
    { icon: UserCircle, label: 'Tenants', path: '/tenants' },
    { icon: Receipt, label: 'Invoices', path: '/invoices' },
    { icon: Store, label: 'Vendors', path: '/vendors' },
    { icon: Leaf, label: 'Green Projects', path: '/certifications' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: FileSpreadsheet, label: 'BOQs', path: '/boqs' },
    { icon: FileQuestion, label: 'RFQs', path: '/rfqs' },
    { icon: Gavel, label: 'Bids', path: '/bids' },
    { icon: Package, label: 'Products', path: '/products' },
    { icon: Calculator, label: 'Calculations', path: '/calculations' },
    { icon: Settings, label: 'Platform Settings', path: '/settings' },
  ],
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = user ? navigationItems[user.role] || [] : [];

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen flex w-full bg-background">
      {/* Sidebar */}
      <aside
        className={`sidebar ${
          sidebarOpen ? 'open' : ''
        } md:translate-x-0 w-64 bg-sidebar border-r border-sidebar-border flex flex-col`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
          <Building2 className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-lg">BuildMaintain</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all ${
                      isActive(item.path)
                        ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Menu */}
        <div className="border-t border-sidebar-border p-3">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-sidebar-accent transition-all"
          >
            <UserCircle className="h-5 w-5" />
            <div className="flex-1 text-left">
              <div className="text-sm font-medium">{user?.name}</div>
              <div className="text-xs text-muted-foreground capitalize">
                {user?.role.replace(/_/g, ' ')}
              </div>
            </div>
            <ChevronDown className={`h-4 w-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {userMenuOpen && (
            <div className="mt-2 space-y-1">
              <Link
                to="/profile"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-sidebar-accent transition-all"
              >
                <UserCircle className="h-4 w-4" />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-destructive/10 text-destructive transition-all"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 md:px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-md"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="hidden md:block">
            <h2 className="text-lg font-semibold">
              {navItems.find((item) => isActive(item.path))?.label || 'Dashboard'}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground hidden sm:inline">
              {user?.organizationName || 'Organization'}
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};
