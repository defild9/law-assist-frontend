import { useSession } from 'next-auth/react';

export function useUserRole() {
  const { data: session, status } = useSession();

  const role = session?.role || null;

  return {
    role,
    isAdmin: role === 'admin',
    isLawyer: role === 'lawyer',
    isUser: role === 'user',
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
  };
}
