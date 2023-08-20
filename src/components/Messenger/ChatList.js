import React, { useEffect, useState } from 'react';

import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import MessengerGrid from './MessengerGrid';
import CreateNewMessage from '../Messenger/CreateNewMessage';

export default function ChatList() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState([]);
  const openPopup = () => {
    if (user.uid) {
      setIsPopupOpen(true);
    } else {
      toast.warning('Please login or create an account to use this feature');
    }
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (userData) => {
      try {
        if (userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error(error);
      }
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <>
      <div className="messengerContainer">
        <h1 className="chatTitle"> List of all your messages </h1>
        <button className="sendMessageButton" onClick={openPopup}>
          Send Message!
        </button>
        <CreateNewMessage
          userId={user.uid}
          otherId={null}
          isOpen={isPopupOpen}
          onClose={closePopup}
        />
        <MessengerGrid userId={user.uid} />
      </div>
    </>
  );
}
