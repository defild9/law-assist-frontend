import { LawyerProfile, UserRole } from './user';

export enum ConsultationStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  CANCELED = 'canceled',
  COMPLETED = 'completed',
  UPCOMING = 'upcoming',
}
export interface UserInfo {
  id: string;
  email: string;
  role: UserRole;
  isEmailVerified: boolean;
  lawyerProfile?: LawyerProfile | null;
}

export interface VideoConsultation {
  id: string;
  user: UserInfo;
  lawyer: UserInfo;
  status: ConsultationStatus;
  roomCode: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  scheduledAt: string;
}

export interface GetVideoConsultationsResponse {
  status: string;
  data: VideoConsultation[];
  total: number;
  page: number;
  totalPages: number;
}

export interface CreateVideoConsultationDto {
  lawyerId: string;
  scheduledAt: string;
  notes?: string;
}

export interface UpdateStatusDto {
  status: ConsultationStatus;
}

export interface UpdateScheduleDto {
  scheduledAt: string;
}

export interface GetConsultationByCodeResponse {
  status: string;
  consultation: VideoConsultation;
}

export interface RoomAvailabilityResponse {
  status: string;
  available: boolean;
}

export interface LawyerAvailability {
  lawyer: {
    id: string;
    email: string;
    profile: LawyerProfile | null;
  };
  availableSlots: string[];
}

export interface GetLawyersAvailabilityResponse {
  status: string;
  data: LawyerAvailability[];
}
