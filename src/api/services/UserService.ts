import axiosInstance from '..';
import {
  ChangeUserRoleResponse,
  FindUsersParams,
  PaginatedUsers,
  UpdateUser,
  UserRole,
} from '../types/user';

export class UserService {
  public static async updateUser(data: UpdateUser) {
    const formData = new FormData();

    if (data.email) {
      formData.append('email', data.email);
    }
    if (data.profile_picture instanceof File) {
      formData.append('profile_picture', data.profile_picture);
    }
    const response = await axiosInstance.patch('/user', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
  public static async forgotPassword(email: string) {
    const response = await axiosInstance.post('/auth/forgot-password', { email });
    return response.data;
  }
  public static async deleteUser(userId?: string) {
    return axiosInstance.delete('/user', {
      data: { userId },
    });
  }

  public static async getUsers(params: FindUsersParams): Promise<PaginatedUsers> {
    const response = await axiosInstance.get<PaginatedUsers>('/user', { params });
    return response.data;
  }

  public static async changeUserRole(
    userId: string,
    role: UserRole
  ): Promise<ChangeUserRoleResponse> {
    const response = await axiosInstance.patch<ChangeUserRoleResponse>(
      `/user/${userId}/change-role`,
      {
        role,
      }
    );
    return response.data;
  }
}
