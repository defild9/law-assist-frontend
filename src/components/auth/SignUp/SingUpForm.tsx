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
    onError: () => {
      setServerError('Щось пішло не так. Спробуйте пізніше.');
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
      <AuthHeader title="Створіть акаунт" subtitle="Введіть свої дані нижче, щоб зареєструватися" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SignUpFields register={register} errors={errors} />

        {serverError && <p className="mt-1 text-center text-sm text-red-500">{serverError}</p>}

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          disabled={isSubmitting}
        >
          {isPending || isSubmitting ? 'Створення акаунта...' : 'Створити акаунт'}
        </Button>

        {/* <Divider /> */}

        <AuthFooter question="Вже маєте акаунт?" actionText="Увійти" actionHref="/sign-in" />
      </form>
    </AuthFormLayout>
  );
}
