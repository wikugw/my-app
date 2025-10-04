import { db } from "@/firebase";
import type { RecruitmentPreviewType } from "@/types/modules/Recruitment";
import { collection, getDocs } from "firebase/firestore";

export const fetchRecruitments = async (): Promise<RecruitmentPreviewType[]> => {
  const snapshot = await getDocs(collection(db, 'recruitments'));
  console.log(snapshot.docs)
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as unknown as RecruitmentPreviewType[];
};
