'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { Scale, CalendarIcon, Clock, User, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Calendar } from '@/components/ui/Calendat';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/Select';
import { Textarea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

import { useLawyersAvailability, useCreateVideoConsultation } from '@/hooks/useVideoConsultation';
import { LawyerAvailability } from '@/api/types/video-consultation';

export default function BookConsultationPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: availabilityData, isLoading: loadingLawyers } = useLawyersAvailability();
  const createConsultation = useCreateVideoConsultation();

  const [selectedLawyer, setSelectedLawyer] = useState<LawyerAvailability | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [notes, setNotes] = useState('');

  useEffect(() => {
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  }, [selectedLawyer]);

  const handleLawyerSelect = (lawyerId: string) => {
    const found = availabilityData?.data.find(a => a.lawyer.id === lawyerId) || null;
    setSelectedLawyer(found);
  };

  const getAvailableTimesForDate = (date: Date) => {
    if (!selectedLawyer) return [];
    return selectedLawyer.availableSlots
      .filter(slot => {
        const d = new Date(slot);
        return (
          d.getFullYear() === date.getFullYear() &&
          d.getMonth() === date.getMonth() &&
          d.getDate() === date.getDate()
        );
      })
      .map(slot => format(new Date(slot), 'HH:mm'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedLawyer || !selectedDate || !selectedTime) {
      toast.error('Будь ласка, виберіть юриста, дату та час');
      return;
    }

    const [h, m] = selectedTime.split(':').map(Number);
    const scheduledAt = new Date(selectedDate);
    scheduledAt.setHours(h, m);

    createConsultation.mutate(
      {
        lawyerId: selectedLawyer.lawyer.id,
        scheduledAt: scheduledAt.toISOString(),
        notes: notes.trim(),
      },
      {
        onSuccess: () => {
          toast.success('Консультацію заброньовано');
          queryClient.invalidateQueries({ queryKey: ['lawyersAvailability'] });
          router.push('/profile');
        },
        onError: () => toast.error('Не вдалося створити запис'),
      }
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Scale className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Запис на юридичну консультацію</h1>
            <p className="text-muted-foreground">Оберіть дату та час відеоконсультації з юристом</p>
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Briefcase className="h-5 w-5" /> Виберіть юриста
            </h2>
            {loadingLawyers ? (
              <p>Завантаження...</p>
            ) : (
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                {availabilityData?.data.map(a => (
                  <button
                    key={a.lawyer.id}
                    type="button"
                    onClick={() => handleLawyerSelect(a.lawyer.id)}
                    className={`p-4 rounded-lg border transition-colors ${
                      selectedLawyer?.lawyer.id === a.lawyer.id
                        ? 'border-primary bg-primary/5'
                        : 'hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback>
                          <User className="h-6 w-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <div className="font-medium">
                          {a.lawyer.profile?.firstName} {a.lawyer.profile?.lastName} |{' '}
                          {a.lawyer.profile?.specialization}
                        </div>
                        <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                          <div className="font-medium">{a.lawyer.profile?.bio}</div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {selectedLawyer && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" /> Виберіть дату та час
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                  disabled={date => getAvailableTimesForDate(date).length === 0}
                />
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Доступний час</span>
                    </div>
                    <Select
                      value={selectedTime}
                      onValueChange={setSelectedTime}
                      disabled={!selectedDate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Оберіть час" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedDate &&
                          getAvailableTimesForDate(selectedDate).map(time => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Додаткові деталі</label>
                    <Textarea
                      value={notes}
                      onChange={e => setNotes(e.target.value)}
                      placeholder="Опишіть суть вашого запиту..."
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {selectedLawyer && selectedDate && selectedTime && (
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-lg font-semibold">Підсумок бронювання</h2>
              <div className="space-y-4 mt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <User className="h-4 w-4" /> Юрист
                  </span>
                  <span>{selectedLawyer.lawyer.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" /> Дата
                  </span>
                  <span>{format(selectedDate, 'd MMMM yyyy')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Час
                  </span>
                  <span>{selectedTime}</span>
                </div>
                <Button type="submit" className="w-full">
                  Підтвердити запис
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </form>
    </div>
  );
}
