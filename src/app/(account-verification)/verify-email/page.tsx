import VerifyEmailContent from '@/components/verify/VerifyEmailContent';
import { Suspense } from 'react';

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={<div className="min-h-screen flex items-center justify-center p-4">Loading…</div>}
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
