import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/Input';

type Props = {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
};

export const SignInFields: React.FC<Props> = ({ register, errors }) => (
  <>
    <Input
      {...register('email')}
      type="email"
      placeholder="name@example.com"
      hasError={!!errors.email}
    />
    {errors.email?.message && (
      <p className="mt-1 text-xs text-red-500">{errors.email.message.toString()}</p>
    )}

    <Input
      {...register('password')}
      type="password"
      placeholder="Введіть пароль"
      hasError={!!errors.password}
    />
    {errors.password?.message && (
      <p className="mt-1 text-xs text-red-500">{errors.password.message.toString()}</p>
    )}
  </>
);
