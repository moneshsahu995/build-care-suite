import { useAuth } from '@/contexts/AuthContext';
import { 
  Building2, 
  ClipboardList, 
  Package, 
  AlertCircle,
  TrendingUp,
  Users,
  FileText 
} from 'lucide-react';

const roleMessages = {
  organization_admin: {
    title: 'Organization Overview',
    description: 'Manage your organization, users, and buildings',
  },
  facility_manager: {
    title: 'Facility Dashboard',
    description: 'Monitor buildings, work orders, and maintenance',
  },
  green_building_consultant: {
    title: 'Certification Dashboard',
    description: 'Track certification projects and compliance',
  },
  interior_designer: {
    title: 'Design Projects',
    description: 'Manage design projects, BOQs, and procurement',
  },
  vendor: {
    title: 'Vendor Portal',
    description: 'Manage your products and respond to RFQs',
  },
  finance_manager: {
    title: 'Financial Overview',
    description: 'Track invoices, payments, and financial reports',
  },
  field_technician: {
    title: 'Work Orders',
    description: 'View and update assigned work orders',
  },
  super_admin: {
    title: 'Platform Administration',
    description: 'Manage platform-wide settings and organizations',
  },
};

export default function Dashboard() {
  const { user } = useAuth();

  const roleInfo = user ? roleMessages[user.role] : null;

  const metrics = [
    {
      icon: Building2,
      label: 'Active Buildings',
      value: '12',
      trend: '+2 this month',
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      icon: ClipboardList,
      label: 'Pending Work Orders',
      value: '24',
      trend: '-5 from last week',
      color: 'bg-orange-500/10 text-orange-600',
    },
    {
      icon: Package,
      label: 'Low Stock Items',
      value: '8',
      trend: 'Needs attention',
      color: 'bg-red-500/10 text-red-600',
    },
    {
      icon: FileText,
      label: 'Active Projects',
      value: '6',
      trend: '+1 this month',
      color: 'bg-green-500/10 text-green-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-accent rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-white/90">{roleInfo?.description}</p>
      </div>

      {/* Metrics Grid */}
      <div className="dashboard-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="metric-card">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p className="text-3xl font-bold">{metric.value}</p>
                <p className="text-xs text-muted-foreground">{metric.trend}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-md hover:bg-secondary transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Work order #WO-{1000 + i} completed</p>
                  <p className="text-xs text-muted-foreground">{i} hour{i > 1 ? 's' : ''} ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-md border border-border hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <ClipboardList className="h-5 w-5 text-primary" />
                <span className="font-medium">Create Work Order</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-md border border-border hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-medium">Add User</span>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-md border border-border hover:bg-secondary transition-colors">
              <div className="flex items-center gap-3">
                <Building2 className="h-5 w-5 text-primary" />
                <span className="font-medium">Register Building</span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex gap-3">
          <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-amber-900 dark:text-amber-100">Attention Required</h4>
            <p className="text-sm text-amber-800 dark:text-amber-200 mt-1">
              8 inventory items are running low. Review and reorder to maintain stock levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
