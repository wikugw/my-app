import axiosClient from "../axiosClient";
import type { RecruitmentFormType } from "@/types/modules/Recruitment";

export const recruitmentApi = {
  async create(data: RecruitmentFormType) {
    const res = await axiosClient.post("/recruitments", data);
    return res.data;
  },
};
