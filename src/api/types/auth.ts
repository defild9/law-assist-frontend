export interface ICredentials {
  email: string;
  password: string;
}

export interface IUser {
  email: string;
  role: 'user' | 'admin';
  refreshToken: string;
  isEmailVerified: boolean;
  verificationToken: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}
export interface ILoginResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: string;
}
