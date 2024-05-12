// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {  doc, getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZUa9fJidnkS_0cs-BoKKfXOTSquy6thw",
  authDomain: "store-d17ce.firebaseapp.com",
  projectId: "store-d17ce",
  storageBucket: "store-d17ce.appspot.com",
  messagingSenderId: "421462810786",
  appId: "1:421462810786:web:c807a6b2ab734358f477fb",
  measurementId: "G-9M6J740X2D"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore()
export const auth = getAuth(app)