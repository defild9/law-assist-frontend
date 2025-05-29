'use client';

import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../ui/AlertDialog';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Button } from '../ui/Button';
import { useSession } from 'next-auth/react';
import { useForgotPassword } from '@/hooks/useForgotPassword';

const ChangePassword = () => {
  const { data: session } = useSession();
  const { mutate: sendResetLink } = useForgotPassword();

  const handleSendReset = () => {
    const email = session?.user?.email;
    if (email) {
      sendResetLink(email);
    } else {
      console.warn('Email не знайдено в сесії.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Змінити пароль</CardTitle>
        <CardDescription>
          Отримайте посилання для скидання паролю на електронну пошту.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" onClick={handleSendReset}>
              Змінити пароль
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Перевірте пошту</AlertDialogTitle>
              <AlertDialogDescription>
                Ми надіслали вам посилання для скидання паролю. Перевірте свою скриньку та
                дотримуйтесь інструкцій.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>Гаразд</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ChangePassword;
