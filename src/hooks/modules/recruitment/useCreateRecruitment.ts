import { recruitmentApi } from '@/api-client/module/recruitment';
import type { RecruitmentFormType } from '@/types/modules/Recruitment';
import type { GeneralResponse } from '@/types/response';
import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export function useCreateRecruitment() {
  return useMutation<
    AxiosResponse<GeneralResponse<unknown>>, // tipe response
    Error, // tipe error
    RecruitmentFormType // tipe payload
  >({
    mutationKey: ['recruitment-create'],
    mutationFn: async (payload: RecruitmentFormType) => {
      // panggil API
      const response = await recruitmentApi.create(payload);
      return response;
    },
  });
}
