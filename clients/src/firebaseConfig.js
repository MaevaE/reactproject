// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoQh6Kp_Uuh8UdnQvlGZTTIRXOxCFCKC8",
  authDomain: "mapshopapp-b56b4.firebaseapp.com",
  projectId: "mapshopapp-b56b4",
  storageBucket: "mapshopapp-b56b4.firebasestorage.app",
  messagingSenderId: "222355224913",
  appId: "1:222355224913:web:6f58a87e37f54428ccfb70"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 const db = getFirestore(app);

export { db };
