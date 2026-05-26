// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "authexamnotes-23cab.firebaseapp.com",
    projectId: "authexamnotes-23cab",
    storageBucket: "authexamnotes-23cab.firebasestorage.app",
    messagingSenderId: "663201399425",
    appId: "1:663201399425:web:d0e4ab56be13382bbe8380"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export { auth, provider };
