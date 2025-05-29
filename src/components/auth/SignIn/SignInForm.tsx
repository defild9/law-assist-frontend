'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { signInSchema, type SignInData } from '@/libs/validation/auth';
import { AuthFormLayout } from '../common/AuthFormLayout';
import { AuthHeader } from '../common/AuthHeader';
import { Divider } from '../common/Divider';
import { AuthFooter } from '../common/AuthFooter';
import { SignInFields } from './SignInFields';
import { Button } from '@/components/ui/Button';

export function SignInForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: SignInData) => {
    setServerError(null);
    const res = await signIn('credentials', { redirect: false, ...data });
    if (res?.error) setServerError('Щось пішло не так! Спробуйте пізніше.');
    else router.push('/chat');
  };

  return (
    <AuthFormLayout>
      <AuthHeader
        title="З поверненням"
        subtitle="Введіть свою електронну пошту, щоб увійти до акаунта"
        hideOnDesktop
      />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <SignInFields register={register} errors={errors} />

        {serverError && <p className="mt-1 text-center text-sm text-red-500">{serverError}</p>}

        <Button
          type="submit"
          className="w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Вхід...' : 'Увійти'}
        </Button>

        <Divider />

        <AuthFooter
          question="Ще не маєте акаунта?"
          actionText="Зареєструватися"
          actionHref="/sign-up"
        />
      </form>
    </AuthFormLayout>
  );
}
