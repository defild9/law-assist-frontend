'use client';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { format } from 'date-fns';
import {
  CreditCard,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { User } from 'lucide-react';
import { useSubscriptions } from '@/hooks/useSubscriptions';

export default function SubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [status, setStatus] = useState<'active' | 'canceled' | 'paused' | 'expired' | undefined>();

  const { data, isLoading } = useSubscriptions({
    page: currentPage,
    limit: itemsPerPage,
    status,
    search: searchQuery,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, data?.totalPages || 1)));
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
              <h1 className="text-2xl font-bold">Підписки</h1>
              <p className="text-muted-foreground">Керуйте підписками користувачів та оплатами</p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Активні підписки</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Пошук за email..."
                    value={searchQuery}
                    onChange={e => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                  />
                </div>
                <Select
                  value={status}
                  onValueChange={value => {
                    setStatus(value === 'all' ? undefined : (value as any));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Фільтр за статусом" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Усі статуси</SelectItem>
                    <SelectItem value="active">Активні</SelectItem>
                    <SelectItem value="canceled">Скасовані</SelectItem>
                    <SelectItem value="paused">Призупинені</SelectItem>
                    <SelectItem value="expired">Протерміновані</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={itemsPerPage.toString()}
                  onValueChange={value => {
                    setItemsPerPage(parseInt(value));
                    setCurrentPage(1);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Кількість на сторінку" />
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
                      <TableHead>Користувач</TableHead>
                      <TableHead>План</TableHead>
                      <TableHead>Статус</TableHead>
                      <TableHead>Дата початку</TableHead>
                      <TableHead>Дата продовження</TableHead>
                      <TableHead>Автооновлення</TableHead>
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
                            Підписок не знайдено
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      data?.data.map(subscription => (
                        <TableRow key={subscription.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarFallback>
                                  <User className="h-4 w-4" />
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{subscription.user.email}</p>
                                <p className="text-sm text-muted-foreground">
                                  {subscription.user.role}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{subscription.plan.name}</p>
                              <p className="text-sm text-muted-foreground">
                                ${subscription.plan.price}/місяць
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className={getStatusColor(subscription.status)}
                            >
                              {subscription.status.charAt(0).toUpperCase() +
                                subscription.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {format(new Date(subscription.startDate), 'MMM d, yyyy')}
                          </TableCell>
                          <TableCell>
                            {subscription.renewalDate
                              ? format(new Date(subscription.renewalDate), 'MMM d, yyyy')
                              : '-'}
                          </TableCell>
                          <TableCell>
                            <Badge variant={subscription.autoRenew ? 'default' : 'secondary'}>
                              {subscription.autoRenew ? 'Так' : 'Ні'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Показано {(currentPage - 1) * itemsPerPage + 1}–
                  {Math.min(currentPage * itemsPerPage, data?.total || 0)} з {data?.total || 0}{' '}
                  підписок
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
                      {currentPage} з {data?.totalPages || 1}
                    </div>
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === (data?.totalPages || 1)}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => goToPage(data?.totalPages || 1)}
                    disabled={currentPage === (data?.totalPages || 1)}
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
