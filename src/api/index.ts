import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { auth, signIn, signOut } from "@/lib/auth";
import { AuthService } from "./services/AuthService";
import { IRefreshTokenResponse } from "./types/auth";
import { getSession } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const axiosInstanceWithoutAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    if (session?.user.accessToken) {
      config.headers.Authorization = `Bearer ${session.user.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
