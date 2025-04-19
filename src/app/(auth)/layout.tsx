import Link from 'next/link';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-black">
        <div className="hidden lg:flex flex-1 flex-col justify-between p-12 bg-black">
          <>
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white/10 flex items-center justify-center">
                <div className="h-4 w-4 rounded-sm bg-white" />
              </div>
              <span className="text-lg font-semibold text-white">Law Assist</span>
            </Link>
          </>
          <blockquote className="space-y-2">
            {/* need to change for random */}
            <p className="text-lg text-white">
              &quot;The life of the law has not been logic; it has been experience.&quot;
            </p>
            <footer className="text-sm text-white/60">Oliver Wendell Holmes Jr</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        {children}
      </div>
    </div>
  );
}
