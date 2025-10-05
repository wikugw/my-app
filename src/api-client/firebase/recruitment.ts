import { db } from '@/firebase';
import type { RecruitmentPreviewType } from '@/types/modules/Recruitment';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

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
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null; // handle not found
  }

  return {
    id: docSnap.id,
    ...docSnap.data(),
  } as RecruitmentPreviewType;
};
