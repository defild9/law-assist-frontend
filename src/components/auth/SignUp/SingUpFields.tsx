import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { Input } from '@/components/ui/Input';

interface SignUpFieldsProps {
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

export const SignUpFields: React.FC<SignUpFieldsProps> = ({ register, errors }) => (
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
      placeholder="Enter your password"
      hasError={!!errors.password}
    />
    {errors.password?.message && (
      <p className="mt-1 text-xs text-red-500">{errors.password.message.toString()}</p>
    )}
  </>
);
