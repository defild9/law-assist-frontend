'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/AlertDialog';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';
import { useDeleteUser } from '@/hooks/useDeleteUser';
import { signOut } from 'next-auth/react';

const DeleteAccount = () => {
  const { mutate: deleteUser, isPending } = useDeleteUser({
    onSuccess: () => {
      console.log('Обліковий запис успішно видалено');
      signOut();
    },
    onError: error => {
      console.error('Не вдалося видалити обліковий запис:', error);
    },
  });

  return (
    <Card className="border-destructive">
      <CardHeader>
        <CardTitle className="text-destructive">Видалення облікового запису</CardTitle>
        <CardDescription>
          Незворотне видалення облікового запису та всіх пов’язаних даних.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Після видалення облікового запису ви не зможете його відновити. Будь ласка, переконайтесь.
        </p>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="gap-2" disabled={isPending}>
              <AlertTriangle className="h-4 w-4" />
              Видалити обліковий запис
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
              <AlertDialogDescription>
                Цю дію не можна скасувати. Ваш обліковий запис буде остаточно видалено разом з усіма
                даними.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending}>Скасувати</AlertDialogCancel>
              <AlertDialogAction
                //@ts-ignore
                onClick={() => deleteUser()}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                disabled={isPending}
              >
                Видалити обліковий запис
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default DeleteAccount;
