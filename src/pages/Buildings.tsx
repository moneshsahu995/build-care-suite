import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Building as BuildingIcon, Plus, Search, MapPin, Calendar, Layers, User } from 'lucide-react';
import { buildingsService } from '@/services/buildings.service';
import { usersService } from '@/services/users.service';
import { Building as BuildingType } from '@/types/building';
import { User as UserType } from '@/types/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';

const Buildings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [buildings, setBuildings] = useState<BuildingType[]>([]);
  const [filteredBuildings, setFilteredBuildings] = useState<BuildingType[]>([]);
  const [facilityManagers, setFacilityManagers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingManagers, setLoadingManagers] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    },
    area: '',
    type: 'commercial' as const,
    yearBuilt: new Date().getFullYear(),
    floors: 1,
    organizationId: '',
    facilityManagerId: '',
  });

  useEffect(() => {
    fetchBuildings();
    fetchFacilityManagers();
  }, []);

  useEffect(() => {
    filterBuildings();
  }, [searchTerm, filterType, buildings]);

  const fetchBuildings = async () => {
    try {
      setLoading(true);
      const data = await buildingsService.getAllBuildings();
      setBuildings(data);
      setFilteredBuildings(data);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to fetch buildings',
      });
    } finally {
      setLoading(false);
    }
  };

 const fetchFacilityManagers = () => {
    try {
      setLoadingManagers(true);

      // ✅ Get user data from localStorage (stored at http://localhost:8081)
      const storedUser = localStorage.getItem("user");

      if (storedUser) {
        const user = JSON.parse(storedUser);

        // ✅ Ensure valid structure & role check
        if (user.role === "facility_manager") {
          setFacilityManagers([user]); // wrap in array so .map() works
        } else {
          setFacilityManagers([]);
        }
      } else {
        toast({
          variant: "destructive",
          title: "No user found",
          description: "No user data in localStorage.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.message || "Failed to load facility managers from localStorage",
      });
    } finally {
      setLoadingManagers(false);
    }
  };

  useEffect(() => {
    fetchFacilityManagers();
  }, []);


  const filterBuildings = () => {
    let filtered = buildings;

    if (searchTerm) {
      filtered = filtered.filter(
        (building) =>
          building.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          building.address.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          building.address.street.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== 'all') {
      filtered = filtered.filter((building) => building.type === filterType);
    }

    setFilteredBuildings(filtered);
  };

  const handleCreate = async () => {
    try {
      await buildingsService.createBuilding({
        ...formData,
        area: parseFloat(formData.area),
        organizationId: user.organizationId, // Use current user's organization
      });
      toast({
        title: 'Success',
        description: 'Building created successfully',
      });
      setShowCreateDialog(false);
      resetForm();
      fetchBuildings();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to create building',
      });
    }
  };

  const handleEdit = async () => {
    if (!selectedBuilding) return;
    try {
      await buildingsService.updateBuilding(selectedBuilding.id, {
        ...formData,
        area: parseFloat(formData.area),
        organizationId: selectedBuilding.organizationId, // Keep original organization
      });
      toast({
        title: 'Success',
        description: 'Building updated successfully',
      });
      setShowEditDialog(false);
      setSelectedBuilding(null);
      resetForm();
      fetchBuildings();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to update building',
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedBuilding) return;
    try {
      await buildingsService.deleteBuilding(selectedBuilding.id);
      toast({
        title: 'Success',
        description: 'Building deleted successfully',
      });
      setShowDeleteDialog(false);
      setSelectedBuilding(null);
      fetchBuildings();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to delete building',
      });
    }
  };

  const openEditDialog = (building: BuildingType) => {
    setSelectedBuilding(building);
    setFormData({
      name: building.name,
      address: building.address,
      area: building.area.toString(),
      type: building.type as any,
      yearBuilt: building.yearBuilt,
      floors: building.floors,
      organizationId: building.organizationId,
      facilityManagerId: building.facilityManagerId,
    });
    setShowEditDialog(true);
  };

  const openDeleteDialog = (building: BuildingType) => {
    setSelectedBuilding(building);
    setShowDeleteDialog(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: ''
      },
      area: '',
      type: 'commercial',
      yearBuilt: new Date().getFullYear(),
      floors: 1,
      organizationId: user.organizationId || '',
      facilityManagerId: '',
    });
  };

  const getBuildingTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      residential: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
      commercial: 'bg-green-500/10 text-green-700 dark:text-green-400',
      industrial: 'bg-orange-500/10 text-orange-700 dark:text-orange-400',
      mixed_use: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
      institutional: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400',
    };
    return colors[type] || 'bg-gray-500/10 text-gray-700 dark:text-gray-400';
  };

  const getFacilityManagerName = (managerId: string) => {
    const manager = facilityManagers.find(m => m.id === managerId);
    return manager ? `${manager.firstName} ${manager.lastName}` : 'Not assigned';
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
          <h1 className="text-3xl font-bold">Buildings</h1>
          <p className="text-muted-foreground">Manage your building properties</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Building
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Building</DialogTitle>
              <DialogDescription>Add a new building to your portfolio</DialogDescription>
            </DialogHeader>
            
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search buildings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="residential">Residential</SelectItem>
            <SelectItem value="commercial">Commercial</SelectItem>
            <SelectItem value="industrial">Industrial</SelectItem>
            <SelectItem value="mixed_use">Mixed Use</SelectItem>
            <SelectItem value="institutional">Institutional</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Building Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBuildings.map((building) => (
          <Card key={building.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <BuildingIcon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{building.name}</CardTitle>
                </div>
                <Badge className={getBuildingTypeColor(building.type)}>
                  {building.type.replace('_', ' ')}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {building.address.street}, {building.address.city}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-1">
                  <p className="text-muted-foreground">Area</p>
                  <p className="font-medium">{building.area.toLocaleString()} sq ft</p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Floors</p>
                  <p className="font-medium flex items-center gap-1">
                    <Layers className="h-3 w-3" />
                    {building.floors}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Year Built</p>
                  <p className="font-medium flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {building.yearBuilt}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-muted-foreground">Facility Manager</p>
                  <p className="font-medium flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {getFacilityManagerName(building.facilityManagerId)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => navigate(`/buildings/${building.id}`)}>
                  View Details
                </Button>
                <Button variant="outline" size="sm" onClick={() => openEditDialog(building)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => openDeleteDialog(building)}>
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBuildings.length === 0 && (
        <div className="text-center py-12">
          <BuildingIcon className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No buildings found</h3>
          <p className="text-muted-foreground">Get started by creating a new building</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Building</DialogTitle>
            <DialogDescription>Update building information</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Building Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            
            {/* Address fields as separate inputs */}
            <div className="grid gap-2">
              <Label htmlFor="edit-street">Street</Label>
              <Input
                id="edit-street"
                value={formData.address.street}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  address: { ...formData.address, street: e.target.value }
                })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-city">City</Label>
                <Input
                  id="edit-city"
                  value={formData.address.city}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, city: e.target.value }
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-state">State</Label>
                <Input
                  id="edit-state"
                  value={formData.address.state}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, state: e.target.value }
                  })}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-zipCode">Zip Code</Label>
                <Input
                  id="edit-zipCode"
                  value={formData.address.zipCode}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, zipCode: e.target.value }
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-country">Country</Label>
                <Input
                  id="edit-country"
                  value={formData.address.country}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    address: { ...formData.address, country: e.target.value }
                  })}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-area">Area (sq ft)</Label>
                <Input
                  id="edit-area"
                  type="number"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-type">Building Type</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({ ...formData, type: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="mixed_use">Mixed Use</SelectItem>
                    <SelectItem value="institutional">Institutional</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-yearBuilt">Year Built</Label>
                <Input
                  id="edit-yearBuilt"
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => setFormData({ ...formData, yearBuilt: parseInt(e.target.value) })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-floors">Number of Floors</Label>
                <Input
                  id="edit-floors"
                  type="number"
                  value={formData.floors}
                  onChange={(e) => setFormData({ ...formData, floors: parseInt(e.target.value) })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-facilityManager">Facility Manager</Label>
              <Select value={formData.facilityManagerId} onValueChange={(value) => setFormData({ ...formData, facilityManagerId: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a facility manager" />
                </SelectTrigger>
                <SelectContent>
                  {facilityManagers.map((manager) => (
                    <SelectItem key={manager.id} value={manager.id}>
                      {manager.firstName} {manager.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => { setShowEditDialog(false); setSelectedBuilding(null); resetForm(); }}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>Update Building</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{selectedBuilding?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { setShowDeleteDialog(false); setSelectedBuilding(null); }}>
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

export default Buildings;