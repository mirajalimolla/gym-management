// src/assets/firebase.js  (hard-coded version)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAqnzEZTdrlOD6TKrtnthY5nih8TtP2hHU",
  authDomain: "gym-management-system-616ac.firebaseapp.com",
  projectId: "gym-management-system-616ac",
  storageBucket: "gym-management-system-616ac.firebasestorage.app",
  messagingSenderId: "74726992939",
  appId: "1:74726992939:web:e9de2487b99f49aeb3ce6e",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db  = getFirestore(app);