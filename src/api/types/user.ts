import { IUser } from './auth';

export type UserRole = 'user' | 'admin' | 'lawyer';

export interface LawyerProfile {
  id: string;
  user: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  lawFirm?: string;
  specialization?: string;
  licenseNumber?: string;
  yearsOfExperience?: number;
  bio?: string;
  certifications?: string[];
  languages?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface FindUsersParams {
  role?: UserRole;
  search?: string;
  page?: number;
  limit?: number;
}

export interface UserWithProfile extends IUser {
  lawyerProfile?: LawyerProfile;
}

export interface PaginatedUsers {
  data: UserWithProfile[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export type ChangeUserRoleResponse = UserWithProfile;

export interface UpdateUser {
  email?: string;
  profile_picture?: File | string;
}

export interface UpdateUserResponse {
  statusCode: number;
  message: string;
  data: IUser;
}
