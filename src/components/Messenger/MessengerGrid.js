import React, { useEffect, useState } from 'react';
import {
  getDatabase,
  ref,
  set,
  onChildAdded,
  update,
  get,
} from 'firebase/database';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import './Messenger.css';

export default function MessengerGrid({ userId }) {
  const dbRef = getDatabase();
  const [messageList, setMessageList] = useState([]);
  // checking on the status of userId. True = userId hasn't loaded. False = userId has loaded
  const [isLoadingProp, setIsLoadingProp] = useState(true);
  console.log(messageList);
  console.log(userId);

  useEffect(() => {
    // Since userId is async, I need to have the page rerender when userId loads
    if (userId) {
      setIsLoadingProp(false);
    }
  }, [userId]);

  useEffect(() => {
    // if Loading is seto false and userId exist
    if (!isLoadingProp && userId) {
      const messageRef = ref(dbRef, `Messages2/${userId}`);
      get(messageRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // If the data exist in firebase, extract and set our state
            const data = snapshot.val();
            console.log('data', data);
            console.log('hello');
            const messageData = Object.values(data);
            console.log('messageData', messageData);

            setMessageList(messageData);
          } else {
            // If it doesnt exist, create a temporary holder in the db
            // update(ref(dbRef, `Messages2/${userId}`), {
            //   [userId]: true,
            // });
            console.log('hi');
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId, isLoadingProp]);

  return (
    <div className="messageListContainer">
      {messageList.map((element, index) => {
        return (
          <Link
            key={index}
            to="/chat"
            state={{
              userId: userId,
              otherId:
                userId === element.sentBy ? element.receiveBy : element.sentBy,
            }}>
            <div className="messages">
              <div className="participant">
                <p>
                  {userId === element.sentBy
                    ? element.receiveBy
                    : element.sentBy}
                </p>
              </div>
              <div className="last-message">
                <p> {element.message}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
