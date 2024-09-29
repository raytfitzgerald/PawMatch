import { collection, addDoc, getDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

const usersCollection = collection(db, 'users');

export const addUser = async (userData) => {
  return await addDoc(usersCollection, userData);
};

export const getUser = async (userId) => {
  const userDoc = doc(db, 'users', userId);
  const userSnapshot = await getDoc(userDoc);
  return userSnapshot.exists() ? { id: userSnapshot.id, ...userSnapshot.data() } : null;
};

export const updateUser = async (userId, userData) => {
  const userDoc = doc(db, 'users', userId);
  return await updateDoc(userDoc, userData);
};

export const deleteUser = async (userId) => {
  const userDoc = doc(db, 'users', userId);
  return await deleteDoc(userDoc);
};
