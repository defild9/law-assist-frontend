import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { LaywerProfileService } from '@/api/services/LaywerProfileService';
import {
  CreateLawyerProfileDTO,
  UpdateLawyerProfileDTO,
  LawyerProfile,
} from '@/api/types/lawyer-profile';

export const useCreateLawyerProfile = (
  options?: UseMutationOptions<LawyerProfile, unknown, CreateLawyerProfileDTO>
) => {
  return useMutation<LawyerProfile, unknown, CreateLawyerProfileDTO>({
    mutationFn: data => LaywerProfileService.createLawyerProfile(data),
    ...options,
  });
};

export const useUpdateLawyerProfile = (
  options?: UseMutationOptions<LawyerProfile, unknown, UpdateLawyerProfileDTO>
) => {
  return useMutation<LawyerProfile, unknown, UpdateLawyerProfileDTO>({
    mutationFn: data => LaywerProfileService.updateLawyerProfile(data),
    ...options,
  });
};
