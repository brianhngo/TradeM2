import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import './loginPage.css';

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(false);

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      sendPasswordResetEmail(auth, email).then(() => {
        setStatus(true);
        console.log('success');
      });
    } catch (error) {
      setStatus(false);
      console.log(error);
    }
  };
  return (
    <div id="login-section" className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1> Forget your password? </h1>
          <p> Please enter your email. </p>
          <p>
            If an email exists, a following confirmation email will be sent to
            where you can change your password.
          </p>
        </div>
        <div className="body">
          {status === true ? (
            <p> Email Confirmation has been sent!</p>
          ) : (
            <section className="loginBody">
              <form onSubmit={submitHandler}>
                <label htmlFor="email"> Email* </label>
                <input
                  type="email"
                  name="email"
                  onChange={emailHandler}
                  value={email}
                  placeholder="Email"></input>
                <button> Submit</button>
              </form>
            </section>
          )}
        </div>
        <div className="footer">
          <div className="footerLinks">
            <p>
              <Link to="/login"> Back to Login </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
