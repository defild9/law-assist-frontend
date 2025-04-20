import { SingUpForm } from '@/components/auth/SignUp/SingUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up | Law Assist',
};

export default function SignUpPage() {
  return <SingUpForm />;
}
