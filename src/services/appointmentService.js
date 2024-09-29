import { collection, addDoc, getDoc, updateDoc, deleteDoc, doc, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';

const appointmentsCollection = collection(db, 'appointments');

export const addAppointment = async (appointmentData) => {
  return await addDoc(appointmentsCollection, appointmentData);
};

export const getAppointment = async (appointmentId) => {
  const appointmentDoc = doc(db, 'appointments', appointmentId);
  const appointmentSnapshot = await getDoc(appointmentDoc);
  return appointmentSnapshot.exists() ? { id: appointmentSnapshot.id, ...appointmentSnapshot.data() } : null;
};

export const updateAppointment = async (appointmentId, appointmentData) => {
  const appointmentDoc = doc(db, 'appointments', appointmentId);
  return await updateDoc(appointmentDoc, appointmentData);
};

export const deleteAppointment = async (appointmentId) => {
  const appointmentDoc = doc(db, 'appointments', appointmentId);
  return await deleteDoc(appointmentDoc);
};

export const getAppointmentsByUserId = async (userId) => {
  const q = query(appointmentsCollection, where("user_id", "==", userId), orderBy("date", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAppointmentsByDogId = async (dogId) => {
  const q = query(appointmentsCollection, where("dog_id", "==", dogId), orderBy("date", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAppointmentsByShelterId = async (shelterId) => {
  const q = query(appointmentsCollection, where("shelter_id", "==", shelterId), orderBy("date", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
