import { collection, addDoc, getDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const dogsCollection = collection(db, 'dogs');

export const addDog = async (dogData) => {
  return await addDoc(dogsCollection, dogData);
};

export const getDog = async (dogId) => {
  const dogDoc = doc(db, 'dogs', dogId);
  const dogSnapshot = await getDoc(dogDoc);
  return dogSnapshot.exists() ? { id: dogSnapshot.id, ...dogSnapshot.data() } : null;
};

export const updateDog = async (dogId, dogData) => {
  const dogDoc = doc(db, 'dogs', dogId);
  return await updateDoc(dogDoc, dogData);
};

export const deleteDog = async (dogId) => {
  const dogDoc = doc(db, 'dogs', dogId);
  return await deleteDoc(dogDoc);
};

export const getDogs = async () => {
  const dogsSnapshot = await getDocs(dogsCollection);
  return dogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getDogsByShelterId = async (shelterId) => {
  const q = query(dogsCollection, where("shelter_id", "==", shelterId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
