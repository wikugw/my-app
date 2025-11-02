import { useQuery } from '@tanstack/react-query';
import { recruitmentApi } from '@/api-client/module/recruitment';
import type { RecruitmentPreviewType, RecruitmentResponse } from '@/types/modules/Recruitment';

export const useActiveRecruitments = (currentDate?: string | null) => {
  return useQuery<RecruitmentPreviewType[]>({
    queryKey: ['recruitment', currentDate], // cache per email
    queryFn: async () => {
      if (!currentDate) throw new Error('Email is required');
      const data: RecruitmentResponse = await recruitmentApi.getListActive(currentDate);
      console.log(data);
      return data.data;
    },
    enabled: !!currentDate, // hanya jalan kalau email ada
  });
};
