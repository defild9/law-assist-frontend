import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { UserService } from '@/api/services/UserService';
import { UpdateUser, UpdateUserResponse } from '@/api/types/user';

export const useUpdateUser = (
  options?: UseMutationOptions<UpdateUserResponse, Error, UpdateUser>
) => {
  return useMutation<UpdateUserResponse, Error, UpdateUser, unknown>({
    mutationFn: (data: UpdateUser) => UserService.updateUser(data),
    ...options,
  });
};
