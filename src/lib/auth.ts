import { refreshAccessToken } from "@/api/actions/refreshAction";
import { AuthService } from "@/api/services/AuthService";
import { isTokenExpired } from "@/utils/isTokenExpored";
import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const config: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null;
          }

          const response = await AuthService.login({
            email: credentials.email as string,
            password: credentials.password as string,
          });

          if (response.accessToken) {
            const userData = response.user;

            return {
              ...userData,
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
              accessTokenExpires: response.accessTokenExpires,
            };
          }

          return null;
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  // pages: {
  //   signIn: "/sign-in",
  //   error: "/sign-in",
  // },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      options: {
        secure: true,
      },
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...user, ...token };
      }
      if (!isTokenExpired(Number(token?.accessTokenExpires))) {
        return token;
      }

      if (token.refreshToken) {
        try {
          const response = await refreshAccessToken(
            token.refreshToken as string
          );

          console.log("refresh", JSON.stringify(response, null, 2));
          if (response.accessToken) {
            return {
              ...token,
              accessToken: response.accessToken,
              user: {
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
              },
              refreshToken: response.refreshToken,
              accessTokenExpires: response.accessTokenExpires,
            };
          }
        } catch (error) {
          console.error("Authorization error:");
          signOut();
        }
      }

      // if (token.refreshToken) {
      //   console.log("refresh");
      // }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        role: token.role as string,
        isEmailVerified: token.isEmailVerified as boolean,
        createdAt: token.createdAt as string,
        updatedAt: token.updatedAt as string,
        accessToken: token.accessToken as string,
        refreshToken: token.refreshToken as string,
        accessTokenExpires: token.accessTokenExpires as number,
      };

      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);
