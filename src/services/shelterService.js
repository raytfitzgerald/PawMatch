import { collection, addDoc, getDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const sheltersCollection = collection(db, 'shelters');

export const addShelter = async (shelterData) => {
  return await addDoc(sheltersCollection, shelterData);
};

export const getShelter = async (shelterId) => {
  const shelterDoc = doc(db, 'shelters', shelterId);
  const shelterSnapshot = await getDoc(shelterDoc);
  return shelterSnapshot.exists() ? { id: shelterSnapshot.id, ...shelterSnapshot.data() } : null;
};

export const updateShelter = async (shelterId, shelterData) => {
  const shelterDoc = doc(db, 'shelters', shelterId);
  return await updateDoc(shelterDoc, shelterData);
};

export const deleteShelter = async (shelterId) => {
  const shelterDoc = doc(db, 'shelters', shelterId);
  return await deleteDoc(shelterDoc);
};

export const getShelters = async () => {
  const sheltersSnapshot = await getDocs(sheltersCollection);
  return sheltersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
