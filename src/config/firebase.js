import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVfvsONHT2yn3Y3g5YyfSZDrb-GahSRWY",
  authDomain: "pawmatch-f1f87.firebaseapp.com",
  projectId: "pawmatch-f1f87",
  storageBucket: "pawmatch-f1f87.appspot.com",
  messagingSenderId: "870346194474",
  appId: "1:870346194474:web:f2df3993f3b276d1478d53",
  measurementId: "G-DEL7HDHN5K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, db };