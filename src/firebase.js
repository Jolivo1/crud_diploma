// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwTcMk2YoKdMW6VrwtLZhx8TGid5npYhU",
  authDomain: "crud-diploma.firebaseapp.com",
  projectId: "crud-diploma",
  storageBucket: "crud-diploma.appspot.com",
  messagingSenderId: "514956311346",
  appId: "1:514956311346:web:35198fdad94d49487fb52b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
export {db}