import axiosInstance from '..';
import { UpdateUser } from '../types/user';

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
  public static async deleteUser() {
    return axiosInstance.delete('/user');
  }
}
