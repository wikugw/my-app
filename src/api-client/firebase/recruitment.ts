import { db } from '@/firebase';
import type { RecruitmentPreviewType } from '@/types/modules/Recruitment';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  Timestamp,
} from 'firebase/firestore';

export const fetchRecruitments = async (): Promise<
  RecruitmentPreviewType[]
> => {
  const snapshot = await getDocs(collection(db, 'recruitments'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as RecruitmentPreviewType[];
};

export const fetchRecruitmentById = async (
  id: string
): Promise<RecruitmentPreviewType | null> => {
  const docRef = doc(db, 'recruitments', id);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data();

  if (!data) throw new Error('Recruitment not found');

  return {
    id: snapshot.id,
    ...data,
    createdAt: data.createdAt.toDate(),
    applicationDates: data.applicationDates?.map((t: Timestamp) => t.toDate()),
  } as RecruitmentPreviewType;
};
