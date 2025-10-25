import axiosClient from "../axiosClient";

export const employmentTypeApi = {
  async getAll() {
    const res = await axiosClient.get("/employment-types");
    return res.data;
  },
};
