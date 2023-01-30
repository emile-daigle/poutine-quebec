import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import  { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwjgvnvEJWktdGkbwZowlmozZqM9Dciac",
  authDomain: "poutine-progav.firebaseapp.com",
  databaseURL: "https://poutine-progav-default-rtdb.firebaseio.com",
  projectId: "poutine-progav",
  storageBucket: "poutine-progav.appspot.com",
  messagingSenderId: "331874935083",
  appId: "1:331874935083:web:7152d997b066f766fe656e",
  measurementId: "G-H4VK9E4DQ0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app);