import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { tenantsService } from '@/services/tenants.service';
import { Tenant, TenantFormData } from '@/types/tenant';
import { formatCurrency, formatDate } from '@/utils/formatters';

const Tenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null);
  const [formData, setFormData] = useState<Partial<TenantFormData>>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const data = await tenantsService.getAllTenants();
      setTenants(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch tenants',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      await tenantsService.createTenant(formData as TenantFormData);
      toast({ title: 'Success', description: 'Tenant created successfully' });
      setIsCreateDialogOpen(false);
      setFormData({});
      fetchTenants();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to create tenant', variant: 'destructive' });
    }
  };

  const handleEdit = async () => {
    if (!selectedTenant) return;
    try {
      await tenantsService.updateTenant(selectedTenant.id, formData);
      toast({ title: 'Success', description: 'Tenant updated successfully' });
      setIsEditDialogOpen(false);
      setSelectedTenant(null);
      setFormData({});
      fetchTenants();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update tenant', variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    if (!selectedTenant) return;
    try {
      await tenantsService.deleteTenant(selectedTenant.id);
      toast({ title: 'Success', description: 'Tenant deleted successfully' });
      setIsDeleteDialogOpen(false);
      setSelectedTenant(null);
      fetchTenants();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete tenant', variant: 'destructive' });
    }
  };

  const filteredTenants = tenants.filter(tenant =>
    tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-custom py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="heading-1">Tenants</h1>
          <p className="text-muted-foreground">Manage tenant information and lease details</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Tenant
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tenants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenants.map((tenant) => (
            <Card key={tenant.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{tenant.name}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedTenant(tenant);
                        setFormData(tenant);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedTenant(tenant);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{tenant.contact.email}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Unit</p>
                      <p className="font-medium">{tenant.unit}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Area</p>
                      <p className="font-medium">{tenant.area} sq ft</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Phone</p>
                      <p className="font-medium">{tenant.contact.phone}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Monthly Rent</p>
                      <p className="font-medium">{formatCurrency(tenant.leaseDetails.monthlyRent)}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Lease Period</p>
                    <p className="font-medium">
                      {formatDate(tenant.leaseDetails.startDate)} - {formatDate(tenant.leaseDetails.endDate)}
                    </p>
                  </div>
                  {tenant.buildingName && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Building</p>
                      <p className="font-medium">{tenant.buildingName}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit/Delete Dialogs - Similar to other modules */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Tenant</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this tenant? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tenants;
