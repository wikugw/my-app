import { useQuery } from '@tanstack/react-query';
import { employeeApi } from '@/api-client/module/employee';
import type {
  EmployeeDetail,
  EmployeeResponse,
} from '@/types/modules/employee';

export const useEmployeeByEmail = (email?: string | null) => {
  return useQuery<EmployeeDetail>({
    queryKey: ['employee', email], // cache per email
    queryFn: async () => {
      if (!email) throw new Error('Email is required');
      const data: EmployeeResponse = await employeeApi.getByEmail(email);
      console.log(data);
      return data.data;
    },
    enabled: !!email, // hanya jalan kalau email ada
    staleTime: 1000 * 60 * 5, // 5 menit
    refetchOnWindowFocus: false,
  });
};
