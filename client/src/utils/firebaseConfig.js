import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { REACT_APP_API_URL } from "./config";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ1qkZyhQZRUXHVir32Z26GSl4PufDzOI",
  authDomain: "live-auctions-f725f.firebaseapp.com",
  projectId: "live-auctions-f725f",
  storageBucket: "live-auctions-f725f.appspot.com",
  messagingSenderId: "818562684883",
  appId: "1:818562684883:web:fa55d36220fa02907c4126",
  measurementId: "G-8REVK5KRRR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//auth
export const auth = getAuth(app);

//database
export const db = getDatabase(app);

//storage
export const storage = getStorage(app);
