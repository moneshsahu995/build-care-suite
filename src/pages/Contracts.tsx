import { useState, useEffect } from 'react';
import { FileText, Plus, Search, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { contractsService } from '@/services/contracts.service';
import { AMCContract } from '@/types/contract';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { formatCurrency, formatDate } from '@/utils/formatters';

const Contracts = () => {
  const { toast } = useToast();
  const [contracts, setContracts] = useState<AMCContract[]>([]);
  const [filteredContracts, setFilteredContracts] = useState<AMCContract[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedContract, setSelectedContract] = useState<AMCContract | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    vendorId: '',
    buildingId: '',
    slaTerms: '',
    value: '',
    renewalReminderDays: 30,
  });

  useEffect(() => {
    fetchContracts();
  }, []);

  useEffect(() => {
    filterContracts();
  }, [searchTerm, filterStatus, contracts]);

  const fetchContracts = async () => {
    try {
      setLoading(true);
      const data = await contractsService.getAllContracts();
      setContracts(data);
      setFilteredContracts(data);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to fetch contracts',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterContracts = () => {
    let filtered = contracts;

    if (searchTerm) {
      filtered = filtered.filter(
        (contract) =>
          contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contract.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter((contract) => contract.status === filterStatus);
    }

    setFilteredContracts(filtered);
  };

  const handleCreate = async () => {
    try {
      await contractsService.createContract({
        ...formData,
        value: parseFloat(formData.value),
      });
      toast({
        title: 'Success',
        description: 'Contract created successfully',
      });
      setShowCreateDialog(false);
      resetForm();
      fetchContracts();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create contract',
      });
    }
  };

  const handleEdit = async () => {
    if (!selectedContract) return;
    try {
      await contractsService.updateContract(selectedContract.id, {
        ...formData,
        value: parseFloat(formData.value),
      });
      toast({
        title: 'Success',
        description: 'Contract updated successfully',
      });
      setShowEditDialog(false);
      setSelectedContract(null);
      resetForm();
      fetchContracts();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update contract',
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedContract) return;
    try {
      await contractsService.deleteContract(selectedContract.id);
      toast({
        title: 'Success',
        description: 'Contract deleted successfully',
      });
      setShowDeleteDialog(false);
      setSelectedContract(null);
      fetchContracts();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete contract',
      });
    }
  };

  const openEditDialog = (contract: AMCContract) => {
    setSelectedContract(contract);
    setFormData({
      title: contract.title,
      description: contract.description,
      startDate: contract.startDate.split('T')[0],
      endDate: contract.endDate.split('T')[0],
      vendorId: contract.vendorId,
      buildingId: contract.buildingId,
      slaTerms: contract.slaTerms,
      value: contract.value.toString(),
      renewalReminderDays: contract.renewalReminderDays,
    });
    setShowEditDialog(true);
  };

  const openDeleteDialog = (contract: AMCContract) => {
    setSelectedContract(contract);
    setShowDeleteDialog(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      vendorId: '',
      buildingId: '',
      slaTerms: '',
      value: '',
      renewalReminderDays: 30,
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      active: 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20',
      expired: 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20',
      pending_renewal: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20',
    };
    return colors[status] || 'bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'expired':
        return <AlertCircle className="h-4 w-4" />;
      case 'pending_renewal':
        return <Clock className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">AMC Contracts</h1>
          <p className="text-muted-foreground">Manage your annual maintenance contracts</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Contract
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Contract</DialogTitle>
              <DialogDescription>Add a new AMC contract</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Contract Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter contract title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter contract description"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="value">Contract Value</Label>
                  <Input
                    id="value"
                    type="number"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="Enter value"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="renewalDays">Renewal Reminder (days)</Label>
                  <Input
                    id="renewalDays"
                    type="number"
                    value={formData.renewalReminderDays}
                    onChange={(e) => setFormData({ ...formData, renewalReminderDays: parseInt(e.target.value) })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slaTerms">SLA Terms</Label>
                <Textarea
                  id="slaTerms"
                  value={formData.slaTerms}
                  onChange={(e) => setFormData({ ...formData, slaTerms: e.target.value })}
                  placeholder="Enter SLA terms and conditions"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="vendorId">Vendor ID</Label>
                  <Input
                    id="vendorId"
                    value={formData.vendorId}
                    onChange={(e) => setFormData({ ...formData, vendorId: e.target.value })}
                    placeholder="Enter vendor ID"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="buildingId">Building ID</Label>
                  <Input
                    id="buildingId"
                    value={formData.buildingId}
                    onChange={(e) => setFormData({ ...formData, buildingId: e.target.value })}
                    placeholder="Enter building ID"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => { setShowCreateDialog(false); resetForm(); }}>
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create Contract</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contracts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="pending_renewal">Pending Renewal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Contract Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContracts.map((contract) => (
          <Card key={contract.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{contract.title}</CardTitle>
                </div>
                <Badge className={getStatusColor(contract.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(contract.status)}
                    {contract.status.replace('_', ' ')}
                  </div>
                </Badge>
              </div>
              <CardDescription className="line-clamp-2">{contract.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Contract Value</p>
                  <p className="font-medium">{formatCurrency(contract.value)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Duration</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(contract.endDate).getFullYear() - new Date(contract.startDate).getFullYear()} year(s)
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Start Date</p>
                  <p className="font-medium">{formatDate(contract.startDate)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">End Date</p>
                  <p className="font-medium">{formatDate(contract.endDate)}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                <Button variant="outline" size="sm" onClick={() => openEditDialog(contract)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(contract)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContracts.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No contracts found</h3>
          <p className="text-muted-foreground">Get started by creating a new contract</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Contract</DialogTitle>
            <DialogDescription>Update contract information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Contract Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-value">Contract Value</Label>
                <Input
                  id="edit-value"
                  type="number"
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-renewalDays">Renewal Reminder (days)</Label>
                <Input
                  id="edit-renewalDays"
                  type="number"
                  value={formData.renewalReminderDays}
                  onChange={(e) => setFormData({ ...formData, renewalReminderDays: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-slaTerms">SLA Terms</Label>
              <Textarea
                id="edit-slaTerms"
                value={formData.slaTerms}
                onChange={(e) => setFormData({ ...formData, slaTerms: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => { setShowEditDialog(false); setSelectedContract(null); resetForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update Contract</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{selectedContract?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { setShowDeleteDialog(false); setSelectedContract(null); }}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Contracts;
