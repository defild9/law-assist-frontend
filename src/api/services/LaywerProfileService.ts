import axiosInstance from '..';
import {
  CreateLawyerProfileDTO,
  LawyerProfile,
  UpdateLawyerProfileDTO,
} from '../types/lawyer-profile';

export class LaywerProfileService {
  public static async createLawyerProfile(
    CreateLawyerProfileDTO: CreateLawyerProfileDTO
  ): Promise<LawyerProfile> {
    const response = await axiosInstance.post('/lawyer/profile', CreateLawyerProfileDTO);

    return response.data;
  }

  public static async updateLawyerProfile(
    updateLawyerProfile: UpdateLawyerProfileDTO
  ): Promise<LawyerProfile> {
    const response = await axiosInstance.put('/lawyer/profile', updateLawyerProfile);
    return response.data;
  }
}
