import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { VideoOff, Calendar, ArrowLeft } from 'lucide-react';

export default function VideoConsultationEnded() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <VideoOff className="w-8 h-8 text-destructive" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">Відеоконсультацію завершено</h1>

          <p className="text-muted-foreground">
            Ця відеоконсультація завершена або більше недоступна. Дякуємо, що скористалися нашим
            сервісом.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Button variant="default" className="w-full">
            <Link
              href="/video-consultation/book"
              className="w-full flex items-center justify-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Записатись на нову консультацію
            </Link>
          </Button>

          <Button variant="outline" className="w-full">
            <Link href="/profile" className="w-full flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Повернутися до профілю
            </Link>
          </Button>
        </div>

        <div className="pt-4 border-t text-sm text-muted-foreground">
          <p>
            Якщо ви вважаєте, що сталася помилка, або вам потрібна допомога,{' '}
            <Link href="/support" className="underline underline-offset-4 hover:text-primary">
              зверніться до підтримки
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
