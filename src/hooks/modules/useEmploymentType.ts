import { employmentTypeApi } from "@/api-client/module/employment-type";
import type { DepartmentResponse } from "@/types/modules/Department";
import { useQuery } from "@tanstack/react-query";

export const useEmploymentTypes = () => {
  return useQuery({
    queryKey: ["employment-types"], // unique cache key
    queryFn: () => employmentTypeApi.getAll()
    .then((resp: DepartmentResponse) => {
      return resp.data
    })
    .catch((e) => {
      console.log(e)
      return []
    }), // API call
    staleTime: 1000 * 60 * 5, // cache valid 5 minutes
    refetchOnWindowFocus: false, // tidak refetch tiap pindah tab
  });
};
