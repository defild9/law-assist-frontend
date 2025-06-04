'use client';

import React, { useState } from 'react';
import {
  useVideoConsultations,
  useUpdateConsultationStatus,
  useUpdateConsultationSchedule,
} from '@/hooks/useVideoConsultation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card';
import { Avatar, AvatarFallback } from '../ui/Avatar';
import { CalendarIcon, Clock, Scale } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { format } from 'date-fns';
import { ConsultationStatus } from '@/api/types/video-consultation';
import EditConsultationModal from './EditConsultationModal';
import { useRouter } from 'next/navigation';

const VideoConsultation = () => {
  const { data: consultationData, isLoading } = useVideoConsultations();
  const { data: session } = useSession();
  const isLawyer = session?.user?.role === 'lawyer';
  const router = useRouter();

  const updateStatus = useUpdateConsultationStatus();
  const updateSchedule = useUpdateConsultationSchedule();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConsultation, setSelectedConsultation] = useState<{
    id: string;
    status: ConsultationStatus;
    scheduledAt: string;
  } | null>(null);

  const openEditModal = (consultation: any) => {
    setSelectedConsultation({
      id: consultation.id,
      status: consultation.status,
      scheduledAt: consultation.scheduledAt,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedConsultation(null);
  };

  const handleSave = (newStatus: ConsultationStatus, newDate: string) => {
    if (!selectedConsultation) return;

    if (newStatus !== selectedConsultation.status) {
      updateStatus.mutate({
        consultationId: selectedConsultation.id,
        updateStatus: { status: newStatus },
      });
    }
    if (newDate !== selectedConsultation.scheduledAt) {
      updateSchedule.mutate({
        consultationId: selectedConsultation.id,
        //@ts-ignore
        updateSchedule: { scheduledAt: newDate },
      });
    }

    closeModal();
  };

  const handeleGoToVideoCall = (roomId: string) => router.push(`/video-consultation/${roomId}`);

  const getStatusColor = (status: string) => {
    switch (status) {
      case ConsultationStatus.UPCOMING:
        return 'bg-blue-100 text-blue-800';
      case ConsultationStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case ConsultationStatus.CANCELED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Consultations</CardTitle>
          <CardDescription>View and manage your scheduled consultations</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="space-y-6">
              {consultationData?.data.map(c => (
                <div key={c.id} className="flex items-start gap-4 p-4 rounded-lg border">
                  <Avatar>
                    <AvatarFallback>
                      <Scale className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">
                        {!isLawyer
                          ? `${c.lawyer.lawyerProfile?.firstName} ${c.lawyer.lawyerProfile?.lastName}`
                          : c.user.email}
                      </h3>
                      <Badge variant="secondary" className={getStatusColor(c.status)}>
                        {c.status.charAt(0).toUpperCase() + c.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="h-4 w-4" />
                        {format(new Date(c.scheduledAt), 'MMM d, yyyy')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {format(new Date(c.scheduledAt), 'h:mm a')}
                      </div>
                    </div>
                  </div>

                  {c.status === ConsultationStatus.UPCOMING && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handeleGoToVideoCall(c.roomCode)}
                        className="shrink-0"
                      >
                        Join Call
                      </Button>
                    </div>
                  )}
                  {isLawyer && (
                    <Button
                      variant="secondary"
                      onClick={() => openEditModal(c)}
                      className="shrink-0"
                    >
                      Edit
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {isLawyer && selectedConsultation && (
        <EditConsultationModal
          open={modalOpen}
          onClose={closeModal}
          consultationId={selectedConsultation.id}
          currentStatus={selectedConsultation.status}
          currentDate={selectedConsultation.scheduledAt}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default VideoConsultation;
