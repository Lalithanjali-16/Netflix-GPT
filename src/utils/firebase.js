// 


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Optional: Import Analytics if needed
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCUP3vogtzCSrdNSnpFxWMKiqlLnNClaOs",
  authDomain: "netflix-gpt-99a72.firebaseapp.com",
  projectId: "netflix-gpt-99a72",
  storageBucket: "netflix-gpt-99a72.appspot.com", // fixed typo: should be .app**spot**.com
  messagingSenderId: "659786078139",
  appId: "1:659786078139:web:bea66bd140fe6da052569e",
  measurementId: "G-9D8ERRKK1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Enable analytics only in production
// const analytics = getAnalytics(app);

// Export only what's needed
export const auth = getAuth(app);
