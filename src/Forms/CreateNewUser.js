import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import PasswordStrengthMeter from './PasswordStrengthMeter';
import './loginPage.css';
import db from '../firebase';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';

export default function CreateNewUser() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [password1Shown, setPassword1Shown] = useState(false);
  const [password2Shown, setPassword2Shown] = useState(false);
  const [PWrequirements, setShowPWrequirement] = useState(false);
  const [PW2requirements, setShow2PWrequirement] = useState(false);

  // pop up PW requirement
  const onFocusPWReq = () => {
    setShowPWrequirement(true);
  };
  const onBlurPWReq = () => {
    setShowPWrequirement(false);
  };
  const onFocusPW2Req = () => {
    setShow2PWrequirement(true);
  };

  const onBlurPW2Req = () => {
    setShow2PWrequirement(false);
  };

  const togglePassword1 = () => {
    setPassword1Shown(!password1Shown);
  };

  const togglePassword2 = () => {
    setPassword2Shown(!password2Shown);
  };

  // Cases of Error Messaging

  // if the Passwords dont match
  const [passwordErrorStatus, setPasswordErrorStatus] = useState(false);
  // The email entered already exist
  const [emailExistError, setEmailExistError] = useState(false);
  // the Password does not meet the requirements
  const [passwordLengthErrorStatus, setPasswordLengthErrorStatus] =
    useState(false);

  // Do Not know if the bottom is needed. Will see when react landing page is set up.

  // const resetStates = () => {
  //   setEmail('');
  //   setPassword('');
  //   setPassword2('');
  //   setPasswordErrorStatus(false);
  //   setEmailExistError(false);
  //   setPasswordLengthErrorStatus(false);
  // };

  // When the user leaves the page, resetting all the useStates to the initial State values
  // useEffect ( () => {
  //   window.addEventListener('beforeunload', resetStates);

  //   return () => {
  //     window.removeEventListener('beforeunload', resetStates)
  //   }
  // },[])

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };

  const password2Handler = (event) => {
    setPassword2(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (password.length < 6 || password2.length < 6) {
      setPasswordLengthErrorStatus(true);
      setEmailExistError(false);
      setPasswordErrorStatus(true);
      setPassword('');
      setPassword2('');
      throw 'Error. Password is not the correct length';
    }
    // If the passwords dont match. It will exit out of the function and turn on error indicator
    if (password !== password2) {
      setPasswordErrorStatus(true);
      setEmailExistError(false);
      setPasswordLengthErrorStatus(false);
      setPassword('');
      setPassword2('');
      throw 'Error. Passwords Do Not match';
    }
    // Fills in the empty Token with Email and Password after checking if email doesn't exist
    else {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const reference = ref(db, 'Users/' + userCredential.user.uid);
          console.log(userCredential);
          // Inputting the newly created uid from Firebase Auth into our DB
          function writeUserData(id, email) {
            set(reference, {
              profileStatus: false,
              id: id,
              email: email,
            });
          }
          writeUserData(userCredential.user.uid, userCredential.user.email);

          // Case where user types it in wrong first, then puts it in correctly. Turning off error sensor
          setPasswordLengthErrorStatus(false);
          setPasswordErrorStatus(false);
          setEmailExistError(false);
          setEmail('');
          setPassword('');
          setPassword2('');
          // navigate(`/profile/${userCredential.user.uid}`);
          // navigate('/profile');
          navigate('/profile', { state: { uid: userCredential.user.uid } });
        })

        .catch((error) => {
          // email already exists

          setEmailExistError(true);
          setPasswordLengthErrorStatus(false);
          setPasswordErrorStatus(false);
          setEmail('');
          setPassword('');
          setPassword2('');
          setPassword1Shown(false);
          setPassword2Shown(false);

          console.log(error);
        });
    }
  };

  return (
    <section className="loginBody">
      {/* If passwords dont match This message will appear */}
      {passwordErrorStatus && passwordLengthErrorStatus === false ? (
        <p className="errorMessage">
          {' '}
          The Password you have entered does not match. Please Try Again
        </p>
      ) : null}
      {emailExistError === true ? (
        <p className="errorMessage">
          {' '}
          The Email you have typed already Exist. Please Login or use a
          different email.
        </p>
      ) : null}
      {passwordLengthErrorStatus === true ? (
        <p className="errorMessage">
          {' '}
          The password you have entered does not meet the length requirement
        </p>
      ) : null}
      <form onSubmit={submitHandler}>
        <label htmlFor="email"> Email* </label>
        <input
          type="email"
          name="email"
          onChange={emailHandler}
          value={email}
          placeholder="Enter your email"
          className={
            emailExistError === true ? 'errorStatusBorder' : ''
          }></input>

        <label htmlFor="password"> Password*</label>
        <div className="password-input-container">
          {/* // Has to be length >= 6 */}
          <input
            type={password1Shown === true ? 'text' : 'password'}
            name="password"
            onChange={passwordHandler}
            value={password}
            placeholder="Enter your password"
            // If it doesnt match. Border goes red
            className={passwordErrorStatus === true ? 'errorStatusBorder' : ''}
            onFocus={onFocusPWReq}
            onBlur={onBlurPWReq}></input>

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
            {PWrequirements ? (
              <div className="password-requirements">
                Password must be at least 6 character long
              </div>
            ) : null}
          </span>
        </div>
        <div className="passwordStrengthContainer">
          <PasswordStrengthMeter password={password} />
        </div>
        <label htmlFor="password"> Confirm Password*</label>
        {/* // Has to be length >= 6 */}
        <div className="password-input-container">
          <input
            type={password2Shown === true ? 'text' : 'password'}
            name="password2"
            onChange={password2Handler}
            value={password2}
            placeholder="Confirm Password"
            onFocus={onFocusPW2Req}
            onBlur={onBlurPW2Req}
            // If it doesnt match. Border goes red
            className={
              passwordErrorStatus === true ? 'errorStatusBorder' : ''
            }></input>
          <span className="toggle-password-button">
            {' '}
            <svg
              onClick={togglePassword2}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={password2Shown === false ? 'currentColor' : '#555'}
              className="bi bi-eye-slash"
              viewBox="0 0 16 16">
              <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
              <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
              <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
            </svg>
            {PW2requirements ? (
              <div className="password-requirements">
                Password must be at least 6 character long
              </div>
            ) : null}
          </span>
        </div>

        <button> Submit </button>
      </form>
    </section>
  );
}
