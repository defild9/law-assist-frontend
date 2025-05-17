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
