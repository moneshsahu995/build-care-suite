import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { greenProjectsService } from '@/services/greenProjects.service';
import { GreenProject, GreenProjectFormData, CertificationType, CertificationStatus } from '@/types/greenProject';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Plus, Search, Edit, Trash2, Award, Calendar } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const GreenProjects = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<CertificationStatus | 'all'>('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<GreenProject | null>(null);
  const [formData, setFormData] = useState<GreenProjectFormData>({
    projectId: '',
    certificationType: 'IGBC',
    targetRating: '',
    consultants: [],
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: projectsData, isLoading } = useQuery({
    queryKey: ['greenProjects'],
    queryFn: () => greenProjectsService.getAllGreenProjects(),
  });

  const createMutation = useMutation({
    mutationFn: greenProjectsService.createGreenProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['greenProjects'] });
      toast({ title: 'Success', description: 'Green project created successfully' });
      setIsCreateDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to create green project', variant: 'destructive' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => greenProjectsService.updateGreenProject(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['greenProjects'] });
      toast({ title: 'Success', description: 'Green project updated successfully' });
      setIsEditDialogOpen(false);
      resetForm();
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to update green project', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: greenProjectsService.deleteGreenProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['greenProjects'] });
      toast({ title: 'Success', description: 'Green project deleted successfully' });
      setIsDeleteDialogOpen(false);
      setSelectedProject(null);
    },
    onError: () => {
      toast({ title: 'Error', description: 'Failed to delete green project', variant: 'destructive' });
    },
  });

  const resetForm = () => {
    setFormData({
      projectId: '',
      certificationType: 'IGBC',
      targetRating: '',
      consultants: [],
    });
    setSelectedProject(null);
  };

  const handleCreate = () => {
    createMutation.mutate(formData);
  };

  const handleEdit = () => {
    if (selectedProject) {
      updateMutation.mutate({ id: selectedProject.id, data: formData });
    }
  };

  const handleDelete = () => {
    if (selectedProject) {
      deleteMutation.mutate(selectedProject.id);
    }
  };

  const openEditDialog = (project: GreenProject) => {
    setSelectedProject(project);
    setFormData({
      projectId: project.projectId,
      certificationType: project.certificationType,
      targetRating: project.targetRating,
      consultants: project.consultants,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (project: GreenProject) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const getStatusColor = (status: CertificationStatus) => {
    const colors = {
      draft: 'bg-muted text-muted-foreground',
      submitted: 'bg-blue-500/10 text-blue-500',
      under_review: 'bg-amber-500/10 text-amber-500',
      approved: 'bg-green-500/10 text-green-500',
      rejected: 'bg-red-500/10 text-red-500',
    };
    return colors[status];
  };

  const filteredProjects = projectsData?.data.filter((project) => {
    const matchesSearch = project.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.certificationType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Green Building Certifications</h1>
          <p className="text-muted-foreground">Manage green building certification projects</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Certification
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search certifications..."
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
            <SelectItem value="under_review">Under Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
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
          {filteredProjects?.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{project.projectName || 'Unnamed Project'}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-2">
                      <Award className="h-4 w-4" />
                      {project.certificationType} - {project.targetRating}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status.replace('_', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {project.referenceNumber && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reference:</span>
                      <span className="font-medium">{project.referenceNumber}</span>
                    </div>
                  )}
                  {project.score && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Score:</span>
                      <span className="font-medium">{project.score}</span>
                    </div>
                  )}
                  {project.submissionDate && (
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Submitted:</span>
                      <span className="font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(project.submissionDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Consultants:</span>
                    <span className="font-medium">{project.consultants.length}</span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openEditDialog(project)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => openDeleteDialog(project)}>
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
            <DialogTitle>{isCreateDialogOpen ? 'New' : 'Edit'} Green Certification</DialogTitle>
            <DialogDescription>
              {isCreateDialogOpen ? 'Create a new certification project' : 'Update certification details'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Project ID</Label>
              <Input
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                placeholder="Enter project ID"
              />
            </div>
            <div>
              <Label>Certification Type</Label>
              <Select
                value={formData.certificationType}
                onValueChange={(value: CertificationType) => setFormData({ ...formData, certificationType: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IGBC">IGBC</SelectItem>
                  <SelectItem value="GRIHA">GRIHA</SelectItem>
                  <SelectItem value="LEED">LEED</SelectItem>
                  <SelectItem value="BEE">BEE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Target Rating</Label>
              <Input
                value={formData.targetRating}
                onChange={(e) => setFormData({ ...formData, targetRating: e.target.value })}
                placeholder="e.g., Gold, Platinum"
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
            <AlertDialogTitle>Delete Certification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this certification project? This action cannot be undone.
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

export default GreenProjects;
