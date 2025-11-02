import type { RecrutmentFormInputs } from '@/validations/modules/recruitment-form';
import type { GeneralResponse } from '../response';

// export type RecruitmentPreviewType = Omit<
//   RecrutmentFormInputs,
//   'applicationDates'
// > & {
//   id?: string;
//   createdAt: Date;
//   createdBy: User;
//   applicationDates: Date[]; // Firestore representation
// };

export type RecruitmentFormType = RecrutmentFormInputs & {
  createdById: number;
};

export type RecruitmentPreviewType = Omit<RecruitmentFormType, "createdById" | "applicationDates"> & {
  id: number
  createdBy: string
  applicationDates: string[]
  createdAt: string
}

export type RecruitmentResponse = GeneralResponse<RecruitmentPreviewType[]>

