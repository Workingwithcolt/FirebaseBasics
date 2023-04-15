import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getStorage} from "firebase/storage"
// import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyD4DTTmd251ghwxtIdXjX4fi2FcoJ69X6k",
  authDomain: "instargram-ec5e4.firebaseapp.com",
  projectId: "instargram-ec5e4",
  storageBucket: "instargram-ec5e4.appspot.com",
  messagingSenderId: "266812563107",
  appId: "1:266812563107:web:45238b5857ea990bf06916",
  measurementId: "G-ER1DQV1H2M"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)
export {db,auth}
export const googleProvider = new GoogleAuthProvider();
export const storage = getStorage(app)