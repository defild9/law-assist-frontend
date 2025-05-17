import axiosInstance from '..';
import {
  CreateVideoConsultationDto,
  GetVideoConsultationsResponse,
  UpdateStatusDto,
} from '../types/video-consultation';

export class VideoConsultation {
  public static async getVideoConsultations(
    page?: number,
    limit?: number
  ): Promise<GetVideoConsultationsResponse> {
    const response = await axiosInstance.get(`/video-consultations`, {
      params: { page, limit },
    });
    return response.data;
  }

  public static async createVideoConsultation(createConsultation: CreateVideoConsultationDto) {
    const response = await axiosInstance.post(`/video-consultations`, createConsultation);
    return response.data;
  }

  public static async updateStatus(consultationId: string, updateStatus: UpdateStatusDto) {
    const response = await axiosInstance.patch(
      `/video-consultations/${consultationId}/update-status`,
      updateStatus
    );
    return response.data;
  }

  public static async updateSchedule(consultationId: string, updateSchedule: UpdateStatusDto) {
    const response = await axiosInstance.patch(
      `/video-consultations/${consultationId}/update-schedule`,
      updateSchedule
    );
    return response.data;
  }

  public static async getConsultationByCode(code: string) {
    const response = await axiosInstance.get(`/video-consultations/code/${code}`);
    return response.data;
  }

  public static async checkRoomAvailability(roomId: string) {
    const response = await axiosInstance.get(`/video-consultations/room-availability/${roomId}`);
    return response.data;
  }

  public static async getLawyersAvailability() {
    const response = await axiosInstance.get(`/video-consultations/lawyers/availability`);
    return response.data;
  }
}
