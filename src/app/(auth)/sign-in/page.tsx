import { SignInForm } from '@/components/auth/SignIn/SignInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Вхід | Law Assist',
};

export default function SignInPage() {
  return <SignInForm />;
}
