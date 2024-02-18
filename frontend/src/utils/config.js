// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
let REACT_APP_API_URL = "http://localhost:8000";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  REACT_APP_API_URL = "http://localhost:8000";
}
const API_BASE_URL = "https://friendzone-backend.onrender.com";
const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/live-auctions/uploads";
const UPLOAD_PRESET = "hgvapsg0";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBK_fFA74EN88gbY_NR126PYS6kYq3lCsw",
  authDomain: "fir-86441.firebaseapp.com",
  projectId: "fir-86441",
  storageBucket: "fir-86441.appspot.com",
  messagingSenderId: "1086931091315",
  appId: "1:1086931091315:web:caf11ef78040696b2e0f06",
  measurementId: "G-03GX1PBLXL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export { REACT_APP_API_URL, API_BASE_URL, CLOUDINARY_URL, UPLOAD_PRESET };
