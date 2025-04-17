"use server";

import { AuthService } from "../services/AuthService";

export const refreshAccessToken = async (refreshToken: string) => {
  const response = await AuthService.refreshToken(refreshToken);
  return response;
};
