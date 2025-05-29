import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Clock, Calendar, ArrowLeft, HelpCircle } from 'lucide-react';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

interface VideoConsultationPendingProps {
  scheduledAt: string;
}

export default function VideoConsultationPending({ scheduledAt }: VideoConsultationPendingProps) {
  const formattedDate = format(new Date(scheduledAt), "d MMMM yyyy 'о' HH:mm", { locale: uk });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 text-primary animate-pulse" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">Очікування консультації</h1>

          <p className="text-muted-foreground">
            Ваша консультація запланована, але ще не розпочалася. Адвокат приєднається до кімнати у
            зазначений час.
          </p>

          <div className="bg-muted/30 rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Заплановано на {formattedDate}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Будь ласка, приєднайтеся до кімнати за 5 хвилин до початку
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <Link href="/profile" passHref>
            <Button variant="outline" className="w-full gap-2">
              <ArrowLeft className="h-4 w-4" />
              Повернутися до профілю
            </Button>
          </Link>

          <Link href="/support" passHref>
            <Button variant="ghost" className="w-full gap-2">
              <HelpCircle className="h-4 w-4" />
              Отримати допомогу
            </Button>
          </Link>
        </div>

        <div className="pt-4 border-t text-sm text-muted-foreground">
          <p>
            Виникли труднощі з підключенням?{' '}
            <Link href="/support" className="underline underline-offset-4 hover:text-primary">
              Зверніться до служби підтримки
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
