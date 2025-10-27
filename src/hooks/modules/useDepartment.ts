import { departmentApi } from '@/api-client/module/department';
import type { DepartmentResponse } from '@/types/modules/Department';
import { useQuery } from '@tanstack/react-query';

export const useDepartments = () => {
  return useQuery({
    queryKey: ['departments'], // unique cache key
    queryFn: () =>
      departmentApi
        .getAll()
        .then((resp: DepartmentResponse) => {
          return resp.data;
        })
        .catch(e => {
          console.log(e);
          return [];
        }), // API call
    staleTime: 1000 * 60 * 5, // cache valid 5 minutes
    refetchOnWindowFocus: false, // tidak refetch tiap pindah tab
  });
};
