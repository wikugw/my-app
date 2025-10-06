import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/firebase"; // make sure you export storage from your firebase.ts

export const uploadFileToStorage = async (file: File, folder: string) => {
  const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};
