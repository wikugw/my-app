import type { CreateEmployeeRequest } from "@/types/modules/employee";
import axiosClient from "../axiosClient";

export const employeeApi = {
  async getByEmail(email: string) {
    const res = await axiosClient.get("/employees", {
      params: { email },
    });
    return res.data;
  },

  async create(data: CreateEmployeeRequest) {
    const res = await axiosClient.post("/employees", data);
    return res.data;
  },
};
