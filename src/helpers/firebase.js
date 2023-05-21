// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyABHXaSrBWwhKITZezd3gdnLgT_1z4u9-M",
    authDomain: "adstream-f1c89.firebaseapp.com",
    projectId: "adstream-f1c89",
    storageBucket: "adstream-f1c89.appspot.com",
    messagingSenderId: "322792723220",
    appId: "1:322792723220:web:0d608b72200cc8004d6801",
    measurementId: "G-G7PT01B3PD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, storage, db, auth };