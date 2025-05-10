import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UserService } from '@/api/services/UserService';

export const useForgotPassword = (options?: UseMutationOptions<unknown, unknown, string>) => {
  return useMutation({
    mutationFn: (email: string) => UserService.forgotPassword(email),
    ...options,
  });
};
