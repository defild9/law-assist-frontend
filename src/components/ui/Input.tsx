import { cn } from '@/libs/utils';
import { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', hasError, ...props }, ref) => (
    <input
      ref={ref}
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md px-3 py-2 text-sm ' +
          'border focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50',
        hasError
          ? 'border-red-500 focus:border-gray-300 focus:ring-red-500'
          : 'border-gray-300 focus:border-primary focus:ring-primary',
        className
      )}
      {...props}
    />
  )
);
Input.displayName = 'Input';

export { Input };
