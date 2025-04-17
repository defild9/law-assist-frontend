import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: "user" | "admin";
      isEmailVerified: boolean;
      createdAt: string;
      updatedAt: string;
      accessToken: string;
      refreshToken: string;
      accessTokenExpires: number;
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: "user" | "admin";
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    accessTokenExpires: number;
    accessToken: string;
    refreshToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken: string;
    refreshToken: string;
    id: string;
    email: string;
    role: "user" | "admin";
    isEmailVerified: boolean;
    createdAt: string;
    updatedAt: string;
    accessTokenExpires: number;
  }
}
