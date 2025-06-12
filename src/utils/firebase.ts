// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYINPQeFN97zbw3oQ4FESvr3Rbpg0safc",
  authDomain: "service-hub-b137e.firebaseapp.com",
  projectId: "service-hub-b137e",
  storageBucket: "service-hub-b137e.firebasestorage.app",
  messagingSenderId: "900448277590",
  appId: "1:900448277590:web:0aa5440760d397ef5a57f7",
  measurementId: "G-TD62FJMR11"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);