import { updateApplicationStatus } from "@/api-client/firebase/application";
import type { ApplicationStatus } from "@/constants/application-status";
import { useMutation } from "@tanstack/react-query";

export function useUpdateApplication() {
  return useMutation({
    mutationFn: ({
      applicationId,
      status,
    }: {
      applicationId: string;
      status: ApplicationStatus;
    }) => updateApplicationStatus(applicationId, status),
  });
}