// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyAybQwAk9hU7aPLGo5nuxfSWe6ZzNfpc4Y",
    authDomain: "spyapp-demo.firebaseapp.com",
    databaseURL: "https://spyapp-demo-default-rtdb.firebaseio.com",
    projectId: "spyapp-demo",
    storageBucket: "spyapp-demo.appspot.com",
    messagingSenderId: "692977989648",
    appId: "1:692977989648:web:aa7e2c43d60b45c5cbf295",
    measurementId: "G-C5D5W6QC26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const auth = getAuth(app);
export const db = getDatabase(app);
export default app;