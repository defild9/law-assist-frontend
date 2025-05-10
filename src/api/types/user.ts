import { IUser } from './auth';

export interface UpdateUser {
  email?: string;
  profile_picture?: File | string;
}

export interface UpdateUserResponse {
  statusCode: number;
  message: string;
  data: IUser;
}
