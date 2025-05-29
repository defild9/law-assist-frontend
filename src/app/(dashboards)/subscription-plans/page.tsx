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
      toast.success('План успішно створено');
    } catch (error) {
      toast.error('Не вдалося створити план');
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
      toast.success('План успішно оновлено');
    } catch (error) {
      toast.error('Не вдалося оновити план');
    }
  };

  const handleDeletePlan = async () => {
    if (!selectedPlan) return;

    try {
      await deleteMutation.mutateAsync(selectedPlan.id);
      setShowDeleteDialog(false);
      setSelectedPlan(null);
      toast.success('План успішно видалено');
    } catch (error) {
      toast.error('Не вдалося видалити план');
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
              <h1 className="text-2xl font-bold">Тарифні плани</h1>
              <p className="text-muted-foreground">Керуйте своїми тарифними планами та цінами</p>
            </div>
          </div>

          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Новий план
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Плани</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Пошук планів..."
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
                    <SelectValue placeholder="Кількість на сторінці" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 на сторінку</SelectItem>
                    <SelectItem value="10">10 на сторінку</SelectItem>
                    <SelectItem value="20">20 на сторінку</SelectItem>
                    <SelectItem value="50">50 на сторінку</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Назва</TableHead>
                      <TableHead>Ціна</TableHead>
                      <TableHead>Можливості</TableHead>
                      <TableHead>Пробний період</TableHead>
                      <TableHead>Дата створення</TableHead>
                      <TableHead>Дії</TableHead>
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
                            Планів не знайдено
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
                              <Badge variant="secondary">{plan.trialPeriodDays} днів</Badge>
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
                  Показано {(currentPage - 1) * itemsPerPage + 1}–
                  {Math.min(currentPage * itemsPerPage, data?.total || 0)} із {data?.total || 0}{' '}
                  планів
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
                    <div className="text-sm font-medium">Сторінка</div>
                    <div className="text-sm font-medium">
                      {currentPage} з {totalPages}
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
              <DialogTitle>
                {selectedPlan ? 'Редагування плану' : 'Створення нового плану'}
              </DialogTitle>
              <DialogDescription>
                {selectedPlan
                  ? 'Оновіть деталі тарифного плану'
                  : 'Додайте новий тарифний план до ваших пропозицій'}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Назва</label>
                <Input
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Введіть назву плану"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Опис</label>
                <Textarea
                  value={formData.description}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Введіть опис плану"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Ціна</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      price: parseFloat(e.target.value),
                    }))
                  }
                  placeholder="Введіть ціну"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Можливості (через кому)</label>
                <Input
                  value={formData.features.join(', ')}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      features: e.target.value.split(',').map(f => f.trim()),
                    }))
                  }
                  placeholder="Введіть можливості"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Пробний період (днів)</label>
                <Input
                  type="number"
                  value={formData.trialPeriodDays || ''}
                  onChange={e =>
                    setFormData(prev => ({
                      ...prev,
                      trialPeriodDays: e.target.value ? parseInt(e.target.value) : undefined,
                    }))
                  }
                  placeholder="Введіть кількість днів"
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
                Скасувати
              </Button>
              <Button
                onClick={selectedPlan ? handleUpdatePlan : handleCreatePlan}
                disabled={!formData.name || !formData.description || formData.price <= 0}
              >
                {selectedPlan ? 'Оновити план' : 'Створити план'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Видалити план</AlertDialogTitle>
              <AlertDialogDescription>
                Ви впевнені, що хочете видалити цей тарифний план? Цю дію неможливо скасувати.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setShowDeleteDialog(false);
                  setSelectedPlan(null);
                }}
              >
                Скасувати
              </AlertDialogCancel>
              <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={handleDeletePlan}>
                Видалити план
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
