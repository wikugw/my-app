import { addDoc, collection, doc, updateDoc, type DocumentData } from 'firebase/firestore';

import { db } from '../firebase';

/**
 * Add a document to any collection.
 * @param collectionName Firestore collection name
 * @param data Document data to insert
 * @returns The added document reference
 */
export const addDocument = async <T extends DocumentData>(
  collectionName: string,
  data: T
) => {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: new Date(),
  });
  return docRef;
};

export const updateDocument = async (collectionName: string, id: string, data: any) => {
  const docRef = doc(db, collectionName, id);
  await updateDoc(docRef, data);
  return docRef;
};
