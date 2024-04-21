// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhxQ7viv-HaFNfzD99yCIH0NdaaXWBdVc",
  authDomain: "social-media-sentiments-717a5.firebaseapp.com",
  projectId: "social-media-sentiments-717a5",
  storageBucket: "social-media-sentiments-717a5.appspot.com",
  messagingSenderId: "561141199038",
  appId: "1:561141199038:web:d4578dc274214686016eef",
  measurementId: "G-WQGN7MYQX7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);