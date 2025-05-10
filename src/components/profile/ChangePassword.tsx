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
      console.warn('No email found in session.');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>Change your account password.</CardDescription>
      </CardHeader>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" onClick={handleSendReset}>
              Change Password
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Check your email</AlertDialogTitle>
              <AlertDialogDescription>
                We&apos;ve sent a password reset link to your email. Please check your inbox and
                follow the instructions.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default ChangePassword;
