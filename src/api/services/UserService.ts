import axiosInstance from "..";
import { IUser } from "../types/auth";

export class UserService {
  public static async getMe(): Promise<IUser> {
    const response = await axiosInstance.get("/users/me");
    return response.data;
  }
}
