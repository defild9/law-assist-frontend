import Link from 'next/link';
import { Scale } from 'lucide-react';

export default function VideoConsultationLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="containe px-3.5 padding flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Scale className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold">Law Assist</span>
          </Link>
        </div>
      </header>

      {children}
    </div>
  );
}
