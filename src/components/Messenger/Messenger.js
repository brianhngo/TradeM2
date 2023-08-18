import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onChildAdded } from 'firebase/database';

import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

export default function Messenger() {
  const [user, setUser] = useState([]);

  const dbRef = getDatabase();

  function sendMessage(e) {
    e.preventDefault();
    const timestamp = Date.now();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    console.log(message);
    console.log(user.uid);
    messageInput.value = '';

    //auto scroll to the bottom
    document
      .getElementById('messages')
      .scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });

    set(ref(dbRef, `Messages/${user.uid}`), {
      userId: user.uid,
      message: message,
    });
  }

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
  }, []);

  // when a child node is added, it will take a snapshot of the message db and add message
  const messagesRef = ref(dbRef, 'Messages/');
  onChildAdded(messagesRef, function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      user.uid === messages.userName ? 'sent' : 'receive'
    }><span>${messages.userName}: </span>${messages.message}</li>`;

    document.getElementById('messages').innerHTML += message;
  });

  return (
    <div>
      <h2>Chat</h2>
      <div id="chat">
        {
          //messages will display here
        }
        <ul id="messages"></ul>

        {
          //form to send message
        }
        <form id="message-form">
          <input id="message-input" type="text" />
          <button
            id="message-btn"
            type="submit"
            onClick={(e) => sendMessage(e)}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
