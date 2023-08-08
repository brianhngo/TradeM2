import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage'; 

//firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getDatabase(app);
// const reference = ref(db, 'Users/' + 4);

// function writeUserData(description) {
//   set(reference, {
//     Description: description,
//   });
// }

writeUserData('Ketchup');

// const analytics = getAnalytics(app);

export const db = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
export default firebase;