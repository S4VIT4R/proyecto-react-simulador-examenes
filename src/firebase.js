// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA4XS9C9yiHsJXRmzoJMkOGaqhgY248vnM",
  authDomain: "examen-157c8.firebaseapp.com",
  projectId: "examen-157c8",
  storageBucket: "examen-157c8.appspot.com",
  messagingSenderId: "912755431300",
  appId: "1:912755431300:web:0501ce80a5e503f66c6fd1"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const docs = doc;
export const firestore = getFirestore;
export const collections = collection;
export const addDocs = addDoc;
export const getDoc = getDocs;
export const setDocs = setDoc;

