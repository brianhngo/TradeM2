import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, set } from "firebase/database";
//import dotenv from 'dotenv';
//dotenv.config();

//firbase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQb8eNiSowhDpBL6T68DrQz9xs2xbNVsA",
  authDomain: "tradem-1d4bd.firebaseapp.com",
  projectId: "tradem-1d4bd",
  storageBucket: "tradem-1d4bd.appspot.com",
  messagingSenderId: "300111259041",
  appId: "1:300111259041:web:b20bc9b3f88e07707817e0",
  measurementId: "G-2PGRCY32RX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const reference = ref(db, "Users/" + 3);

function writeUserData(
  
  description,
 
) {
  

  set(reference, {
  
    Description: description, 
    
  });

}


writeUserData('Coffee' )

// const analytics = getAnalytics(app);

export default db;