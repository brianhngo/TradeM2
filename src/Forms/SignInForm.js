import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import './loginPage.css';
import { useNavigate } from 'react-router-dom';
export default function SignInForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [password1Shown, setPassword1Shown] = useState(false);

  const togglePassword1 = () => {
    setPassword1Shown(!password1Shown);
  };

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // Checks the token to see if the Username and Password associated to token matches input
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setErrorStatus(false);
        navigate('/profile');
      })
      .catch((error) => {
        setErrorStatus(true);
        setEmail('');
        setPassword('');
        setPassword1Shown(false);
        console.log(error);
      });
  };

  return (
    <section className="loginBody">
      {errorStatus === true ? (
        <p className="errorMessage">
          {' '}
          The crendentials you have submitted does not match. Please try again
        </p>
      ) : null}
      <form onSubmit={submitHandler}>
        <input
          type="email"
          name="email"
          onChange={emailHandler}
          value={email}
          placeholder="Email"
          className={errorStatus === true ? 'errorStatusBorder' : ''}></input>

        <div className="password-input-container">
          <input
            type={password1Shown === true ? 'text' : 'password'}
            name="password"
            onChange={passwordHandler}
            value={password}
            placeholder="Password"
            className={errorStatus === true ? 'errorStatusBorder' : ''}></input>
          <span className="toggle-password-button">
            {' '}
            <svg
              onClick={togglePassword1}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={password1Shown === false ? 'currentColor' : '#555'}
              className="bi bi-eye-slash"
              viewBox="0 0 16 16">
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
            </svg>
          </span>
        </div>
        <button> Submit </button>
      </form>
    </section>
  );
}
