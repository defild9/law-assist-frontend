import { VideoConsultation } from '@/api/services/VideoConsultation';
import { ConsultationStatus } from '@/api/types/video-consultation';
import VideoConsultationAccessDeniedPage from '@/components/video-consultation/VideoConsultationAccessDeniedPage';
import VideoConsultationEnded from '@/components/video-consultation/VideoConsultationEnded';
import VideoConsultationNotFound from '@/components/video-consultation/VideoConsultationNotFound';
import VideoConsultationPending from '@/components/video-consultation/VideoConsultationPending';
import VideoRoom from '@/components/video-consultation/VideoRoom';
import { auth } from '@/libs/auth';

export default async function Page({ params }: { params: Promise<{ room: string }> }) {
  const { room } = await params;
  const session = await auth();

  let roomData;

  try {
    roomData = await VideoConsultation.getConsultationByCode(room);
  } catch (error: any) {
    const status = error?.response?.status;

    if (status === 403) {
      return <VideoConsultationAccessDeniedPage />;
    }

    if (status === 404) {
      return <VideoConsultationNotFound />;
    }
  }

  if (!roomData?.consultation) {
    return <VideoConsultationNotFound />;
  }

  const { consultation } = roomData;

  if (consultation.status === ConsultationStatus.COMPLETED) {
    return <VideoConsultationEnded />;
  }

  if (consultation.status === ConsultationStatus.PENDING) {
    return <VideoConsultationPending scheduledAt={consultation.scheduledAt} />;
  }

  // Проверка, что пользователь — участник
  if (session?.id === consultation.user.id || session?.id === consultation.lawyer.id) {
    return <VideoRoom roomId={room} consultation={consultation} />;
  }

  return <VideoConsultationAccessDeniedPage />;
}
