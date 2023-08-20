import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { Link } from 'react-router-dom';

import './Messenger.css';

export default function MessengerGrid({ userId }) {
  const dbRef = getDatabase();
  const [messageList, setMessageList] = useState([]);
  // checking on the status of userId. True = userId hasn't loaded. False = userId has loaded
  const [isLoadingProp, setIsLoadingProp] = useState(true);
  console.log(messageList);
  console.log(userId);

  const getUniqueIds = (array) => {
    const reverseArray = array.reverse();
    const uniqueIdSet = new Set();
    for (const obj of reverseArray) {
      if (obj.sentBy !== userId) {
        uniqueIdSet.add(obj.sentBy);
      }

      if (obj.receiveBy !== userId) {
        uniqueIdSet.add(obj.receiveBy);
      }
    }
    const uniqueId = Array.from(uniqueIdSet);
    let obj = {};
    for (let element of reverseArray) {
      if (uniqueId.includes(element.sentBy)) {
        if (!obj[element.sentBy]) {
          obj[element.sentBy] = element;
        }
      } else if (uniqueId.includes(element.receiveBy)) {
        if (!obj[element.receiveBy]) {
          obj[element.receiveBy] = element;
        }
      }
    }

    return Object.values(obj);
  };

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

            const messageData = Object.values(data);
            const uniqueIds = getUniqueIds(messageData);

            setMessageList(uniqueIds);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [userId, isLoadingProp]);

  return (
    <div className="messageListContainer">
      {/* <div class="search-container"> Want todo search bar
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
      </div> */}

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
                  {' '}
                  From :
                  {userId === element.sentBy
                    ? element.otherEmail
                    : element.userEmail}
                </p>
              </div>
              <div className="last-message">
                <p> Message : {element.message}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
