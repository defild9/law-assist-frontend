import NextAuth, { NextAuthConfig } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthService } from '@/api/services/AuthService';
import { jwtDecode } from 'jwt-decode';

async function refreshAccessToken(token) {
  try {
    const response = await AuthService.refreshToken(token.refreshToken);
    if (!response.accessToken) {
      throw response;
    }

    return {
      ...token,
      accessToken: response.accessToken,
      refreshToken: response.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const config = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials.email || !credentials.password) {
            return null;
          }

          const response = await AuthService.login({
            email: String(credentials.email),
            password: String(credentials.password),
          });

          if (response.accessToken) {
            return {
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              email: response.user.email,
              role: response.user.role,
              userImage: response.user.profile_picture,
              id: response.user.id,
              isEmailVerified: response.user.isEmailVerified,
            };
          }

          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-up',
    error: '/sign-up',
  },
  callbacks: {
    jwt: async ({ token, account, user, trigger, session: newSession }) => {
      if (token?.accessToken) {
        const decodedToken = jwtDecode(String(token.accessToken));
        token.accessTokenExpires = Number(decodedToken?.exp) * 1000;
      }

      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          email: user.email,
          role: user.role,
          id: user.id,
          isEmailVerified: user.isEmailVerified,
          userImage: user.userImage,
        };
      }
      if (trigger === 'update' && newSession) {
        if (newSession.user?.email) {
          token.email = newSession.user.email;
        }
        if (newSession.userImage) {
          token.userImage = newSession.userImage;
        }
      }

      if (Date.now() < Number(token.accessTokenExpires)) {
        return token;
      }

      return refreshAccessToken(token);
    },
    session: async ({ session, token, trigger, newSession }) => {
      if (token) {
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
        session.email = token.email as string;
        session.role = token.role as 'user' | 'admin';
        session.id = token.id as string;
        session.isEmailVerified = token.isEmailVerified as boolean;
        session.userImage = token.userImage as string;
      }

      if (trigger === 'update' && newSession) {
        if (newSession.user?.email) {
          session.user.email = newSession.user.email;
        }
        if (newSession.userImage) {
          session.userImage = newSession.userImage;
        }
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
