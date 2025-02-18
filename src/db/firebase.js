import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDYtNRsnVWvl7_0ycMm_kwn7VZeQhr5bUA",
    authDomain: "vuex-passwords.firebaseapp.com",
    projectId: "vuex-passwords",
    storageBucket: "vuex-passwords.firebasestorage.app",
    messagingSenderId: "1086618010214",
    appId: "1:1086618010214:web:6d945643561ec2fad523a7"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }