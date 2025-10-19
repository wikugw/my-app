import type { AxiosResponse } from "axios";
import axiosClient from "../axiosClient";
import type { AuthResponseData } from "@/types/auth";

export const authApi = {
  async loginWithGoogle(idToken: string) {
    const res: AxiosResponse<AuthResponseData> = await axiosClient.post("/auth/google", {
      idToken: idToken,
    });

    const jwtToken = res.data.access_token;
    localStorage.setItem("token", jwtToken);

    return jwtToken;
  },
};
