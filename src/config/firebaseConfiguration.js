// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPHW6xbdz8G_yHxFBTteWqbTe_G7KMxss",
  authDomain: "educational-website-d6cbe.firebaseapp.com",
  projectId: "educational-website-d6cbe",
  storageBucket: "educational-website-d6cbe.appspot.com",
  messagingSenderId: "154959210479",
  appId: "1:154959210479:web:33c8d43aa27116149fb81a",
  measurementId: "G-3ZE4C4P7B6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;