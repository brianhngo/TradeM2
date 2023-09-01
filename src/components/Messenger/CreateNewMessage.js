import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%,-50%)',
    width: '80%',
    maxWidth: '500px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // Change the alpha value to adjust transparency
    border: 'none', // Remove the border if desired
  },
};
import './CreateNewMessage.css';

import { get, getDatabase, ref, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

export default function CreateNewMessage({
  isOpen,
  onClose,
  otherId,
  userId,
  emailGiven,
}) {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState(emailGiven ? emailGiven : '');
  const [messageContext, setMessageContext] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [errorStatus2, setErrorStatus2] = useState(false);

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

    if (user.reloadUserInfo.email === email) {
      setErrorStatus2(true);
      return;
    }
    const timestamp = Date.now();

    if (otherId !== null) {
      get(ref(db, 'Users')).then((snapshot) => {
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());

          // Creating new message from single product

          // gets users email
          const filteredUserData = data.filter((element) => {
            if (element.id === user.uid) {
              return element;
            }
          });
          console.log(filteredUserData);
          update(ref(db, `Messages2/${user.uid}/${timestamp}`), {
            message: messageContext,
            sentBy: user.uid,
            receiveBy: otherId,
            otherEmail: email,
            userEmail: filteredUserData[0].email,
          });

          update(ref(db, `Messages2/${otherId}/${timestamp}`), {
            message: messageContext,
            sentBy: user.uid,
            receiveBy: otherId,
            otherEmail: email,
            userEmail: filteredUserData[0].email,
          });
          setErrorStatus(false);
          setErrorStatus2(false);
          navigate('/chat', {
            state: {
              userId: user.uid,
              otherId: otherId,
              userEmail: filteredUserData[0].email,
              otherEmail: email,
            },
          });
        }
      });
    } else {
      // otherId does not equal null. Creating new message from Chatlist
      get(ref(db, 'Users')).then((snapshot) => {
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());

          // get ID from user inputting email
          const filteredData = data.filter((element) => {
            if (element.email === email) {
              return element;
            }
          });

          if (filteredData.length < 1) {
            toast.warning('The Email you have inputted does not exist');
            return;
          }

          // gets user Email
          const filteredUserData = data.filter((element) => {
            if (element.id === userId) {
              return element;
            }
          });

          update(ref(db, `Messages2/${userId}/${timestamp}`), {
            message: messageContext,
            sentBy: userId,
            receiveBy: filteredData[0].id,
            otherEmail: email,
            userEmail: filteredUserData[0].email,
          });

          update(ref(db, `Messages2/${filteredData[0].id}/${timestamp}`), {
            message: messageContext,
            sentBy: userId,
            userEmail: filteredUserData[0].email,
            receiveBy: filteredData[0].id,
            otherEmail: email,
          });
          setErrorStatus(false);
          setErrorStatus2(false);

          navigate('/chat', {
            state: {
              userId: userId,
              otherId: filteredData[0].id,
              otherEmail: email,
              userEmail: filteredUserData[0].email,
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

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="popup">
        <button className="exit-button" onClick={exitHandler}>
          X
        </button>
        <h1 className="popup-title">Create New Message</h1>
        {errorStatus === true ? (
          <p className="error-message">The following textbox cannot be blank</p>
        ) : null}
        {errorStatus2 === true ? (
          <p className="error-message">
            {' '}
            You cannot send a message to yourself
          </p>
        ) : null}
        <form onSubmit={buttonHandler}>
          {emailGiven ? (
            <input
              className="email-input"
              type="email"
              placeholder="Email of user you wish to contact"
              name="email"
              value={email}
              readOnly
            />
          ) : (
            <input
              className="email-input"
              type="email"
              placeholder="Email of user you wish to contact"
              name="email"
              value={email}
              onChange={emailHandler}
            />
          )}
          <input
            className="message-input"
            name="message"
            type="text"
            placeholder="Enter your message here!"
            value={messageContext}
            onChange={messageHandler}
          />
          <button className="submit-button" onClick={buttonHandler}>
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
}
