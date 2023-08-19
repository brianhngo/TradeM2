import React, { useEffect, useState } from 'react';
import {
  getDatabase,
  ref,
  set,
  onChildAdded,
  update,
  get,
} from 'firebase/database';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function MessengerGrid({ userId }) {
  const dbRef = getDatabase();
  const [messageList, setMessageList] = useState([]);
  console.log(messageList);
  console.log(userId);
  useEffect(() => {
    const messageRef = ref(dbRef, `Messages2/${userId}`);
    get(messageRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log('hello');
          const messageData = Object.values(data);
          ``;
          setMessageList(messageData);
        } else {
          set(ref(dbRef, `Messages2/`), {
            [userId]: 'empty',
          });
          console.log('hi');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [messageList]);

  return <div>MessengerGrid</div>;
}
