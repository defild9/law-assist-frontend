import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UserService } from '@/api/services/UserService';

export const useDeleteUser = (options?: UseMutationOptions<unknown, unknown, string>) => {
  return useMutation({
    mutationFn: (userId?: string) => UserService.deleteUser(userId),
    ...options,
  });
};
