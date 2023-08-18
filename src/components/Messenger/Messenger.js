import React, { useEffect, useState } from 'react';
import { getDatabase, ref, set, onChildAdded, update } from 'firebase/database';
import { useLocation, useParams } from 'react-router-dom';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
export default function Messenger() {
  const [user, setUser] = useState([]);
  //   const { state } = useLocation();
  //   const sellerId = state.username ? state.username : null;
  const location = useLocation();
  const sellerId = location.state.sellerId;
  const buyerId = user.uid;
  //

  console.log(sellerId);
  const dbRef = getDatabase();

  //   function sendMessage(e) {
  //     e.preventDefault();
  //     const timestamp = Date.now();
  //     const messageInput = document.getElementById('message-input');
  //     const message = messageInput.value;
  //     console.log(message);
  //     console.log(user.uid);
  //     messageInput.value = '';

  //     //auto scroll to the bottom
  //     document
  //       .getElementById('messages')
  //       .scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });

  //     update(ref(dbRef, `Messages/1/`), {
  //       userId: user.uid,
  //       sellerId: sellerId,
  //       message: {
  //         messageID:
  //         message: message,
  //         timestamp: timestamp,
  //         sentBy: user.uid,
  //       },
  //     });
  //   }

  function sendMessage(e) {
    e.preventDefault();
    if (authUser && newMessage.trim() !== '') {
      const userId = authUser.uid;
      const chatRef = ref(
        getDatabase(),
        'Chats/' + sellerId + '/' + buyerId + '/messages'
      );
      const newMessageRef = push(chatRef);
      set(newMessageRef, {
        userId: userId,
        content: newMessage,
        timestamp: new Date().toISOString(),
      });
      setNewMessage(''); //clear input for message for new chat
    }
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
        {/* <form id="message-form">
          <input id="message-input" type="text" />
          <button
            id="message-btn"
            type="submit"
            onClick={(e) => sendMessage(e)}>
            Send
          </button>
        </form> */}
        <form id="message-form" onSubmit={(e) => sendMessage(e)}>
          <input
            id="message-input"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button id="message-btn" type="submit">
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
