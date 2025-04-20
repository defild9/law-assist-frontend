'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useVerifyEmail } from '@/hooks/useVerefyEmail';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verificationState, setVerificationState] = useState<'loading' | 'success' | 'error'>(
    'loading'
  );
  const { data: session, update: updateSession } = useSession();

  const { mutate: verifyEmail, isPending } = useVerifyEmail({
    onSuccess: () => {
      if (session?.user) {
        updateSession({ isEmailVerified: true });
      }
      setVerificationState('success');
    },
    onError: error => {
      setVerificationState('error');
    },
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      router.replace('/');
      return;
    }
    verifyEmail(token);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {verificationState === 'loading' ||
          (isPending && (
            <div className="space-y-4">
              <div className="w-12 h-12 border-4 border-primary/30 border-t-transparent rounded-full animate-spin mx-auto"></div>

              <h1 className="text-2xl font-semibold tracking-tight">Verifying your email</h1>
              <p className="text-muted-foreground">Please wait while we verify your email...</p>
            </div>
          ))}

        {verificationState === 'success' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-gray-600/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Email verified</h1>
            <p className="text-muted-foreground">
              Your email has been successfully verified. You can now log in to your account.
            </p>
            <Link
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              href={session?.user ? '/chat' : '/sign-in'}
            >
              {session?.user ? 'Go to Chat' : 'Continue to Sing In'}
            </Link>
          </div>
        )}

        {verificationState === 'error' && (
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-500/25 flex items-center justify-center mx-auto">
              <XCircle className="w-6 h-6 text-red-600/40" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Verification failed</h1>
            <p className="text-muted-foreground">
              The verification link is invalid or has expired. Please try again or request a new
              verification link.
            </p>
            <div className="space-y-2 pt-4">
              {/* TODO: Need to add logic for sending new link */}
              <Link
                className="w-full h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-white hover:text-black"
                href="/check-email"
              >
                Request new link
              </Link>

              <Link
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 w-full bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
                href="/sign-in"
              >
                Return to Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
