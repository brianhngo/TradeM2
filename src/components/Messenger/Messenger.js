import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onChildAdded, update, get } from 'firebase/database';
import { useLocation } from 'react-router-dom';

import './Messenger.css';

export default function Messenger() {
  const { state } = useLocation();
  const userId = state.userId; // Logged in usersID
  const otherId = state.otherId; // Other persons in chat //
  const [allMessages, setAllMessages] = useState([]);

  console.log(allMessages);
  const db = getDatabase();

  // Send Message handler
  function sendMessage(e) {
    e.preventDefault();
    const timestamp = Date.now();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;

    messageInput.value = '';

    //auto scroll to the bottom
    document
      .getElementById('messageListContainer')
      .scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });

    update(ref(db, `Messages2/${userId}/${timestamp}`), {
      message: message,
      sentBy: userId,
      receiveBy: otherId,
    });

    update(ref(db, `Messages2/${otherId}/${timestamp}`), {
      message: message,
      sentBy: userId,
      receiveBy: otherId,
    });
  }

  // mounted an AddListener. Anytime a child node is added to Messages2$/${userId}, it will add
  // the new child onto useState []
  useEffect(() => {
    const messagesRef = ref(db, `Messages2/${userId}`);
    const messageListener = onChildAdded(messagesRef, (snapshot) => {
      const newMessage = snapshot.val();
      setAllMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      messageListener();
    };
  }, []);

  // When the page loads, get all the messages from the user(logged in). Filter it out since
  // It contains all messages (including multiple messages with different users)
  useEffect(() => {
    const messageRef = ref(db, `Messages2/${userId}`);
    get(messageRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const messageData = Object.values(data).filter((element) => {
          if (
            (element.sentBy === userId || element.sentBy === otherId) &&
            (element.receiveBy === otherId || element.receiveBy === userId)
          ) {
            // if element.sentBy && element.receiveBy matches ID return
            return element;
          }
        });
        setAllMessages(messageData);
      }
    });
  }, []);
  console.log(userId);
  return (
    <div className="chatContainer">
      <h2 className="chatTitle">Chat</h2>
      <div id="chat">
        {
          //messages will display here
        }
        <ul id="messageListContainer">
          {allMessages.map((element, index) => {
            return (
              <div
                className={
                  element.sentBy === userId ? 'userMessage' : 'otherMessage'
                }
                key={index}>
                <li> {element.message} </li>

                {userId === element.receiveBy ? (
                  <span className="messageUser"> {element.userEmail} </span>
                ) : (
                  <span className="messageUser"> {element.userEmail}</span>
                )}
              </div>
            );
          })}
        </ul>

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
