import type { ApplicationStatus } from '@/constants/application-status';
import type { ApplicationFormInputs } from '@/validations/modules/application-form';
import type { DocumentData } from 'firebase/firestore';

export interface ApplicationPreviewEntity
  extends DocumentData,
    ApplicationFormInputs {
  id: string;
  recruitmentId: string;
  fileUrl?: string | null;
  createdAt: Date;
  status: ApplicationStatus;
}
