import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Tenant</DialogTitle>
            <DialogDescription>Add a new tenant to the system</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Tenant Name *</Label>
              <Input value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter tenant name" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Email *</Label>
                <Input value={formData.contact?.email || ''} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact as any, email: e.target.value } })} placeholder="Enter email" />
              </div>
              <div className="grid gap-2">
                <Label>Phone *</Label>
                <Input value={formData.contact?.phone || ''} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact as any, phone: e.target.value } })} placeholder="Enter phone" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Building ID *</Label>
                <Input value={formData.buildingId || ''} onChange={(e) => setFormData({ ...formData, buildingId: e.target.value })} placeholder="Enter building ID" />
              </div>
              <div className="grid gap-2">
                <Label>Unit *</Label>
                <Input value={formData.unit || ''} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} placeholder="e.g., A-101" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Area (sq ft) *</Label>
              <Input type="number" value={formData.area || ''} onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })} placeholder="Enter area" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Lease Start Date *</Label>
                <Input type="date" value={formData.leaseDetails?.startDate || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, startDate: e.target.value } })} />
              </div>
              <div className="grid gap-2">
                <Label>Lease End Date *</Label>
                <Input type="date" value={formData.leaseDetails?.endDate || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, endDate: e.target.value } })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Monthly Rent *</Label>
                <Input type="number" value={formData.leaseDetails?.monthlyRent || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, monthlyRent: Number(e.target.value) } })} placeholder="Enter rent" />
              </div>
              <div className="grid gap-2">
                <Label>Security Deposit *</Label>
                <Input type="number" value={formData.leaseDetails?.securityDeposit || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, securityDeposit: Number(e.target.value) } })} placeholder="Enter deposit" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Escalation Rate (%) *</Label>
                <Input type="number" value={formData.leaseDetails?.escalationRate || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, escalationRate: Number(e.target.value) } })} placeholder="e.g., 5" />
              </div>
              <div className="grid gap-2">
                <Label>Renewal Terms *</Label>
                <Input value={formData.leaseDetails?.renewalTerms || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, renewalTerms: e.target.value } })} placeholder="e.g., 11 months notice" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Lease Terms *</Label>
              <Textarea value={formData.leaseDetails?.terms || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, terms: e.target.value } })} placeholder="Enter lease terms" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleCreate}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Tenant</DialogTitle>
            <DialogDescription>Update tenant information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Tenant Name *</Label>
              <Input value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Email *</Label>
                <Input value={formData.contact?.email || ''} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact as any, email: e.target.value } })} />
              </div>
              <div className="grid gap-2">
                <Label>Phone *</Label>
                <Input value={formData.contact?.phone || ''} onChange={(e) => setFormData({ ...formData, contact: { ...formData.contact as any, phone: e.target.value } })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Unit *</Label>
                <Input value={formData.unit || ''} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Area (sq ft) *</Label>
                <Input type="number" value={formData.area || ''} onChange={(e) => setFormData({ ...formData, area: Number(e.target.value) })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Lease Start Date *</Label>
                <Input type="date" value={formData.leaseDetails?.startDate || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, startDate: e.target.value } })} />
              </div>
              <div className="grid gap-2">
                <Label>Lease End Date *</Label>
                <Input type="date" value={formData.leaseDetails?.endDate || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, endDate: e.target.value } })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Monthly Rent *</Label>
                <Input type="number" value={formData.leaseDetails?.monthlyRent || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, monthlyRent: Number(e.target.value) } })} />
              </div>
              <div className="grid gap-2">
                <Label>Security Deposit *</Label>
                <Input type="number" value={formData.leaseDetails?.securityDeposit || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, securityDeposit: Number(e.target.value) } })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Escalation Rate (%) *</Label>
                <Input type="number" value={formData.leaseDetails?.escalationRate || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, escalationRate: Number(e.target.value) } })} />
              </div>
              <div className="grid gap-2">
                <Label>Renewal Terms *</Label>
                <Input value={formData.leaseDetails?.renewalTerms || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, renewalTerms: e.target.value } })} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Lease Terms *</Label>
              <Textarea value={formData.leaseDetails?.terms || ''} onChange={(e) => setFormData({ ...formData, leaseDetails: { ...formData.leaseDetails as any, terms: e.target.value } })} rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
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
