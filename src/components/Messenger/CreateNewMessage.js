import React, { useState } from 'react';
import Modal from 'react-modal';
import { auth } from '../../firebase';
const customStyles = {
  content: {
    top: '50%',
    left: '70%',
    transform: 'translate(-50%,-50%)',
  },
};

import { get, getDatabase, ref, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function CreateNewMessage({ isOpen, onClose, otherId, userId }) {
  const [email, setEmail] = useState('');
  const [messageContext, setMessageContext] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const db = getDatabase();

  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const messageHandler = (event) => {
    setMessageContext(event.target.value);
  };

  const buttonHandler = (event) => {
    event.preventDefault();
    if (email.length < 1 || messageContext.length < 1) {
      setErrorStatus(true);
      return;
    }
    const timestamp = Date.now();

    if (otherId !== null) {
      // Creating new message from single product
      console.log('cake');
      update(ref(db, `Messages2/${userId}/${timestamp}`), {
        message: messageContext,
        sentBy: userId,
        receiveBy: otherId,
      });

      update(ref(db, `Messages2/${otherId}/${timestamp}`), {
        message: messageContext,
        sentBy: userId,
        receiveBy: otherId,
      });

      navigate('/chat', {
        state: {
          userId: userId,
          otherId: otherId,
        },
      });
    } else {
      console.log('cookie');
      // otherId does not equal null. Creating new message from Chatlist
      get(ref(db, 'Users')).then((snapshot) => {
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());
          const filteredData = data.filter((element) => {
            if (element.email === email) {
              return element;
            }
          });
          console.log(filteredData);
          update(ref(db, `Messages2/${userId}/${timestamp}`), {
            message: messageContext,
            sentBy: userId,
            receiveBy: otherId,
          });

          update(ref(db, `Messages2/${filteredData.id}/${timestamp}`), {
            message: messageContext,
            sentBy: userId,
            receiveBy: otherId,
          });

          navigate('/chat', {
            state: {
              userId: userId,
              otherId: filteredData.id,
            },
          });
        }
      });
    }
  };

  const exitHandler = (event) => {
    event.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <button onClick={exitHandler}> X </button>
      <h1> Create New Message </h1>
      {errorStatus === true ? (
        <p className="errorMessage"> The following textbox cannot be blank</p>
      ) : null}
      <form onSubmit={buttonHandler}>
        <input
          type="email"
          placeholder="Email of user you wish to contact"
          name="email"
          value={email}
          onChange={emailHandler}></input>
        <input
          name="message"
          type="text"
          placeholder="Enter your message here!"
          value={messageContext}
          onChange={messageHandler}></input>
        <button onClick={buttonHandler}> Submit </button>
      </form>
    </Modal>
  );
}
