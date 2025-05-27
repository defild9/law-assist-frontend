'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/Dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Badge } from '@/components/ui/Badge';
import {
  CreditCard,
  Search,
  Plus,
  Pencil,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/AlertDialog';
import { SubscriptionPlan, CreateSubscriptionPlanDto } from '@/api/types/subscriptin-plan';
import { Textarea } from '@/components/ui/TextArea';
import {
  useSubscriptionPlans,
  useCreateSubscriptionPlan,
  useUpdateSubscriptionPlan,
  useDeleteSubscriptionPlan,
} from '@/hooks/useSubscriptionPlans';

export default function SubscriptionPlansPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [formData, setFormData] = useState<CreateSubscriptionPlanDto>({
    name: '',
    description: '',
    price: 0,
    features: [],
    trialPeriodDays: undefined,
  });

  const { data, isLoading } = useSubscriptionPlans(searchQuery, currentPage, itemsPerPage);
  const createMutation = useCreateSubscriptionPlan();
  const updateMutation = useUpdateSubscriptionPlan();
  const deleteMutation = useDeleteSubscriptionPlan();

  const handleCreatePlan = async () => {
    try {
      await createMutation.mutateAsync(formData);
      setShowCreateDialog(false);
      setFormData({
        name: '',
        description: '',
        price: 0,
        features: [],
        trialPeriodDays: undefined,
      });
      toast.success('Plan created successfully');
    } catch (error) {
      toast.error('Failed to create plan');
    }
  };

  const handleUpdatePlan = async () => {
    if (!selectedPlan) return;

    try {
      await updateMutation.mutateAsync({
        id: selectedPlan.id,
        data: formData,
      });
      setSelectedPlan(null);
      setFormData({
        name: '',
        description: '',
        price: 0,
        features: [],
        trialPeriodDays: undefined,
      });
      toast.success('Plan updated successfully');
    } catch (error) {
      toast.error('Failed to update plan');
    }
  };

  const handleDeletePlan = async () => {
    if (!selectedPlan) return;

    try {
      await deleteMutation.mutateAsync(selectedPlan.id);
      setShowDeleteDialog(false);
      setSelectedPlan(null);
      toast.success('Plan deleted successfully');
    } catch (error) {
      toast.error('Failed to delete plan');
    }
  };

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan(plan);
    setFormData({
      name: plan.name,
      description: plan.description,
      price: plan.price,
      features: plan.features,
      trialPeriodDays: plan.trialPeriodDays,
    });
  };

  // Calculate pagination
  const totalPages = data?.totalPages || 1;

  // Handle page changes
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Subscription Plans</h1>
              <p className="text-muted-foreground">Manage your subscription plans and pricing</p>
            </div>
          </div>

          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Plan
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Plans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search plans..."
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={value => {
                    setItemsPerPage(parseInt(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Items per page" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 per page</SelectItem>
                    <SelectItem value="10">10 per page</SelectItem>
                    <SelectItem value="20">20 per page</SelectItem>
                    <SelectItem value="50">50 per page</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Features</TableHead>
                      <TableHead>Trial Period</TableHead>
                      <TableHead>Created At</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <div className="flex items-center justify-center py-6">
                            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : data?.data.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6}>
                          <div className="text-center py-6 text-muted-foreground">
                            No plans found
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.data.map(plan => (
                        <TableRow key={plan.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{plan.name}</p>
                              <p className="text-sm text-muted-foreground">{plan.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">${plan.price.toFixed(2)}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-2">
                              {plan.features.map(feature => (
                                <Badge key={feature} variant="secondary">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            {plan.trialPeriodDays ? (
                              <Badge variant="secondary">{plan.trialPeriodDays} days</Badge>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell>{format(new Date(plan.createdAt), 'MMM d, yyyy')}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditPlan(plan)}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-600"
                                onClick={() => {
                                  setSelectedPlan(plan);
                                  setShowDeleteDialog(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, data?.total || 0)} of {data?.total || 0}{' '}
                  plans
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="flex items-center gap-1">
                    <div className="text-sm font-medium">Page</div>
                    <div className="text-sm font-medium">
                      {currentPage} of {totalPages}
                    </div>
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Create/Edit Plan Dialog */}
        <Dialog
          open={showCreateDialog || selectedPlan !== null}
          onOpenChange={open => {
            if (!open) {
              setShowCreateDialog(false);
              setSelectedPlan(null);
              setFormData({
                name: '',
                description: '',
                price: 0,
                features: [],
                trialPeriodDays: undefined,
              });
            }
          }}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedPlan ? 'Edit Plan' : 'Create New Plan'}</DialogTitle>
              <DialogDescription>
                {selectedPlan
                  ? 'Update the subscription plan details'
                  : 'Add a new subscription plan to your offerings'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Name</label>
                <Input
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter plan name"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Enter plan description"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Price</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      price: parseFloat(e.target.value),
                    }))
                  }
                  placeholder="Enter price"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Features (comma-separated)</label>
                <Input
                  value={formData.features.join(', ')}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      features: e.target.value.split(',').map(f => f.trim()),
                    }))
                  }
                  placeholder="Enter features"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Trial Period (days)</label>
                <Input
                  type="number"
                  value={formData.trialPeriodDays || ''}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      trialPeriodDays: e.target.value ? parseInt(e.target.value) : undefined,
                    }))
                  }
                  placeholder="Enter trial period"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateDialog(false);
                  setSelectedPlan(null);
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={selectedPlan ? handleUpdatePlan : handleCreatePlan}
                disabled={!formData.name || !formData.description || formData.price <= 0}
              >
                {selectedPlan ? 'Update Plan' : 'Create Plan'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Plan Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Plan</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this subscription plan? This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setShowDeleteDialog(false);
                  setSelectedPlan(null);
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeletePlan}>
                Delete Plan
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
