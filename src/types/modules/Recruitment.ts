import type { RecrutmentFormInputs } from '@/validations/modules/recruitment-form';
import type { User } from '../User';

export type RecruitmentPreviewType = Omit<
  RecrutmentFormInputs,
  'applicationDates'
> & {
  id?: string;
  createdAt: Date;
  createdBy: User;
  applicationDates: Date[]; // Firestore representation
};

export type RecruitmentFormType = RecrutmentFormInputs & {
  createdById: number;
};
