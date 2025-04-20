import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthService } from '@/api/services/AuthService';

export const useVerifyEmail = (options?: UseMutationOptions<unknown, unknown, string>) => {
  return useMutation({
    mutationFn: (token: string) => AuthService.VerifyEmail(token),
    ...options,
  });
};
