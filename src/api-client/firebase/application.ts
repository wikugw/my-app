import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase'; // adjust your import if needed
import type { ApplicationPreviewEntity } from '@/types/modules/Application';
import type { ApplicationStatus } from '@/constants/application-status';

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

export async function fetchApplicationsByRecruitmentIdAndStatus(
  recruitmentId: string,
  status: ApplicationStatus
): Promise<ApplicationPreviewEntity[]> {
  const q = query(
    collection(db, 'applications'),
    where('recruitmentId', '==', recruitmentId),
    where('status', '==', status)
  );

  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return [];
  }

  const applications: ApplicationPreviewEntity[] = querySnapshot.docs.map(
    docSnap => {
      const data = docSnap.data();

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
  );

  return applications;
}

/**
 * Update the status of an application document in Firestore.
 * @param applicationId - The Firestore document ID of the application
 * @param status - The new status to set
 */
export async function updateApplicationStatus(
  applicationId: string,
  status: ApplicationStatus
): Promise<void> {
  if (!applicationId) throw new Error('Missing applicationId');
  if (!status) throw new Error('Missing status');

  const applicationRef = doc(db, 'applications', applicationId);
  await updateDoc(applicationRef, { status });
}
