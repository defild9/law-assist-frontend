import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AuthService } from '@/api/services/AuthService';
import { ICredentials } from '@/api/types/auth';

export const useRegister = (options?: UseMutationOptions<unknown, unknown, ICredentials>) => {
  return useMutation({
    mutationFn: (credentials: ICredentials) => AuthService.register(credentials),
    ...options,
  });
};
