import Link from 'next/link';
import { MailIcon } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Check email | Law Assist',
};

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mx-auto">
            <MailIcon className="w-6 h-6 text-primary" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">Check your email</h1>

          <p className="text-muted-foreground">
            We&apos;ve sent you a verification link to the email address you provided during
            registration.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <Link
            className="w-full h-10 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-white hover:text-black"
            href="/sign-in"
          >
            Return to Sing Up
          </Link>

          <p className="text-sm text-muted-foreground">
            Didn&apos;t receive an email?{' '}
            <button className="font-medium underline underline-offset-4 hover:text-primary">
              Click to resend
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
