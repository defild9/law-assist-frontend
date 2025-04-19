import { axiosInstanceWithoutAuth } from '..';
import { ICredentials, ILoginResponse, IRefreshTokenResponse } from '../types/auth';

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
}
