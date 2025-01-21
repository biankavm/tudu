import {initializeApp} from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {

    apiKey: "AIzaSyCj-8sMyQZdjsOfeLsrYoEAxKQRBhur_tA",
  
    authDomain: "curso-55cb1.firebaseapp.com",
  
    projectId: "curso-55cb1",
  
    storageBucket: "curso-55cb1.firebasestorage.app",
  
    messagingSenderId: "679679921844",
  
    appId: "1:679679921844:web:7b323ee1143e343795d1e1",
  
    measurementId: "G-2TT6K29X0Y"
  
  };
  
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp);

  export {db, auth};