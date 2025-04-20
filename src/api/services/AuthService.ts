import { axiosInstanceWithoutAuth } from '..';
import {
  ICredentials,
  ILoginResponse,
  IRefreshTokenResponse,
  IVerifyEmailResponse,
} from '../types/auth';

export class AuthService {
  public static async login(credentials: ICredentials): Promise<ILoginResponse> {
    const response = await axiosInstanceWithoutAuth.post('/auth/login', credentials);
    return response.data;
  }

  public static async register(credentials: ICredentials) {
    const response = await axiosInstanceWithoutAuth.post('/auth/register', credentials);
    return response.data;
  }

  public static async refreshToken(refreshToken: string): Promise<IRefreshTokenResponse> {
    const response = await axiosInstanceWithoutAuth.post(`/auth/refresh`, {
      refreshToken,
    });
    return response.data;
  }

  public static async VerifyEmail(token: string): Promise<IVerifyEmailResponse> {
    const response = await axiosInstanceWithoutAuth.post(`/auth/verify-email`, {
      token,
    });
    return response.data;
  }
}
