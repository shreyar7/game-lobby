// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
    getFirestore
} from "firebase/firestore";
import {
  getAuth
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYp0iJe7-ovMI4leI-uVLuSphewpCKXFw",
  authDomain: "game-lobby-4191c.firebaseapp.com",
  projectId: "game-lobby-4191c",
  storageBucket: "game-lobby-4191c.appspot.com",
  messagingSenderId: "841988282549",
  appId: "1:841988282549:web:3ddef39e8e011dde7086fc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)