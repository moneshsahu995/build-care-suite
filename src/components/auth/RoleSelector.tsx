import { UserRole } from '@/types/auth';
import { 
  Building2, 
  Wrench, 
  Leaf, 
  Palette, 
  ShoppingBag, 
  Calculator, 
  HardHat,
  Shield
} from 'lucide-react';

interface RoleSelectorProps {
  selectedRole: UserRole | null;
  onSelectRole: (role: UserRole) => void;
}

const roles: { value: UserRole; label: string; description: string; icon: any }[] = [
  {
    value: 'organization_admin',
    label: 'Organization Admin',
    description: 'Manage organization, users, and settings',
    icon: Shield,
  },
  {
    value: 'facility_manager',
    label: 'Facility Manager',
    description: 'Manage buildings and maintenance',
    icon: Building2,
  },
  {
    value: 'green_building_consultant',
    label: 'Green Building Consultant',
    description: 'Manage certifications and compliance',
    icon: Leaf,
  },
  {
    value: 'interior_designer',
    label: 'Interior Designer',
    description: 'Manage design projects and BOQs',
    icon: Palette,
  },
  {
    value: 'vendor',
    label: 'Vendor',
    description: 'Manage products and bids',
    icon: ShoppingBag,
  },
  {
    value: 'finance_manager',
    label: 'Finance Manager',
    description: 'Manage invoices and payments',
    icon: Calculator,
  },
  {
    value: 'field_technician',
    label: 'Field Technician',
    description: 'Manage work orders and tasks',
    icon: HardHat,
  },
  {
    value: 'super_admin',
    label: 'Super Admin',
    description: 'Platform-wide administration',
    icon: Wrench,
  },
];

export const RoleSelector = ({ selectedRole, onSelectRole }: RoleSelectorProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Select Your Role</h3>
        <p className="text-sm text-muted-foreground">Choose the role that best describes your position</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles.map((role) => {
          const Icon = role.icon;
          return (
            <button
              key={role.value}
              type="button"
              onClick={() => onSelectRole(role.value)}
              className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                selectedRole === role.value
                  ? 'border-primary bg-primary/5 shadow-md'
                  : 'border-border hover:border-primary/50 hover:bg-secondary'
              }`}
            >
              <div className="flex items-start gap-3">
                <Icon className={`h-5 w-5 mt-0.5 ${selectedRole === role.value ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{role.label}</div>
                  <div className="text-xs text-muted-foreground mt-1">{role.description}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
