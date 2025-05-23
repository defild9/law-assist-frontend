import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { UserService } from '@/api/services/UserService';
import {
  FindUsersParams,
  PaginatedUsers,
  ChangeUserRoleResponse,
  UserRole,
} from '@/api/types/user';

export const useUsers = (params: FindUsersParams, options?: UseQueryOptions<PaginatedUsers>) => {
  return useQuery<PaginatedUsers>({
    queryKey: ['users', params],
    queryFn: () => UserService.getUsers(params),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useChangeUserRole = (
  options?: UseMutationOptions<ChangeUserRoleResponse, unknown, { userId: string; role: UserRole }>
) => {
  return useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: UserRole }) =>
      UserService.changeUserRole(userId, role),
    ...options,
  });
};
