// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyCLgjDUpM9Jc7-Lom0_EV64jO1vsjhpDfc",
  authDomain: "coach-lew-s-quiz.firebaseapp.com",
  databaseURL: "https://coach-lew-s-quiz-default-rtdb.firebaseio.com",
  projectId: "coach-lew-s-quiz",
  storageBucket: "coach-lew-s-quiz.appspot.com",
  messagingSenderId: "1075129478845",
  appId: "1:1075129478845:web:ffbc0f674fa28deafcd1d4",
  measurementId: "G-RDV68P5B7P",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// eslint-disable-next-line no-unused-vars
const analytics = getAnalytics(app);
