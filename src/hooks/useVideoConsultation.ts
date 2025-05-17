import { useQuery, useMutation, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { VideoConsultation } from '@/api/services/VideoConsultation';
import {
  CreateVideoConsultationDto,
  GetConsultationByCodeResponse,
  GetLawyersAvailabilityResponse,
  GetVideoConsultationsResponse,
  RoomAvailabilityResponse,
  UpdateStatusDto,
} from '@/api/types/video-consultation';

export const useVideoConsultations = (
  page?: number,
  limit?: number,
  options?: UseQueryOptions<GetVideoConsultationsResponse>
) => {
  return useQuery<GetVideoConsultationsResponse>({
    queryKey: ['videoConsultations', page, limit],
    queryFn: () => VideoConsultation.getVideoConsultations(page, limit),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};

export const useCreateVideoConsultation = (
  options?: UseMutationOptions<unknown, unknown, CreateVideoConsultationDto>
) => {
  return useMutation({
    mutationFn: (dto: CreateVideoConsultationDto) => VideoConsultation.createVideoConsultation(dto),
    ...options,
  });
};

export const useUpdateConsultationStatus = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    { consultationId: string; updateStatus: UpdateStatusDto }
  >
) => {
  return useMutation({
    mutationFn: ({
      consultationId,
      updateStatus,
    }: {
      consultationId: string;
      updateStatus: UpdateStatusDto;
    }) => VideoConsultation.updateStatus(consultationId, updateStatus),
    ...options,
  });
};

export const useUpdateConsultationSchedule = (
  options?: UseMutationOptions<
    unknown,
    unknown,
    { consultationId: string; updateSchedule: UpdateStatusDto }
  >
) => {
  return useMutation({
    mutationFn: ({
      consultationId,
      updateSchedule,
    }: {
      consultationId: string;
      updateSchedule: UpdateStatusDto;
    }) => VideoConsultation.updateSchedule(consultationId, updateSchedule),
    ...options,
  });
};

export const useConsultationByCode = (
  code: string,
  options?: UseQueryOptions<GetConsultationByCodeResponse>
) => {
  return useQuery<GetConsultationByCodeResponse>({
    queryKey: ['videoConsultationByCode', code],
    queryFn: () => VideoConsultation.getConsultationByCode(code),
    enabled: !!code,
    ...options,
  });
};

export const useRoomAvailability = (
  roomId: string,
  options?: UseQueryOptions<RoomAvailabilityResponse>
) => {
  return useQuery<RoomAvailabilityResponse>({
    queryKey: ['roomAvailability', roomId],
    queryFn: () => VideoConsultation.checkRoomAvailability(roomId),
    enabled: !!roomId,
    ...options,
  });
};

export const useLawyersAvailability = (
  options?: UseQueryOptions<GetLawyersAvailabilityResponse>
) => {
  return useQuery<GetLawyersAvailabilityResponse>({
    queryKey: ['lawyersAvailability'],
    queryFn: () => VideoConsultation.getLawyersAvailability(),
    staleTime: 5 * 60 * 1000,
    ...options,
  });
};
