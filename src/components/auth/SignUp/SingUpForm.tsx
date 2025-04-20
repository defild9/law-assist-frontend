'use client';

import { useRegister } from '@/hooks/useRegister';
import { signUpSchema, type SignUpData } from '@/libs/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AuthFormLayout } from '../common/AuthFormLayout';
import { AuthHeader } from '../common/AuthHeader';
import { SignUpFields } from './SingUpFields';
import { Button } from '@/components/ui/Button';
import { AuthFooter } from '../common/AuthFooter';
import { Divider } from '../common/Divider';

export function SingUpForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const { mutate: registerUser, isPending } = useRegister({
    onSuccess: () => {
      router.push('/check-email');
    },
    onError: error => {
      setServerError('Something went wrong. Please try again later.');
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: SignUpData) => {
    setServerError(null);
    registerUser(data);
  };

  return (
    <AuthFormLayout>
      <AuthHeader
        title={'Create an account'}
        subtitle={'Enter your information below to create your account'}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SignUpFields register={register} errors={errors} />

        {serverError && <p className="mt-1 text-center text-sm text-red-500">{serverError}</p>}
        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          disabled={isSubmitting}
        >
          {isPending || isPending ? 'Creating account...' : 'Create account'}
        </Button>

        <Divider />

        <AuthFooter
          question="Already have an account?"
          actionText="Sign in"
          actionHref="/sign-in"
        />
      </form>
    </AuthFormLayout>
  );
}
