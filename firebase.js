/* eslint-disable prettier/prettier */
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {initializeFirestore, getFirestore, collection, addDoc, getDocs} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCamdFYFk4uc3CQpZ1hyhAIHxGlRMEgv-0',
  authDomain: 'flickplix-mobile-app.firebaseapp.com',
  databaseURL: 'https://flickplix-mobile-app-default-rtdb.firebaseio.com',
  projectId: 'flickplix-mobile-app',
  storageBucket: 'flickplix-mobile-app.appspot.com',
  messagingSenderId: '621761478889',
  appId: '1:621761478889:web:e839f01079763744c33078',
  measurementId: 'G-SHF6LF8LQY',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
  const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
 });
//const db = getFirestore(app);

export {auth, db, getFirestore, collection, addDoc, getDocs};
