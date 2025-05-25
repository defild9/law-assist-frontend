import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { VideoOff, Calendar, ArrowLeft, HelpCircle } from 'lucide-react';

export default function VideoConsultationNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto">
            <VideoOff className="w-8 h-8 text-muted-foreground" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">Consultation Room Not Found</h1>

          <p className="text-muted-foreground">
            The consultation room you&apos;re looking for doesn&apos;t exist or has been closed.
            This could be because:
          </p>

          <ul className="text-sm text-muted-foreground space-y-2 mt-4">
            <li>• The room ID is incorrect</li>
            <li>• The consultation has ended</li>
            <li>• The room has been deleted</li>
            <li>• You don&apos;t have permission to access this room</li>
          </ul>
        </div>

        <div className="space-y-4 pt-4">
          <Button variant="default" className="w-full ">
            <Link
              href="/book-consultation"
              className="w-full flex items-center justify-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Book a Consultation
            </Link>
          </Button>

          <Button variant="outline" className="w-full ">
            <Link href="/profile" className="w-full flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Return to Profile
            </Link>
          </Button>

          <Button variant="ghost" className="w-full ">
            <Link href="/support" className="w-full flex items-center justify-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Get Help
            </Link>
          </Button>
        </div>

        <div className="pt-4 border-t text-sm text-muted-foreground">
          <p>
            If you believe this is an error or need assistance,{' '}
            <Link href="/support" className="underline underline-offset-4 hover:text-primary">
              contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
