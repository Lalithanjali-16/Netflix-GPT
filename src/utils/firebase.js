// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUP3vogtzCSrdNSnpFxWMKiqlLnNClaOs",
  authDomain: "netflix-gpt-99a72.firebaseapp.com",
  projectId: "netflix-gpt-99a72",
  storageBucket: "netflix-gpt-99a72.firebasestorage.app",
  messagingSenderId: "659786078139",
  appId: "1:659786078139:web:bea66bd140fe6da052569e",
  measurementId: "G-9D8ERRKK1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();