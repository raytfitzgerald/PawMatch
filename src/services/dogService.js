import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

export const getDogs = async () => {
  const dogsCollection = collection(db, 'dogs');
  const dogsSnapshot = await getDocs(dogsCollection);
  return dogsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
