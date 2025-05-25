import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Clock, Calendar, ArrowLeft, HelpCircle } from 'lucide-react';
import { format } from 'date-fns';

interface VideoConsultationPendingProps {
  scheduledAt: string;
}

export default function VideoConsultationPending({ scheduledAt }: VideoConsultationPendingProps) {
  const formattedDate = format(new Date(scheduledAt), "MMMM d, yyyy 'at' h:mm a");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Clock className="w-8 h-8 text-primary animate-pulse" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">Consultation Pending</h1>

          <p className="text-muted-foreground">
            Your consultation is scheduled but hasn&apos;t started yet. The lawyer will join the
            room at the scheduled time.
          </p>

          <div className="bg-muted/30 rounded-lg p-6 space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>Scheduled for {formattedDate}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Please join the room 5 minutes before your scheduled time
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <Button variant="outline" className="w-full">
            <Link href="/profile" className="w-full flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return to Profile
            </Link>
          </Button>

          <Button variant="ghost" className="w-full">
            <Link href="/support" className="w-full flex items-center justify-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Get Help
            </Link>
          </Button>
        </div>

        <div className="pt-4 border-t text-sm text-muted-foreground">
          <p>
            Having trouble joining?{' '}
            <Link href="/support" className="underline underline-offset-4 hover:text-primary">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
