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
      <div class="search-container">
        <form>
          <input type="text" placeholder="Search.." name="search" />
          <button type="submit">
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"></path>
            </svg>
          </button>
        </form>
      </div>

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
