import 'next-auth';
import { DefaultUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    id: string;
    accessToken: string;
    refreshToken: string;
    email: string;
    userImage: string;
    role: 'user' | 'admin';
    isEmailVerified: boolean;
  }

  interface User extends DefaultUser {
    id: string;
    accessToken: string;
    refreshToken: string;
    role: 'user' | 'admin';
    isEmailVerified: boolean;
    userImage: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    email: string;
    userImage: string;
    role: 'user' | 'admin';
    isEmailVerified: boolean;
  }
}
