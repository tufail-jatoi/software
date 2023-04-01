// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyChrLS6xaU-hV9Gu48-QkEsMOBd66WiNqA",
    authDomain: "registration-user-and-admin.firebaseapp.com",
    projectId: "registration-user-and-admin",
    storageBucket: "registration-user-and-admin.appspot.com",
    messagingSenderId: "905914674362",
    appId: "1:905914674362:web:c7fcef54cfa6369be9a683",
    measurementId: "G-SSH7HKDK1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;