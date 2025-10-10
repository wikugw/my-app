import type { DocumentData } from 'firebase/firestore';

export interface ApplicationPreviewEntity extends DocumentData {
  id: string;
  email: string;
  name: string;
  recruitmentId: string;
  skills: string[];
  fileUrl?: string | null;
  createdAt: Date;
}
