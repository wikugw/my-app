import axiosClient from '../axiosClient';
import type { RecruitmentFormType } from '@/types/modules/Recruitment';

export const recruitmentApi = {
  async create(data: RecruitmentFormType) {
    const res = await axiosClient.post('/recruitments', data);
    return res.data;
  },
  async getListActive(currentDate: string) {
    const res = await axiosClient.get('/recruitments/active', {
      params: { currentDate },
    });
    return res.data;
  },
  async getById(id: number) {
    const res = await axiosClient.get(`/recruitments/${id}`);
    return res.data;
  },
};
