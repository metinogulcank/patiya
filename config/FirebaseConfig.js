// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: "pet-app-7a5d3.firebaseapp.com",
  projectId: "pet-app-7a5d3",
  storageBucket: "pet-app-7a5d3.firebasestorage.app",
  messagingSenderId: "477183894798",
  appId: "1:477183894798:web:f277e586c5023ed5c2235f",
  measurementId: "G-5Q7L532EXB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app,'(default)');
export const storage = getStorage(app)
// const analytics = getAnalytics(app);