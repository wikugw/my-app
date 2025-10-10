import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/firebase'; // adjust your import if needed
import type { ApplicationPreviewEntity } from '@/types/modules/Application';

/**
 * Fetch the first application that matches both recruitmentId and email.
 */
export async function fetchApplicationByRecruitmentAndEmail(
  recruitmentId: string,
  email: string
): Promise<ApplicationPreviewEntity | null> {
  const q = query(
    collection(db, 'applications'),
    where('recruitmentId', '==', recruitmentId),
    where('email', '==', email)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  // 🧠 Get first document only
  const docSnap = querySnapshot.docs[0];
  const data = docSnap.data();

  // 🧾 Convert Firestore timestamp to JS Date if needed
  const createdAt =
    data.createdAt instanceof Date
      ? data.createdAt
      : data.createdAt?.toDate
        ? data.createdAt.toDate()
        : new Date();

  return {
    id: docSnap.id,
    ...data,
    createdAt,
  } as ApplicationPreviewEntity;
}
