// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqDhSgpdFgwEIB0maWro0rYmEYY4ACi5U",
  authDomain: "tmdt-7d413.firebaseapp.com",
  projectId: "tmdt-7d413",
  storageBucket: "tmdt-7d413.appspot.com",
  messagingSenderId: "264012412696",
  appId: "1:264012412696:web:914fa5676fb933ec96506d",
  measurementId: "G-QYHMN1YLSQ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
