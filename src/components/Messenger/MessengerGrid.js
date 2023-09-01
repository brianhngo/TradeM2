import React, { useEffect, useState } from 'react';
import { getDatabase, ref, get } from 'firebase/database';
import { Link } from 'react-router-dom';

import './Messenger.css';

export default function MessengerGrid({ userId }) {
  const dbRef = getDatabase();
  const [messageList, setMessageList] = useState([]);
  // checking on the status of userId. True = userId hasn't loaded. False = userId has loaded
  const [isLoadingProp, setIsLoadingProp] = useState(true);
  const [loading, setLoading] = useState(true);
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
    console.log('uniqueID', uniqueId);
    console.log(reverseArray);
    let obj = {};
    for (let element of reverseArray) {
      console.log(element);
      if (uniqueId.includes(element.sentBy)) {
        if (!obj[element.sentBy]) {
          obj[element.sentBy] = element;
        }
      } else {
        if (!obj[element.receiveBy]) {
          obj[element.receiveBy] = element;
        }
      }
    }
    console.log('obj', obj);
    return Object.values(obj);
  };

  useEffect(() => {
    setLoading(false);
    // Since userId is async, I need to have the page rerender when userId loads
    if (userId) {
      setIsLoadingProp(false);
    }
  }, [userId]);

  useEffect(() => {
    setLoading(false);
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
  }, [userId, isLoadingProp, loading]);

  return (
    <div className="messageListContainer">
      {loading === false ? (
        <>
          {messageList.map((element, index) => (
            <Link
              className="last-message-container"
              key={index}
              to="/chat"
              state={{
                userId: userId,
                otherId:
                  userId === element.sentBy
                    ? element.receiveBy
                    : element.sentBy,
                userEmail:
                  userId === element.sentBy
                    ? element.userEmail
                    : element.otherEmail,
                otherEmail:
                  userId === element.sentBy
                    ? element.otherEmail
                    : element.userEmail,
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
                  <p>Last Message : {element.message}</p>
                </div>
              </div>
            </Link>
          ))}
        </>
      ) : (
        <h4 id="loadingTitleScreen">Loading...</h4>
      )}
    </div>
  );
}
