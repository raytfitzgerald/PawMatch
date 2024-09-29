import { collection, addDoc, getDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

const messagesCollection = collection(db, 'messages');

export const addMessage = async (messageData) => {
  return await addDoc(messagesCollection, messageData);
};

export const getMessage = async (messageId) => {
  const messageDoc = doc(db, 'messages', messageId);
  const messageSnapshot = await getDoc(messageDoc);
  return messageSnapshot.exists() ? { id: messageSnapshot.id, ...messageSnapshot.data() } : null;
};

export const updateMessage = async (messageId, messageData) => {
  const messageDoc = doc(db, 'messages', messageId);
  return await updateDoc(messageDoc, messageData);
};

export const deleteMessage = async (messageId) => {
  const messageDoc = doc(db, 'messages', messageId);
  return await deleteDoc(messageDoc);
};

export const getMessagesByMatchId = async (matchId) => {
  const q = query(messagesCollection, where("match_id", "==", matchId), orderBy("timestamp", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
