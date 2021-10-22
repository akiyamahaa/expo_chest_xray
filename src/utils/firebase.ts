import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyAxpgWhp-9KYf9RWDWqTKKrj5qTpY28DIE",
  authDomain: "expo-template-9687b.firebaseapp.com",
  projectId: "expo-template-9687b",
  storageBucket: "expo-template-9687b.appspot.com",
  messagingSenderId: "467529295744",
  appId: "1:467529295744:web:dc93367c2cccf077ee4365",
  measurementId: "G-XVSQKF4H44"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
