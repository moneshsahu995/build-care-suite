import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { boqsService } from '@/services/boqs.service';
import { BOQ, BOQFormData, BOQStatus, BOQItem } from '@/types/boq';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash2, Download, DollarSign } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const BOQs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<BOQStatus | 'all'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBOQ, setSelectedBOQ] = useState<BOQ | null>(null);
  const [formData, setFormData] = useState<BOQFormData>({
    name: '',
    projectId: '',
    items: [],
    currency: 'INR',
    notes: '',
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: boqsData, isLoading } = useQuery({
    queryKey: ['boqs'],
    queryFn: () => boqsService.getAllBOQs(),
  });

  const createMutation = useMutation({
    mutationFn: boqsService.createBOQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boqs'] });
      toast({ title: 'Success', description: 'BOQ created successfully' });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create BOQ', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BOQFormData> }) => boqsService.updateBOQ(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boqs'] });
      toast({ title: 'Success', description: 'BOQ updated successfully' });
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update BOQ', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: boqsService.deleteBOQ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['boqs'] });
      toast({ title: 'Success', description: 'BOQ deleted successfully' });
      setIsDeleteDialogOpen(false);
      setSelectedBOQ(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete BOQ', variant: 'destructive' });
    },
  });

  const resetForm = () => {
    setFormData({
      name: '',
      projectId: '',
      items: [],
      currency: 'INR',
      notes: '',
    });
    setSelectedBOQ(null);
  };

  const handleCreate = () => {
    createMutation.mutate(formData);
  };

  const handleEdit = () => {
    if (selectedBOQ) {
      updateMutation.mutate({ id: selectedBOQ.id, data: formData });
    }
  };

  const handleDelete = () => {
    if (selectedBOQ) {
      deleteMutation.mutate(selectedBOQ.id);
    }
  };

  const handleExport = async (boq: BOQ) => {
    try {
      const blob = await boqsService.exportBOQ(boq.id);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${boq.name}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast({ title: 'Success', description: 'BOQ exported successfully' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to export BOQ', variant: 'destructive' });
    }
  };

  const openEditDialog = (boq: BOQ) => {
    setSelectedBOQ(boq);
    setFormData({
      name: boq.name,
      projectId: boq.projectId,
      items: boq.items,
      currency: boq.currency,
      notes: boq.notes,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (boq: BOQ) => {
    setSelectedBOQ(boq);
    setIsDeleteDialogOpen(true);
  };

  const getStatusColor = (status: BOQStatus) => {
    const colors = {
      draft: 'bg-muted text-muted-foreground',
      approved: 'bg-green-500/10 text-green-500',
      sent_for_procurement: 'bg-blue-500/10 text-blue-500',
      ordered: 'bg-purple-500/10 text-purple-500',
    };
    return colors[status];
  };

  const filteredBOQs = boqsData?.data.filter((boq) => {
    const matchesSearch = boq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boq.projectName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || boq.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">BOQ Management</h1>
          <p className="text-muted-foreground">Manage Bills of Quantities</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New BOQ
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search BOQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="sent_for_procurement">Sent for Procurement</SelectItem>
            <SelectItem value="ordered">Ordered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-32 bg-muted"></CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredBOQs?.map((boq) => (
            <Card key={boq.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{boq.name}</CardTitle>
                    <CardDescription className="mt-2">
                      {boq.projectName || 'No Project'}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(boq.status)}>
                    {boq.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-bold text-lg flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {boq.total.toLocaleString()} {boq.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items:</span>
                    <span className="font-medium">{boq.items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version:</span>
                    <span className="font-medium">v{boq.version}</span>
                  </div>
                  {boq.approvedDate && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Approved:</span>
                      <span className="font-medium">{new Date(boq.approvedDate).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleExport(boq)}>
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openEditDialog(boq)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => openDeleteDialog(boq)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen || isEditDialogOpen} onOpenChange={(open) => {
        if (!open) {
          setIsCreateDialogOpen(false);
          setIsEditDialogOpen(false);
          resetForm();
        }
      }}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isCreateDialogOpen ? 'New' : 'Edit'} BOQ</DialogTitle>
            <DialogDescription>
              {isCreateDialogOpen ? 'Create a new Bill of Quantities' : 'Update BOQ details'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>BOQ Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter BOQ name"
              />
            </div>
            <div>
              <Label>Project ID</Label>
              <Input
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                placeholder="Enter project ID"
              />
            </div>
            <div>
              <Label>Currency</Label>
              <Select
                value={formData.currency}
                onValueChange={(value) => setFormData({ ...formData, currency: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="INR">INR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="EUR">EUR</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Notes</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Add notes"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreateDialogOpen(false);
              setIsEditDialogOpen(false);
              resetForm();
            }}>
              Cancel
            </Button>
            <Button onClick={isCreateDialogOpen ? handleCreate : handleEdit}>
              {isCreateDialogOpen ? 'Create' : 'Update'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete BOQ</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this BOQ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BOQs;
