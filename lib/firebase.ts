// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC0iG7p8bAnEi9jyqYZrLyKT6HufOkvkBQ",
  authDomain: "cgp-app1.firebaseapp.com",
  projectId: "cgp-app1",
  storageBucket: "cgp-app1.firebasestorage.app",
  messagingSenderId: "609110420341",
  appId: "1:609110420341:web:a8a552355818bc1729013c",
  measurementId: "G-VD2DEHNG98",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// 🔹 Servicios que usarás
export const auth = getAuth(app);
export const db = getFirestore(app);
