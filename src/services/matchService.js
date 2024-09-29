import { collection, addDoc, getDoc, updateDoc, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';

const matchesCollection = collection(db, 'matches');

export const addMatch = async (matchData) => {
  return await addDoc(matchesCollection, matchData);
};

export const getMatch = async (matchId) => {
  const matchDoc = doc(db, 'matches', matchId);
  const matchSnapshot = await getDoc(matchDoc);
  return matchSnapshot.exists() ? { id: matchSnapshot.id, ...matchSnapshot.data() } : null;
};

export const updateMatch = async (matchId, matchData) => {
  const matchDoc = doc(db, 'matches', matchId);
  return await updateDoc(matchDoc, matchData);
};

export const deleteMatch = async (matchId) => {
  const matchDoc = doc(db, 'matches', matchId);
  return await deleteDoc(matchDoc);
};

export const getMatchesByUserId = async (userId) => {
  const q = query(matchesCollection, where("user_id", "==", userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getMatchesByDogId = async (dogId) => {
  const q = query(matchesCollection, where("dog_id", "==", dogId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
