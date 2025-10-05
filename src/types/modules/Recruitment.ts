import type { RecrutmentFormInputs } from '@/validations/modules/recruitment-form';
import type { User } from '../User';
import { Timestamp } from 'firebase/firestore';

export type RecruitmentPreviewType = Omit<
  RecrutmentFormInputs,
  'applicationDates'
> & {
  id?: string;
  createdAt: Timestamp;
  createdBy: User;
  applicationDates?: Timestamp[]; // Firestore representation
};

export type RecruitmentFormType = RecrutmentFormInputs & {
  createdBy: User;
};
