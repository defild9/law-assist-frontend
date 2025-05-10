import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UserService } from '@/api/services/UserService';

export const useDeleteUser = (options?: UseMutationOptions<unknown, unknown, void>) => {
  return useMutation({
    mutationFn: () => UserService.deleteUser(),
    ...options,
  });
};
