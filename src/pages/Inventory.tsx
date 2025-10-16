import { useState, useEffect } from 'react';
import { Package, Plus, Search, AlertTriangle } from 'lucide-react';
import { inventoryService } from '@/services/inventory.service';
import { InventoryItem } from '@/types/inventory';
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
import { formatCurrency } from '@/utils/formatters';

const Inventory = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
    reorderPoint: '',
    unit: '',
    category: 'electrical' as const,
    buildingId: '',
    location: '',
    purchasePrice: '',
  });

  useEffect(() => {
    fetchItems();
  }, []);

  useEffect(() => {
    filterItems();
  }, [searchTerm, filterCategory, items]);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getAllItems();
      setItems(data);
      setFilteredItems(data);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to fetch inventory items',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter((item) => item.category === filterCategory);
    }

    setFilteredItems(filtered);
  };

  const handleCreate = async () => {
    try {
      await inventoryService.createItem({
        ...formData,
        quantity: parseInt(formData.quantity),
        reorderPoint: parseInt(formData.reorderPoint),
        purchasePrice: parseFloat(formData.purchasePrice),
      });
      toast({
        title: 'Success',
        description: 'Inventory item created successfully',
      });
      setShowCreateDialog(false);
      resetForm();
      fetchItems();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create inventory item',
      });
    }
  };

  const handleEdit = async () => {
    if (!selectedItem) return;
    try {
      await inventoryService.updateItem(selectedItem.id, {
        ...formData,
        quantity: parseInt(formData.quantity),
        reorderPoint: parseInt(formData.reorderPoint),
        purchasePrice: parseFloat(formData.purchasePrice),
      });
      toast({
        title: 'Success',
        description: 'Inventory item updated successfully',
      });
      setShowEditDialog(false);
      setSelectedItem(null);
      resetForm();
      fetchItems();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update inventory item',
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      await inventoryService.deleteItem(selectedItem.id);
      toast({
        title: 'Success',
        description: 'Inventory item deleted successfully',
      });
      setShowDeleteDialog(false);
      setSelectedItem(null);
      fetchItems();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete inventory item',
      });
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      quantity: '',
      reorderPoint: '',
      unit: '',
      category: 'electrical',
      buildingId: '',
      location: '',
      purchasePrice: '',
    });
  };

  const isLowStock = (item: InventoryItem) => item.quantity <= item.reorderPoint;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Inventory Management</h1>
          <p className="text-muted-foreground">Track and manage your inventory items</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" />Add Item</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Inventory Item</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Item Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="grid gap-2">
                  <Label>Quantity</Label>
                  <Input type="number" value={formData.quantity} onChange={(e) => setFormData({ ...formData, quantity: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Reorder Point</Label>
                  <Input type="number" value={formData.reorderPoint} onChange={(e) => setFormData({ ...formData, reorderPoint: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Unit</Label>
                  <Input value={formData.unit} onChange={(e) => setFormData({ ...formData, unit: e.target.value })} placeholder="pcs, kg, etc" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select value={formData.category} onValueChange={(value: any) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                      <SelectItem value="cleaning">Cleaning</SelectItem>
                      <SelectItem value="tools">Tools</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Purchase Price</Label>
                  <Input type="number" value={formData.purchasePrice} onChange={(e) => setFormData({ ...formData, purchasePrice: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Building ID</Label>
                  <Input value={formData.buildingId} onChange={(e) => setFormData({ ...formData, buildingId: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Location</Label>
                  <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => { setShowCreateDialog(false); resetForm(); }}>Cancel</Button>
              <Button onClick={handleCreate}>Create Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search inventory..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-[200px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="electrical">Electrical</SelectItem>
            <SelectItem value="plumbing">Plumbing</SelectItem>
            <SelectItem value="hvac">HVAC</SelectItem>
            <SelectItem value="safety">Safety</SelectItem>
            <SelectItem value="cleaning">Cleaning</SelectItem>
            <SelectItem value="tools">Tools</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className={`hover:shadow-lg transition-shadow ${isLowStock(item) ? 'border-amber-500' : ''}`}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                </div>
                {isLowStock(item) && (
                  <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="h-3 w-3 mr-1" />Low Stock
                  </Badge>
                )}
              </div>
              <CardDescription className="line-clamp-2">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-muted-foreground">Quantity</p><p className="font-medium">{item.quantity} {item.unit}</p></div>
                <div><p className="text-muted-foreground">Reorder Point</p><p className="font-medium">{item.reorderPoint} {item.unit}</p></div>
                <div><p className="text-muted-foreground">Category</p><Badge variant="outline">{item.category}</Badge></div>
                <div><p className="text-muted-foreground">Price</p><p className="font-medium">{formatCurrency(item.purchasePrice)}</p></div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                <Button variant="outline" size="sm" onClick={() => { setSelectedItem(item); setFormData({ name: item.name, description: item.description, quantity: item.quantity.toString(), reorderPoint: item.reorderPoint.toString(), unit: item.unit, category: item.category as any, buildingId: item.buildingId, location: item.location, purchasePrice: item.purchasePrice.toString() }); setShowEditDialog(true); }}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => { setSelectedItem(item); setShowDeleteDialog(true); }}>Delete</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
