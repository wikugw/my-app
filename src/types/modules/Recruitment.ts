import type { RecrutmentFormInputs } from "@/components/macro/recruitment/RecruitmentForm";
import type { User } from "../User";
import { Timestamp } from "firebase/firestore";

export type RecruitmentPreviewType =  RecrutmentFormInputs & {
  id?: string,          // on create empty, use id from firestore
  createdAt: Timestamp,
  createdBy: User
}

export type RecruitmentFormType =  RecrutmentFormInputs & {
  createdBy: User
}