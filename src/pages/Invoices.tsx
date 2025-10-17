import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { invoicesService } from '@/services/invoices.service';
import { Invoice, InvoiceStatus } from '@/types/invoice';
import { formatCurrency, formatDate } from '@/utils/formatters';

const Invoices = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const data = await invoicesService.getAllInvoices();
      setInvoices(data);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch invoices',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedInvoice) return;
    try {
      await invoicesService.deleteInvoice(selectedInvoice.id);
      toast({ title: 'Success', description: 'Invoice deleted successfully' });
      setIsDeleteDialogOpen(false);
      setSelectedInvoice(null);
      fetchInvoices();
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete invoice', variant: 'destructive' });
    }
  };

  const getStatusBadgeColor = (status: InvoiceStatus) => {
    const colors = {
      draft: 'bg-gray-500',
      pending: 'bg-amber-500',
      partially_paid: 'bg-blue-500',
      paid: 'bg-green-500',
      overdue: 'bg-red-500',
    };
    return colors[status];
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.tenantName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="container-custom py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="heading-1">Invoices</h1>
          <p className="text-muted-foreground">Manage invoices and track payments</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create Invoice
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices..."
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
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="partially_paid">Partially Paid</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInvoices.map((invoice) => (
            <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">{invoice.invoiceNumber}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>{invoice.tenantName}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Badge className={getStatusBadgeColor(invoice.status)}>
                    {invoice.status.replace('_', ' ')}
                  </Badge>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Amount</p>
                      <p className="font-medium text-lg">{formatCurrency(invoice.total)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Due Date</p>
                      <p className="font-medium">{formatDate(invoice.dueDate)}</p>
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Billing Period</p>
                    <p className="font-medium">
                      {formatDate(invoice.billingPeriod.startDate)} - {formatDate(invoice.billingPeriod.endDate)}
                    </p>
                  </div>
                  {invoice.payments.length > 0 && (
                    <div className="text-sm">
                      <p className="text-muted-foreground">Paid Amount</p>
                      <p className="font-medium text-green-600">
                        {formatCurrency(invoice.payments.reduce((sum, p) => sum + p.amount, 0))}
                      </p>
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
            <DialogTitle>Delete Invoice</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this invoice? This action cannot be undone.
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

export default Invoices;
