import type { RecrutmentFormInputs } from "@/components/macro/recruitment/RecruitmentForm";
import type { User } from "../User";

export type RecruitmentPreviewType =  RecrutmentFormInputs & {
  createdAt: string,
  createdBy: User
}