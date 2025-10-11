import { fetchApplicationByRecruitmentAndEmail } from '@/api-client/firebase/application';
import { useMutation } from '@tanstack/react-query';

export function useCheckExistingApplication() {
  return useMutation({
    mutationFn: ({
      recruitmentId,
      email,
    }: {
      recruitmentId: string;
      email: string;
    }) => fetchApplicationByRecruitmentAndEmail(recruitmentId, email),
  });
}
