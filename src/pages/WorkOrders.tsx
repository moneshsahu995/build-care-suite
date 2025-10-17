import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { workOrdersService } from '@/services/workOrders.service';
import { WorkOrder, WorkOrderStatus } from '@/types/workOrder';
import { formatDate } from '@/utils/formatters';

const WorkOrders = () => {
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchWorkOrders();
  }, []);

  const fetchWorkOrders = async () => {
    try {
      const data = await workOrdersService.getAllWorkOrders();
      setWorkOrders(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch work orders',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedWorkOrder) return;
    try {
      await workOrdersService.deleteWorkOrder(selectedWorkOrder.id);
      toast({ title: 'Success', description: 'Work order deleted successfully' });
      setIsDeleteDialogOpen(false);
      setSelectedWorkOrder(null);
      fetchWorkOrders();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete work order', variant: 'destructive' });
    }
  };

  const getStatusBadgeColor = (status: WorkOrderStatus) => {
    const colors = {
      open: 'bg-blue-500',
      in_progress: 'bg-amber-500',
      awaiting_parts: 'bg-purple-500',
      completed: 'bg-green-500',
      closed: 'bg-gray-500',
    };
    return colors[status];
  };

  const filteredWorkOrders = workOrders.filter(wo => {
    const matchesSearch = wo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         wo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || wo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-custom py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="heading-1">Work Orders</h1>
          <p className="text-muted-foreground">Manage work orders and track maintenance tasks</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Work Order
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search work orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="awaiting_parts">Awaiting Parts</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkOrders.map((workOrder) => (
            <Card key={workOrder.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{workOrder.title}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedWorkOrder(workOrder);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription className="line-clamp-2">{workOrder.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge className={getStatusBadgeColor(workOrder.status)}>
                    {workOrder.status.replace('_', ' ')}
                  </Badge>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Priority</p>
                      <p className="font-medium capitalize">{workOrder.priority}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Category</p>
                      <p className="font-medium capitalize">{workOrder.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Scheduled</p>
                      <p className="font-medium">{formatDate(workOrder.scheduledDate)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Location</p>
                      <p className="font-medium">{workOrder.location}</p>
                    </div>
                  </div>
                  {workOrder.assignedToName && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Assigned To</p>
                      <p className="font-medium">{workOrder.assignedToName}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Work Order</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this work order? This action cannot be undone.
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

export default WorkOrders;
