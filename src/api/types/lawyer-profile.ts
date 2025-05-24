export interface CreateLawyerProfileDTO {
  userId?: string;
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
}

export interface LawyerProfile extends CreateLawyerProfileDTO {
  id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export type UpdateLawyerProfileDTO = CreateLawyerProfileDTO;
