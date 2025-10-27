import axiosClient from '../axiosClient';

export const departmentApi = {
  async getAll() {
    const res = await axiosClient.get('/departments');
    return res.data;
  },
};
