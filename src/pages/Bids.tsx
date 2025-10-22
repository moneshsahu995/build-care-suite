import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { bidsService } from '@/services/bids.service';
import { Bid, BidFormData, BidStatus } from '@/types/bid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash2, DollarSign, Star } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const Bids = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<BidStatus | 'all'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBid, setSelectedBid] = useState<Bid | null>(null);
  const [formData, setFormData] = useState<BidFormData>({
    rfqId: '',
    amount: 0,
    currency: 'INR',
    validityPeriod: 30,
    items: [],
    technicalProposal: '',
    deliveryTimeline: '',
    terms: '',
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: bidsData, isLoading } = useQuery({
    queryKey: ['bids'],
    queryFn: () => bidsService.getAllBids(),
  });

  const createMutation = useMutation({
    mutationFn: bidsService.createBid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bids'] });
      toast({ title: 'Success', description: 'Bid created successfully' });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create bid', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<BidFormData> }) => bidsService.updateBid(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bids'] });
      toast({ title: 'Success', description: 'Bid updated successfully' });
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update bid', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: bidsService.deleteBid,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bids'] });
      toast({ title: 'Success', description: 'Bid deleted successfully' });
      setIsDeleteDialogOpen(false);
      setSelectedBid(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete bid', variant: 'destructive' });
    },
  });

  const resetForm = () => {
    setFormData({
      rfqId: '',
      amount: 0,
      currency: 'INR',
      validityPeriod: 30,
      items: [],
      technicalProposal: '',
      deliveryTimeline: '',
      terms: '',
    });
    setSelectedBid(null);
  };

  const handleCreate = () => {
    createMutation.mutate(formData);
  };

  const handleEdit = () => {
    if (selectedBid) {
      updateMutation.mutate({ id: selectedBid.id, data: formData });
    }
  };

  const handleDelete = () => {
    if (selectedBid) {
      deleteMutation.mutate(selectedBid.id);
    }
  };

  const openEditDialog = (bid: Bid) => {
    setSelectedBid(bid);
    setFormData({
      rfqId: bid.rfqId,
      amount: bid.amount,
      currency: bid.currency,
      validityPeriod: bid.validityPeriod,
      items: bid.items,
      technicalProposal: bid.technicalProposal,
      deliveryTimeline: bid.deliveryTimeline,
      terms: bid.terms,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (bid: Bid) => {
    setSelectedBid(bid);
    setIsDeleteDialogOpen(true);
  };

  const getStatusColor = (status: BidStatus) => {
    const colors = {
      draft: 'bg-muted text-muted-foreground',
      submitted: 'bg-blue-500/10 text-blue-500',
      under_evaluation: 'bg-amber-500/10 text-amber-500',
      selected: 'bg-green-500/10 text-green-500',
      rejected: 'bg-red-500/10 text-red-500',
    };
    return colors[status];
  };

  const filteredBids = bidsData?.data.filter((bid) => {
    const matchesSearch = bid.rfqTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bid.vendorName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || bid.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Bid Management</h1>
          <p className="text-muted-foreground">Manage vendor bids and quotations</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Bid
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bids..."
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
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="under_evaluation">Under Evaluation</SelectItem>
            <SelectItem value="selected">Selected</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
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
          {filteredBids?.map((bid) => (
            <Card key={bid.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{bid.rfqTitle || 'No RFQ'}</CardTitle>
                    <CardDescription className="mt-2">
                      {bid.vendorName || 'Unknown Vendor'}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(bid.status)}>
                    {bid.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Amount:</span>
                    <span className="font-bold text-lg flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      {bid.amount.toLocaleString()} {bid.currency}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Validity:</span>
                    <span className="font-medium">{bid.validityPeriod} days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Items:</span>
                    <span className="font-medium">{bid.items.length}</span>
                  </div>
                  {bid.evaluation && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Score:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                        {bid.evaluation.score}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Submitted:</span>
                    <span className="font-medium">{new Date(bid.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(bid)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openDeleteDialog(bid)}>
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
            <DialogTitle>{isCreateDialogOpen ? 'New' : 'Edit'} Bid</DialogTitle>
            <DialogDescription>
              {isCreateDialogOpen ? 'Submit a new bid' : 'Update bid details'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>RFQ ID</Label>
              <Input
                value={formData.rfqId}
                onChange={(e) => setFormData({ ...formData, rfqId: e.target.value })}
                placeholder="Enter RFQ ID"
              />
            </div>
            <div>
              <Label>Amount</Label>
              <Input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                placeholder="Enter bid amount"
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
              <Label>Validity Period (days)</Label>
              <Input
                type="number"
                value={formData.validityPeriod}
                onChange={(e) => setFormData({ ...formData, validityPeriod: parseInt(e.target.value) })}
              />
            </div>
            <div>
              <Label>Technical Proposal</Label>
              <Textarea
                value={formData.technicalProposal}
                onChange={(e) => setFormData({ ...formData, technicalProposal: e.target.value })}
                placeholder="Enter technical proposal"
                rows={3}
              />
            </div>
            <div>
              <Label>Delivery Timeline</Label>
              <Input
                value={formData.deliveryTimeline}
                onChange={(e) => setFormData({ ...formData, deliveryTimeline: e.target.value })}
                placeholder="e.g., 30 days"
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
            <AlertDialogTitle>Delete Bid</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this bid? This action cannot be undone.
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

export default Bids;
